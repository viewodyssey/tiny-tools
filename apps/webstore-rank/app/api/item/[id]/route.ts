import { NextResponse } from "next/server";
import webstore from "chrome-webstore";
import clientPromise from "@/utils/mongodb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const itemDetail = await webstore.detail({
    id: id,
  });

  try {
    const client = await clientPromise;
    const db = client.db("db");
    const currentDate = new Date().toISOString().split("T")[0];

    const existingItem = await db.collection("items").findOne({ id: id });

    if (existingItem) {
      return NextResponse.json({ data: existingItem });
    }
    const itemUpdated = await db.collection("items").findOneAndUpdate(
      {
        id: itemDetail.id,
      },
      {
        $set: {
          id: itemDetail.id,
          name: itemDetail.name,
          title: itemDetail.title,
          slug: itemDetail.slug,
          category: itemDetail.category,
          author: itemDetail.author,
          developer: itemDetail.developer.verified
            ? { verified: true }
            : { verified: false },
          featured: itemDetail.featured ? true : false,
          users: [
            {
              users: Number(
                itemDetail.users.replaceAll(",", "").replaceAll("+", "")
              ),
              date: currentDate,
            },
          ],
          rating: [{ rating: itemDetail.rating, date: currentDate }],
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return NextResponse.json({ data: itemUpdated.value });
  } catch (e) {
    console.error(e);
    NextResponse.json({
      error: {
        message: e.message,
      },
    });
  }
}
