import HeadTitle from "../../components/headTitle";
import styles from "../../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const createTagClicked = () => {
    router.push("/tag/createtag");
  };

  const [tags, setTags] = useState([]);
  useEffect(() => {
    fetch("https://icvmdev.duckdns.org/api/tags")
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
      });
  }, []);

  return (
    <>
      <HeadTitle title="Tag" />
      <Navbar />
      {/* Tag section start */}
      <section id="tag" className="pt-32 font-asap md:px-16">
        <div className="container">
          <div className="flex flex-col md:flex-row mb-5 px-5 relative gap-3">
            <h1 className=" font-bold text-xl md:text-4xl">Tag Terpopuler</h1>
            <button
              className="w-auto md:absolute md:right-80 text-white font-semibold py-2 mx-8 hover:bg-[#9CA3AF] bg-[#3980BF] rounded-lg px-3"
              onClick={createTagClicked}
            >
              Buat Tag
            </button>
            <form action="" className="">
              <input
                type="text"
                name="search-box"
                id="search-box"
                placeholder="Cari sebuah tag"
                className="md:absolute md:right-0 p-2 rounded-md md:w-80 border-2 border-[#3980BF]"
              />
            </form>
          </div>
          <div className="flex flex-wrap">
            {tags.map((tag) => {
              return (
                <div className="w-full px-4 md:w-1/3" key={tag.id}>
                  <div
                    className={`rounded-t-xl  overflow-hidden h-10 border-t-[#3980BF] border-x-[#3980BF] border-2 border-b-0`}
                    style={{
                      backgroundColor: `${tag.warna}`,
                    }}
                  ></div>
                  <div className="rounded-b-xl shadow-lg overflow-hidden mb-10 border-b-[#3980BF] border-x-[#3980BF] border-2 border-t-0">
                    <div className="py-6 px-6">
                      <div>
                        <Link
                          href={{
                            pathname: `/tag/${tag.id}`,
                          }}
                        >
                          <a className="font-semibold md:text-xl hover:text-blue-500">
                            {tag.nama}
                          </a>
                        </Link>
                        <h3 className="md:text-lg">{tag.deskripsi}</h3>
                        <button
                          className="rounded-lg text-white bg-[#3980BF] text-xl py-3 px-3 hover:shadow-lg hover:opacity-80 mt-2 mb-10"
                          // onClick={daftarClicked}
                        >
                          Ikuti
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Dashboard section end */}
      <Footer />
    </>
  );
}
