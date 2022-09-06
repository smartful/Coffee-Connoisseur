import { Fragment } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Component {...pageProps} />
      <footer>
        <p>© 2022 Gandalf</p>
      </footer>
    </Fragment>
  );
}

export default MyApp;
