<template >
  <div class="section">
    <b-field label="Firma Adı">
      <b-input :value="customer.company_name" disabled></b-input>
    </b-field>
    <b-field label="Firma Sahibi">
      <b-input :value="customer.company_owner" disabled></b-input>
    </b-field>
    <b-field label="Firma İletişim">
      <b-input :value="customer.contact" disabled></b-input>
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
      <div style="display: flex">
        <b-input
          placeholder="Ödeme miktarı"
          type="number"
          min="0"
          :max="maxpayamount"
          icon="calculator"
          :validation-message="errormessage"
          v-model="payment_amount"
          style="max-width: 15rem"
        >
        </b-input>

        <p class="control">
          <b-button
            @click="getpaid"
            :disabled="!paybtn"
            type="is-success"
            label="Ödeme Al"
          />
        </p>
      </div>
    </b-field>

    <b-field label="Satış Miktarı">
      <div style="display: flex">
        <b-input
          placeholder="Satış miktarı"
          type="number"
          min="0"
          icon="calculator"
          validation-message="Lütfen doğru formatta numara girin"
          v-model="sales_amount"
          style="max-width: 15rem"
        >
        </b-input>

        <p class="control">
          <b-button
            @click="sell"
            :disabled="!salebtn"
            type="is-success"
            label="Satış Yap"
          />
        </p>
      </div>
    </b-field>
  </div>
</template>
<script>
export default {
  data() {
    return {
      payment_amount: null,
      sales_amount: null,
      paybtn: false,
      salebtn: false,
      errormessage: "Lütfen doğru formatta numara girin",
    };
  },
  computed: {
    customer() {
      let all = this.$store.getters["customer/GET_CUSTOMERS"];
      return all.filter(({ id }) => id.toString() === this.$route.params.id)[0];
    },
    maxpayamount() {
      return this.customer.current_balance;
    },
  },
  created() {
    this.$store.getters["customer/GET_CUSTOMERS"].length === 0
      ? this.$router.push("/")
      : false;
  },
  watch: {
    payment_amount() {
      if (
        this.payment_amount === (null || "") ||
        parseInt(this.payment_amount) > parseInt(this.maxpayamount)
      ) {
        this.paybtn = false;
      } else {
        this.paybtn = true;
      }

      if (parseInt(this.payment_amount) > parseInt(this.maxpayamount)) {
        this.errormessage = "Ödeme miktarı bakiyeden büyük olmaz";
      } else {
        this.errormessage = "Lütfen doğru formatta numara girin ";
      }
    },
    sales_amount() {
      if (this.sales_amount !== (null || "")) {
        this.salebtn = true;
      } else {
        this.salebtn = false;
      }
    },
  },
  methods: {
    getpaid() {
      this.$store.dispatch("customer/getpaid", {
        id: this.customer.id,
        payment_amount: this.payment_amount,
        balance: this.customer.current_balance,
      });
    },
    sell() {
      this.$store.dispatch("customer/sell", {
        id: this.customer.id,
        sales_amount: this.sales_amount,
        balance: this.customer.current_balance,
      });
    },
  },
};
</script>
