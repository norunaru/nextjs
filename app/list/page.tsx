import Link from "next/link";
import { connectDB } from "../utils/database";

export default async function List() {
  let db = (await connectDB).db("nextJS");
  let result = await db.collection("post").find().toArray();
  return (
    <div className="list-bg">
      {result.map((a, i) => (
        <div className="list-item" key={i}>
          <Link href={"/detail/" + result[i]._id}>
            <h4>{a.title}</h4>
          </Link>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  );
}
