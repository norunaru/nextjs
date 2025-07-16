"use client";

import Link from "next/link";

export default function ListItem({ result }) {
  return (
    <div>
      {result.map((a, i) => (
        <div className="list-item" key={i}>
          <Link href={"/detail/" + result[i]._id}>{result[i].title}</Link>
          <Link href={"/edit/" + result[i]._id} className="list-btn">
            ✏️
          </Link>
          <button
            onClick={(event) => {
              const target = event.currentTarget;

              fetch("/api/post/delete", {
                method: "DELETE",
                body: result[i]._id,
              }).then(() => {
                target.parentElement.style.opacity = 0;
                setTimeout(() => {
                  target.parentElement.style.display = "none";
                }, 1000);
              });
            }}
          >
            🗑️
          </button>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  );
}
