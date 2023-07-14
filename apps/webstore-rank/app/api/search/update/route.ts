import clientPromise from "@/utils/mongodb";
import { updateSearchTerm } from "@/utils/updateSearchTerm";

/**
 * Update each extension item for all search terms
 * @param request
 * @param param1
 * @returns
 */
export async function GET() {
  const client = await clientPromise;
  const db = client.db("db");
  const allKeywords = await db
    .collection("search")
    .find({}, { keyword: 1, _id: 0 } as never)
    .toArray();
  for (let i = 0; i < allKeywords.length; i++) {
    await updateSearchTerm(allKeywords[i].keyword);
  }
}
