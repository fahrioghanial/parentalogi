import HeadTitle from "../../components/headTitle";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Image from "next/image"

export default function Home() {
  async function daftarClicked() {
    redirectToAuth("signup");
  }

  return (
    <>
      <HeadTitle />
      <Navbar />

      {/* Options section start */}
      <section id="dashboard" className="pt-32 font-asap bg-white">
        <div className="container">
          <div className="ml-28">
            <p className="font-asap text-[#3980BF] mb-4 text-3xl">Setelan untuk <b>@fahrioghanial</b></p>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full self-top md:w-1/5 px-5 md:pl-10 ml-16">
              <div className="rounded-xl shadow-lg overflow-hidden mb-10">
                <div className="py-6 px-6 bg-[#3980BF] text-white flex flex-col gap-2">
                  <a className="font-medium" href="#profil">Profil</a>
                  <a className="font-medium" href="#kustomisasi">Kustomisasi</a>
                  <a className="font-medium" href="#notifikasi">Notifikasi</a>
                  <a className="font-medium" href="#akun">Akun</a>
                </div>
              </div>
            </div>
            <div className="w-full self-top md:w-3/6 px-5 md:pl-1">
              {/* Segment pengguna starts*/}
              <div className="rounded-xl shadow-lg overflow-hidden mb-10">
                <div className="py-6 px-6 bg-[#3980BF] text-white flex flex-col gap-2">
                  <div className="ml-1">
                    <p className="font-asap mb-4 text-3xl font-bold">Pengguna</p>
                  </div>
                  <p className="font-medium text-xl">Nama</p>
                  <form action="" className="invisible md:visible">
                    <input
                      type="text"
                      name="nameBox"
                      id="nameBox"
                      placeholder="Nama"
                      className="p-2 rounded-md md:w-full w-0 text-black"
                    />
                  </form>
                  <p className="font-medium text-xl">Email</p>
                  <form action="" className="invisible md:visible">
                    <input
                      type="text"
                      name="emailBox"
                      id="emailBox"
                      placeholder="Email"
                      className="p-2 rounded-md md:w-full w-0 text-black"
                    />
                  </form>
                  <p className="font-medium text-xl">Username</p>
                  <form action="" className="invisible md:visible">
                    <input
                      type="text"
                      name="usernameBox"
                      id="usernameBox"
                      placeholder="Username"
                      className="p-2 rounded-md md:w-full w-0 text-black"
                    />
                  </form>
                  <p className="font-medium text-xl">Tanggal Lahir</p>
                  <form action="" className="invisible md:visible">
                    <input
                      type="date"
                      name="birthDateBox"
                      id="birthDateBox"
                      placeholder="Username"
                      className="p-2 rounded-md md:w-full w-0 text-black"
                    />
                  </form>
                  <p className="font-medium text-xl">Foto Profil</p>
                  <div className="flex flex-row" >
                    <Image
                      src="/dummy.png"
                      alt="parentalogi"
                      className="py-2 md:p-0"
                      width="60px"
                      height="60px"
                    />
                    <form action="" className="invisible md:visible ml-4 mt-1">
                      <input
                        type="file"
                        name="photoBox"
                        id="photoBox"
                        placeholder="Photo"
                        className="p-2 rounded-md md:w-full w-0 text-black bg-white"
                      />
                    </form>
                    <form action="" className="invisible md:visible ml-4 mt-1">
                      <input
                      value="Upload"
                        type="submit"
                        name="uploadButton"
                        id="uploadButton"
                        placeholder="Upload"
                        className="p-2 rounded-md md:w-full w-0 text-black bg-white"
                      />
                    </form>
                  </div>
                </div>
              </div>
              {/* Segment pengguna ends*/}

              {/* Segment umum starts*/}
              <div className="rounded-xl shadow-lg overflow-hidden mb-10">
                <div className="py-6 px-6 bg-[#3980BF] text-white flex flex-col gap-2">
                  <div className="ml-1">
                    <p className="font-asap mb-4 text-3xl font-bold">Umum</p>
                  </div>
                  <p className="font-medium text-xl">Lokasi</p>
                  <form action="" className="invisible md:visible">
                    <input
                      type="text"
                      name="locationBox"
                      id="locationBox"
                      placeholder="Lokasi"
                      className="p-2 rounded-md md:w-full w-0 text-black"
                    />
                  </form>
                  <p className="font-medium text-xl">Bio</p>
                  <form action="" className="invisible md:visible">
                    <textarea
                      name="bioBox"
                      id="bioBox"
                      placeholder="Bio"
                      cols="4"
                      maxLength="200"
                      className="p-2 rounded-md md:w-full w-0 text-black"
                    />
                  </form>
                  <p className="font-medium text-xl">Pekerjaan</p>
                  <form action="" className="invisible md:visible">
                    <input
                      type="text"
                      name="occupationBox"
                      id="occupationBox"
                      placeholder="Pekerjaan"
                      className="p-2 rounded-md md:w-full w-0 text-black"
                    />
                  </form>
                </div>
              </div>
              {/* Segment umum ends*/}
            </div>
          </div>
        </div>
      </section>
      {/* Options section end */}
      <Footer />
    </>
  );
}
