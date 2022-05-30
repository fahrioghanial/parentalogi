import HeadTitle from "../../components/headTitle";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Heading from "../../components/heading";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import moment from "moment";
import "moment/locale/id";
import Comments from "../../components/comments";
import parse from "html-react-parser";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";
import Link from "next/link";

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
    fallback: true,
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
    revalidate: 1,
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
  const router = useRouter();
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

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/liked-posts`)
      .then((res) => res.json())
      .then((data) => {
        {
          data.map((rl) => {
            if (rl.id_post == post.id) {
              setIsLiked(true);
            }
          });
        }
      });
  }, []);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState();

  const handleLikePost = async (post_slug) => {
    if (isLiked) {
      setIsLiked(false);
    }
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
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/liked-posts`)
          .then((res) => res.json())
          .then((data) => {
            {
              data.map((rl) => {
                if (rl.id_post == post.id) {
                  setIsLiked(true);
                }
              });
            }
          });
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

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const handleDeletePost = async (id_post) => {
    var result = confirm("Hapus Postingan?");
    if (result) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/${id_post}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      }).then(() => {
        router.push("/profile");
      });
    }
  };

  return (
    <>
      <HeadTitle />
      <Heading />

      {/* Post section start */}
      <section id="post" className="pt-32 font-asap bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row md:gap-2">
            <div className="md:ml-8 flex md:flex-col justify-center md:justify-start">
              <button onClick={() => handleLikePost(post.slug)}>
                <AiFillHeart
                  className="mb-2 hover:text-red-600 md:mx-auto"
                  color={isLiked ? "red" : ""}
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
                  color={isSaved ? "orange" : ""}
                  size="50px"
                />
              </button>
              <p className="text-lg mb-4 text-center md:mx-auto my-auto md:my-0">
                {isSaved ? "Post Tersimpan!" : "Simpan Post?"}
              </p>
              <div
                className={`flex md:flex-col gap-3 ${
                  post?.user?.nama_pengguna == user?.nama_pengguna
                    ? "visible"
                    : "hidden"
                } my-auto ml-5 md:m-0 md:mt-5`}
              >
                <button className="rounded-xl bg-yellow-300 text-black py-2 px-3 font-semibold hover:bg-yellow-600">
                  <Link
                    href={{
                      pathname: `/post/edit/${post.slug}`,
                    }}
                  >
                    <a>Edit</a>
                  </Link>
                </button>
                <button
                  className="rounded-xl text-white bg-red-600 py-2 px-3 font-semibold hover:bg-red-900 "
                  onClick={() => handleDeletePost(post.slug)}
                >
                  Hapus
                </button>
              </div>
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
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/api/avatar/${post?.user?.foto_profil})`,
                      }}
                    ></div>
                    <div>
                      <h3 className="font-medium m-0">{post.user.nama}</h3>
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
                            <Link
                              href={{
                                pathname: `/tag/${tag.nama}`,
                              }}
                              key={tag.id}
                            >
                              <a className="hover:text-black">#{tag.nama}</a>
                            </Link>
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
