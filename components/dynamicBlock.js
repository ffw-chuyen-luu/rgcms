import React from "react";
import dynamic from "next/dynamic";

const HeroBanner = dynamic(() => import("@components/heroBanner"));
const Cards = dynamic(() => import("@components/cards"));
const Text = dynamic(() => import("@components/text"));

const Components = {
  CpHeroBanner: HeroBanner,
  CpCards: Cards,
  CpText: Text,
};

const DynamicBlock = (name, content) => {
  if (typeof Components[name] !== "undefined") {
    return React.createElement(Components[name], {
      key: content?.sys?.id || 'und',
      ...content,
    });
  }
  return null;
};

export default DynamicBlock;
