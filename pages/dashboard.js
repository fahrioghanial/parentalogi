import React from "react";
import styles from "../styles/Home.module.css";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";
import supertokensNode from "supertokens-node";
import { backendConfig } from "../config/backendConfig";
import Session from "supertokens-node/recipe/session";
import HeadTitle from "../components/headTitle";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import "moment/locale/id";
import Link from "next/link";

const EmailPasswordAuthNoSSR = dynamic(
  new Promise((res) => res(EmailPassword.EmailPasswordAuth)),
  { ssr: false }
);

// export async function getServerSideProps(context) {
//   // this runs on the backend, so we must call init on supertokens-node SDK
//   supertokensNode.init(backendConfig());
//   let session;
//   try {
//     session = await Session.getSession(context.req, context.res);
//   } catch (err) {
//     if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
//       return { props: { fromSupertokens: "needs-refresh" } };
//     } else if (err.type === Session.Error.UNAUTHORISED) {
//       return { props: {} };
//     } else {
//       throw err;
//     }
//   }

//   return {
//     props: { userId: session.getUserId() },
//   };
// }

export async function getStaticProps() {
  const res = await fetch("https://icvmdev.duckdns.org/api/posts/");
  const posts = await res.json();
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Dashboard({ posts }) {
  return (
    <EmailPasswordAuthNoSSR>
      <DashboardPage posts={posts} />
    </EmailPasswordAuthNoSSR>
  );
}

function DashboardPage({ posts }) {
  // console.log(posts);
  // posts = data;
  // async function fetchUserData() {
  //   const res = await fetch("/api/user");
  //   if (res.status === 200) {
  //     const json = await res.json();
  //     alert(JSON.stringify(json));
  //   }
  // }

  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   fetch("https://icvmdev.duckdns.org/api/posts/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPosts(data);
  //     });
  // }, []);

  return (
    <>
      <HeadTitle />
      <Navbar />
      {/* Dashboard section start */}
      <section id="dashboard" className="pt-32 font-asap ">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full self-top md:w-1/5 px-5 md:pl-10">
              <div className="rounded-xl shadow-lg overflow-hidden mb-10">
                <div className="py-8 px-6 bg-[#3980BF] text-white flex flex-col gap-2">
                  <a className="font-medium">Beranda</a>
                  <a className="font-medium">Daftar Bacaan</a>
                  <a className="font-medium">Tag</a>
                  <a className="font-medium">Tentang Kami</a>
                  <a className="font-medium">Kontak Kami</a>
                </div>
              </div>
            </div>
            <div className="w-full self-center px-5 md:w-4/5 md:px-0">
              <div className="flex mb-5 gap-10">
                <a className="md:text-2xl font-semibold text-[#3980BF]">
                  Paling Relevan
                </a>
                <a className="md:text-2xl font-semibold text-[#3980BF]">
                  Terbaru
                </a>
                <a className="md:text-2xl font-semibold text-[#3980BF]">
                  Terpopuler
                </a>
              </div>

              {/* card */}

              {posts.map((post) => {
                return (
                  <div
                    className="rounded-xl shadow-lg overflow-hidden mb-10"
                    key={post.id}
                  >
                    <div className="py-8 px-6 bg-[#3980BF] text-white">
                      <div className="lg:flex lg:gap-x-4">
                        <div className="bg-[url('/test.png')] bg-center rounded-full w-20 flex-none h-20 mb-2"></div>
                        <div>
                          <h3 className="font-medium">
                            Oleh: {post.user.nama}
                          </h3>
                          <small>
                            Dibuat tanggal: {moment(post.createdAt).fromNow()}
                          </small>
                          <h1 className="font-bold text-base my-2 md:text-2xl">
                            <Link href={`/post/${post.slug}`}>
                              {post.judul}
                            </Link>
                          </h1>
                          <div className="flex gap-x-1 mb-4 ">
                            {post.tags.map((tag) => {
                              return (
                                <a href="" key={tag.id}>
                                  #{tag.nama}
                                </a>
                              );
                            })}
                          </div>

                          <div className="flex flex-col relative">
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
                              <div className="flex gap-x-2">
                                <svg
                                  width="26"
                                  height="25"
                                  viewBox="0 0 26 25"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.01375 18.5625H21.4375C21.9348 18.5625 22.4117 18.365 22.7633 18.0133C23.115 17.6617 23.3125 17.1848 23.3125 16.6875V4.5C23.3125 4.00272 23.115 3.52581 22.7633 3.17417C22.4117 2.82254 21.9348 2.625 21.4375 2.625H4.5625C4.06522 2.625 3.58831 2.82254 3.23667 3.17417C2.88504 3.52581 2.6875 4.00272 2.6875 4.5V21.225L6.01375 18.5625ZM6.67188 20.4375L2.335 23.9062C2.19715 24.0163 2.03104 24.0853 1.85575 24.1052C1.68047 24.1251 1.50313 24.0951 1.34411 24.0187C1.18509 23.9424 1.05085 23.8227 0.95681 23.6734C0.862771 23.5242 0.812751 23.3514 0.8125 23.175V4.5C0.8125 3.50544 1.20759 2.55161 1.91085 1.84835C2.61411 1.14509 3.56794 0.75 4.5625 0.75H21.4375C22.4321 0.75 23.3859 1.14509 24.0891 1.84835C24.7924 2.55161 25.1875 3.50544 25.1875 4.5V16.6875C25.1875 17.6821 24.7924 18.6359 24.0891 19.3391C23.3859 20.0424 22.4321 20.4375 21.4375 20.4375H6.67188Z"
                                    fill="white"
                                  />
                                </svg>

                                <small>10 Komentar</small>
                              </div>
                            </div>
                            <a
                              href=""
                              className="md:right-0 md:bottom-0 md:absolute md:m-0 bg-white rounded-xl text-[#3980BF] py-2 px-3 font-semibold mx-auto"
                            >
                              Simpan
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Dashboard section end */}
      <Footer />
    </>
  );
}
