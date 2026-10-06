"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ConstructionLoader from "./ConstructionLoader";

export default function LoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const firstLoad = useRef(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only show quick loader on first session load
    if (typeof window !== "undefined") {
      const hasLoaded = sessionStorage.getItem("dc_loaded");
      if (!hasLoaded && firstLoad.current) {
        setLoading(true);
        sessionStorage.setItem("dc_loaded", "true");
        const timer = setTimeout(() => {
          setLoading(false);
        }, 650);
        firstLoad.current = false;
        return () => clearTimeout(timer);
      }
    }
    setLoading(false);
    firstLoad.current = false;
  }, [pathname]);

  return (
    <>
      {loading && <ConstructionLoader />}

      <div
        className={`transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}