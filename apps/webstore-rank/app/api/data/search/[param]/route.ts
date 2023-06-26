import { NextResponse } from "next/server";
import clientPromise from "@/utils/mongodb";

export async function GET(
  request: Request,
  { params }: { params: { param: string } }
) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const client = await clientPromise;
    const db = client.db("db");

    const searchTerm = await db.collection("search").findOne({
      keyword: id,
    });
    NextResponse.json({ ...searchTerm });
  } catch (e) {
    console.error(e);
    NextResponse.json({
      error: {
        message: e.message,
      },
    });
  }
}
