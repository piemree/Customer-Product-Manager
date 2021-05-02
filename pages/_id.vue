<template >
  <div class="section">
    <section v-if="customer">
      <b-field label="Firma Adı">
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
      </b-field>

      <!--  <b-field label="Ödeme Miktarı">
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
    </b-field> -->
      <Payment :customer="customer" />
    </section>
    <section v-else class="section is-medium is-flex is-justify-content-center is-align-items-center">
      <h1 style="font-size:2rem">Yükleniyor...</h1>
    </section>
  </div>
</template>
<script>
import Payment from "@/components/Payment";
export default {
  component: {
    Payment,
  },

  computed: {
    customer() {
      let all = this.$store.getters["customer/GET_CUSTOMERS"];
      return all.filter(({ id }) => id.toString() === this.$route.params.id)[0];
    },
  },
  created() {
    //this.$buefy.loading.open();
  },
};
</script>
