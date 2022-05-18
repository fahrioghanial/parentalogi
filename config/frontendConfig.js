import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";
import { useEffect, useState } from "react";

export let frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      EmailPasswordReact.init({
        getRedirectionURL: async (context) => {
          if (context.action === "SUCCESS") {
            if (context.redirectToPath !== undefined) {
              // we are navigating back to where the user was before they authenticated
              return context.redirectToPath;
            }
            return "/dashboard";
          }
          return undefined;
        },
        palette: {
          background: "#3980BF",
          error: "#ff5774",
          textTitle: "#FFFFFF",
          textLabel: "#FFFFFF",
          textInput: "#000000",
          textPrimary: "#FFFFFF",
          textLink: "#000000",
          buttonText: "#3980BF",
          primary: "#FFFFFF",
          superTokensBrandingBackground: "#3980BF",
          superTokensBrandingText: "#3980BF",
        },
        style: {
          container: {
            fontFamily: "Asap, sans-serif",
            fontWeight: "bold",
          },
        },
        signInAndUpFeature: {
          signUpForm: {
            formFields: [
              {
                id: "nama_pengguna",
                label: "Nama Pengguna",
                placeholder: "Nama Pengguna",

                // validate: async (value) => {
                //   console.log("checkusername:", CheckUsername(value));
                //   console.log("value:", value);
                //   if (value == CheckUsername(value)) {
                //     return "Username already used";
                //   }
                //   return undefined;
                // },
              },
              {
                id: "nama",
                label: "Nama Lengkap",
                placeholder: "Nama Lengkap",
              },
              {
                id: "email",
                label: "Email",
                placeholder: "Alamat Email",
              },
              {
                id: "password",
                label: "Kata Sandi",
                placeholder: "Kata Sandi",
              },
            ],
          },
        },
      }),
      SessionReact.init(),
    ],
  };
};
