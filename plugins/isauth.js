export default ({ app, route, redirect, $fire }, inject) => {
  const isauth = function() {
    if (route.path !== "/auth/login") {
      if (!$fire.auth.currentUser) {
        console.log("loginnn");
        redirect("/auth/login");
        return;
      } else if (route.path === "/auth/login") {
        if (!$fire.auth.currentUser) {
        } else {
          return redirect("/");
        }
      }
    }
  };

  inject("isauth", isauth);
};
