<template>
  <section class="section">
    <b-field label="Firma Ara">
      <b-input icon="magnify" v-model="name" style="width: 20rem"></b-input>
    </b-field>
    <b-table
      :data="customers"
      
      paginated
      per-page="5"
      
      :bordered="false"
      
    >
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
      <b-table-column v-slot="props">
        <b-button style="width:100%" @click="payment(props.row.id)">İncele</b-button>
      </b-table-column>
    </b-table>
  </section>
</template>
<script>
export default {
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

      /* columns: [
        {
          field: "company_name",
          label: "Firma adı",
        },
        {
          field: "company_owner",
          label: "Firma sahibi",
        },
        {
          field: "contact",
          label: "Firma İletişim",
        },
        {
          field: "final_payment_date",
          label: "Son tahsilat tarihi",
        },
        {
          field: "final_payment_amount",
          label: "Son tahsilat miktarı",
        },
        {
          field: "final_sales_amount",
          label: "Son satış miktarı",
        },
        {
          field: "final_sales_date",
          label: "Son satış tarihi",
        },
        {
          field: "current_balance",
          label: "Güncel bakiye",
        },
      ], */
    };
  },
};
</script>
