"use client";

import { useState } from "react";

export default function Register() {
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // 이전 에러 초기화

    const form = e.target;
    const formData = new FormData(form);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: formData,
    });

    console.log(res);

    if (res.redirected) {
      window.location.href = res.url; // 성공 → 홈으로 이동
    } else {
      const msg = await res.text();
      setError(msg); // 에러 메시지 상태에 저장
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="이름" />
        <input name="email" type="text" placeholder="이메일" />
        <input name="password" type="password" placeholder="비번" />
        <button type="submit">id/pw 가입요청</button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>⚠️ {error}</p>}
    </div>
  );
}
