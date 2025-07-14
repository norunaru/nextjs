import { connectDB } from "./utils/database";

export default async function Home() {
  let client = await connectDB;
  const db = client.db("nextJS");
  let result = await db.collection("post").find().toArray();

  console.log(result);

  return (
    <main>
      <h1 style={{ fontSize: "24px", color: "black" }}>{result[0].title}</h1>
    </main>
  );
}
