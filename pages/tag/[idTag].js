import React from "react";
import styles from "../../styles/Home.module.css";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";
import supertokensNode from "supertokens-node";
import { backendConfig } from "../../config/backendConfig";
import Session from "supertokens-node/recipe/session";
import HeadTitle from "../../components/headTitle";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/id";
import Link from "next/link";

const EmailPasswordAuthNoSSR = dynamic(
  new Promise((res) => res(EmailPassword.EmailPasswordAuth)),
  { ssr: false }
);

export default function Dashboard() {
  return (
    <EmailPasswordAuthNoSSR>
      <DashboardPage />
    </EmailPasswordAuthNoSSR>
  );
}

function DashboardPage() {
  const router = useRouter();
  const data = router.query;

  const [tag, setTag] = useState([]);

  useEffect(() => {
    fetch(`https://icvmdev.duckdns.org/api/tags?id=${data.idTag}`)
      .then((res) => res.json())
      .then((data) => {
        setTag(data);
      });
  }, []);

  console.log(tag);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://icvmdev.duckdns.org/api/posts/")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <>
      <HeadTitle />
      <Navbar />
      <div
        className="w-full pt-28"
        style={{
          backgroundColor: `${tag.warna}`,
        }}
      ></div>
      <h1 className="px-5 md:pl-10 mt-10 font-bold text-xl md:text-3xl">
        Tag: {tag.nama}
      </h1>
      {/* Dashboard section start */}
      <section id="dashboard" className="pt-12 font-asap ">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full self-center px-5 md:pl-10">
              <div className="flex flex-col md:flex-row mb-5 gap-5 md:gap-10 font-semibold text-xl md:text-3xl">
                <Link href={`/dashboard`}>
                  <a className="hover:text-blue-500">Beranda</a>
                </Link>
                <Link href={`/tag`}>
                  <a className="hover:text-blue-500">Daftar Bacaan</a>
                </Link>
                <Link href={`/tag`}>
                  <a className="hover:text-blue-500">Tag</a>
                </Link>
                <Link href={`/tag`}>
                  <a className="hover:text-blue-500">Tentang Kami</a>
                </Link>
              </div>

              {/* card */}

              {posts.map((post) => {
                return (
                  <div
                    className="rounded-xl shadow-lg overflow-hidden mb-10"
                    key={post.id}
                  >
                    <div className="py-8 px-6 bg-[#3980BF] text-white relative">
                      <div className="lg:flex lg:gap-x-4">
                        <div className="bg-[url('/test.png')] bg-center rounded-full w-20 flex-none h-20 mb-2"></div>
                        <div>
                          <h3 className="font-medium">{post.user.nama}</h3>
                          <small>
                            {moment(post.createdAt).format("LL")} (
                            {moment(post.createdAt).fromNow()})
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
                                <a href="" key={tag.id}>
                                  #{tag.nama}
                                </a>
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
                              className="md:right-10 md:bottom-10 md:absolute bg-white rounded-xl text-[#3980BF] py-2 px-3 font-semibold mx-auto"
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
