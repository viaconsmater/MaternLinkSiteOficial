import { createInertiaApp } from "@inertiajs/react";
import React from "react";
import { createRoot } from "react-dom/client";

import DefaultLayout from "../components/Layout";

createInertiaApp({
  resolve: async (name) => {
    const pages = import.meta.glob(
      ["../pages/**/*.jsx", "!../pages/**/*.test.jsx", "!../pages/**/*.stories.jsx"],
      { eager: true },
    );
    let page = pages[`../pages/${name}.jsx`];
    page.default.layout = (page) => <DefaultLayout>{page}</DefaultLayout>;
    return page;
  },
  setup({ el, App, props }) {
    const container = document.getElementById(el.id);
    const root = createRoot(container);
    root.render(<App {...props} />);
  },
});
