"use client";
import { AppFrame } from "ui";

const FrameWrapper = ({ children }: { children: React.ReactNode }) => {
  return <AppFrame>{children}</AppFrame>;
};

export default FrameWrapper;
