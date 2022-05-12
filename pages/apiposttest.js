import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

const fetcher = async () => {
  const res = await fetch("https://icvmdev.duckdns.org/api/posts/");
  const data = await res.json();
  return data;
};

// const url = "https://icvmdev.duckdns.org/api/posts/"

// const fetcher = url => fetch(url).then(r => r.json())

function PostTest({ posts }) {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("https://icvmdev.duckdns.org/api/posts/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //     });
  // }, []);

  const { data, error } = useSWR("posts", fetcher);
  posts = data;
  return (
    <>
      {console.log(posts)}
      {posts.map((datum) => {
        return (
          <div key={datum.id}>
            <h1>{datum.judul}</h1>
          </div>
        );
      })}
    </>
  );
}

export default PostTest;
