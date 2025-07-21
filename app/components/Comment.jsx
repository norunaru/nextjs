"use client";

import { useEffect, useState } from "react";

export default function Comment({ postId }) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/post/comment/list?id=${postId}`);
        if (!res.ok) {
          console.error("댓글 조회 실패");
          return;
        }
        const json = await res.json();
        setData(json);
        console.log("댓글 목록:", json);
      } catch (err) {
        console.error("에러 발생:", err);
      }
    };

    fetchData();
  }, [postId]);

  async function handleSubmit() {
    await fetch("/api/post/comment/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment,
        postId, // ✅ 함께 전송
      }),
    });
  }
  return (
    <div>
      <div>댓글목록</div>
      <input onChange={(e) => setComment(e.target.value)} />
      <button onClick={handleSubmit}>댓글전송</button>
      {data.length > 0
        ? data.map((a, i) => <p key={i}>{a.comment}</p>)
        : "댓글없음"}
    </div>
  );
}
