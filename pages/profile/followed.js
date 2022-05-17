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

export default function Profile() {
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
      <Navbar />

      {/* Profile section start */}
      <section id="profile" className="pt-32 font-asap bg-white">
        <div className="container">
          <div className="flex flex-wrap justify-center">
            <div className="w-full text-center mb-5 font-bold text-xl md:text-3xl">
              <h1>Daftar pengguna yang anda ikuti</h1>
            </div>
            {followedUsers.map((fu) => {
              return (
                <div
                  className="rounded-xl shadow-lg overflow-hidden mb-10 w-full md:w-4/5"
                  key={fu.nama_pengguna}
                >
                  <div className="py-8 px-6 bg-[#3980BF] text-white relative">
                    <div className="lg:flex lg:gap-x-4">
                      <div className="bg-[url('/test.png')] bg-center rounded-full w-20 flex-none h-20 mb-2"></div>
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
