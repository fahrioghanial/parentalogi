import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo } from "./appInfo";

export let backendConfig = () => {
  return {
    framework: "express",
    supertokens: {
      connectionURI: "http://localhost:3567",
    },
    appInfo,
    recipeList: [EmailPasswordNode.init(), SessionNode.init()],
    isInServerlessEnv: true,
  };
};
