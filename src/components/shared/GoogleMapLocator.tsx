"use client";

import { useEffect, useRef, useState } from "react";

// TypeScript declarations for Google Maps custom elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "gmpx-api-loader": any;
      "gmpx-store-locator": any;
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "gmpx-api-loader": any;
        "gmpx-store-locator": any;
      }
    }
  }
}

const CONFIGURATION = {
  locations: [
    {
      title: "Blvd. Juan Navarrete 154",
      address1: "Blvd. Juan Navarrete 154",
      address2: "Valle Grande, 83205 Hermosillo, Son., Mexico",
      coords: { lat: 29.086707341153247, lng: -110.97562005225372 },
      placeId: "ChIJ5dH5hRWEzoYRUT8Dccuaq6g",
    },
  ],
  mapOptions: {
    center: { lat: 29.086707341153247, lng: -110.97562005225372 }, // Centered on Hermosillo office
    fullscreenControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    zoom: 16, // Zoom level adjusted to show local neighborhood
    zoomControl: true,
    maxZoom: 19,
    mapId: "",
  },
  mapsApiKey: "AIzaSyDAARaN3WWXoQGtZJKa_jm1FZu28xVwjUI",
  capabilities: {
    input: false,
    autocomplete: false,
    directions: false,
    distanceMatrix: false,
    details: false,
    actions: false,
  },
};

export default function GoogleMapLocator() {
  const locatorRef = useRef<any>(null);
  const apiLoaderRef = useRef<any>(null);
  const [libraryLoaded, setLibraryLoaded] = useState(false);

  useEffect(() => {
    // 1. Bypass React's reserved 'key' prop by setting the 'key' attribute dynamically
    if (apiLoaderRef.current) {
      apiLoaderRef.current.setAttribute("key", CONFIGURATION.mapsApiKey);
    }

    // 2. Load the Google Maps Extended Component Library dynamically as a module script
    const scriptId = "google-maps-extended-components";
    const existingScript = document.getElementById(scriptId);

    const handleScriptLoad = () => {
      if (typeof window !== "undefined" && (window as any).customElements) {
        (window as any).customElements.whenDefined("gmpx-store-locator").then(() => {
          setLibraryLoaded(true);
        });
      }
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js";
      script.type = "module";
      script.async = true;
      script.onload = handleScriptLoad;
      document.body.appendChild(script);
    } else {
      handleScriptLoad();
    }
  }, []);

  useEffect(() => {
    // 3. Configure the locator once the web components are defined
    if (libraryLoaded && locatorRef.current) {
      try {
        locatorRef.current.configureFromQuickBuilder(CONFIGURATION);
      } catch (err) {
        console.error("Error configuring gmpx-store-locator:", err);
      }
    }
  }, [libraryLoaded]);

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-border shadow-sm bg-surface">
      <gmpx-api-loader
        ref={apiLoaderRef}
        solution-channel="GMP_QB_locatorplus_v11_c"
      ></gmpx-api-loader>
      
      <gmpx-store-locator
        ref={locatorRef}
        map-id="DEMO_MAP_ID"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          "--gmpx-color-surface": "#ffffff",
          "--gmpx-color-on-surface": "#202F71",
          "--gmpx-color-on-surface-variant": "#6E6965",
          "--gmpx-color-primary": "#D32020", // Accent red
          "--gmpx-color-outline": "#E5E7EB",
          "--gmpx-fixed-panel-width-row-layout": "24em",
          "--gmpx-font-family-base": '"Inter", sans-serif',
          "--gmpx-font-family-headings": '"Outfit", sans-serif',
          "--gmpx-font-size-base": "0.875rem",
          "--gmpx-hours-color-open": "#059669",
          "--gmpx-hours-color-closed": "#D32020",
        }}
      ></gmpx-store-locator>
    </div>
  );
}
