import { ObjectId } from "mongodb";
import { connectDB } from "@/app/utils/database";

export async function DELETE(request) {
  const id = await request.text();

  const client = await connectDB;
  const db = client.db("nextJS");

  const result = await db
    .collection("post")
    .deleteOne({ _id: new ObjectId(id) });

  return new Response("삭제 완료", { status: 200 });
}
