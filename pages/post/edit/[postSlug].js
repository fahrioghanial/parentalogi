import HeadTitle from "../../../components/headTitle";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Editor from "../../../components/editor";
import Link from "next/link";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";
import { ImCross } from "react-icons/im";
import imageCompression from "browser-image-compression";
import ReactCrop from "react-image-crop";
import { makeAspectCrop, centerCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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
  const [postCoverOld, setPostCoverOld] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [oldTags, setOldTags] = useState([]);

  let tag1 = null;
  let tag2 = null;
  let tag3 = null;
  let tag4 = null;

  const [tagsExist, setTagsExist] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tags`)
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
    tag1 = null;
    selectTag1.current.selectedIndex = -1;
  }
  function removeTag2() {
    tag2 = null;
    selectTag2.current.selectedIndex = -1;
  }
  function removeTag3() {
    tag3 = null;
    selectTag3.current.selectedIndex = -1;
  }
  function removeTag4() {
    tag4 = null;
    selectTag4.current.selectedIndex = -1;
  }

  const router = useRouter();
  const temp = router.query;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${temp.postSlug}`, {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        setPostContent(data.isi_text);
        setPostCoverOld(data.foto_cover);
        setPostTitle(data.judul);
        {
          data.tags.map((t) => {
            setOldTags((oldArray) => [...oldArray, t.id]);
          });
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postCover == "") {
      convertFromUrlToBase64String(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cover/${postCoverOld}`,
        function (dataUrl) {
          console.log("RESULT:", dataUrl);
          let postCover = dataUrl;
          const post = { postTitle, tags, postContent, postCover };
          fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${temp.postSlug}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "same-origin",
              body: JSON.stringify(post),
            }
          ).then(() => {
            console.log("post edited");
            router.push("/profile");
          });
        }
      );
    } else {
      const post = { postTitle, tags, postContent, postCover };
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${temp.postSlug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify(post),
        }
      ).then(() => {
        console.log("post edited");
        router.push("/profile");
      });
    }
  };

  // const [baseImage, setBaseImage] = useState("");

  // const uploadImage = async (e) => {
  //   const file = e.target.files[0];
  //   console.log("originalFile instanceof Blob", file instanceof Blob); // true
  //   console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

  //   const options = {
  //     maxSizeMB: 1,
  //     maxWidthOrHeight: 1920,
  //     useWebWorker: true,
  //   };

  //   const compressedFile = await imageCompression(file, options);
  //   console.log(
  //     "compressedFile instanceof Blob",
  //     compressedFile instanceof Blob
  //   ); // true
  //   console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

  //   const base64 = await convertBase64(compressedFile);
  //   const base64string = await convertBase64String(compressedFile);
  //   setBaseImage(base64);
  //   setPostCover(base64string);
  //   console.log(base64string);
  // };

  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  // const convertBase64String = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       const base64String = fileReader.result
  //         .replace("data:", "")
  //         .replace(/^.+,/, "");
  //       resolve(base64String);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  function convertFromUrlToBase64String(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result.replace("data:", "").replace(/^.+,/, ""));
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  const [src, selectFile] = useState(null);

  const handleFileChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]));
  };

  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [result, setResult] = useState(null);

  function getCroppedImg(e) {
    e.preventDefault();
    const canvas = document.createElement("canvas");
    const scaleX = selectImg.current.naturalWidth / selectImg.current.width;
    const scaleY = selectImg.current.naturalHeight / selectImg.current.height;
    canvas.width = (crop.width * selectImg.current.width) / 100;
    canvas.height = (crop.height * selectImg.current.height) / 100;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      selectImg.current,
      ((crop.x * selectImg.current.width) / 100) * scaleX,
      ((crop.y * selectImg.current.height) / 100) * scaleY,
      ((crop.width * selectImg.current.width) / 100) * scaleX,
      ((crop.height * selectImg.current.height) / 100) * scaleY,
      0,
      0,
      (crop.width * selectImg.current.width) / 100,
      (crop.height * selectImg.current.height) / 100
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    const base64ImageString = canvas
      .toDataURL("image/jpeg")
      .replace("data:", "")
      .replace(/^.+,/, "");

    setResult(base64Image);
    setPostCover(base64ImageString);
  }

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;

    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: "%",
          width: 90,
        },
        16 / 9,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  }

  const selectImg = useRef(null);

  return (
    <>
      <HeadTitle title="Edit post" />
      {/* Edit post section */}
      <section id="create_post" className="font-asap md:px-16">
        <header className="absolute w-full pt-14 flex items-center">
          <div className="container">
            <div className="flex items-center justify-between relative">
              <div className="flex items-center px-4 md:px-16 ">
                <Link href="/dashboard">
                  <a>
                    <div className="mr-8 flex-none hover:border-2 hover:border-blue-600 rounded-full">
                      <img src="/favicon.ico" alt="parentalogi" className="" />
                    </div>
                  </a>
                </Link>
                <h1 className="font-semibold text-2xl">Edit Post</h1>
              </div>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="container pt-32">
            <div className="flex flex-wrap border-2 border-blue-500 p-10 rounded-lg gap-4">
              <h1 className="text-xl font-normal m-0">Judul Post</h1>
              {/* Input title */}
              <div className="w-full self-center">
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Judul Post Baru"
                  className="p-4 w-full"
                />
              </div>
              {/* Input Tag */}
              <div className="w-1/2 self-center flex flex-col gap-4">
                <h1 className="text-xl font-normal m-0">Pilih Tags </h1>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => (tag1 = e.target.value)}
                    ref={selectTag1}
                  >
                    <option
                      disabled
                      selected={oldTags.length > 0 ? false : true}
                    >
                      -- pilih tag pertama --
                    </option>

                    {tagsExist.map((tag) => {
                      if (oldTags[0] == tag.id) {
                        tag1 = oldTags[0];
                      }

                      return (
                        <>
                          <option
                            value={tag.id}
                            selected={oldTags[0] == tag.id ? true : false}
                            key={tag.id}
                          >
                            {tag.nama}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <span onClick={removeTag1}>
                    <ImCross color="red" />
                  </span>
                </div>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => (tag2 = e.target.value)}
                    ref={selectTag2}
                  >
                    <option
                      disabled
                      selected={oldTags.length > 1 ? false : true}
                    >
                      -- pilih tag kedua --
                    </option>

                    {tagsExist.map((tag) => {
                      if (oldTags[1] == tag.id) {
                        tag2 = oldTags[1];
                      }
                      return (
                        <>
                          <option
                            value={tag.id}
                            selected={oldTags[1] == tag.id ? true : false}
                            key={tag.id}
                          >
                            {tag.nama}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <span onClick={removeTag2}>
                    <ImCross color="red" />
                  </span>
                </div>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => (tag3 = e.target.value)}
                    ref={selectTag3}
                  >
                    <option
                      disabled
                      selected={oldTags.length > 2 ? false : true}
                    >
                      -- pilih tag ketiga --
                    </option>

                    {tagsExist.map((tag) => {
                      if (oldTags[2] == tag.id) {
                        tag3 = oldTags[2];
                      }
                      return (
                        <>
                          <option
                            value={tag.id}
                            selected={oldTags[2] == tag.id ? true : false}
                            key={tag.id}
                          >
                            {tag.nama}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <span onClick={removeTag3}>
                    <ImCross color="red" />
                  </span>
                </div>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => (tag4 = e.target.value)}
                    ref={selectTag4}
                  >
                    <option
                      disabled
                      selected={oldTags.length > 3 ? false : true}
                    >
                      -- pilih tag keempat --
                    </option>

                    {tagsExist.map((tag) => {
                      if (oldTags[3] == tag.id) {
                        tag4 = oldTags[3];
                      }
                      return (
                        <>
                          <option
                            value={tag.id}
                            selected={oldTags[3] == tag.id ? true : false}
                            key={tag.id}
                          >
                            {tag.nama}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <span onClick={removeTag4}>
                    <ImCross color="red" />
                  </span>
                </div>
              </div>
              {/* Input cover */}
              <div className="w-full self-center">
                <h1 className="text-xl font-normal m-0">Unggah Cover </h1>
                <input
                  type="file"
                  className="p-2 rounded-md mb-3 border-2 w-full"
                  accept="image/*"
                  // onChange={(e) => uploadImage(e)}
                  onChange={handleFileChange}
                />
                {src && (
                  <div className="flex flex-col gap-2">
                    <div className="w-fit">
                      <ReactCrop
                        crop={crop}
                        onChange={(crop, percentCrop) => setCrop(percentCrop)}
                        aspect={16 / 9}
                      >
                        <img src={src} ref={selectImg} onLoad={onImageLoad} />
                      </ReactCrop>
                    </div>
                    <button
                      className="py-2 px-3 bg-green-500 text-white rounded-lg w-fit"
                      onClick={getCroppedImg}
                    >
                      Potong Cover
                    </button>
                  </div>
                )}

                <div>
                  <p className="text-lg font-normal">Hasil</p>
                  <img
                    src={
                      result == null
                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cover/${postCoverOld}`
                        : result
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full self-center">
                <Editor
                  name="postContent"
                  value={postContent}
                  onChange={(data) => {
                    setData(data);
                    setPostContent(data);
                  }}
                  editorLoaded={editorLoaded}
                />
              </div>
              <button
                className="border-blue-500 border-2 rounded-lg py-2 px-4 hover:bg-blue-900 hover:text-white"
                type="submit"
                onClick={combineTags}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </form>
      </section>
      {/* Edit post end section */}
    </>
  );
}
