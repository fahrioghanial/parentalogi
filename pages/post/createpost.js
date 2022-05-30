import HeadTitle from "../../components/headTitle";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Editor from "../../components/editor";
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

export default function ProtectedCreatePost() {
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

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`, {
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
      <HeadTitle title="Create Post" />
      {/* Create post section */}
      <section id="create_post" className="font-asap md:px-16">
        <header className="w-full flex items-center pt-10 pl-5 md:pl-0">
          <div className="container">
            <div className="flex items-center justify-between relative">
              <div className="md:flex items-center w-full mr-14 justify-between">
                <div className="flex w-full">
                  <div className="my-auto">
                    <Link href="/dashboard">
                      <a>
                        <div className="mr-5 flex-none hover:border-2 hover:border-blue-500 rounded-full">
                          <img
                            src="/favicon.ico"
                            alt="parentalogi"
                            className=""
                          />
                        </div>
                      </a>
                    </Link>
                  </div>
                  <h1 className="font-semibold text-2xl md:text-3xl">
                    Buat Post
                  </h1>
                </div>
                <div className="my-5">
                  <Link href="/">
                    <a className="py-2 px-3 rounded-xl text-white font-bold md:text-xl bg-blue-500 hover:bg-blue-900 my-auto">
                      Batalkan
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="flex flex-wrap border-2 border-blue-500 md:p-10 p-5 rounded-lg gap-4 mb-20">
                <h1 className="text-xl font-normal m-0">Judul Post</h1>
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
                  <h1 className="text-xl font-normal">Pilih Tags </h1>
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
                      <ImCross color="red" />
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
                      <ImCross color="red" />
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
                      <ImCross color="red" />
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
                      <ImCross color="red" />
                    </span>
                  </div>
                </div>
                {/* input image cover */}
                <div className="w-full self-center">
                  <h1 className="text-xl font-normal">Unggah Cover </h1>
                  <input
                    type="file"
                    className="p-2 rounded-md mb-3 border-2 w-full"
                    accept="image/*"
                    // onChange={(e) => uploadImage(e)}
                    onChange={handleFileChange}
                  />
                  {src && (
                    <div className="flex flex-col gap-2 w-2/3">
                      <ReactCrop
                        crop={crop}
                        onChange={(crop, percentCrop) => setCrop(percentCrop)}
                        aspect={16 / 9}
                      >
                        <img src={src} ref={selectImg} onLoad={onImageLoad} />
                      </ReactCrop>
                      <button
                        className="py-2 px-3 bg-green-500 text-white rounded-lg w-fit"
                        onClick={getCroppedImg}
                      >
                        Potong Cover
                      </button>
                    </div>
                  )}
                  {result && (
                    <div>
                      <p className="text-lg font-normal">Hasil</p>
                      <img src={result} alt="" />
                    </div>
                  )}
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
                </div>
                <button
                  className="border-blue-500 border-2 rounded-lg py-2 px-4 hover:bg-blue-600 hover:text-white"
                  type="submit"
                  onClick={combineTags}
                >
                  Kirim Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* Create post end section */}
    </>
  );
}
