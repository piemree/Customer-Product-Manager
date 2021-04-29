<template>
  <section class="section">
    <b-notification
      type="is-success"
      auto-close
      :duration="2000"
      :active="ntfOk"
      aria-close-label="Close notification"
    >
      Şirket başarıyla eklendi.
    </b-notification>
    <b-notification
      type="is-danger"
      auto-close
      :duration="2000"
      :active="ntfErr"
      aria-close-label="Close notification"
    >
      Hata! Şirket Eklenemedi.
    </b-notification>
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
      :loading="isOk"
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
      isOk: false,
      ntfOk: false,
      ntfErr: false,
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
    addCustomer() {
      this.isOk = true;
      this.$store
        .dispatch("customer/addNewCustomer", this.newCustomer)
        .then((customer) => {
          this.isOk = false;
          this.ntfOk = true;
          Object.assign(this.newCustomer, {
            company_name: "",
            company_owner: "",
            final_payment_amount: 0,
            final_payment_date: Date.now(),
            final_sales_amount: 0,
            final_sales_date: Date.now(),
            current_balance: null,
            contact:""
          });
          setTimeout(() => (this.ntfOk = false), 2500);
        })
        .catch(() => {
          this.ntfErr = true;
          setTimeout(() => (this.ntfErr = false), 2500);
        });
    },
  },
};
</script>
