import Link from "next/link";
import { connectDB } from "../utils/database";
import ListItem from "./ListItem";

export default async function List() {
  let db = (await connectDB).db("nextJS");
  let result = await db.collection("post").find().toArray();
  console.log(result);

  result = result.map((post) => ({
    ...post,
    _id: post._id.toString(), // ObjectId를 문자열로 변환
  }));
  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
}
