import { connectDB } from "@/app/utils/database";
import { ObjectId } from "mongodb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("id");
  console.log("댓글 조회 postId:", postId);

  if (!postId) {
    return new Response("Missing postId", { status: 400 });
  }

  const client = await connectDB;
  const db = client.db("nextJS");

  const comments = await db
    .collection("comment")
    .find({ parent: new ObjectId(postId) })
    .toArray();

  return new Response(JSON.stringify(comments), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
