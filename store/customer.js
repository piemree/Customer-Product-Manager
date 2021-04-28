export const state = () => ({
  customers: []
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
            const source = change.doc.metadata.hasPendingWrites
              ? "Local"
              : "Server";

            if (source === "Server") {
              context.commit("UPDATE_CUSTOMER", {
                ...change.doc.data(),
                id: change.doc.id
              });
            }
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
          }
        });
      });
  },

  async addNewCustomer(context, customer) {
    let newCustomerRef = this.$fire.firestore.collection("customers");

    return new Promise((resolve, reject) => {
      newCustomerRef
        .add({
          company_name: customer.company_name,
          company_owner: customer.company_owner,
          final_payment_amount: customer.final_payment_amount,
          final_payment_date: customer.final_payment_date,
          final_sales_amount: customer.final_sales_amount,
          final_sales_date: customer.final_sales_date,
          current_balance: customer.current_balance
        })
        .then(customerRef => resolve(customerRef))
        .catch(err => reject(err));
    });
  }
};
