import Vue from "vue";
export const state = () => ({
  debts: []
});

export const mutations = {
  INSERT_DEBT(state, debt) {
    const isExist = state.debts.some(deb => deb.id === debt.id);
    if (!isExist) state.debts.push(debt);
  },
  UPDATE_DEBT(state, debt) {
    const index = state.debts.findIndex(deb => deb.id === debt.id);
    state.debts[index] = { ...debt };
  },
  REMOVE_DEBT(state, debtId) {
    state.debts = [...state.debts.filter(debt => debt.id !== debtId)];
  }
};

export const actions = {
  async getAllDebtsRealTime(context) {
    this.$fire.firestore.collection("debts").onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          context.commit("INSERT_DEBT", {
            ...change.doc.data(),
            id: change.doc.id
          });
        }
        if (change.type === "modified") {
          context.commit("UPDATE_DEBT", {
            ...change.doc.data(),
            id: change.doc.id
          });
        }
        if (change.type === "removed") {
          context.commit("REMOVE_DEBT", change.doc.id);
        }
      });
    });
  },
  async addNewDebt(context, debt) {
    let debtRef = this.$fire.firestore.collection("debts");
    return debtRef.add(debt);
  },
  async deleteDebt(context, id) {
    let debtRef = this.$fire.firestore.collection("debts");
    return debtRef.doc(id).delete();
  },
  async updateDebt(context, { id, updatedData }) {
    let debtRef = this.$fire.firestore.collection("debts").doc(id);
    return debtRef.update(updatedData);
  },
  async debtPayment(context, { id, new_current_balance, payment_amount }) {
    let ref = this.$fire.firestore.collection("debts").doc(id);
    return ref.update({
      current_balance: Number(new_current_balance),
      final_payment_amount: Number(payment_amount),
      final_payment_date: Date.now()
    });
  }
};

export default {
  state,
  mutations,
  actions
};
