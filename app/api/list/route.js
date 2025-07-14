import { connectDB } from "../../utils/database";

export async function GET(request) {
  let client = await connectDB;
  const db = client.db("nextJS");
  let result = await db.collection("post").find().toArray();

  console.log("데이터베이스 게시글 리스트");
  return new Response(JSON.stringify(result), {
    status: 200,
  });
}
