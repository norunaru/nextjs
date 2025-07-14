export async function GET(request) {
  console.log("날짜 api");
  let now = new Date();
  console.log(now);
  return new Response(JSON.stringify(now));
}
