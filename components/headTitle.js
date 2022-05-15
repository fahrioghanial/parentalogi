import Head from "next/head";
import { useEffect } from "react";

export default function HeadTitle(props) {
  return (
    <div>
      <Head>
        <title>
          Parentalogi {props.title != null ? " - " + props.title : ""}
        </title>
      </Head>
    </div>
  );
}
