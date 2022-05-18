import HeadTitle from "./headTitle";
import styles from "../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import Editor from "./editor";
import { AiOutlineMenu, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import moment from "moment";
import "moment/locale/id";

export default function Comments({ comments, id_post, username, post_slug }) {
  const [postId, setPostId] = useState(id_post);
  const [isiText, setIsiText] = useState("");
  const [orangtua, setOrangtua] = useState(0);
  const [allComments, setAllComments] = useState([]);

  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile`, {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  const router = useRouter();

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${post_slug}/comments`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllComments(data);
      });
  }, []);

  const rootComments = allComments.filter(
    (allComments) => allComments.orang_tua == 0
  );

  const replyComments = allComments.filter(
    (allComments) => allComments.orang_tua != 0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = { postId, isiText, orangtua };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(comment),
    }).then(() => {
      console.log("new comment added");
      router.reload(window.location.pathname);
    });
  };

  const handleDeleteComment = async (id_comment) => {
    var result = confirm("Hapus Komentar?");
    if (result) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${id_comment}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
        }
      ).then(() => {
        console.log("comment deleted");
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${post_slug}/comments`
        )
          .then((res) => res.json())
          .then((data) => {
            setAllComments(data);
          });
      });
    }
  };

  const [isLike, setIsLike] = useState("");
  const [likeCount, setLikeCount] = useState();

  const handleLikeComment = async (comment_id) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${comment_id}/upvote`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setIsLike(res.message);
        console.log(isLike);
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${post_slug}/comments`
        )
          .then((res) => res.json())
          .then((data) => {
            setAllComments(data);
          });
      });
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
                  className="bg-contain bg-center bg-no-repeat rounded-full w-24 flex-none h-24 mb-2"
                  style={{
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/api/avatar/${user.foto_profil})`,
                  }}
                ></div>
                <div className="w-full">
                  <div className="w-full self-center mb-3">
                    <textarea
                      name=""
                      value={isiText}
                      onChange={(e) => setIsiText(e.target.value)}
                      placeholder="Tulis Komentar"
                      className="p-5 border-[#3980BF] border-2 rounded-xl w-full"
                    ></textarea>
                  </div>
                  <button
                    className="rounded-xl text-[#3980BF] py-2 px-3 font-semibold border-[#3980BF] border-2 hover:bg-blue-700 hover:text-white"
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
                      className="bg-contain bg-center bg-no-repeat rounded-full w-24 flex-none h-24 mb-2"
                      style={{
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/api/avatar/${rootComment.data_penulis.foto_profil})`,
                      }}
                    ></div>
                    <div>
                      <h3 className="font-medium">
                        {rootComment.data_penulis.nama}
                      </h3>
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
                      <div className="flex">
                        <button
                          onClick={() => handleLikeComment(rootComment.id)}
                        >
                          <AiFillHeart
                            className="hover:text-red-600"
                            size="30px"
                          />
                        </button>
                        <p className="text-md  my-auto mr-5 ml-1">
                          {rootComment.jumlah_disukai}{" "}
                        </p>
                        <button className="rounded-xl text-white bg-blue-500  py-2 px-3 font-semibold hover:bg-blue-900">
                          <Link
                            href={{
                              pathname: `/comment/replycomment/${rootComment.id}`,
                            }}
                          >
                            <a>Balas</a>
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                  {rootComment.data_penulis.nama_pengguna == username && (
                    <>
                      <button className="rounded-xl bg-yellow-300 py-2 px-3 font-semibold hover:bg-yellow-600 md:absolute md:right-28 md:bottom-8">
                        <Link
                          href={{
                            pathname: `/comment/editcomment/${rootComment.id}`,
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
                    </>
                  )}
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
                              className="bg-contain bg-center bg-no-repeat rounded-full w-24 flex-none h-24 mb-2"
                              style={{
                                backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/api/avatar/${replyComment.data_penulis.foto_profil})`,
                              }}
                            ></div>
                            <div>
                              <h3 className="font-medium">
                                {replyComment.data_penulis.nama}
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
                              <div className="flex">
                                <button
                                  onClick={() =>
                                    handleLikeComment(replyComment.id)
                                  }
                                >
                                  <AiFillHeart
                                    className="hover:text-red-600"
                                    size="30px"
                                  />
                                </button>
                                <p className="text-md  my-auto mr-5 ml-1">
                                  {replyComment.jumlah_disukai}{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                          {replyComment.data_penulis.nama_pengguna ==
                            username && (
                            <>
                              <button className="rounded-xl bg-yellow-300 py-2 px-3 font-semibold hover:bg-yellow-600 md:absolute md:right-28 md:bottom-8">
                                <Link
                                  href={{
                                    pathname: `/comment/editcomment/${replyComment.id}`,
                                  }}
                                >
                                  <a>Edit</a>
                                </Link>
                              </button>
                              <button
                                className="rounded-xl text-white bg-red-600 py-2 px-3 font-semibold hover:bg-red-900 md:absolute md:right-8 md:bottom-8"
                                onClick={() =>
                                  handleDeleteComment(replyComment.id)
                                }
                              >
                                Hapus
                              </button>
                            </>
                          )}
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
