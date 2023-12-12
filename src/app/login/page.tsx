"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IProduct } from "../httponly/Iterface/IProduct";
import Link from "next/link";

export default function Page() {
  const [result, setResult] = useState<IProduct | undefined>(undefined);

  useEffect(() => {
    const createCat = async () => {
      const { data } = await axios.get(
        `https://api-prkwan.hktdc.com:3010/login`,
        {
          withCredentials: true,
        }
      );

      setResult(data);

      console.log(data);
    };
    createCat();
  }, []);

  return (
    <>
      <Link href="/httponly">HttpOnly</Link>
      <p>Cat created</p>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </>
  );
}
