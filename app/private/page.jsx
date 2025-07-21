// app/private/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    redirect("/login"); // ❗ 로그인 안 돼 있으면 로그인 페이지로 이동
  }

  return (
    <div>
      <h1>🔒 비공개 페이지</h1>
      <p>안녕하세요, {session.user?.email}님 👋</p>
    </div>
  );
}
