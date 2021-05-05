export const state = () => ({
  customers: [],
  products: [],
  customer: {}
});

export const mutations = {
  SET_CUSTOMERS(state, customer) {
    state.customers.push(customer);
  },
  SET_CUSTOMER(state, customer) {
    state.customer = customer;
  },
  UPDATE_CUSTOMER(state, data) {
    let index = state.customers.findIndex(customer => customer.id === data.id);
    this._vm.$set(state.customers, index, data);
  }
};

export const getters = {
  GET_CUSTOMERS(state) {
    return state.customers;
  },
  GET_CURRENT_CUSTOMER(state) {
    return state.customer;
  },
  GET_TOTAL_BALANCE(state) {
    let total = 0;
    state.customers.forEach(customer => {
      total += customer.current_balance;
    });

    return total;
  }
};

export const actions = {
  /* async updateBacalance(contex, data) {
    const query = await this.$fire.firestore
      .collection("customers")
      .where("id", "==", `${data.id}`);
  }, */

  async getAllCustomersRealTime(context) {
    this.$fire.firestore.collection("customers").onSnapshot(querySnapshot => {
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
          final_payment_amount: 0,
          final_payment_date: "-",
          final_sales_amount: 0,
          final_sales_date: "-",
          current_balance: parseInt(customer.current_balance),
          contact: customer.contact,
          tax_title: "",
          tax_administration: "",
          tax_no: "",
          adress: "",
          final_shopping_info: []
        })
        .then(customerRef => resolve(customerRef))
        .catch(err => reject(err));
    });
  },
  async getpaid(context, customer) {
    let new_balance =
      parseInt(customer.balance) - parseInt(customer.payment_amount);

    let ref = this.$fire.firestore.collection("customers").doc(customer.id);

    return new Promise((resolve, reject) => {
      ref
        .update({
          current_balance: new_balance,
          final_payment_amount: parseInt(customer.payment_amount),
          final_payment_date: Date.now()
        })
        .then(ok => {
          resolve("ok");
        })
        .catch(err => {
          reject("error");
        });
    });
  },

  async sell(context, customer) {
    let new_balance =
      parseInt(customer.balance) + parseInt(customer.sales_amount);

    let ref = this.$fire.firestore.collection("customers").doc(customer.id);

    return new Promise(async (resolve, reject) => {
      try {
        await ref.update({
          current_balance: new_balance,
          final_sales_amount: customer.sales_amount,
          final_shopping_info: customer.final_shopping,
          final_sales_date: Date.now()
        });
        resolve("ok");
      } catch (error) {
        reject(error);
      }
    });
  },
  async updateCustomer(context, updatedCustomer) {
    let ref = this.$fire.firestore
      .collection("customers")
      .doc(updatedCustomer.id);

    return new Promise(async (resolve, reject) => {
      try {
        await ref.update({
          company_name: updatedCustomer.company_name,
          company_owner: updatedCustomer.company_owner,
          contact: updatedCustomer.contact,
          tax_title: updatedCustomer.tax_title,
          tax_administration: updatedCustomer.tax_administration,
          tax_no: updatedCustomer.tax_no,
          adress: updatedCustomer.adress
        });

        console.log("okk");
        resolve("ok");
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
};
