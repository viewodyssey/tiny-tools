"use client";

import { DataWrapper } from "@/hooks/DataContext";
import React, { Suspense, useEffect } from "react";
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

  return (
    <Suspense fallback={<></>}>
      <DataWrapper>{children}</DataWrapper>
    </Suspense>
  );
};

export default Wrapper;
