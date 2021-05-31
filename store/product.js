export const state = () => ({
  products: [],
  history: [],
  currnetProductName: "",
  areCountsWrong: []
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
  },
  ARE_COUNTS_WRONG(state, products) {
    state.areCountsWrong = [...products];
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
  },
  GET_ARE_COUNTS_WRONG(state) {
    return state.areCountsWrong;
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
      .orderBy("updateDate")
      .limitToLast(100)
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
    context.dispatch("productCountControl", products);
    const wrongProducts = context.getters.GET_ARE_COUNTS_WRONG;

    if (wrongProducts.length > 0) {
      return new Promise(async (resolve, reject) =>
        reject({
          title: "YETERSİZ STOK",
          msg: `${wrongProducts
            .map(prod => {
              return `<p><b>ÜRÜN:<span class="has-text-danger">${prod.name}</span> STOK:<span class="has-text-danger">${prod.stock}</span></b></p><hr class="my-2"/>`;
            })
            .join("")}`
        })
      );
    } 
     
      return new Promise(async (resolve, reject) => {
       if(products.length<=0) return  reject({ msg: "BİRŞEYLER TERS GİTTİ" });
        products.map(async el => {
          console.log("entered else block")
          let id = el.product.id;
          let count = el.count;
          let finalSotck;
          let productRef = this.$fire.firestore.collection("products").doc(id);
            console.log("here");
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
            reject({ msg: "BİRŞEYLER TERS GİTTİ" });
          }
        });
      });
    
  },
  productCountControl({ commit, getters }, products) {
    commit("ARE_COUNTS_WRONG", []);
    const wichProds = products
      .map(product => {
        return getters.GET_PRODUCTS.find(el =>
          product.product.id === el.id ? product.count > el.stock : undefined
        );
      })
      .filter(el => el !== undefined);

    commit("ARE_COUNTS_WRONG", wichProds);
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
