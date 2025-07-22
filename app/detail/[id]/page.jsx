import { connectDB } from "@/app/utils/database";
import { ObjectId } from "mongodb";
import Comment from "../../components/Comment";

export default async function Detail(props) {
  const id = props.params.id;
  let db = (await connectDB).db("nextJS");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <h4>상세페이지임</h4>
      <h4>{result.title}</h4>
      <p>{result.content}</p>

      <Comment postId={id} />
    </div>
  );
}
