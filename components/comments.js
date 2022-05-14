import HeadTitle from "./headTitle";
import styles from "../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import Editor from "./editor";
import { comment } from "postcss";
import { getComments as getCommentsApi } from "../data/comments";
import Link from "next/link";
import moment from "moment";
import "moment/locale/id";

export default function Comments({ comments, id_post, user_id }) {
  const [postId, setPostId] = useState(id_post);
  const [isiText, setIsiText] = useState("");
  const [orangtua, setOrangtua] = useState(0);
  const router = useRouter();

  useEffect(() => {}, []);

  const rootComments = comments.filter((comments) => comments.orang_tua == 0);

  const replyComments = comments.filter((comments) => comments.orang_tua != 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = { postId, isiText, orangtua };

    fetch("https://parentalogi.me/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(comment),
    }).then(() => {
      console.log("new comment added");
    });

    router.reload(window.location.pathname);
  };

  const handleDeleteComment = async (id_comment) => {
    var result = confirm("Hapus Komentar?");
    if (result) {
      fetch(`https://parentalogi.me/api/comments/${id_comment}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      }).then(() => {
        console.log("comment deleted");
      });
      router.reload(window.location.pathname);
    }
  };

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

        <form onSubmit={handleSubmit}>
          <div className="rounded-xl shadow-lg overflow-hidden my-10">
            <div className="py-8 px-6">
              <div className="lg:flex lg:gap-x-4">
                <div
                  className="bg-contain bg-center bg-no-repeat rounded-full w-20 flex-none h-20 mb-2"
                  style={{
                    backgroundImage: `url("https://api.himatif.org/data/assets/foto/2019/25.jpg")`,
                  }}
                ></div>
                <div className="w-full">
                  <div className="w-full self-center mb-3">
                    <textarea
                      name=""
                      // cols="100"
                      value={isiText}
                      onChange={(e) => setIsiText(e.target.value)}
                      placeholder="Tulis Komentar"
                      className="p-5 border-[#3980BF] border-2 rounded-xl w-full"
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

        {rootComments.map((rootComment) => {
          return (
            <div key={rootComment.id}>
              <div className="rounded-xl shadow-lg overflow-hidden mt-10">
                <div className="py-8 px-6 relative flex flex-col">
                  <div className="lg:flex lg:gap-x-4">
                    <div
                      className="bg-contain bg-center bg-no-repeat rounded-full w-20 flex-none h-20 mb-2"
                      // style={{
                      //   backgroundImage: `url(${rootComment.img})`,
                      // }}
                    ></div>
                    <div>
                      <h3 className="font-medium">{rootComment.id_penulis}</h3>
                      <small>
                        {moment(rootComment.createdAt).format("LLL")}
                        {/* ({moment(rootComment.createdAt).fromNow()}) */}
                        {rootComment.telah_diubah
                          ? " (Diubah pada " +
                            moment(rootComment.updatedAt).format("ll") +
                            ")"
                          : ""}
                      </small>
                      <h1 className=" text-base my-2 md:text-xl">
                        {rootComment.isi_text}
                      </h1>
                    </div>
                  </div>
                  {/* {rootComment.id_penulis == user_id && ( */}
                  {/* <> */}
                  <button className="rounded-xl bg-yellow-300 py-2 px-3 font-semibold hover:bg-yellow-600 md:absolute md:right-28 md:bottom-8">
                    <Link
                      href={{
                        pathname: `/editcomment/${rootComment.id}`,
                      }}
                    >
                      <a>Edit</a>
                    </Link>
                  </button>
                  <button
                    className="rounded-xl text-white bg-red-600 py-2 px-3 font-semibold hover:bg-red-900 md:absolute md:right-8 md:bottom-8"
                    onClick={() => handleDeleteComment(rootComment.id)}
                  >
                    Hapus
                  </button>
                  {/* </> */}
                  {/* )} */}
                </div>
              </div>
              {replyComments.map((replyComment) => {
                return (
                  <div key={replyComment.id}>
                    {replyComment.orang_tua == rootComment.id && (
                      <div className="rounded-xl shadow-lg overflow-hidden ml-20">
                        <div className="py-8 px-6 relative flex flex-col">
                          <div className="lg:flex lg:gap-x-4">
                            <div
                              className="bg-contain bg-center bg-no-repeat rounded-full w-20 flex-none h-20 mb-2"
                              // style={{
                              //   backgroundImage: `url(${replyComment.img})`,
                              // }}
                            ></div>
                            <div>
                              <h3 className="font-medium">
                                {replyComment.id_penulis}
                              </h3>
                              <small>
                                {moment(replyComment.createdAt).format("LLL")}
                                {/* ({moment(replyComment.createdAt).fromNow()}) */}
                                {replyComment.telah_diubah
                                  ? " (Diubah pada " +
                                    moment(replyComment.updatedAt).format(
                                      "ll"
                                    ) +
                                    ")"
                                  : ""}
                              </small>
                              <h1 className=" text-base my-2 md:text-xl">
                                {replyComment.isi_text}
                              </h1>
                            </div>
                          </div>
                          <button className="rounded-xl bg-yellow-300 py-2 px-3 font-semibold hover:bg-yellow-600 md:absolute md:right-28 md:bottom-8">
                            <Link
                              href={{
                                pathname: `/editcomment/${replyComment.id}`,
                              }}
                            >
                              <a>Edit</a>
                            </Link>
                          </button>
                          <button
                            className="rounded-xl text-white bg-red-600 py-2 px-3 font-semibold hover:bg-red-900 md:absolute md:right-8 md:bottom-8"
                            onClick={() => handleDeleteComment(replyComment.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
      {/* comment end section */}
    </>
  );
}
