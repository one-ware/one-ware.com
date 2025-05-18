import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
       "heropage": {
          "catchphrase1": "Need an AI-expert for your business?",
          "catchphrase2": "No, you don't!",
          "catchphrase3": "With ONE AI you are the AI-expert. Now. Our tool is the solution for:",
          "catchphraseAnimaion1": "Every task.",
          "catchphraseAnimaion2": "Every hardware.",
          "catchphraseAnimaion3": "Every industry.",
          "catchphraseAnimaion4": "Tailored AI.",
          "catchphraseAnimaion5": "Instantly.",
          },
    }
  },
  de: {
    translation: {
      "heropagechatchphrase": "Benötigen Sie einen KI-Experten für Ihr Unternehmen?"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    },
     keySeparator: "."
  });

  export default i18n;