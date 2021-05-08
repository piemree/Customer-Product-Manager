<template>
  <section class="section">
    <b-field label="Firma Ara">
      <b-input icon="magnify" v-model="name" style="width: 20rem"></b-input>
    </b-field>
    <b-table :data="customers" paginated per-page="30" :bordered="false">
      <b-table-column field="company_name" label="Firma adı" v-slot="props">
        {{ props.row.company_name }}
      </b-table-column>
      <b-table-column field="company_owner" label="Firma sahibi" v-slot="props">
        {{ props.row.company_owner }}
      </b-table-column>
      <b-table-column field="contact" label="İletişim" v-slot="props">
        {{ props.row.contact }}
      </b-table-column>
      <b-table-column
        field="final_payment_date"
        label="Son tahsilat tarihi"
        sortable
        v-slot="props"
      >
        {{ $convert(props.row.final_payment_date) }}
      </b-table-column>
      <b-table-column
        field="final_payment_amount"
        label="Son tahsilat miktarı"
        sortable
        v-slot="props"
      >
        {{ props.row.final_payment_amount }} TL
      </b-table-column>
      <b-table-column
        field="final_sales_amount"
        label="Son satış miktarı"
        sortable
        v-slot="props"
      >
        {{ props.row.final_sales_amount }} TL
      </b-table-column>
      <b-table-column
        field="final_sales_date"
        label="Son satış tarihi"
        sortable
        v-slot="props"
      >
        {{ $convert(props.row.final_sales_date) }}
      </b-table-column>
      <b-table-column field="current_balance" label="Bakiye" v-slot="props">
        {{ props.row.current_balance }} TL
      </b-table-column>
      <b-table-column v-slot="props">
        <b-button style="width: 100%" @click="payment(props.row.id)"
          >İncele</b-button
        >
      </b-table-column>
    </b-table>
  </section>
</template>
<script>
export default {
  middleware(ctx) {
    
   if (!ctx.$fire.auth.currentUser) {
     
      ctx.redirect("/auth/login");
   }
  },
  methods: {
    payment(id) {
      this.$router.push(`/${id}`);
    },
  },

  computed: {
    customers() {
      let all = this.$store.getters["customer/GET_CUSTOMERS"];
      const regex = new RegExp(`^${this.name.toLowerCase()}`, "g");
      return all.filter(
        ({ company_name, company_owner }) =>
          company_name.toLowerCase().match(regex) ||
          company_owner.toLowerCase().match(regex)
      );
    },
  },
  data() {
    return {
      name: "",

      /*  */
    };
  },
};
</script>
