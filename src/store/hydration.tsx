"use client";

import * as React from "react";
import { useOTPStore } from "@/store/store";

const Hydration = () => {
  React.useEffect(() => {
    useOTPStore.persist.rehydrate();
  }, []);

  return null;
};

export default Hydration;
