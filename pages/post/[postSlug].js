import HeadTitle from "../../components/headTitle";
import styles from "../../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Image from "next/image";
import { AiOutlineMenu, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { FaBirthdayCake } from "react-icons/fa";
import { GiSuitcase } from "react-icons/gi";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import moment from "moment";
import "moment/locale/id";
import Comments from "../../components/comments";
import parse from "html-react-parser";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/`);
  const data = await res.json();
  const paths = data.map((post) => {
    return {
      params: {
        postSlug: `${post.slug}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${params.postSlug}`
  );
  const data = await res.json();
  return {
    props: {
      post: data,
    },
    revalidate: 10,
  };
}

const EmailPasswordAuthNoSSR = dynamic(
  new Promise((res) => res(EmailPassword.EmailPasswordAuth)),
  { ssr: false }
);

export default function PostProtected({ post }) {
  return (
    <EmailPasswordAuthNoSSR>
      <Post post={post} />
    </EmailPasswordAuthNoSSR>
  );
}

function Post({ post }) {
  async function daftarClicked() {
    redirectToAuth("signup");
  }

  const [user, setUser] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile`, {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/reading-list`)
      .then((res) => res.json())
      .then((data) => {
        {
          data.map((rl) => {
            if (rl.id_post == post.id) {
              setIsSaved(true);
            }
          });
        }
      });
  }, []);

  const [isLike, setIsLike] = useState("");
  const [likeCount, setLikeCount] = useState();

  const handleLikePost = async (post_slug) => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${post_slug}/like`,
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
        // console.log("comment deleted");
        setIsLike(res.message);
        console.log(isLike);
        // router.reload(window.location.pathname);
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${post_slug}`)
          .then((res) => res.json())
          .then((data) => {
            setLikeCount(data.jumlah_disukai);
          });
      });
  };

  const handleReadingList = async (post_slug) => {
    if (isSaved) {
      setIsSaved(false);
    }
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${post_slug}/save`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/reading-list`)
          .then((res) => res.json())
          .then((data) => {
            {
              data.map((rl) => {
                if (rl.id_post == post.id) {
                  setIsSaved(true);
                }
              });
            }
          });
      });
  };

  return (
    <>
      <HeadTitle />
      <Navbar />

      {/* Post section start */}
      <section id="post" className="pt-32 font-asap bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row md:gap-2">
            <div className="md:ml-8 flex md:flex-col justify-center md:justify-start">
              <button onClick={() => handleLikePost(post.slug)}>
                <AiFillHeart
                  className="mb-2 hover:text-red-600 md:mx-auto"
                  color={
                    isLike.includes("disliking") || isLike == "" ? "" : "red"
                  }
                  size="50px"
                />
              </button>
              <p className="text-lg mb-4 text-center md:mx-auto my-auto md:my-0">
                {likeCount == null ? post.jumlah_disukai : likeCount}
              </p>
              <div className="my-4"></div>
              <button onClick={() => handleReadingList(post.slug)}>
                <BsFillBookmarkFill
                  className="mb-2 hover:text-orange-600 md:mx-auto"
                  color={isSaved == false ? "" : "orange"}
                  size="50px"
                />
              </button>
              <p className="text-lg mb-4 text-center md:mx-auto my-auto md:my-0">
                {isSaved == false ? "Simpan Post?" : "Post Tersimpan!"}
              </p>
            </div>
            <div className="w-full px-4">
              <div className="rounded-t-xl shadow-lg overflow-hidden">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cover/${post.foto_cover}`}
                  alt=""
                  className="w-full"
                />
              </div>
              <div className="rounded-b-xl shadow-lg overflow-hidden mb-10">
                <div className="py-8 px-6 bg-[#3980BF] text-white">
                  <div className="lg:flex lg:gap-x-4">
                    <div
                      className="bg-contain bg-center bg-no-repeat rounded-full w-24 flex-none h-24 mb-2"
                      style={{
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/api/avatar/${user.foto_profil})`,
                      }}
                    ></div>
                    <div>
                      <h3 className="font-medium">{post.user.nama}</h3>
                      <small>
                        {moment(post.createdAt).format("LLL")}
                        {/* ({moment(post.createdAt).fromNow()}) */}
                        {post.telah_diubah
                          ? " (Diubah pada " +
                            moment(post.updatedAt).format("ll") +
                            ")"
                          : ""}
                      </small>
                      <h1 className="font-bold text-base my-2 md:text-2xl">
                        {post.judul}
                      </h1>
                      <div className="flex gap-x-1 mb-4 ">
                        {post.tags?.map((tag) => {
                          return (
                            <a href="" key={tag.id}>
                              #{tag.nama}
                            </a>
                          );
                        })}
                      </div>
                      <p className="font-medium text-base my-2 md:text-lg">
                        {parse(post.isi_text)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Post section end */}
      <Comments
        comments={post.comments}
        id_post={post.id}
        username={user.nama_pengguna}
        post_slug={post.slug}
      ></Comments>
      <Footer />
    </>
  );
}
