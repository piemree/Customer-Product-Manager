<template>
  <section>
    <b-field label="Ödeme Miktarı">
      <div style="display: flex">
        <b-input
          placeholder="Ödeme miktarı"
          type="number"
          min="0"
          :max="maxpayamount"
          icon="calculator"
          :validation-message="errormessage"
          v-model="payment_amount"
          style="max-width: 15rem"
        >
        </b-input>

        <p class="control">
          <b-button
            @click="getpaid"
            :disabled="!paybtn"
            type="is-success"
            label="Ödeme Al"
          />
        </p>
      </div>
    </b-field>

    <section
      class="mt-6 mb-5 is-flex is-justify-content-space-between"
      style="max-width: 25rem"
    >
      <b-field label="Ürün ">
        <b-select v-model="productToAdd.product" placeholder="Select a name">
          <option
            v-for="product in products"
            :value="product.name"
            :key="product.id"
          >
            {{ product.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Adet">
        <b-numberinput
          type="number"
          min="0"
          v-model="productToAdd.count"
          :controls="false"
          validation-message="Lütfen doğru formatta numara girin"
          style="max-width: 4rem"
        >
        </b-numberinput>
      </b-field>
      <b-field label="Fiyat">
        <b-numberinput
          type="number"
          min="0"
          v-model="productToAdd.price"
          :controls="false"
          validation-message="Lütfen doğru formatta numara girin"
          style="max-width: 5.5rem"
        >
        </b-numberinput>
        <b-button @click="add" type="is-success" label="Ekle" />
      </b-field>
    </section>

    <section v-show="data.length > 0" style="max-width: 30rem">
      <b-field grouped group-multiline>
        <b-button
          label="Temizle"
          type="is-danger"
          icon-left="close"
          class="field"
          @click="data = []"
        />
      </b-field>

      <b-table :data="data" :columns="columns" :mobile-cards="false"> </b-table>
      <b-field class="mt-5"
        ><span> <b>Toplam</b>: {{ totalTablePrice }}</span></b-field
      >
    </section>

    <b-field class="mt-5" label="Satış Miktarı">
      <div style="display: flex">
        <b-input
          placeholder="Satış miktarı"
          type="number"
          min="0"
          icon="calculator"
          disabled
          validation-message="Lütfen doğru formatta numara girin"
          v-model="sales_amount"
          style="max-width: 15rem"
        >
        </b-input>

        <p class="control">
          <b-button
            @click="sell"
            :disabled="!salebtn"
            type="is-success"
            label="Satış Yap"
          />
        </p>
      </div>
    </b-field>
  </section>
</template>
<script>
export default {
  data() {
    return {
      payment_amount: null,
      sales_amount: null,
      paybtn: false,
      salebtn: false,

      errormessage: "Lütfen doğru formatta numara girin",
      totalTablePrice: 0,
      products: [
        { name: "köpük" },
        { name: "silikon" },
        { name: "lastik" },
        { name: "fırça" },
        { name: "parfüm" },
      ],
      productToAdd: {
        product: "",
        count: null,
        price: null,
        total: null,
      },
      data: [],
      checkedRows: [],
      columns: [
        {
          field: "product",
          label: "Ürün",
        },
        {
          field: "count",
          label: "Adet",
        },
        {
          field: "price",
          label: "Fiyat",
        },
        {
          field: "total",
          label: "Ara toplam",
        },
      ],
    };
  },
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    totPrice() {
      return this.totalTablePrice;
    },
    maxpayamount() {
      return this.customer.current_balance;
    },
  },
  watch: {
    data() {
      let total = 0;
      this.data.map((el) => (total += parseInt(el.total)));
      this.totalTablePrice = total;

      this.totalTablePrice === 0
        ? (this.sales_amount = null)
        : (this.sales_amount = this.totalTablePrice);
    },
    payment_amount() {
      if (
        this.payment_amount === (null || "") ||
        parseInt(this.payment_amount) > parseInt(this.maxpayamount) ||
        this.payment_amount <= 0
      ) {
        this.paybtn = false;
      } else {
        this.paybtn = true;
      }

      if (parseInt(this.payment_amount) > parseInt(this.maxpayamount)) {
        this.errormessage = "Ödeme miktarı bakiyeden büyük olmaz";
      } else {
        this.errormessage = "Lütfen doğru formatta numara girin ";
      }
    },
    sales_amount() {
      if (this.sales_amount !== (null || "")) {
        this.salebtn = true;
      } else {
        this.salebtn = false;
      }
    },
  },
  methods: {
    add() {
      this.productToAdd.total =
        parseInt(this.productToAdd.count) * parseInt(this.productToAdd.price);

      this.data.push(this.productToAdd);

      this.productToAdd = {
        product: "",
        count: null,
        price: null,
        total: null,
      };
    },
    getpaid() {
      this.$buefy.dialog.confirm({
        title: "Uyarı Mesajı",
        message: `
                    ${this.payment_amount} TL Tutarındaki tahsilatı onaylıyor musun?
                    `,
        cancelText: "İptal",
        confirmText: "Onaylıyorum",
        type: "is-success",
        onConfirm: async () => {
          const loadingComponent = this.$buefy.loading.open();

          try {
            await this.$store.dispatch("customer/getpaid", {
              id: this.customer.id,
              payment_amount: this.payment_amount,
              balance: this.customer.current_balance,
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

          this.payment_amount = "";
        },
      });
    },
    sell() {
      this.$buefy.dialog.confirm({
        title: "Uyarı Mesajı",
        message: `
                    ${this.sales_amount} TL Tutarındaki satışı onaylıyor musun?
                    `,
        cancelText: "İptal",
        confirmText: "Onaylıyorum",
        type: "is-success",
        onConfirm: async () => {
          const loadingComponent = this.$buefy.loading.open();

          try {
            await this.$store.dispatch("customer/sell", {
              id: this.customer.id,
              sales_amount: this.sales_amount,
              balance: this.customer.current_balance,
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
          this.sales_amount = "";
          this.data = [];
        },
      });
    },
  },
};
</script>
