<template >
  <div class="section is-flex is-justify-content-center">
    <section v-if="customer">
      <b-table :data="customers">
        <b-table-column field="company_name" label="Firma adı" v-slot="props">
          {{ props.row.company_name }}
        </b-table-column>
        <b-table-column
          field="company_owner"
          label="Firma sahibi"
          v-slot="props"
        >
          {{ props.row.company_owner }}
        </b-table-column>
        <b-table-column field="contact" label="İletişim" v-slot="props">
          {{ props.row.contact }}
        </b-table-column>
        <b-table-column
          field="final_payment_date"
          label="Son tahsilat tarihi"
          v-slot="props"
        >
          {{ $convert(props.row.final_payment_date) }}
        </b-table-column>
        <b-table-column
          field="final_payment_amount"
          label="Son tahsilat miktarı"
          v-slot="props"
        >
          {{ props.row.final_payment_amount }} TL
        </b-table-column>
        <b-table-column
          field="final_sales_amount"
          label="Son satış miktarı"
          v-slot="props"
        >
          {{ props.row.final_sales_amount }} TL
        </b-table-column>
        <b-table-column
          field="final_sales_date"
          label="Son satış tarihi"
          v-slot="props"
        >
          {{ $convert(props.row.final_sales_date) }}
        </b-table-column>
        <b-table-column field="current_balance" label="Bakiye" v-slot="props">
          {{ props.row.current_balance }} TL
        </b-table-column>

        <b-table-column>
          <b-button @click="showDetails" style="width: 100%" class="is-danger is-light"
            >Detay</b-button
          >
        </b-table-column>
        <b-table-column>
          <b-button @click="update" style="width: 100%" class="is-warning"
            >Güncelle</b-button
          >
        </b-table-column>
        <b-table-column>
          <PdfButton :customer="customer" />
        </b-table-column>
      </b-table>

      <Payment :customer="customer" />
    </section>
    <section
      v-else
      class="section is-medium is-flex is-justify-content-center is-align-items-center"
    >
      <h1 style="font-size: 2rem">Yükleniyor...</h1>
    </section>
  </div>
</template>
<script>
import Payment from "@/components/Payment";
import PdfButton from "@/components/PdfButton";

export default {
  //new test
  middleware(ctx) {
    if (!ctx.$fire.auth.currentUser) {
      ctx.redirect("/auth/login");
    }
  },

  components: {
    Payment,
    PdfButton,
  },

  computed: {
    customer() {
      let all = this.$store.getters["customer/GET_CUSTOMERS"];
      return all.filter(({ id }) => id.toString() === this.$route.params.id)[0];
    },
    customers() {
      let all = this.$store.getters["customer/GET_CUSTOMERS"];
      let customer = all.filter(
        ({ id }) => id.toString() === this.$route.params.id
      )[0];

      this.$store.commit("customer/SET_CUSTOMER", customer);
      
      return new Array(customer);
    },
  },
  methods: {
    update() {
      let id = this.$route.params.id;
      this.$router.push(`/${id}/update`);
    },
    showDetails() {
      this.$buefy.dialog.alert({
        title: "Tüm Bilgiler",
        message: `
                   <p>
                    <b>Firma adı:</b>${this.customer.company_name}
                    </p>
                    <p>
                    <b>Firma sahibi:</b>${this.customer.company_owner}
                    </p>
                    <p>
                    <b>İletişim:</b>${this.customer.contact}
                    </p>
                    <p>
                    <b>Ünvan:</b>${this.customer.tax_title}
                    </p>
                    <p>
                    <b>Vergi dairesi:</b>${this.customer.tax_administration}
                    </p>
                    <p>
                    <b>Vergi no:</b>${this.customer.tax_no}
                    </p>
                    <p>
                    <b>Adres:</b>${this.customer.adress}
                    </p>
                    `,
        confirmText: "OK",
      });
    },
   
  },
};
</script>
