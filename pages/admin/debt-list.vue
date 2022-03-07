<template>
  <div>
    <b-table :data="debts" paginated per-page="30" :bordered="false">
      <b-table-column
        searchable
        field="company_name"
        label="Borçlu adı"
        v-slot="props"
      >
        {{ props.row.company_name }}
      </b-table-column>
      <b-table-column
        field="final_debt_amount"
        label="Son alınan borç"
        v-slot="props"
      >
        {{ props.row.final_debt_amount }} TL
      </b-table-column>
      <b-table-column
        field="final_debt_amount"
        label="Son borç tarihi"
        v-slot="props"
      >
        {{ $convert(props.row.final_debt_date) }}
      </b-table-column>
      <b-table-column
        field="final_payment_amount"
        label="Son ödeme"
        v-slot="props"
      >
        {{ props.row.final_payment_amount }} TL
      </b-table-column>
       <b-table-column
        field="final_debt_amount"
        label="Son ödeme tarihi"
        v-slot="props"
      >
        {{ $convert(props.row.final_payment_date) }}
      </b-table-column>
      <b-table-column field="current_balance" label="Bakiye" v-slot="props">
        {{ props.row.current_balance }} TL
      </b-table-column>
      <b-table-column v-slot="props">
        <b-button
          expanded
          @click="transaction(props.row, 'payment')"
          class="is-success"
          >Ödeme</b-button
        >
      </b-table-column>
      <b-table-column v-slot="props">
        <b-button
          expanded
          @click="transaction(props.row, 'debt')"
          class="is-warning"
          >Bakiye ekle</b-button
        >
      </b-table-column>
      <b-table-column v-slot="props">
        <b-button expanded @click="removeDebt(props.row)" class="is-danger"
          >Sil</b-button
        >
      </b-table-column>
      <template #empty>
        <div class="has-text-centered mt-6">
          Liste boş. Yeni borç eklemek için
          <nuxt-link to="/admin/new-debt"> TIKLAYIN</nuxt-link>
        </div>
      </template>
    </b-table>
    <b-modal
      :active="isPaymentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <template>
        <DebtPaymentModal
          v-bind="formProps"
          @close="isPaymentModalActive = false"
        ></DebtPaymentModal>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DebtPaymentModal from "../../components/DebtPaymentModal.vue";
export default {
  data() {
    return {
      isPaymentModalActive: false,
      formProps: {
        debtProp: {},
        isPayment: true
      }
    };
  },
  computed: {
    ...mapState({
      debts: state => state.debt.debts
    })
  },
  methods: {
    ...mapActions("debt", ["deleteDebt"]),
    async removeDebt(debt) {
      this.$buefy.dialog.confirm({
        title: "Onaylıyor musun?",
        message: ` ${debt.company_name} silinecek onaylıyor musun?`,
        cancelText: "İptal",
        confirmText: "Sil",
        type: "is-danger",
        onConfirm: async () => {
          const loadingComponent = this.$buefy.loading.open();
          try {
            await this.deleteDebt(debt.id);

            loadingComponent.close();
            this.$buefy.toast.open({
              message: "Silindi",
              type: "is-success"
            });
          } catch (error) {
            loadingComponent.close();
            this.$buefy.dialog.alertError(
              "is-danger",
              "HATA!!!",
              "BİRŞEYLER TERS GİTTİ"
            );
          }
        }
      });
    },
    transaction(row, type) {
      this.formProps.debtProp = { ...row };
      this.formProps.isPayment = type == "payment" ? true : false;
      this.isPaymentModalActive = true;
    }
  },
  components: { DebtPaymentModal }
};
</script>

<style></style>
