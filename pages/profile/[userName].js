import HeadTitle from "../../components/headTitle";
import styles from "../../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { FaBirthdayCake } from "react-icons/fa";
import { GiSuitcase } from "react-icons/gi";
import Link from "next/link";
import moment from "moment";
import "moment/locale/id";

// export async function getStaticProps() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/followed-users`
//   );
//   const followedUsers = await res.json();

//   return {
//     props: {
//       followedUsers,
//     },
//     revalidate: 10,
//   };
// }

export default function Profile() {
  async function daftarClicked() {
    redirectToAuth("signup");
  }

  const router = useRouter();
  const dataUserFromQuery = router.query;

  const [user, setUser] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${dataUserFromQuery.userName}`,
      {
        credentials: "same-origin",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/followed-users`)
      .then((res) => res.json())
      .then((data) => {
        {
          data.map((d) => {
            if (d.nama_pengguna == dataUserFromQuery.userName) {
              setIsFollow(true);
            }
          });
        }
      });
  }, []);

  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`)
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data);
      });
  }, []);

  const posts = allPosts.filter(
    (allPosts) => allPosts.user.nama_pengguna == user.nama_pengguna
  );

  const handleFollow = async (username) => {
    if (isFollow) {
      setIsFollow(false);
    }
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${username}/follow`,
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
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${username}`, {
          credentials: "same-origin",
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
          });
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/followed-users`)
          .then((res) => res.json())
          .then((data) => {
            {
              data.map((d) => {
                if (d.nama_pengguna == username) {
                  setIsFollow(true);
                }
              });
            }
          });
      });
  };

  return (
    <>
      <HeadTitle title="Profile" />
      <Navbar />

      {/* Profile section start */}
      <section id="profile" className="pt-32 font-asap bg-white">
        <div className="container">
          <div className="flex flex-wrap justify-center mb-4">
            <Image
              src="/dummy.png"
              alt="parentalogi"
              className="py-2 md:p-0"
              width="150px"
              height="150px"
            />
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="w-full self-top md:w-4/5 px-5 ">
              <div className="rounded-xl shadow-lg overflow-hidden mb-10">
                <div className="py-6 px-6 bg-[#3980BF] text-white flex flex-col gap-2 justify-center">
                  <div className="m-auto">
                    <button
                      className={
                        isFollow == true
                          ? "text-white font-semibold py-2 hover:bg-red-900 bg-red-600 rounded-lg px-3"
                          : "text-[#3980BF] font-semibold py-2 hover:bg-blue-800 hover:text-white bg-white rounded-lg px-3"
                      }
                      onClick={() => handleFollow(user.nama_pengguna)}
                    >
                      {isFollow == true ? "Berhenti Mengikuti" : "Ikuti"}
                    </button>
                  </div>
                  <div className="text-center mb-2 px-10">
                    <div></div>
                    <p className="text-3xl font-bold mb-2">{user.nama}</p>
                    <p className="text-lg mb-2">@{user.nama_pengguna}</p>
                    <p className="text-lg">{user.bio}</p>
                  </div>
                  <div className="inline text-center mb-2 px-10">
                    <GoLocation className="inline" size="20px" />
                    <a className="text-md ml-2 mb-2 mr-6">{user.domisili}</a>
                    <FaBirthdayCake className="inline" size="20px" />
                    <a className="text-md ml-2 mb-2 mr-6">
                      {user.tanggal_lahir}
                    </a>
                    <GiSuitcase className="inline" size="30px" />
                    <a className="text-md ml-2 mb-2 mr-6">{user.pekerjaan}</a>
                  </div>
                  <hr />
                  <div className="flex text-center px-10 justify-center">
                    <div className="text-lg w-24 h-14">
                      <p className="mb-1 font-bold">Postingan</p>
                      <p className="underline">{posts.length}</p>
                    </div>
                    <div className="text-lg w-24 h-14">
                      <p className="mb-1 font-bold">Mengikuti</p>
                      <p className="underline">{user.following}</p>
                    </div>
                    <div className="text-lg w-24 h-14">
                      <p className="mb-1 font-bold">Diikuti</p>
                      <p className="underline">{user.followedBy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full text-center mb-2 font-bold text-xl md:text-3xl">
              <h1>Postingan {user.nama}</h1>
            </div>
            {posts.map((post) => {
              return (
                <div
                  className="rounded-xl shadow-lg overflow-hidden mb-10 w-full md:w-4/5"
                  key={post.id}
                >
                  <div className="py-8 px-6 bg-[#3980BF] text-white relative">
                    <div className="lg:flex lg:gap-x-4">
                      <div className="bg-[url('/test.png')] bg-center rounded-full w-20 flex-none h-20 mb-2"></div>
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
                        <h1 className="font-bold text-base my-2 md:text-2xl hover:">
                          <Link
                            href={{
                              pathname: `/post/${post.slug}`,
                            }}
                          >
                            <a className="font-bold text-base my-2 md:text-2xl hover:text-black">
                              {post.judul}
                            </a>
                          </Link>
                        </h1>
                        <div className="flex gap-x-1 mb-4 ">
                          {post.tags.map((tag) => {
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

                        <div className="flex flex-col">
                          <div className="flex gap-x-10 mb-4 md:m-0">
                            <div className="flex gap-x-2">
                              <svg
                                width="26"
                                height="24"
                                viewBox="0 0 26 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M25.041 5.30861C24.6483 4.39935 24.0821 3.57538 23.374 2.88283C22.6654 2.18822 21.83 1.63622 20.9131 1.25686C19.9623 0.861914 18.9426 0.65976 17.9131 0.66213C16.4688 0.66213 15.0596 1.05764 13.835 1.80471C13.542 1.98342 13.2637 2.17971 13 2.39358C12.7363 2.17971 12.458 1.98342 12.165 1.80471C10.9404 1.05764 9.53125 0.66213 8.08691 0.66213C7.04687 0.66213 6.03906 0.861349 5.08691 1.25686C4.16699 1.63772 3.33789 2.18557 2.62598 2.88283C1.91698 3.5746 1.35062 4.39876 0.958984 5.30861C0.551758 6.2549 0.34375 7.25979 0.34375 8.29397C0.34375 9.26955 0.542969 10.2862 0.938477 11.3203C1.26953 12.1846 1.74414 13.0811 2.35059 13.9863C3.31152 15.419 4.63281 16.9131 6.27344 18.4278C8.99219 20.9385 11.6846 22.6729 11.7988 22.7432L12.4932 23.1885C12.8008 23.3848 13.1963 23.3848 13.5039 23.1885L14.1982 22.7432C14.3125 22.6699 17.002 20.9385 19.7236 18.4278C21.3643 16.9131 22.6855 15.419 23.6465 13.9863C24.2529 13.0811 24.7305 12.1846 25.0586 11.3203C25.4541 10.2862 25.6533 9.26955 25.6533 8.29397C25.6562 7.25979 25.4482 6.2549 25.041 5.30861Z"
                                  fill="white"
                                />
                              </svg>
                              <small>{post.jumlah_disukai} Disukai </small>
                            </div>
                          </div>
                          {/* <a
                            href=""
                            className="md:right-10 md:bottom-10 md:absolute bg-white rounded-xl text-[#3980BF] py-2 px-3 font-semibold mx-auto"
                          >
                            Simpan
                          </a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Profile section end */}
      <Footer />
    </>
  );
}
