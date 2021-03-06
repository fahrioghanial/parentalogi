import HeadTitle from "../../components/headTitle";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Heading from "../../components/heading";
import Link from "next/link";
import "moment/locale/id";

import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";

const EmailPasswordAuthNoSSR = dynamic(
  new Promise((res) => res(EmailPassword.EmailPasswordAuth)),
  { ssr: false }
);

export default function ProfileProtected() {
  return (
    <EmailPasswordAuthNoSSR>
      <Profile />
    </EmailPasswordAuthNoSSR>
  );
}

function Profile() {
  async function daftarClicked() {
    redirectToAuth("signup");
  }

  const router = useRouter();

  const [user, setUser] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile`, {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/followed-users`)
      .then((res) => res.json())
      .then((data) => {
        setFollowedUsers(data);
      });
  }, []);

  return (
    <>
      <HeadTitle title="Profile" />
      <Heading />

      {/* Profile section start */}
      <section id="profile" className="pt-32 font-asap bg-white">
        <div className="container">
          <div className="flex flex-wrap justify-center">
            <div className="w-full text-center mb-5 font-bold text-xl md:text-3xl">
              <h1 className="md:text-4xl text-2xl">
                Daftar pengguna yang anda ikuti
              </h1>
            </div>
            {followedUsers.map((fu) => {
              return (
                <div
                  className="rounded-xl shadow-lg overflow-hidden mb-10 w-full md:w-4/5"
                  key={fu.nama_pengguna}
                >
                  <div className="py-8 px-6 bg-[#3980BF] text-white relative">
                    <div className="lg:flex lg:gap-x-4">
                      <div
                        className="bg-contain bg-center bg-no-repeat rounded-full w-24 flex-none h-24 mb-2"
                        style={{
                          backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_URL}/api/avatar/${fu.foto_profil})`,
                        }}
                      ></div>
                      <div>
                        <h3 className="font-medium">@{fu.nama_pengguna}</h3>

                        <h1 className="font-bold text-base my-2 md:text-2xl hover:">
                          <Link
                            href={{
                              pathname: `/profile/${fu.nama_pengguna}`,
                            }}
                          >
                            <a className="font-bold text-base my-2 md:text-2xl hover:text-black">
                              {fu.nama}
                            </a>
                          </Link>
                        </h1>
                        <h3 className="font-medium">{fu.bio}</h3>
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
