import React from "react";
import App, { Container } from "next/app";
import { AppConfig } from "blockstack";

const appConfig = new AppConfig(
  ["store_write", "publish_data"],
  "http://localhost:5000"
);

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {
      appConfig
    };

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
