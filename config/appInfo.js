const port = process.env.APP_PORT || 3000;

export const websiteDomain =
  process.env.APP_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  `http://localhost:${port}`;

// export const appInfo = {
//   appName: "Parentalogi",
//   websiteDomain: "http://localhost:3000",
//   apiDomain: "http://localhost:3001",
//   apiBasePath: "/",
// };

export const appInfo = {
  appName: "Parentalogi",
  websiteDomain: "http://localhost:3000",
  apiDomain: websiteDomain,
  apiBasePath: "/api/auth/",
};
