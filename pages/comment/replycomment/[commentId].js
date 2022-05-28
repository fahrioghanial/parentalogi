import HeadTitle from "../../../components/headTitle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Heading from "../../../components/heading";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import dynamic from "next/dynamic";

const EmailPasswordAuthNoSSR = dynamic(
  new Promise((res) => res(EmailPassword.EmailPasswordAuth)),
  { ssr: false }
);

export default function ProtectedReplyComment() {
  return (
    <EmailPasswordAuthNoSSR>
      <ReplyComment />
    </EmailPasswordAuthNoSSR>
  );
}

function ReplyComment() {
  const router = useRouter();
  const data = router.query;

  const [isiText, setIsiText] = useState("");
  const [postId, setPostId] = useState();
  const [orangtua, setOrangTua] = useState();

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${data.commentId}`,
      {
        credentials: "same-origin",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setOrangTua(data.id);
        setPostId(data.id_post);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const replyComment = { postId, orangtua, isiText };

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(replyComment),
    }).then(() => {
      console.log("comment replied");
      router.back();
    });
  };

  return (
    <>
      <HeadTitle title="Reply Comment" />
      <Heading />
      {/* Reply comment section */}
      <h1 className="pt-32 font-semibold text-2xl md:px-16 px-4">
        Balas Komentar
      </h1>
      <section id="create_post" className="pt-9 font-asap md:px-16">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="flex flex-wrap border-2 border-blue-500 p-10 rounded-lg gap-4">
              <div className="w-full self-center">
                <textarea
                  name=""
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
      {/* Reply comment end section */}
    </>
  );
}
