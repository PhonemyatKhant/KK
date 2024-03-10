"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-[60%] h-2 mx-auto mt-6" />;
};

export default Loading;
