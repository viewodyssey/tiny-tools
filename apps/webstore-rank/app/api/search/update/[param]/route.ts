import { updateSearchTerm } from "@/utils/updateSearchTerm";

/**
 * Update each extension item details for the top 100 for search term
 * @param request
 * @param param1
 * @returns
 */
export async function GET(
  request: Request,
  { params }: { params: { param: string } }
) {
  const { param } = params;
  const id = param.toLowerCase();
  await updateSearchTerm(id);
}
