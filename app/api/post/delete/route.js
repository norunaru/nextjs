import { ObjectId } from "mongodb";
import { connectDB } from "@/app/utils/database";
import { authOptions } from "../../../lib/authOptions";
import { getServerSession } from "next-auth";

export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  const id = await request.text();

  if (!session) {
    return new Response("로그인 필요", { status: 401 });
  }

  const client = await connectDB;
  const db = client.db("nextJS");

  // 먼저 게시글을 찾아서 작성자 정보 확인
  const post = await db.collection("post").findOne({ _id: new ObjectId(id) });

  if (!post) {
    return new Response("게시글 없음", { status: 404 });
  }

  if (post.author !== session.user.email) {
    return new Response("작성자만 삭제할 수 있습니다.", { status: 403 });
  }

  await db.collection("post").deleteOne({ _id: new ObjectId(id) });

  return new Response("삭제 완료", { status: 200 });
}
