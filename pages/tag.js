import HeadTitle from "../components/headTitle";
import styles from "../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function Home() {
  async function daftarClicked() {
    redirectToAuth("signup");
  }

  const elements = [
    "#umum",
    "#anak",
    "#ekonomi",
    "#lifehack",
    "#perabotan",
    "#teknologi",
  ];

  return (
    <>
      <HeadTitle title="Tag" />
      <Navbar />
      {/* Tag section start */}
      <section id="tag" className="pt-32 font-asap md:px-16">
        <div className="container">
          <div className="flex mb-5 px-5">
            <h1 className="w-1/2 md:w-full font-bold text-xl md:text-4xl">
              Tag Terpopuler
            </h1>

            <form action="" className="">
              <input
                type="text"
                name="search-box"
                id="search-box"
                placeholder="Cari sebuah tag"
                className="p-2 rounded-md md:w-80 w-28 border-2 border-[#3980BF]"
              />
            </form>
          </div>
          <div className="flex flex-wrap">
            {elements.map((value, index) => {
              return (
                <div className="w-full px-4 md:w-1/3" key={index}>
                  <div className="rounded-t-xl  overflow-hidden h-10 bg-[#C1E5C0] border-t-[#3980BF] border-x-[#3980BF] border-2"></div>
                  <div className="rounded-b-xl shadow-lg overflow-hidden mb-10 border-b-[#3980BF] border-x-[#3980BF] border-2">
                    <div className="py-6 px-6">
                      <div>
                        <h3 className="font-semibold md:text-lg">{value}</h3>
                        <h3 className=" md:text-lg">51246 post dibuat</h3>
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
