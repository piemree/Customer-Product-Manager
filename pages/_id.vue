<template >
  <div class="section is-flex is-justify-content-center">
    <section v-if="customer">
      <!-- <b-field label="Firma Adı">
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
      </b-field> -->
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
          {{ props.row.final_payment_date }}
        </b-table-column>
        <b-table-column
          field="final_payment_amount"
          label="Son tahsilat miktarı"
          v-slot="props"
        >
          {{ props.row.final_payment_amount }}
        </b-table-column>
        <b-table-column
          field="final_sales_amount"
          label="Son satış miktarı"
          v-slot="props"
        >
          {{ props.row.final_sales_amount }}
        </b-table-column>
        <b-table-column
          field="final_sales_date"
          label="Son satış tarihi"
          v-slot="props"
        >
          {{ props.row.final_sales_date }}
        </b-table-column>
        <b-table-column field="current_balance" label="Bakiye" v-slot="props">
          {{ props.row.current_balance }}
        </b-table-column>

        <b-table-column>
          <b-button style="width: 100%" class="is-warning">Güncelle</b-button>
        </b-table-column>
      </b-table>

      <Payment :customer="customer" />
      <PdfButton :customer="customer" />
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
  data() {
    return {};
  },
  component: {
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
      return new Array(customer);
    },
  },
};
</script>
