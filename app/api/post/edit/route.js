import { connectDB } from "../../../utils/database";
import { ObjectId } from "mongodb";

export async function POST(request) {
  console.log("request:", request);
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const id = formData.get("_id");

  if (title == "" || content == "") {
    return new Response(JSON.stringify({ error: "제목써라" }), {
      status: 400,
    });
  }

  const client = await connectDB;
  const db = client.db("nextJS");
  await db
    .collection("post")
    .updateOne({ _id: new ObjectId(id) }, { $set: { title, content } });

  return new Response(null, {
    status: 302,
    headers: { Location: "/list" },
  });
}
