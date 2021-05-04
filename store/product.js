export const state = () => ({
  products: []
});

export const mutations = {
  SET_PRODUCTS(state, product) {
    state.products.push(product);
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
  increaseProduct(context, { count, id }) {},
  decreaseProduct(context, products) {
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
          resolve("ok");
        } catch (error) {
          reject(error);
        }
      });
    });
  },
  updateProduct(contect, product) {
    return new Promise(async (resolve, reject) => {
      let productRef = this.$fire.firestore
        .collection("products")
        .doc(product.id);

      productRef
        .update({
          stock: parseInt(product.newStock)
        })
        .then(() => {
          resolve("ok");
        })
        .catch(() => {
          reject("error");
        });
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
  }
};
