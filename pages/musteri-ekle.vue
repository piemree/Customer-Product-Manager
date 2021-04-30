<template>
  <section class="section">
    <h3 class="title">Müşteri Ekle</h3>

    <b-field label="Firma Adı">
      <b-input
        placeholder="Firma adı"
        v-model="newCustomer.company_name"
        type="text"
        icon="store"
        style="max-width: 20rem"
      >
      </b-input>
    </b-field>

    <b-field label="Firma Sahibi">
      <b-input
        placeholder="Firma sahibi"
        v-model="newCustomer.company_owner"
        type="text"
        icon="account"
        style="max-width: 20rem"
      >
      </b-input>
    </b-field>

    <b-field label="Firma İletişim">
      <b-input
        placeholder="Telefon"
        v-model="newCustomer.contact"
        type="text"
        icon="phone"
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
        v-model="newCustomer.current_balance"
        style="max-width: 15rem"
      >
      </b-input>
    </b-field>
    <b-button
      @click="addCustomer"
      type="is-success"
      :disabled="!balance || !coname || !coowner"
      >Ekle</b-button
    >
  </section>
</template>

<script>
export default {
  data() {
    return {
      newCustomer: {
        company_name: "",
        company_owner: "",
        final_payment_amount: 0,
        final_payment_date: "henüz tahsilat yok",
        final_sales_amount: 0,
        final_sales_date: "henüz satış yok",
        current_balance: null,
        contact: "",
      },
      balance: false,
      coname: false,
      coowner: false,
    };
  },

  watch: {
    "newCustomer.current_balance"() {
      if (this.newCustomer.current_balance !== (null || "")) {
        this.balance = true;
      } else {
        this.balance = false;
      }
    },
    "newCustomer.company_name"() {
      if (this.newCustomer.company_name !== "") {
        this.coname = true;
      } else {
        this.coname = false;
      }
    },
    "newCustomer.company_owner"() {
      if (this.newCustomer.company_owner !== "") {
        this.coowner = true;
      } else {
        this.coowner = false;
      }
    },
  },
  methods: {
    async addCustomer() {
      this.$buefy.dialog.confirm({
        title: "Onaylıyor musun?",
        message: `<b>Firma: </b> ${this.newCustomer.company_name}
                      <br/>
                 <b>Firma Sahibi: </b> ${this.newCustomer.company_owner}
                       <br/>
                 <b>İletişim: </b> ${this.newCustomer.contact}
                       <br/>
                <b>Bakiye: </b> ${this.newCustomer.current_balance}
                    `,
        cancelText: "İptal",
        confirmText: "Onaylıyorum",
        type: "is-success",
        onConfirm: async () => {
          const loadingComponent = this.$buefy.loading.open();
          try {
            await this.$store.dispatch(
              "customer/addNewCustomer",
              this.newCustomer
            );

            loadingComponent.close();
            this.$buefy.toast.open({
              message: "Müşteri başarıyla eklendi",
              type: "is-success",
            });
          } catch (error) {
            loadingComponent.close();
              this.$buefy.dialog.alert({
                    title: 'HATA!!!',
                    message: 'BİRŞEYLER TERS GİTTİ',
                    type: 'is-danger',
                    hasIcon: false,
                    icon: 'exclamation',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
          }
          Object.assign(this.newCustomer, {
            company_name: "",
            company_owner: "",
            final_payment_amount: 0,
            final_payment_date: Date.now(),
            final_sales_amount: 0,
            final_sales_date: Date.now(),
            current_balance: null,
            contact: "",
          });
        },
      });
    },
  },
};
</script>
