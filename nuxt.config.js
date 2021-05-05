import fireConfig from "./firebaseConfig";

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
  plugins: ["~/plugins/convert.js", "~/plugins/isauth.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module'
    "@nuxtjs/dotenv",
    "@nuxtjs/pwa"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    "nuxt-buefy",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",

    "@nuxtjs/auth-next",

    [
      "@nuxtjs/firebase",
      {
        config: fireConfig,
        services: {
          auth: {
            static: true,
            persistence: "none",
            initialize: {
              onAuthStateChangedAction: 'auth2/onAuthStateChangedAction',
            }
          },
          firestore: true,
          functions: true,
          storage: true,
          database: true
        }
      }
    ]
  ],
  /* firestore: {
    memoryOnly: false, // default
    chunkName: process.env.NODE_ENV !== "production" ? "firebase-auth" : "[id]",
    enablePersistence: true,
    emulatorPort: 3000,
    emulatorHost: "localhost",
    settings: {}
  }, */

  /* auth: {
    persistence: "none", // default
    initialize: {
      
      subscribeManually: false
    },
    ssr: false
  }, */

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {} // blah blah
  },
  pwa: {
    meta: {
      title: "musteri-yonetim",
      author: "Emre"
    },
    manifest: {
      name: "Müsteri Takip",
      short_name: "DM",
      lang: "en"
    },
    icon: {
      fileName: "app-icon.png"
    }
  },
  //middleware: ["userAuth"],

  router: {
    middleware: "userAuth"
  }
};
