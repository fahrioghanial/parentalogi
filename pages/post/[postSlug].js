import HeadTitle from "../../components/headTitle";
import styles from "../../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
import Comments from "../comments";
import parse from "html-react-parser";

export async function getStaticPaths() {
  const res = await fetch("https://icvmdev.duckdns.org/api/posts/");
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
    `https://icvmdev.duckdns.org/api/posts/${params.postSlug}`
  );
  const data = await res.json();
  return {
    props: {
      post: data,
    },
    revalidate: 10,
  };
}

export default function Post({ post }) {
  async function daftarClicked() {
    redirectToAuth("signup");
  }

  console.log(post);
  return (
    <>
      <HeadTitle />
      <Navbar />

      {/* Post section start */}
      <section id="post" className="pt-32 font-asap bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row md:gap-2">
            <div className="md:ml-8 flex md:flex-col justify-center md:justify-start">
              <a href="">
                <AiFillHeart className="mb-2" size="50px" />
              </a>
              <p className="text-lg  mb-4 text-center">{post.jumlah_disukai}</p>
              <a href="">
                <BsBookmark className="mb-2" size="50px" />
              </a>
              <p className="text-lg text-center">15</p>
            </div>
            <div className="w-full px-4">
              <div className="rounded-t-xl shadow-lg overflow-hidden h-72 bg-[url('/test.png')]"></div>
              <div className="rounded-b-xl shadow-lg overflow-hidden mb-10">
                <div className="py-8 px-6 bg-[#3980BF] text-white">
                  <div className="lg:flex lg:gap-x-4">
                    <div className="bg-[url('/test.png')] bg-center rounded-full w-20 flex-none h-20 mb-2"></div>
                    <div>
                      <h3 className="font-medium">{}</h3>
                      <small>{moment(post.createdAt).fromNow()}</small>
                      <h1 className="font-bold text-base my-2 md:text-2xl">
                        {post.judul}
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
      <Comments></Comments>
      <Footer />
    </>
  );
}
