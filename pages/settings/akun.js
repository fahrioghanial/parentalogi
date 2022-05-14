import HeadTitle from "../../components/headTitle";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Image from "next/image"

export default function Akun() {
  async function daftarClicked() {
    redirectToAuth("signup");
  }

  const router = useRouter();

  const [nama_pengguna, setNamaPengguna] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetch("https://parentalogi.me/api/users/profile", {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        setNamaPengguna(data.nama_pengguna);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const password = { oldPassword, newPassword };
    console.log(password)
    fetch(`https://parentalogi.me/api/users/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(password),
    }).then(() => {
      console.log("Password Changed");
    });
  };

  return (
    <>
      <HeadTitle />
      <Navbar />

      {/* Options section start */}
      <section id="dashboard" className="pt-32 font-asap bg-white">
        <div className="container">
          <div className="ml-28">
            <p className="font-asap text-[#3980BF] mb-4 text-3xl">Setelan untuk <b>@ { nama_pengguna }</b></p>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full self-top md:w-1/5 px-5 md:pl-10 ml-16">
              <div className="rounded-xl shadow-lg overflow-hidden mb-10">
                <div className="py-6 px-6 bg-[#3980BF] text-white flex flex-col gap-2">
                  <Link href="/settings/profil" className="font-medium">Profil</Link>
                  <Link href="/settings/kustomisasi" className="font-medium">Kustomisasi</Link>
                  <Link href="/settings/notifikasi" className="font-medium">Notifikasi</Link>
                  <Link href="/settings/akun" className="font-medium">Akun</Link>
                </div>
              </div>
            </div>
            <div className="w-full self-top md:w-3/6 px-5 md:pl-1">
              {/* Segment kata sandi starts*/}
              <form onSubmit= { handleSubmit } className="invisible md:visible">
                <div className="rounded-xl shadow-lg overflow-hidden mb-4">
                  <div className="py-6 px-6 bg-[#3980BF] text-white flex flex-col gap-2">
                    <div className="ml-1">
                      <p className="font-asap mb-4 text-3xl font-bold">Kata Sandi</p>
                    </div>
                    <p className="font-medium text-xl">Kata Sandi saat Ini</p>
                      <input
                        type="password"
                        value= { oldPassword }
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="p-2 rounded-md md:w-full w-0 text-black"
                      />
                    <p className="font-medium text-xl">Kata Sandi Baru</p>
                      <input
                        type="password"
                        value={ newPassword }
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="p-2 rounded-md md:w-full w-0 text-black"
                      />
                    <p className="font-medium text-xl">Konfirmasi Kata Sandi Baru</p>
                      <input
                        type="password"
                        className="p-2 rounded-md md:w-full w-0 text-black"
                      />
                      <button 
                        className="border-blue-500 w-2/5 mt-2 border-2 rounded-lg py-2 px-4 font-bold bg-white bold text-[#3980BF]" 
                        type="submit">
                          Simpan Kata Sandi Baru
                      </button>
                  </div>
                </div>
              </form>
              {/* Segment kata sandi ends*/}
            </div>
          </div>
        </div>
      </section>
      {/* Options section end */}
      <Footer />
    </>
  );
}