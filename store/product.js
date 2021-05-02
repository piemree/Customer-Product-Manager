export const state = () => ({
  products: []
});

export const mutations = {
  SET_PRODUCTS(state, product) {
    state.products.push(product);
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
          name: product.name
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

        if (change.type === "removed") {
          context.commit("REMOVE_PRODUCT", change.doc.id);
        }
      });
    });
  },
  removeProduct(context, id) {
    this.$fire.firestore
      .collection("products")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }
};
