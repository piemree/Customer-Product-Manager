<template>
  <section class="section">
    <h3 class="title">Borc Ekle</h3>

    <b-field label="Firma Adı">
      <b-input
        placeholder="Firma adı"
        v-model="newDebt.company_name"
        type="text"
        icon="store"
        style="max-width: 20rem"
      >
      </b-input>
    </b-field>

    <b-field label="Güncel Bakiye">
      <b-input
        placeholder="Güncel bakiye"
        type="number"
        min="0"
        icon="calculator"
        validation-message="Lütfen doğru formatta numara girin"
        v-model="newDebt.current_balance"
        style="max-width: 15rem"
      >
      </b-input>
    </b-field>
    <b-button @click="addDebt" type="is-success" :disabled="!balance || !coname"
      >Ekle</b-button
    >
  </section>
</template>

<script>
export default {
  middleware(ctx) {
    if (!ctx.$fire.auth.currentUser) {
      ctx.redirect("/auth/login");
    }
  },
  data() {
    return {
      newDebt: {
        company_name: "",
        current_balance: null,
        final_payment_date: 0,
        final_payment_amount: 0,
        final_debt_date: 0,
        final_debt_amount: 0
      },
      balance: false,
      coname: false
    };
  },

  watch: {
    "newDebt.current_balance"() {
      if (this.newDebt.current_balance !== (null || "")) {
        this.balance = true;
      } else {
        this.balance = false;
      }
    },
    "newDebt.company_name"() {
      if (this.newDebt.company_name !== "") {
        this.coname = true;
      } else {
        this.coname = false;
      }
    }
  },
  methods: {
    async addDebt() {
      this.$buefy.dialog.confirm({
        title: "Onaylıyor musun?",
        message: `<b>Borclu Adı: </b> ${this.newDebt.company_name}
                       <br/>
                <b>Bakiye: </b> ${this.newDebt.current_balance}
                    `,
        cancelText: "İptal",
        confirmText: "Onaylıyorum",
        type: "is-success",
        onConfirm: async () => {
          const loadingComponent = this.$buefy.loading.open();
          try {
            await this.$store.dispatch("debt/addNewDebt", {
              ...this.newDebt,
              current_balance: Number(this.newDebt.current_balance)
            });

            loadingComponent.close();
            this.$buefy.toast.open({
              message: "Müşteri başarıyla eklendi",
              type: "is-success"
            });
          } catch (error) {
            console.error(error);
            loadingComponent.close();
            this.$buefy.dialog.alert({
              title: "HATA!!!",
              message: "BİRŞEYLER TERS GİTTİ",
              type: "is-danger",
              hasIcon: false,
              icon: "exclamation",
              iconPack: "fa",
              ariaRole: "alertdialog",
              ariaModal: true
            });
          }
          Object.assign(this.newDebt, {
            company_name: "",
            current_balance: null,
            final_payment_date: 0,
            final_payment_amount: 0
          });
        }
      });
    }
  }
};
</script>
