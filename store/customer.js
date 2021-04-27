export const state = () => ({
  customers: [],
  currentCustomer: {
    bakiye: 0,
    yetkili: "",
    date: "",
    firma_adı: "",
    son_tahsilat: 0
  }
});

export const mutations = {
  SET_CUSTOMERS(state, customer) {
    state.customers.push(customer);
  },
  UPDATE_CUSTOMER(state, data) {
    let index = state.customers.findIndex(customer => customer.id === data.id);
    console.log(data);
    this._vm.$set(state.customers, index, data);
  },
  SET_CURRENT_CUSTOMER(state, customer) {
    state.currentCustomer = customer;
  }
};

export const getters = {
  GET_CUSTOMERS(state) {
    return state.customers;
  },
  GET_CURRENT_CUSTOMER(state) {
    return state.currentCustomer;
  }
};

export const actions = {
  async updateBacalance(contex, data) {
    const query = await this.$fire.firestore
      .collection("customers")
      .where("id", "==", `${data.id}`);

    console.log(query);
  },

  /*   async getAllCustomers(context) {
    const snapshot = await this.$fire.firestore.collection("customers").get();

    snapshot.docs.map(doc => {
      context.commit("SET_CUSTOMERS", { ...doc.data(), id: doc.id });
    });
  }, */
  async getAllCustomersRealTime(context) {
    const observer = this.$fire.firestore
      .collection("customers")
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            const source = change.doc.metadata.hasPendingWrites
              ? "Local"
              : "Server";

            if (source === "Server") {
              context.commit("SET_CUSTOMERS", {
                ...change.doc.data(),
                id: change.doc.id
              });
            }
          }
          if (change.type === "modified") {
            context.commit("UPDATE_CUSTOMER", {
              ...change.doc.data(),
              id: change.doc.id
            });
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
          }
        });
      });
  },
  async getSingleCustomer(context, id) {
    let customer = await this.$fire.firestore
      .collection("customers")
      .doc(id)
      .get();

    context.commit("SET_CURRENT_CUSTOMER", customer.data());

    return customer;
  }
};
