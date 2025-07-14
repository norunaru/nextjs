import { ObjectId } from "mongodb";
import { connectDB } from "../../utils/database";

export default async function Edit(props) {
  let db = (await connectDB).db("nextJS");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  console.log(JSON.stringify(result));
  return (
    <div className="write">
      <form action="/api/post/edit" method="POST">
        <input name="title" defaultValue={result?.title} />
        <input name="content" defaultValue={result?.content} />
        <input type="hidden" name="_id" defaultValue={result._id.toString()} />

        <button type="submit">전송</button>
      </form>
    </div>
  );
}
