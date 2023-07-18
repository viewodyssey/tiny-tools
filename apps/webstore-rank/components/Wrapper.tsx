"use client";

import { DataWrapper } from "@/hooks/DataContext";
import React, { useEffect } from "react";
import * as gtag from "@/utils/gtag";
import { usePathname } from "next/navigation";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    handleRouteChange(pathname);
  }, [pathname]);

  return <DataWrapper>{children}</DataWrapper>;
};

export default Wrapper;
