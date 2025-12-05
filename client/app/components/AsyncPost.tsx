"use client";

import { Activity, useState, use } from "react";

type PostType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

async function fetchPost(): Promise<PostType[]> {
  const rest = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=10",
  );
  const data = await rest.json();
  return data;
}

function PhotoAsync({ data }: any) {
  return (
    <>
      <p>size: {data.length}</p>
      <ul>
        {data?.map((item: PostType) => (
          <li key={item.id}>
            {item.title}
            <img
              loading="lazy"
              with={100}
              height={100}
              src={item.thumbnailUrl}
              alt={item.title}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default function AsyncPost() {
  const [data, setData] = useState<PostType[]>();
  if (!data) {
    const data = use(fetchPost());
    setData(data);
  }

  return (
    <>
      <Activity mode="visible">
        <PhotoAsync data={data} />
      </Activity>
    </>
  );
}
