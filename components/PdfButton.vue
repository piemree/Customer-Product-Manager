<template >
  <div class="is-flex is-justify-content-center" style="width: 100%">
    <b-button style="width: 100%" @click="downloadPdf" class="is-danger"
      >PDF</b-button
    >
  </div>
</template>
<script>
/* import jsPDF from "jspdf";
import "jspdf-autotable"; */
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from "moment";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  props: ["customer"],
  methods: {
    downloadPdf() {
      let productsBody = [
        [
          { style: "tableHeader", text: "Ürün Adı" },
          { style: "tableHeader", text: "Adet" },
          { style: "tableHeader", text: "Fiyat" },
          { style: "tableHeader", text: "Ara Toplam" },
        ],
      ];

      this.customer.final_shopping_info.forEach((element) => {
        let subbody = [
          {
            style: "item",
            text: `${element.product.name}`,
          },
          {
            style: "item",
            text: `${element.count}`,
          },
          {
            style: "item",
            text: `${element.price} TL`,
          },
          {
            style: "item",
            text: `${element.total} TL`,
          },
        ];
        productsBody.push(subbody);
      });

      let docDefinition = {
        content: [
          {
            text: "DM GARAGE MÜŞTERİ BİLGİLENDİRME FORMU",
            style: "header",
            alignment: "center",
          },
          {
            text: [{ text: `TEL1: `, bold: "true" }, `0224 250 8935`],
            style: "info",
          },
          {
            text: [{ text: `TEL2: `, bold: "true" }, `0544 250 8935`],
            style: "info",
          },
          {
            text: [{ text: `TEL3: `, bold: "true" }, `0545 250 8935`],
            style: "info",
          },
          {
            text: `Ayşe DEMİR Türkiye İş Bankası `,
            style: "iban",
          },
          {
            text: [
              { text: `İBAN:  `, bold: "true" },
              `TR200006400000122060670122`,
            ],
            style: "ibanno",
          },
          {
            text: [
              { text: "ADRES: ", bold: "true" },
              `Çınarönü mahallesi 1.adil sokak no:13 YILDIRIM/BURSA`,
            ],
            style: "adres",
          },
          { text: "Firma Bilgileri", style: "subheader" },

          {
            style: "tableExample",
            table: {
              body: [
                [
                  { style: "tableHeader", text: "Firma" },
                  { style: "tableHeader", text: "Son Ödeme Tarihi" },
                  { style: "tableHeader", text: "Son Ödeme Miktarı" },
                  { style: "tableHeader", text: "Son Satış Tarihi" },
                  { style: "tableHeader", text: "Son Satış Miktarı" },
                  { style: "tableHeader", text: "Güncel Bakiye" },
                ],
                [
                  { style: "item", text: `${this.customer.company_name}` },
                  {
                    style: "item",
                    text: `${this.$convert(this.customer.final_payment_date)}`,
                  },
                  {
                    style: "item",
                    text: `${this.customer.final_payment_amount} TL`,
                  },
                  {
                    style: "item",
                    text: `${this.$convert(this.customer.final_sales_date)}`,
                  },
                  {
                    style: "item",
                    text: `${this.customer.final_sales_amount} TL`,
                  },
                  {
                    style: "item",
                    text: `${this.customer.current_balance} TL`,
                  },
                ],
              ],
            },
          },

          { text: `Satış Bilgileri`, style: "subheader" },
          {
            text: `Tarih: ${this.$convert(this.customer.final_sales_date)}`,
            style: "tableHeader",
          },

          {
            style: "tableExample",
            table: {
              body: productsBody,
            },
          },
          {
            text: `Toplam: ${this.customer.final_sales_amount} TL`,
            style: "productTotal",
          },

          /*   {
            text: [{ text: `TEL1: `, bold: "true" }, `0224 250 8935`],
            style: "info",
          },
          {
            text: [{ text: `TEL2: `, bold: "true" }, `0544 250 8935`],
            style: "info",
          },
          {
            text: [{ text: `TEL3: `, bold: "true" }, `0545 250 8935`],
            style: "info",
          },
          {
            text: `Ayşe DEMİR Türkiye İş Bankası `,
            style: "iban",
          },
          {
            text: [
              { text: `İBAN:  `, bold: "true" },
              `TR200006400000122060670122`,
            ],
            style: "ibanno",
          },
           {
            text: [
              { text: "ADRES: ", bold: "true" },
              `Çınarönü mahallesi 1.adil sokak no:13 YILDIRIM/BURSA`,
            ],
            style: "adres",
          }, */
        ],

        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
          },
          tableExample: {
            margin: [0, 5, 0, 15],
          },
          tableHeader: {
            bold: true,
            fontSize: 10,
            color: "black",
          },
          item: {
            bold: false,
            fontSize: 8,
            color: "black",
          },
          productTotal: {
            bold: true,
            fontSize: 10,
            margin: [0, 0, 0, 50],
            color: "black",
          },
          info: {
            bold: false,
            fontSize: 8,
            color: "black",
            alignment: "right",
          },

          adres: {
            bold: false,
            fontSize: 8,
            margin: [0, 0, 0, 5],
            color: "black",
            alignment: "right",
          },
          iban: {
            bold: false,
            fontSize: 8,
            margin: [0, 5, 0, 0],
            color: "black",
            alignment: "right",
          },
          ibanno: {
            bold: false,
            fontSize: 8,
            margin: [0, 0, 0, 0],
            color: "black",
            alignment: "right",
          },
        },
      };

      pdfMake
        .createPdf(docDefinition)
        .download(
          `${moment().locale("tr").format("LL")}-${this.customer.company_name}`
        );
    },
  },
};
</script>
