import { useEffect, useState } from "react";

export default function useWidth() {
  const [windowWidth, setWindowWidth] = useState<null | number>(null);

  useEffect(() => {
    if (!window) return;
    setWindowWidth(window.innerWidth / window.devicePixelRatio);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}
