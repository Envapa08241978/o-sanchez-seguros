"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

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
  const [libraryLoaded, setLibraryLoaded] = useState(false);

  useEffect(() => {
    // If the library is already loaded, configure the locator
    if (libraryLoaded && locatorRef.current) {
      try {
        locatorRef.current.configureFromQuickBuilder(CONFIGURATION);
      } catch (err) {
        console.error("Error configuring gmpx-store-locator:", err);
      }
    }
  }, [libraryLoaded]);

  const handleScriptLoad = () => {
    // Wait for the custom elements to be defined
    if (typeof window !== "undefined" && (window as any).customElements) {
      (window as any).customElements.whenDefined("gmpx-store-locator").then(() => {
        setLibraryLoaded(true);
      });
    }
  };

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-border shadow-sm bg-surface">
      {/* Load Google Maps Extended Component Library */}
      <Script
        src="https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js"
        type="module"
        onLoad={handleScriptLoad}
        onReady={handleScriptLoad}
      />

      <gmpx-api-loader
        key={CONFIGURATION.mapsApiKey}
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
          "--gmpx-color-primary": "#D32020", // Accent red for active/primary elements
          "--gmpx-color-outline": "#E5E7EB",
          "--gmpx-fixed-panel-width-row-layout": "24em",
          "--gmpx-font-family-base": '"Inter", sans-serif',
          "--gmpx-font-family-headings": '"Outfit", sans-serif',
          "--gmpx-font-size-base": "0.875rem",
          "--gmpx-hours-color-open: ": "#059669",
          "--gmpx-hours-color-closed": "#D32020",
        }}
      ></gmpx-store-locator>
    </div>
  );
}
