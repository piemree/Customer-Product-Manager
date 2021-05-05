export const state = () => ({
  admin: false,
  user: null
});

export const mutations = {
  SET_USER(state, authUser) {
    state.user = authUser;
  },
  SET_ADMİN(state, isAdmin) {
    state.admin = isAdmin;
  },
  SET_USER_LOGGEDIN(state, loggedin) {
    state.loggedIn = loggedin;
  }
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
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    
    if (!authUser) {
      ctx.commit("SET_ADMİN", false);
      ctx.commit("SET_USER", null);
    } else {
      ctx.commit("SET_ADMİN", claims.admin);
      ctx.commit("SET_USER", authUser.email);
    }
  },

  login(context, userlogin) {
    return new Promise((resolve, reject) => {
      this.$fire.auth
        .signInWithEmailAndPassword(userlogin.email, userlogin.password)
        .then(() => {
          
          this.$router.push("/");
          resolve("ok");
        })
        .catch(err => {
          reject("error");
        });
    });
  },
  signout(context) {
    this.$fire.auth
      .signOut()
      .then(() => {
        // context.commit("SET_USER_LOGGEDIN", false);
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
