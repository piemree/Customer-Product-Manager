export const state = () => ({
  products: [],
  history: [],
  currnetProductName: ""
});

export const mutations = {
  SET_PRODUCTS(state, product) {
    state.products.push(product);
  },
  SET_PRODUCT_HİSTORY(state, history) {
    state.history.push(history);
  },
  CLEAN_PRODUCT_HİSTORY(state) {
    state.history = [];
    state.currnetProductName = "";
  },

  SET_CURRENT_PRODUCT_NAME(state, name) {
    state.currnetProductName = name;
  },

  UPDATE_PRODUCT(state, product) {
    let index = state.products.findIndex(el => el.id === product.id);

    this._vm.$set(state.products, index, product);
  },

  REMOVE_PRODUCT(state, id) {
    let index = state.products.findIndex(product => product.id === id);

    state.products.splice(index, 1);
  }
};

export const getters = {
  GET_PRODUCTS(state) {
    return state.products;
  },
  GET_PRODUCT_HİSTORY(state) {
    return state.history;
  },
  GET_PRODUCT_NAME(state) {
    return state.currnetProductName;
  }
};

export const actions = {
  addNewProduct(context, product) {
    let newProductRef = this.$fire.firestore.collection("products");

    return new Promise((resolve, reject) => {
      newProductRef
        .add({
          name: product.name,
          stock: parseInt(product.stock)
        })
        .then(productRef => resolve(productRef))
        .catch(err => reject(err));
    });
  },
  getAllProductsRealTime(context) {
    this.$fire.firestore.collection("products").onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          context.commit("SET_PRODUCTS", {
            ...change.doc.data(),
            id: change.doc.id
          });
        }

        if (change.type === "modified") {
          context.commit("UPDATE_PRODUCT", {
            ...change.doc.data(),
            id: change.doc.id
          });
        }

        if (change.type === "removed") {
          context.commit("REMOVE_PRODUCT", change.doc.id);
        }
      });
    });
  },
  getProductHistory(context, id) {
    context.commit("CLEAN_PRODUCT_HİSTORY");
    this.$fire.firestore
      .collection("products")
      .doc(id)
      .get()
      .then(doc => context.commit("SET_CURRENT_PRODUCT_NAME", doc.data().name));

    this.$fire.firestore
      .collection("products")
      .doc(id)
      .collection("history")
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          let source = querySnapshot.metadata.hasPendingWrites
            ? "Local"
            : "Server";
          if (source === "Server") {
            if (change.type === "added") {
              context.commit("SET_PRODUCT_HİSTORY", {
                ...change.doc.data(),
                id: change.doc.id
              });
            }
          }
        });
      });
  },
  decreaseProduct(context, { products, company }) {
    console.log(products, company);
    return new Promise(async (resolve, reject) => {
      products.map(async el => {
        let id = el.product.id;
        let count = el.count;
        let finalSotck;
        let productRef = this.$fire.firestore.collection("products").doc(id);

        try {
          let prod = await productRef.get();

          finalSotck = prod.data().stock - count;

          await productRef.update({
            stock: finalSotck
          });

          let history = {
            id: id,
            updateCount: count,
            remaingStock: finalSotck,
            company: company,
            type: "sold"
          };

          await context.dispatch("updateProductHistory", history);

          resolve("ok");
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  updateProduct(context, product) {
    return new Promise(async (resolve, reject) => {
      let productRef = this.$fire.firestore
        .collection("products")
        .doc(product.id);

      try {
        await productRef.update({
          stock: parseInt(product.newStock)
        });

        let history = {
          id: product.id,
          updateCount: product.addedStock,
          remaingStock: product.newStock,
          company: "DM",
          type: "added"
        };

        await context.dispatch("updateProductHistory", history);

        resolve("ok");
      } catch (error) {
        reject(error);
      }
    });
  },
  removeProduct(context, id) {
    return new Promise((resolve, reject) => {
      this.$fire.firestore
        .collection("products")
        .doc(id)
        .delete()
        .then(() => {
          resolve("ok");
        })
        .catch(() => {
          reject("err");
        });
    });
  },
  updateProductHistory(
    context,
    { id, updateCount, remaingStock, company, type }
  ) {
    return new Promise(async (resolve, reject) => {
      let historyRef = this.$fire.firestore
        .collection("products")
        .doc(id)
        .collection("history");

      historyRef
        .add({
          count: updateCount,
          company: company,
          type: type,
          remaingStock: remaingStock,
          updateDate: Date.now()
        })
        .then(() => {
          console.log("ok");
          resolve("ok");
        })
        .catch(err => {
          console.log(err);
          reject("error");
        });
    });
  }
};
