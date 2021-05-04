export const state = () => ({
  user: null,
  admin: false,
  loggedIn: false
});

export const mutations = {
  SET_USER(state, authUser) {
    const { uid, email } = authUser;
    state.user = { uid, email };
  },
  SET_ADMİN(state, isAdmin) {
    state.admin = isAdmin;
  },
  SET_USER_LOGGEDIN(state, loggedin) {
    state.loggedIn = loggedin;
  },
  
};

export const getters = {
  GET_USER(state) {
    return state.user;
  },
  GET_LOGGEDIN(state) {
    return state.loggedIn;
  },
  GET_İSADMİN(state) {
    return state.admin;
  }
};

export const actions = {
  login(context, userlogin) {
    this.$fire.auth
      .signInWithEmailAndPassword(userlogin.email, userlogin.password)
      .then(({ user }) => {
        context.commit("SET_USER", user);
        context.commit("SET_USER_LOGGEDIN", true);
        context.dispatch("isAdmin");
        this.$router.push("/");
      })
      .catch(err => {});
  },
  signout(context) {
    this.$fire.auth
      .signOut()
      .then(() => {
        context.commit("SET_USER_LOGGEDIN", false);
        this.$router.push("/auth/login");
      })
      .catch(error => {
        console.log(error);
      });
  },

  isAdmin(context) {
    this.$fire.auth.currentUser
      .getIdTokenResult()
      .then(idTokenResult => {
        // Confirm the user is an Admin.
        if (!!idTokenResult.claims.admin) {
          context.commit("SET_ADMİN", true);
        } else {
          context.commit("SET_ADMİN", false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
