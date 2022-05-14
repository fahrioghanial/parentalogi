import HeadTitle from "../../components/headTitle";
import styles from "../../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Editor from "../../components/editor";
import Link from "next/link";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import axios from "axios";
import { ImCross } from "react-icons/im";

const EmailPasswordAuthNoSSR = dynamic(
  new Promise((res) => res(EmailPassword.EmailPasswordAuth)),
  { ssr: false }
);

export default function ProtectedCreatePost({ posts }) {
  return (
    <EmailPasswordAuthNoSSR>
      <CreatePost />
    </EmailPasswordAuthNoSSR>
  );
}

function CreatePost() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCover, setPostCover] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [tags, setTags] = useState([]);

  const [tag1, setTag1] = useState();
  const [tag2, setTag2] = useState();
  const [tag3, setTag3] = useState();
  const [tag4, setTag4] = useState();

  const [tagsExist, setTagsExist] = useState([]);
  useEffect(() => {
    fetch("https://parentalogi.me/api/tags")
      .then((res) => res.json())
      .then((data) => {
        setTagsExist(data);
      });
  }, []);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  function combineTags() {
    if (tag1 != undefined && tag1 != "") {
      setTags((oldArray) => [...oldArray, tag1]);
    }
    if (tag2 != undefined && tag2 != "") {
      setTags((oldArray) => [...oldArray, tag2]);
    }
    if (tag3 != undefined && tag3 != "") {
      setTags((oldArray) => [...oldArray, tag3]);
    }
    if (tag4 != undefined && tag4 != "") {
      setTags((oldArray) => [...oldArray, tag4]);
    }
  }

  const selectTag1 = useRef(null);
  const selectTag2 = useRef(null);
  const selectTag3 = useRef(null);
  const selectTag4 = useRef(null);

  function removeTag1() {
    setTag1();
    selectTag1.current.selectedIndex = -1;
  }
  function removeTag2() {
    setTag2();
    selectTag2.current.selectedIndex = -1;
  }
  function removeTag3() {
    setTag3();
    selectTag3.current.selectedIndex = -1;
  }
  function removeTag4() {
    setTag4();
    selectTag4.current.selectedIndex = -1;
  }

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { postTitle, tags, postContent, postCover };

    fetch("https://parentalogi.me/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(post),
    }).then(() => {
      console.log("new post added");
      router.push("/profile");
    });
  };

  const [baseImage, setBaseImage] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    const base64string = await convertBase64String(file);
    setBaseImage(base64);
    setPostCover(base64string);
    console.log(base64string);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const convertBase64String = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        const base64String = fileReader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        resolve(base64String);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
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
                <Link href="/dashboard">
                  <a>
                    <div className="mr-8 flex-none">
                      <img src="/favicon.ico" alt="parentalogi" className="" />
                    </div>
                  </a>
                </Link>
                <h1 className="font-semibold text-2xl">Buat Post</h1>
              </div>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="flex flex-wrap border-2 border-blue-500 p-10 rounded-lg gap-4">
              <div className="w-full self-center">
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Judul Post Baru"
                  className="p-4 w-full"
                />
              </div>
              <div className="w-1/2 self-center flex flex-col gap-4 mb-5">
                <h1>Pilih Tags </h1>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => setTag1(e.target.value)}
                    ref={selectTag1}
                  >
                    <option disabled selected value>
                      -- pilih tag pertama --
                    </option>

                    {tagsExist.map((tag) => {
                      return (
                        <>
                          <option value={tag.id} key={tag.id}>
                            {tag.nama}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <span onClick={removeTag1}>
                    <ImCross />
                  </span>
                </div>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => setTag2(e.target.value)}
                    ref={selectTag2}
                  >
                    <option disabled selected value>
                      -- pilih tag kedua --
                    </option>

                    {tagsExist.map((tag) => {
                      return (
                        <>
                          <option value={tag.id} key={tag.id}>
                            {tag.nama}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <span onClick={removeTag2}>
                    <ImCross />
                  </span>
                </div>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => setTag3(e.target.value)}
                    ref={selectTag3}
                  >
                    <option disabled selected value>
                      -- pilih tag ketiga --
                    </option>

                    {tagsExist.map((tag) => {
                      return (
                        <>
                          <option value={tag.id} key={tag.id}>
                            {tag.nama}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <span onClick={removeTag3}>
                    <ImCross />
                  </span>
                </div>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => setTag4(e.target.value)}
                    ref={selectTag4}
                  >
                    <option disabled selected value>
                      -- pilih tag keempat --
                    </option>

                    {tagsExist.map((tag) => {
                      return (
                        <>
                          <option value={tag.id} key={tag.id}>
                            {tag.nama}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <span onClick={removeTag4}>
                    <ImCross />
                  </span>
                </div>
              </div>
              <div className="w-full self-center">
                <input
                  type="file"
                  // value={postCover}
                  // onChange={(e) => setPostCover(e.target.value)}
                  onChange={(e) => uploadImage(e)}
                />
                <img src={baseImage} alt="cover" height="200px" />
              </div>
              <div className="w-full self-center">
                <Editor
                  name="postContent"
                  onChange={(data) => {
                    setData(data);
                    setPostContent(data);
                  }}
                  editorLoaded={editorLoaded}
                />

                {/* {JSON.stringify(data)} */}
              </div>
              <button
                className="border-blue-500 border-2 rounded-lg py-2 px-4"
                type="submit"
                onClick={combineTags}
              >
                Kirim Post
              </button>
            </div>
          </div>
        </form>
      </section>
      {/* Create post end section */}
    </>
  );
}
