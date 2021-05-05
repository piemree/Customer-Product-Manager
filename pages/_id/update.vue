<template>
  <section class="section">
    <h3 class="title">Müşteri Güncelle</h3>
    <b-tabs v-model="activeTab">
      <b-tab-item label="FİRMA BİLGİLERİ">
        <b-field label="Firma adı" label-position="on-border">
          <b-input v-model="updatedCustomer.company_name"></b-input>
        </b-field>

        <b-field label="Firma sahibi" label-position="on-border">
          <b-input v-model="updatedCustomer.company_owner"></b-input>
        </b-field>

        <b-field label="Firma iletişim" label-position="on-border">
          <b-input v-model="updatedCustomer.contact"></b-input>
        </b-field>
      </b-tab-item>
      <b-tab-item label="FATURA BİLGİLERİ">
        <b-field label="Vergi levhası ünvanı" label-position="on-border">
          <b-input v-model="updatedCustomer.tax_title"></b-input>
        </b-field>
        <b-field label="Vergi dairesi" label-position="on-border">
          <b-input v-model="updatedCustomer.tax_administration"></b-input>
        </b-field>
        <b-field label="Vergi numarası" label-position="on-border">
          <b-input v-model="updatedCustomer.tax_no"></b-input>
        </b-field>
        <b-field label="Adres" label-position="on-border">
          <b-input
            v-model="updatedCustomer.adress"
            maxlength="200"
            type="textarea"
          ></b-input>
        </b-field>
      </b-tab-item>
    </b-tabs>
    <b-field class="is-flex is-justify-content-center">
      <b-button
        @click="update"
        style="width: 10rem"
        class="is-warning is-light"
      >
        Güncelle
      </b-button>
    </b-field>
  </section>
</template>

<script>
export default {
   middleware(ctx) {
    if (!ctx.$fire.auth.currentUser) {
      ctx.redirect("/auth/login");
    }
  },
  data() {
    return {
      activeTab: 0,
      updatedCustomer: {
        company_name: "",
        company_owner: "",
        contact: "",
        tax_title: "",
        tax_administration: "",
        tax_no: "",
        adress: "",
      },
    };
  },
  computed: {
    customer() {
      return this.$store.getters["customer/GET_CURRENT_CUSTOMER"];
    },
  },
  created() {
    this.updatedCustomer = Object.assign({}, this.customer);
  },
  methods: {
    async update() {
      this.$buefy.dialog.confirm({
        title: "Uyarı Mesajı",
        message: `
                    <p>
                    <b>Firma adı:</b>${this.updatedCustomer.company_name}
                    </p>
                    <p>
                    <b>Firma sahibi:</b>${this.updatedCustomer.company_owner}
                    </p>
                    <p>
                    <b>İletişim:</b>${this.updatedCustomer.contact}
                    </p>
                    <p>
                    <b>Ünvan:</b>${this.updatedCustomer.tax_title}
                    </p>
                    <p>
                    <b>Vergi dairesi:</b>${this.updatedCustomer.tax_administration}
                    </p>
                    <p>
                    <b>Vergi no:</b>${this.updatedCustomer.tax_no}
                    </p>
                    <p>
                    <b>Adres:</b>${this.updatedCustomer.adress}
                    </p>
                    `,
        cancelText: "İptal",
        confirmText: "Onaylıyorum",
        type: "is-success",
        onConfirm: async () => {
          const loadingComponent = this.$buefy.loading.open();

          try {
            await this.$store.dispatch(
              "customer/updateCustomer",
              this.updatedCustomer
            );
            loadingComponent.close();
            this.$buefy.toast.open({
              message: "Müşteri Güncellendi",
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
  },
};
</script>

<style>
</style>