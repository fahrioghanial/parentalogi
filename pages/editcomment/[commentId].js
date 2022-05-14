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

export default function ProtectedEditComment() {
  return (
    <EmailPasswordAuthNoSSR>
      <EditComment />
    </EmailPasswordAuthNoSSR>
  );
}

function EditComment() {
  const router = useRouter();
  const data = router.query;
  // console.log(data.commentId);

  const [isiText, setIsiText] = useState("");
  useEffect(() => {
    fetch(`https://parentalogi.me/api/comments/${data.commentId}`, {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsiText(data.isi_text);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://parentalogi.me/api/comments/${data.commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ isiText }),
    }).then(() => {
      console.log("comment edited");
    });

    router.back();
  };

  return (
    <>
      <HeadTitle title="Edit Comment" />
      <Navbar />
      {/* Edit comment section */}
      <h1 className="pt-32 font-semibold text-2xl md:px-16 px-4">
        Edit Komentar
      </h1>
      <section id="create_post" className="pt-9 font-asap md:px-16">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="flex flex-wrap border-2 border-blue-500 p-10 rounded-lg gap-4">
              <div className="w-full self-center">
                <textarea
                  name=""
                  // cols="100"
                  value={isiText}
                  onChange={(e) => setIsiText(e.target.value)}
                  placeholder="Tulis Komentar"
                  className="p-5 border-[#3980BF] border-2 rounded-xl w-full"
                ></textarea>
              </div>

              <button
                className="border-blue-500 border-2 rounded-lg py-2 px-4"
                type="submit"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </section>
      {/* Edit comment end section */}
    </>
  );
}
