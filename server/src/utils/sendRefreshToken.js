export const sendRefreshToken = (res, token) => {
  res.cookie("jai", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
