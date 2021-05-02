const actions = {
  auth() {
    this.$fire.auth
      .signInWithEmailAndPassword("q@q.com", "qqqqqqqq")
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });

    this.$fire.auth.currentUser
      .getIdTokenResult()
      .then(idTokenResult => {
        // Confirm the user is an Admin.
        if (!!idTokenResult.claims.admin) {
          console.log("admin");
          //showAdminUI();
        } else {
          console.log("normal");
          //showRegularUI();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
