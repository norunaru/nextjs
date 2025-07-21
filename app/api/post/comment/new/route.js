import { connectDB } from "@/app/utils/database";
import { authOptions } from "../../../../lib/authOptions";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { comment, postId } = await request.json();

  const data = {
    comment,
    author: session.user.email,
    parent: new ObjectId(postId),
    createdAt: new Date(),
  };

  const client = await connectDB;
  const db = client.db("nextJS");

  await db.collection("comment").insertOne(data);

  return new Response(JSON.stringify({ message: "댓글 저장 완료" }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
