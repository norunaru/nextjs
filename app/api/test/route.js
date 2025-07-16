export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const a = searchParams.get("a");
  const b = searchParams.get("b");

  console.log("a:", a);
  console.log("b:", b);

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
