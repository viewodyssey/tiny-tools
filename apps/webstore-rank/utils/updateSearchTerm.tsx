import webstore from "chrome-webstore";
import { Db } from "mongodb";

const findItemIds = (db: Db, expr: any) => {
  return db
    .collection("items")
    .find(expr, {
      id: 1,
    } as never)
    .toArray();
};

const findItemIdsMatchingObjects = (db: Db, expr: any) => {
  return db
    .collection("items")
    .aggregate([
      {
        $match: {
          $expr: {
            $or: expr,
          },
        },
      },
    ])
    .toArray();
};

export const updateSearchTerm = async (db: Db, id: string) => {
  const items = await webstore.items({
    category: "extensions",
    search: id,
    count: 100,
  });
  const currentDate = new Date().toISOString().split("T")[0];
  const itemIds = items.map((item) => item.id);
  const itemObjects = items.map((item) => ({
    id: item.id,
    users: Number(item.users.replaceAll(",", "").replaceAll("+", "")),
    rating: item.rating,
  }));
  const isAlreadyUpdatedToday = await findItemIds(db, {
    $expr: {
      $and: [
        { $in: ["id", itemIds] },
        { $eq: [{ $arrayElemAt: ["$users.date", -1] }, currentDate] },
        { $eq: [{ $arrayElemAt: ["$rating.date", -1] }, currentDate] },
      ],
    },
  });

  const noUserChange = await findItemIdsMatchingObjects(
    db,
    itemObjects.map((item) => ({
      $and: [
        { $eq: ["id", item.id] },
        { $eq: [{ $arrayElemAt: ["$users.users", -1] }, item.users] },
      ],
    }))
  );
  const noRatingChange = await findItemIdsMatchingObjects(
    db,
    itemObjects.map((item) => ({
      $and: [
        { $eq: ["id", item.id] },
        { $eq: [{ $arrayElemAt: ["$rating.rating", -1] }, item.rating] },
      ],
    }))
  );

  const updatedTodayIds = isAlreadyUpdatedToday.map((item) => item.id);
  const noRatingChangeIds = noRatingChange.map((item) => item.id);
  const noUserChangeIds = noUserChange.map((item) => item.id);
  const noChangeIds = noRatingChangeIds.filter((x) =>
    noUserChangeIds.includes(x)
  );
  const itemsNoUpdate = [
    ...updatedTodayIds,
    noChangeIds.filter((x) => !updatedTodayIds.includes(x)),
  ];
  const itemsToUpdate = items.filter(
    (item) => !itemsNoUpdate.includes(item.id)
  );
  await db.collection("items").updateMany(
    {
      id: {
        $in: itemsToUpdate.map((item) => item.id),
      },
    },
    {
      $pull: {
        users: {
          date: currentDate,
        } as never,
        rating: {
          date: currentDate,
        } as never,
      },
    }
  );
  const updatedItems = [];
  for (let i = 0; i < itemsToUpdate.length; i++) {
    const itemToUpdate = itemsToUpdate[i];
    const itemUpdated = await db.collection("items").findOneAndUpdate(
      {
        id: itemToUpdate.id,
      },
      {
        $set: {
          id: itemToUpdate.id,
          name: itemToUpdate.name,
          title: itemToUpdate.title,
          slug: itemToUpdate.slug,
          category: itemToUpdate.category,
          author: itemToUpdate.author,
          developer: itemToUpdate.developer.verified
            ? { verified: true }
            : { verified: false },
          featured: itemToUpdate.featured ? true : false,
        },
        $push: {
          ...(noUserChangeIds.includes(itemToUpdate.id)
            ? {}
            : {
                users: {
                  date: currentDate,
                  users: Number(
                    itemToUpdate.users.replaceAll(",", "").replaceAll("+", "")
                  ),
                } as never,
              }),
          ...(noRatingChangeIds.includes(itemToUpdate.id)
            ? {}
            : {
                rating: {
                  date: currentDate,
                  rating: itemToUpdate.rating,
                } as never,
              }),
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    updatedItems.push(itemUpdated);
  }
  return updatedItems;
};
