import { connectDB } from "@/app/utils/database";
import { authOptions } from "../../../lib/authOptions";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession(authOptions); // ✅ authOptions 꼭 전달해야 함

  console.log("request:", request);
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");

  if (title == "" || content == "") {
    return new Response(JSON.stringify({ error: "제목써라" }), {
      status: 400,
    });
  }

  const client = await connectDB; // ✅ 함수 아님, Promise
  const db = client.db("nextJS");
  const newPost = {
    title,
    content,
    author: session?.user?.email,
    createdAt: new Date(),
  };

  await db.collection("post").insertOne(newPost);

  return new Response(null, {
    status: 302,
    headers: { Location: "/list" },
  });
}
