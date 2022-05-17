import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";
import { useEffect, useState } from "react";

export let frontendConfig = () => {
  // const [user, setUser] = useState([]);
  // const [isFollow, setIsFollow] = useState(false);
  // useEffect(() => {
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${dataUserFromQuery.userName}`,
  //     {
  //       credentials: "same-origin",
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUser(data);
  //     });

  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/followed-users`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       {
  //         data.map((d) => {
  //           if (d.nama_pengguna == dataUserFromQuery.userName) {
  //             setIsFollow(true);
  //           }
  //         });
  //       }
  //     });
  // }, []);
  var user = [];

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
          error: "#ffcccb",
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
        },
        signInAndUpFeature: {
          signUpForm: {
            formFields: [
              {
                id: "nama_pengguna",
                label: "Nama Pengguna",
                placeholder: "Nama Pengguna",

                // validate: async (value) => {
                //   // if (
                //   // function getUsername() {
                //   fetch(
                //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${value}`,
                //     {
                //       credentials: "same-origin",
                //     }
                //   )
                //     .then((res) => res.json())
                //     .then((data) => {
                //       // user = data;
                //       if (data.nama_pengguna == null) {
                //         return true;
                //       }
                //       return false;
                //     });
                //   // }
                //   console.log(
                //     fetch(
                //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${value}`,
                //       {
                //         credentials: "same-origin",
                //       }
                //     ).then((res) => {
                //       return res.json().then((data) => {
                //         // user = data;
                //         if (data.nama_pengguna == null) {
                //           return true;
                //         }
                //         return false;
                //       });
                //     })
                //   );

                //   // ) {
                //   //   console.log("username belum diambil");
                //   //   return undefined;
                //   // } else {
                //   //   console.log("username sudah diambil atuh");
                //   //   return "username has been taken";
                //   // }
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
