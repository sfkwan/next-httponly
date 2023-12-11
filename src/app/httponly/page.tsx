"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { IProduct } from "./Iterface/IProduct";

import { debounce } from "lodash";

export default function Page() {
  const [result, setResult] = useState<IProduct | undefined>(undefined);
  const [search, setSearch] = useState("");

  const DEBOUNCE_TIME_MS = 500;

  const onInputChange = useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
      }, DEBOUNCE_TIME_MS),
    []
  );

  useEffect(() => {
    return () => {
      onInputChange.cancel();
    };
  }, [onInputChange]);

  const getUser = async (input: string) => {
    const { data } = await axios.get(
      // `https://dummyjson.com/products/search?q=${input}`
      `http://localhost:3010/cats/`,
      { withCredentials: true }
    );
    setResult(data);
    console.log(data);
  };

  useEffect(() => {
    getUser(search);
  }, [search]);

  return (
    <>
      <input
        name="search"
        placeholder="Trigger API request in other domain"
        onChange={onInputChange}
      ></input>
      <p>Total product: {result ? result.total : 0}</p>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </>
  );
}
