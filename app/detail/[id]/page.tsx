import { connectDB } from "@/app/utils/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  console.log(props);
  let db = (await connectDB).db("nextJS");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  console.log(result);

  return (
    <div>
      <h4>상세페이지임</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
    </div>
  );
}
