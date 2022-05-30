import React, { useEffect } from "react";
import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import SuperTokens from "supertokens-auth-react";
import { redirectToAuth } from "supertokens-auth-react/recipe/emailpassword";
import HeadTitle from "../../components/headTitle";
import Link from "next/link";

const SuperTokensComponentNoSSR = dynamic(
  new Promise((res) => res(SuperTokens.getRoutingComponent)),
  { ssr: false }
);

export default function Auth() {
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      redirectToAuth();
    }
  }, []);

  return (
    <div className={styles.container}>
      <HeadTitle title="Auth"></HeadTitle>
      <main className={styles.main}>
        <div className="container flex flex-col gap-4 ">
          <Link href="/">
            <a>
              <img
                className="w-[120px] m-auto"
                src="/logo-parentalogi.png"
                alt="Parentalogi"
              />
            </a>
          </Link>
          <h1 className="text-[#3980BF] text-center font-semibold text-5xl font-asap">
            Parentalogi
          </h1>
        </div>
        <SuperTokensComponentNoSSR />
        <Link href="/">
          <a className="py-2 px-3 rounded-xl text-white font-bold md:text-xl bg-blue-500 hover:bg-blue-900 m-auto mt-5">
            Kembali
          </a>
        </Link>
      </main>
    </div>
  );
}
