// app/api/test/route.ts (또는 .js)
export async function GET(request, response) {
  console.log("서버에서 호출됨");
  return new Response(JSON.stringify("처리완료"), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  console.log("글 작성 post요청");
  return new Response(JSON.stringify("작성 완료"), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
