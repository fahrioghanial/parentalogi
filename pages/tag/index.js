import HeadTitle from "../../components/headTitle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Heading from "../../components/heading";
import Link from "next/link";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";
import Navbar from "../../components/navbar";

const EmailPasswordAuthNoSSR = dynamic(
  new Promise((res) => res(EmailPassword.EmailPasswordAuth)),
  { ssr: false }
);

export default function TagProtected() {
  return (
    <EmailPasswordAuthNoSSR>
      <Tag />
    </EmailPasswordAuthNoSSR>
  );
}

function Tag() {
  const router = useRouter();

  const createTagClicked = () => {
    router.push("/tag/createtag");
  };

  const [tags, setTags] = useState([]);
  const [followedTags, setFollowedTags] = useState([]);
  // const followedTags = [];

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tags`)
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/followed-tags`, {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        {
          // data.map((d) => {
          //   followedTags.push(d.id_tag);
          // });
          setFollowedTags(data);
        }
      });
    console.log("ini followed tags diawal", followedTags);
  }, []);

  const handleFollowTag = async (id_tag) => {
    // console.log(followedTags);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tags/${id_tag}/follow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        router.reload(window.location.pathname);
      });

    // fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/followed-tags`, {
    //   credentials: "same-origin",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // data?.map((d) => {
    //     //   setFollowedTags(
    //     //     followedTags.filter((followedTags) => followedTags != d.id_tag)
    //     //   );
    //     // });
    //     console.log("ini data:", data);
    //     setFollowedTags(data);
    //   });
    // console.log("ini followed tags", followedTags);
  };

  return (
    <>
      <HeadTitle title="Tag" />
      <Heading />
      {/* Tag section start */}
      <section id="tag" className="pt-20 font-asap md:px-10">
        <div className="container">
          <h1 className=" font-bold text-xl md:text-4xl mb-10">
            Tag Terpopuler
          </h1>
          <div className="flex flex-col md:flex-row mb-5 pr-5 justify-between items-center">
            <Navbar />
            <button
              className="w-auto text-white font-semibold py-2 text-xl hover:bg-[#9CA3AF] bg-[#3980BF] rounded-lg px-3"
              onClick={createTagClicked}
            >
              Buat Tag
            </button>
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
                            pathname: `/tag/${tag.nama}`,
                          }}
                        >
                          <a className="font-semibold md:text-xl hover:text-blue-500">
                            {tag.nama}
                          </a>
                        </Link>
                        <h3 className="md:text-lg font-normal">
                          {tag.deskripsi}
                        </h3>
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
