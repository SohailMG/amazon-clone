import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { Provider as AuthProvider } from "next-auth/client";
import ProgressBar from '@badrap/bar-of-progress'
import Router from "next/router";

const progress = new ProgressBar({
  size: 6,
  color: "#FABF24",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.error);

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
