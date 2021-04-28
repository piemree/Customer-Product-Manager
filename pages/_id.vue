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

    <b-field label="Tahsilat Al">
      <b-field grouped>
        <b-numberinput :controls="false" v-model="decreaseCount" />
        <p class="control">
          <b-button @click="decreaseBacance" label="Tahsilat" />
        </p>
      </b-field>
    </b-field>
    <b-field label="Bakiye Ekle">
      <b-field grouped>
        <b-numberinput :controls="false" v-model="addCount" />
        <p class="control">
          <b-button @click="addBalance" label="Ekle" />
        </p>
      </b-field>
    </b-field>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addCount: 0,
      decreaseCount: 0,
    };
  },
  methods: {
    addBalance() {
      this.$store.dispatch("customer/updateBacalance", {
        id: this.customer.id,
        balance: parseFloat(this.addCount).toFixed(2),
        date: new Date().toLocaleString("tr"),
      });
    },
    decreaseBacance() {
      this.$store.dispatch("customer/updateBacalance", {
        id: this.customer.id,
        balance: parseFloat(this.decreaseCount).toFixed(2) * -1,
        date: new Date().toLocaleString(),
      });
    },
  },
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
