export default ctx => {
  if (!ctx.$fire.auth.currentUser) {
    return window.onNuxtReady(() => {
      window.$nuxt.$router.push("/auth/login");
    });
  }
};
