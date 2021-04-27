require("dotenv").config();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: "static",
  ssr: false,
  generate: {
    fallback: true
  },
  head: {
    title: "customer-managment",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    "nuxt-buefy",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",

    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: process.env.API_KEY,
          authDomain: "customer-managment-2dd77.firebaseapp.com",
          databaseURL:
            "https://customer-managment-2dd77-default-rtdb.firebaseio.com",
          projectId: "customer-managment-2dd77",
          storageBucket: "customer-managment-2dd77.appspot.com",
          messagingSenderId: "786831161886",
          appId: "1:786831161886:web:aa057d5a126445cfb68c0f",
          measurementId: "G-4CMR6FMVRE"
        },
        services: {
          auth: true,
          firestore: true,
          functions: true,
          storage: true,
          database: true
        }
      }
    ]
  ],

  firestore: {
    memoryOnly: false, // default
    chunkName: process.env.NODE_ENV !== "production" ? "firebase-auth" : "[id]", // default
    enablePersistence: true,
    emulatorPort: 3000,
    emulatorHost: "localhost",
    settings: {
      // Firestore Settings - currently only works in SPA mode
    }
  },

  env: {
    API_KEY:
      process.env.FİREBASE_API_KEY || "AIzaSyCnArpKquQIrDpcN-oKF5GyyloQW5JnrFk"
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {} // blah blah
  }
};
