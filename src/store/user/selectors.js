export const isLoggedSelector = (store) => store.user.token;
export const usernameSelector = (store) =>
  store.user?.username?.slice(0, 2).toUpperCase();
