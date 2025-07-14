import { connectDB } from "@/app/utils/database";

export async function POST(request) {
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
  await db.collection("post").insertOne({ title, content });

  return new Response(null, {
    status: 302,
    headers: { Location: "/list" },
  });
}
