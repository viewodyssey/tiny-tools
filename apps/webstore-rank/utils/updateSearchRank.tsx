import webstore from "chrome-webstore";
import { Db } from "mongodb";

export const updateSearchRank = async (db: Db, id: string) => {
  const items = await webstore.items({
    category: "extensions",
    search: id,
    count: 100,
  });
  const currentDate = new Date().toISOString().split("T")[0];
  await db.collection("search").updateOne(
    {
      keyword: id,
    },
    {
      $pull: {
        ranking: {
          date: currentDate,
        },
      },
    }
  );
  const itemRankingIds = items.map((item) => ({
    id: item.id,
    name: item.name,
  }));
  if (itemRankingIds.length < 10) {
    return [];
  }
  const searchTerm = await db.collection("search").findOneAndUpdate(
    {
      keyword: id,
    },
    {
      $set: {
        keyword: id,
      },
      $push: {
        ranking: {
          date: currentDate,
          items: itemRankingIds,
        } as never,
      },
    },
    {
      upsert: true,
      returnDocument: "after",
    }
  );
  return searchTerm;
};
