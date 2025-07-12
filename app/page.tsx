import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import a from "../public/images/a.webp";

export default function Home() {
  return (
    <main>
      <h1 className="title">Programming Log</h1>
      <p className="title-sub">by dev kim</p>
      <Image src={a} alt="no image" />
    </main>
  );
}
