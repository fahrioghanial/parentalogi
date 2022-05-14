import HeadTitle from "../../components/headTitle";
import styles from "../../styles/Home.module.css";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Editor from "../../components/editor";
import Link from "next/link";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { SessionRequest } from "supertokens-node/framework/express";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import axios from "axios";
import { ImCross } from "react-icons/im";

const EmailPasswordAuthNoSSR = dynamic(
  new Promise((res) => res(EmailPassword.EmailPasswordAuth)),
  { ssr: false }
);

export default function ProtectedCreateTag({ posts }) {
  return (
    <EmailPasswordAuthNoSSR>
      <CreateTag />
    </EmailPasswordAuthNoSSR>
  );
}

function CreateTag() {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [warna, setWarna] = useState("#000000");

  useEffect(() => {}, []);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const tag = { nama, deskripsi, warna };

    fetch("https://parentalogi.me/api/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(tag),
    }).then(() => {
      console.log("new tag added");
    });

    router.push("/tag");
  };

  return (
    <>
      <HeadTitle title="Create Tag" />
      <Navbar />
      {/* Create tag section */}
      <h1 className="pt-32 font-semibold text-2xl md:px-16 px-4">Buat Tag</h1>
      <section id="create_post" className="pt-32 font-asap md:px-16">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="flex flex-wrap border-2 border-blue-500 p-10 rounded-lg gap-4">
              <div className="w-full self-center">
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Masukkan Nama Tag"
                  className="p-4 w-full"
                />
              </div>
              <div className="w-full self-center">
                <input
                  type="text"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Masukkan Deskripsi Tag"
                  className="p-4 w-full"
                />
              </div>
              <div className="w-full self-center flex flex-row gap-10">
                <h1>Pilih Warna</h1>
                <input
                  type="color"
                  value={warna}
                  onChange={(e) => setWarna(e.target.value)}
                  placeholder="Pilih Warna"
                  className="w-20"
                />
              </div>

              <button
                className="border-blue-500 border-2 rounded-lg py-2 px-4"
                type="submit"
              >
                Kirim Post
              </button>
            </div>
          </div>
        </form>
      </section>
      {/* Create tag end section */}
    </>
  );
}
