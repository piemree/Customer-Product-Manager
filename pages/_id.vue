<template >
  <div class="section">
    <b-field label="Firma Adı">
      <b-input :value="customer.company_name" disabled></b-input>
    </b-field>
    <b-field label="Firma Sahibi">
      <b-input :value="customer.company_owner" disabled></b-input>
    </b-field>
    <b-field label="Son Tahsilat Tarihi">
      <b-input :value="customer.final_payment_date" disabled></b-input>
    </b-field>
    <b-field label="Son Tahsilat Miktarı">
      <b-input :value="customer.final_payment_amount" disabled></b-input>
    </b-field>
    <b-field label="Son Satış Tarihi">
      <b-input :value="customer.final_sales_date" disabled></b-input>
    </b-field>
    <b-field label="Son Satış Miktarı">
      <b-input :value="customer.final_sales_amount" disabled></b-input>
    </b-field>
    <b-field label="Güncel Bakiye">
      <b-input :value="customer.current_balance" disabled></b-input>
    </b-field>

    <b-field label="Ödeme Miktarı">
      <b-field>
        <b-input
          placeholder="Güncel bakiye"
          type="number"
          min="0"
          icon="calculator"
          validation-message="Lütfen doğru formatta numara girin"
          v-model="payment_amount"
          style="max-width: 15rem"
        >
        </b-input>

        <p class="control">
          <b-button label="Ödeme Al" />
        </p>
      </b-field>
    </b-field>

    <b-field label="Güncel Bakiye">
      <b-input
        placeholder="Güncel bakiye"
        type="number"
        min="0"
        icon="calculator"
        validation-message="Lütfen doğru formatta numara girin"
        v-model="payment_amount"
        style="max-width: 15rem"
      >
      </b-input>
    </b-field>
    <b-field label="Bakiye Ekle">
      <b-field grouped>
        <b-numberinput :controls="false" v-model="sales_amount" />
        <p class="control">
          <b-button label="Satış" />
        </p>
      </b-field>
    </b-field>
  </div>
</template>
<script>
export default {
  data() {
    return {
      payment_amount: 0,
      sales_amount: 0,
    };
  },
  methods: {},
  computed: {
    customer() {
      let all = this.$store.getters["customer/GET_CUSTOMERS"];
      return all.filter(({ id }) => id.toString() === this.$route.params.id)[0];
    },
  },
  created() {
    this.$store.getters["customer/GET_CUSTOMERS"].length === 0
      ? this.$router.push("/")
      : false;
  },
};
</script>
