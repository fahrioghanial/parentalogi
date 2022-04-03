import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";

export let frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      EmailPasswordReact.init({
        emailVerificationFeature: {
          mode: "REQUIRED",
        },
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
          error: "#FFC3D8",
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
          },
          // headerTitle: {
          //   display: "none",
          // },
        },
        signInAndUpFeature: {
          signUpForm: {
            formFields: [
              {
                id: "username",
                label: "Nama Pengguna",
                placeholder: "Nama Pengguna",
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
              {
                id: "password-repeat",
                label: "Ulangi Kata Sandi",
                placeholder: "Ulangi Kata Sandi",
              },
            ],
          },
        },
      }),
      SessionReact.init(),
    ],
  };
};
