<template>
  <section class="section">
    <b-field label="Firma Ara">
      <b-input icon="store" v-model="name" style="width: 20rem"></b-input>
    </b-field>
    <b-table
      :data="customers"
      :columns="columns"
      paginated
      per-page="5"
      focusable
      bordered
      hoverable
      
      @click="payment"
    >
    </b-table>
  </section>
</template>
<script>

export default {
  
  methods: {
    payment(e) {
      this.$router.push(`/${e.id}`)
    },
  },
  
  computed: {
    customers() {
     let all= this.$store.getters["customer/GET_CUSTOMERS"]
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
      showCustomerUpdate:false,
      name: "",
    
      columns: [
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
      ],
    };
  },
};
</script>
