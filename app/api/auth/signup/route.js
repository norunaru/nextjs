import bcrypt from "bcrypt";
import { connectDB } from "../../../utils/database";

export async function POST(request) {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return new Response("필수 정보 없음", { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);

  const client = await connectDB;
  const db = client.db("nextJS");

  const isExists = await db.collection("user_cred").findOne({ email });
  if (isExists) {
    return new Response("이미 존재하는 이메일", { status: 400 });
  }

  await db.collection("user_cred").insertOne({
    name,
    email,
    password: hash,
  });

  return new Response("success", {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
