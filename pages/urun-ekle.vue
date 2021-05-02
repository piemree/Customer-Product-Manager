<template >
  <section
    class="section is-flex is-flex-direction-column is-align-items-center"
  >
    <section>
      <h3 class="title">Ürün Ekle</h3>
      <section class="is-flex">
        <b-field>
          <b-input
            @input="checkEmpty"
            v-model="productName"
            placeholder="Ürün adı"
            type="text"
            icon="store"
            style="max-width: 15rem"
          >
          </b-input>
        </b-field>
        <b-field>
          <b-button
            @click="addProduct"
            class="is-success mx-3"
            :disabled="isempty"
            >Ekle</b-button
          >
        </b-field>
      </section>
    </section>

    <section class="mt-5">
      <h3 style="font-size: 2rem; font-weight: 2rem">Ürünlerimiz</h3>
      <table class="product-table">
        <tr v-for="(product, index) in products" :key="index">
          <td class="is-flex is-justify-content-space-between my-3">
            <p style="font-size: 1.5rem">{{ index + 1 }}-{{ product.name }}</p>
            <b-button @click="removeProduct(product.id)" class="is-danger mx-3"
              >sil</b-button
            >
          </td>
        </tr>
      </table>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    return {
      productName: "",
      isempty: true,
    };
  },
  computed: {
    products() {
      return this.$store.getters["product/GET_PRODUCTS"];
    },
  },
  methods: {
    addProduct() {
      if (this.productName != "") {
        this.$store.dispatch("product/addNewProduct", {
          name: this.productName,
        });
      }
    },
    checkEmpty() {
      this.productName != "" ? (this.isempty = false) : (this.isempty = true);
    },
    removeProduct(id) {
      this.$store.dispatch("product/removeProduct", id);
    },
  },
};
</script>
<style  scoped >
.product-table tr {
  display: block;
  min-width: 100%;
}
.product-table {
  display: block;
  min-width: 20rem;
  height: auto;
  max-height: 20rem;
  overflow-y: scroll;
}
</style>
