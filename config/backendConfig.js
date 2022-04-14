import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo } from "./appInfo";

export let backendConfig = () => {
  return {
    framework: "express",
    supertokens: {
      connectionURI: process.env.NEXT_PUBLIC_SUPERTOKENS_URL,
    },
    appInfo,
    recipeList: [EmailPasswordNode.init(), SessionNode.init()],
    isInServerlessEnv: true,
  };
};
