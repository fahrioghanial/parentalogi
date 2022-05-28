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
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${data.commentId}`,
      {
        credentials: "same-origin",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setIsiText(data.isi_text);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${data.commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({ isiText }),
      }
    ).then(() => {
      console.log("comment edited");
      router.back();
    });
  };

  return (
    <>
      <HeadTitle title="Edit Comment" />
      <Heading />
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
