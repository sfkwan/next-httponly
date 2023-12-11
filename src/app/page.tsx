import Link from "next/link";

export default function Home() {
  return (
    <Link href="/login">
      Login (Generate tokens and store in cookie with HttpOnly)
    </Link>
  );
}
