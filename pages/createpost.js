import HeadTitle from "../components/headTitle";
import styles from "../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Editor from "../components/editor";
import { comment } from "postcss";

export default function CreatePost() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/posts");
    const data = await response.json();
    setPosts(data);
  };

  const submitPost = async (event) => {
    // Get data from the form.
    const data = {
      title: event.target.title.value,
      tag: event.target.tag.value,
      content: event.target.content.value,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/posts";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);
  };

  return (
    <>
      <HeadTitle title="Create Post" />
      {/* Create post section */}
      <section id="create_post" className="pt-32 font-asap md:px-16">
        <header className="absolute top-0 left-0 w-full flex items-center z-10">
          <div className="container">
            <div className="flex items-center justify-between relative">
              <div className="flex items-center px-4 md:px-16 ">
                <div className="mr-8 flex-none">
                  <img src="/favicon.ico" alt="parentalogi" className="py-3" />
                </div>
                <h1 className="font-semibold text-2xl">Buat Post</h1>
              </div>
            </div>
          </div>
        </header>

        <form onSubmit={submitPost}>
          <div className="container">
            <div className="flex flex-wrap border-2 border-blue-500 p-10 rounded-lg gap-4">
              <div className="w-full self-center">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Judul Post Baru"
                />
              </div>
              <div className="w-full self-center">
                <input
                  type="text"
                  name="tag"
                  id="tag"
                  placeholder="Tambahkan hingga 4 tag"
                />
              </div>
              <div className="w-full self-center">
                <Editor
                  name="content"
                  onChange={(data) => {
                    setData(data);
                  }}
                  editorLoaded={editorLoaded}
                />

                {/* {JSON.stringify(data)} */}
              </div>
              <input type="hidden" name="content" value={data} />
              <button
                className="border-blue-500 border-2 rounded-lg py-2 px-4"
                type="submit"
              >
                Kirim Post
              </button>
            </div>
          </div>
        </form>
        <button
          className="border-blue-500 border-2 rounded-lg py-2 px-4 mt-3"
          onClick={fetchPosts}
        >
          Load Post
        </button>
        {posts.map((post) => {
          return (
            <div className="w-full" key={post.id}>
              {post.id} {post.title} {post.tag} {post.content}
            </div>
          );
        })}
      </section>
      {/* Create post end section */}
    </>
  );
}
