import React from "react";
import ContactInfo from "../contactInfo";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-slate-500 w-full h-10 flex items-center justify-start p-2">
      <ContactInfo />
    </footer>
  );
};

export default Footer;
