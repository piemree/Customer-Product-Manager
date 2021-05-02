<template >
  <div class="section is-flex is-justify-content-center">
    <section v-if="customer">
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

      <Payment :customer="customer" />
      <PdfButton :customer="customer"/>
    </section>
    <section v-else class="section is-medium is-flex is-justify-content-center is-align-items-center">
      <h1 style="font-size:2rem">Yükleniyor...</h1>
    </section>
  </div>
</template>
<script>
import Payment from "@/components/Payment";
import PdfButton from "@/components/PdfButton";
export default {
  component: {
    Payment,
    PdfButton
  },

  computed: {
    customer() {
      let all = this.$store.getters["customer/GET_CUSTOMERS"];
      return all.filter(({ id }) => id.toString() === this.$route.params.id)[0];
    },
  },
  created() {
    //this.$buefy.loading.open();
  },
};
</script>
