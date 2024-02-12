import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useEffect } from "react";
import AOS from "aos";

export default function initWebsiteEffects() {
  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      AOS.init();
    }

    //Scroll
    document.addEventListener("scroll", debounce(storeScroll), {
      passive: true,
    });

    // Update scroll position for first time
    storeScroll();

    document.documentElement.dataset.isindex = "1";
    return () => {
      // Anything in here is fired on component unmount.
      document.documentElement.dataset.isindex = "0";
    };
  });
}

const debounce = (fn: Function) => {
  let frame: number;
  return (...params: any[]) => {
    if (frame) {
      cancelAnimationFrame(frame);
    }
    frame = requestAnimationFrame(() => {
      fn(...params);
    });
  };
};

const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY.toString();
};
