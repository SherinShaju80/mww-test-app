import { useAppBridge } from "@shopify/app-bridge-react";

import { userLoggedInFetch } from "../App";

export function HomePage() {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  const handleIframeLoad = async (e) => {
    e.preventDefault();
    const data = await fetch("/products-count").then((res) => res.json());

    document.getElementById("mww-iframe").contentWindow.postMessage(
      {
        type: "mww-iframe-data",
        shop: new URL(location).searchParams.get("shop"),
        session: data?.authToken,
      },
      "*"
    );
  };

  return (
    <iframe
      title="MWW Shopify App"
      src="https://portal.mwwondemand.com/"
      name="MWW Shopify App"
      context="MWW Shopify App"
      width="100%"
      height="550"
      frameBorder="0"
      onLoad={handleIframeLoad}
      id="mww-iframe"
    ></iframe>
  );
}
