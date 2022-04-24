import HeadTitle from "../components/headTitle";
import styles from "../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Editor from "../components/editor";
import { comment } from "postcss";
import { getComments as getCommentsApi } from "../data/comments";

export default function Comments() {
  const [backendComments, setBackendComments] = useState([]);
  const rootComments = backendComments.filter(
    (backendComments) => backendComments.parentId === null
  );
  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  // const backgroundImage = (foto) => {
  //   document.getElementById("foto").style.backgroundImage = foto;
  // };

  return (
    <>
      <HeadTitle />
      {/* comment section */}
      <section id="create_post" className="pt-10 font-asap md:px-16">
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center px-4 md:px-16 ">
              <h1 className="font-semibold text-3xl">Diskusi</h1>
            </div>
          </div>
        </div>

        <form>
          <div className="rounded-xl shadow-lg overflow-hidden my-10">
            <div className="py-8 px-6">
              <div className="lg:flex lg:gap-x-4">
                <div
                  className="bg-contain bg-center bg-no-repeat rounded-full w-20 flex-none h-20 mb-2"
                  style={{
                    backgroundImage: `url("https://api.himatif.org/data/assets/foto/2019/25.jpg")`,
                  }}
                ></div>
                <div>
                  <div className="w-full self-center mb-3">
                    <textarea
                      name=""
                      id=""
                      cols="100"
                      rows=""
                      placeholder="Tulis Komentar"
                      className="p-5 border-[#3980BF] border-2 rounded-xl"
                    ></textarea>
                  </div>
                  <button
                    className="rounded-xl text-[#3980BF] py-2 px-3 font-semibold border-[#3980BF] border-2"
                    type="submit"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {rootComments.map((rootComment) => (
          <div
            className="rounded-xl shadow-lg overflow-hidden my-10"
            key={rootComment.id}
          >
            <div className="py-8 px-6">
              <div className="lg:flex lg:gap-x-4">
                <div
                  className="bg-contain bg-center bg-no-repeat rounded-full w-20 flex-none h-20 mb-2"
                  style={{
                    backgroundImage: `url(${rootComment.img})`,
                  }}
                ></div>
                <div>
                  <h3 className="font-medium">{rootComment.username}</h3>
                  <small>{rootComment.createdAt}</small>
                  <h1 className="font-bold text-base my-2 md:text-2xl">
                    {rootComment.body}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      {/* comment end section */}
    </>
  );
}
