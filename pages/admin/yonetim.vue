<template >
  <b-tabs v-model="activeTab">
    <b-tab-item label="ÜRÜNLER">
      <section class="mt-5">
        <b-table
          :mobile-cards="false"
          :data="products"
          paginated
          per-page="10"
          :bordered="false"
        >
          <b-table-column
            field="name"
            label="Ürün adı"
            :searchable="true"
            v-slot="props"
          >
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="stock" label="Stok adeti" v-slot="props">
            {{ props.row.stock }}
          </b-table-column>
          <b-table-column v-slot="props">
            <b-button
              @click="productHistory(props.row)"
              style="width: 100%"
              class="is-warning is-small"
              >Geçmiş</b-button
            >
          </b-table-column>
          <b-table-column v-slot="props">
            <b-button
              @click="updateProduct(props.row)"
              style="width: 100%"
              class="is-success is-small"
              >Ekle</b-button
            >
          </b-table-column>
          <b-table-column v-slot="props">
            <b-button
              @click="removeProduct(props.row)"
              style="width: 100%"
              class="is-danger is-small"
              >Sil</b-button
            >
          </b-table-column>
        </b-table>
      </section>
    </b-tab-item>
    <b-tab-item label="ÜRÜN EKLE">
      <section>
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
              @input="checkEmptyStock"
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
              :disabled="!isempty && !isemptyStock ? false : true"
              >Ekle</b-button
            >
          </b-field>
        </section>
      </section>
    </b-tab-item>
  </b-tabs>
</template>
<script>
export default {
  middleware(ctx) {
    if (!ctx.$fire.auth.currentUser) {
      return ctx.redirect("/auth/login");
    } else if (!ctx.store.getters["auth2/GET_İSADMİN"]) {
      return ctx.redirect("/");
    }
  },
  data() {
    return {
      activeTab: 0,
      productName: "",
      stock: "",
      isempty: true,
      isemptyStock: true,
    };
  },
  computed: {
    products() {
      return this.$store.getters["product/GET_PRODUCTS"];
    },
  },
  methods: {
    addProduct() {
      if (this.productName != "" && this.stock != "") {
        this.$buefy.dialog.confirm({
          title: "Uyarı Mesajı",
          message: `
                    <p>
                    <b>Ürün adı:</b>${this.productName}
                    </p>
                    <p>
                    <b>Ürün adeti:</b>${this.stock}
                    </p>
                    `,
          cancelText: "İptal",
          confirmText: "Onaylıyorum",
          type: "is-success",
          onConfirm: async () => {
            const loadingComponent = this.$buefy.loading.open();

            try {
              await this.$store.dispatch("product/addNewProduct", {
                name: this.productName,
                stock: this.stock,
              });

              loadingComponent.close();
              this.$buefy.toast.open({
                message: "İşlem başarıyla tamamlandı",
                type: "is-success",
              });
            } catch (error) {
              loadingComponent.close();
              this.$buefy.dialog.alert({
                title: "HATA!!!",
                message: "BİRŞEYLER TERS GİTTİ",
                type: "is-danger",
                hasIcon: false,
                icon: "exclamation",
                iconPack: "fa",
                ariaRole: "alertdialog",
                ariaModal: true,
              });
            }

            (this.stock = ""), (this.productName = "");
          },
        });
      }
    },
    checkEmpty() {
      this.productName != "" ? (this.isempty = false) : (this.isempty = true);
    },
    checkEmptyStock() {
      this.stock != ""
        ? (this.isemptyStock = false)
        : (this.isemptyStock = true);
    },
    removeProduct(product) {
      // this.$store.dispatch("product/removeProduct", id);

      this.$buefy.dialog.confirm({
        title: "Tüm ürün bilgileri silinecek",
        message: `
                    <p>
                    <b>Ürün adı:</b>${product.name}
                    </p>
                    <p>
                    <b>Ürün adeti:</b>${product.stock}
                    </p>
                    `,
        cancelText: "İptal",
        confirmText: "Sil",
        type: "is-danger",
        onConfirm: async () => {
          const loadingComponent = this.$buefy.loading.open();

          try {
            await this.$store.dispatch("product/removeProduct", product.id);

            loadingComponent.close();
            this.$buefy.toast.open({
              message: "İşlem başarıyla tamamlandı",
              type: "is-success",
            });
          } catch (error) {
            loadingComponent.close();
            this.$buefy.dialog.alert({
              title: "HATA!!!",
              message: "BİRŞEYLER TERS GİTTİ",
              type: "is-danger",
              hasIcon: false,
              icon: "exclamation",
              iconPack: "fa",
              ariaRole: "alertdialog",
              ariaModal: true,
            });
          }
        },
      });
    },
    updateProduct(product) {
      this.$buefy.dialog.prompt({
        message: `${product.name}`,
        title: "Stok Ekle",
        type: "is-success ",
        inputAttrs: {
          type: "number",
          placeholder: "Stok adeti",
          value: null,
          min: 0,
        },

        confirmText: "Ekle",
        cancelText: "İptal",
        trapFocus: true,
        onConfirm: async (addedStock) => {
          const loadingComponent = this.$buefy.loading.open();

          try {
            await this.$store.dispatch("product/updateProduct", {
              id: product.id,
              newStock: parseInt(product.stock) + parseInt(addedStock),
              addedStock: addedStock,
            });
            loadingComponent.close();
            this.$buefy.toast.open({
              message: "İşlem başarıyla tamamlandı",
              type: "is-success",
            });
          } catch (error) {
            loadingComponent.close();
            this.$buefy.dialog.alert({
              title: "HATA!!!",
              message: "BİRŞEYLER TERS GİTTİ",
              type: "is-danger",
              hasIcon: false,
              icon: "exclamation",
              iconPack: "fa",
              ariaRole: "alertdialog",
              ariaModal: true,
            });
          }
        },
      });
    },
    productHistory(product) {
      this.$store.dispatch("product/getProductHistory", product.id);
      this.$router.push(`/admin/${product.id}`);
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
