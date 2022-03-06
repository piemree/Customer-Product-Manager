export const state = () => ({
  customers: [],
  products: [],
  history: [],
  customer: {}
});

export const mutations = {
  SET_CUSTOMERS(state, customer) {
    state.customers.push(customer);
  },
  SET_CUSTOMER(state, customer) {
    state.customer = customer;
  },
  SET_CUSTOMERS_HİSTORY(state, history) {
    state.history.push(history);
  },
  UPDATE_CUSTOMER(state, data) {
    let index = state.customers.findIndex(customer => customer.id === data.id);
    this._vm.$set(state.customers, index, data);
  },
  DELETE_CUSTOMER(state, { id }) {
    const customerIndex = state.customers.findIndex(customer => {
      return customer.id === id;
    });
    if (customerIndex > -1) {
      state.customers.splice(customerIndex, 1);
    }
  },
  CLEAR_HİSTORY(state) {
    state.history = [];
  }
};

export const getters = {
  GET_CUSTOMERS(state) {
    return state.customers;
  },
  GET_CUSTOMERS_HİSTORY(state) {
    return [...state.history].reverse();
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
  async getAllCustomersRealTime(context) {
    this.$fire.firestore.collection("customers").onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          context.commit("SET_CUSTOMERS", {
            ...change.doc.data(),
            id: change.doc.id
          });
        }
        if (change.type === "modified") {
          context.commit("UPDATE_CUSTOMER", {
            ...change.doc.data(),
            id: change.doc.id
          });
        }
        if (change.type === "removed") {
          context.commit("DELETE_CUSTOMER", {
            id: change.doc.id
          });
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
          final_payment_date: 0,
          final_sales_amount: 0,
          final_sales_date: 0,
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
  async deleteCustomer(context, id) {
    let customerRef = this.$fire.firestore.collection("customers");
    return customerRef.doc(id).delete();
  },
  async getpaid(context, customer) {
    let new_balance =
      parseInt(customer.balance) - parseInt(customer.payment_amount);

    let seller = context.rootGetters["auth2/GET_USER"].split("@")[0];

    let ref = this.$fire.firestore.collection("customers").doc(customer.id);

    let currentDate = Date.now();

    return new Promise(async (resolve, reject) => {
      if (!seller)
        reject({
          msg: "Satıcı kimliği belirsiz.Sayfayı yenileyip tekrar deneyin"
        });
      try {
        await ref.update({
          current_balance: new_balance,
          final_payment_amount: parseInt(customer.payment_amount),
          final_payment_date: Date.now()
        });

        let shopping = {
          quantity: customer.payment_amount,
          details: [],
          company: customer.company_name,
          date: currentDate,
          seller: seller,
          card: customer.card
        };

        await context.dispatch("saveShopping", shopping);
        resolve("ok");
      } catch (error) {
        reject({ msg: "Tahsilat sırasında hata olustu" });
      }
    });
  },

  async sell(context, customer) {
    let new_balance =
      parseInt(customer.balance) + parseInt(customer.sales_amount);

    let ref = this.$fire.firestore.collection("customers").doc(customer.id);

    let seller = context.rootGetters["auth2/GET_USER"].split("@")[0];

    let currentDate = Date.now();

    return new Promise(async (resolve, reject) => {
      try {
        await ref.update({
          current_balance: new_balance,
          final_sales_amount: customer.sales_amount,
          final_shopping_info: customer.final_shopping,
          final_sales_date: currentDate
        });

        let shopping = {
          quantity: customer.sales_amount,
          details: customer.final_shopping,
          company: customer.company_name,
          date: currentDate,
          seller: seller,
          card: customer.card
        };

        await context.dispatch("saveShopping", shopping);

        resolve("ok");
      } catch (error) {
        reject({ msg: error.message });
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

        resolve("ok");
      } catch (error) {
        reject(error);
      }
    });
  },

  async saveShopping(ctx, { quantity, details, company, date, seller, card }) {
    let type = details.length > 0 ? "satış" : "tahsilat";

    return new Promise(async (resolve, reject) => {
      let ref = this.$fire.firestore.collection("history");

      try {
        await ref.add({
          quantity: quantity,
          details: details,
          company: company,
          date: date,
          seller: seller,
          type: type,
          card: card
        });

        resolve("ok");
      } catch (error) {
        reject({ msg: "Alısveris geçmisi kaydedilirken hata olustu" });
      }
    });
  },
  async getShopingHistory(context, { start, end }) {
    context.commit("CLEAR_HİSTORY");

    this.$fire.firestore
      .collection("history")
      .where("date", ">", start)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            context.commit("SET_CUSTOMERS_HİSTORY", {
              ...change.doc.data(),
              id: change.doc.id
            });
          }
        });
      });
  },
  async getShopingHistoryWithRange(context, { start, end }) {
    context.commit("CLEAR_HİSTORY");

    this.$fire.firestore
      .collection("history")
      .where("date", ">", start)
      .where("date", "<", end)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            context.commit("SET_CUSTOMERS_HİSTORY", {
              ...change.doc.data(),
              id: change.doc.id
            });
          }
        });
      });
  }
};
