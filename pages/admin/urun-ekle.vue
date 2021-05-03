<template >
  <section
    class="section is-flex is-flex-direction-column is-align-items-center"
  >
    <section>
      <h3 style="text-align: center" class="title">Ürün Ekle</h3>
      <section class="is-flex is-flex-direction-column is-align-items-center">
        <b-field label="Ürün adı">
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
        <b-field label="Stok adeti">
          <b-input
            v-model="stock"
            placeholder="Stok adeti"
            type="number"
            icon="calculator"
            style="max-width: 15rem"
          >
          </b-input>
        </b-field>
        <b-field>
          <b-button
            @click="addProduct"
            class="is-success mx-3"
            style="min-width: 5rem"
            :disabled="isempty"
            >Ekle</b-button
          >
        </b-field>
      </section>
    </section>

    <section class="mt-5">
      <h3 style="font-size: 2rem; font-weight: 2rem">Ürünlerimiz</h3>

      <b-table :data="products" paginated per-page="10" :bordered="false">
        <b-table-column field="name" label="Ürün adı" v-slot="props">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="stock" label="Stok adeti" v-slot="props">
          {{ props.row.stock }}
        </b-table-column>
        <b-table-column>
          <b-button style="width: 100%" class="is-warning">Güncelle</b-button>
        </b-table-column>
        <b-table-column v-slot="props">
          <b-button
            @click="removeProduct(props.row.id)"
            style="width: 100%"
            class="is-danger"
            >Sil</b-button
          >
        </b-table-column>
      </b-table>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    return {
      productName: "",
      stock: 0,
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
          stock: this.stock,
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
