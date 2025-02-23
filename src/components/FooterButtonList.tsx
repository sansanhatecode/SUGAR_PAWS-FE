"use client";

import React from "react";
import CtaButton from "./CtaButton";

const FooterButtonList = () => {
  return (
    <>
      <div>
        <h6 className="font-[500] text-[20px]">ABOUT US</h6>
        <p className="mb-4 text-[12px] font-light">Who is Sugar Paws</p>
        <CtaButton text="LEARN MORE" onClick={() => {}} />
      </div>
      <div>
        <h6 className="font-[500] text-[20px]">
          JOIN WITH SUGAR PAWS
        </h6>
        <p className="mb-4 text-[12px] font-light">
          We are looking for designers, artists and creators.
        </p>
        <CtaButton text="JOIN US" onClick={() => {}} />
      </div>
      <div>
        <h6 className="font-[500] text-[20px]">FAQS</h6>
        <p className="mb-4 text-[12px] font-light">Any question?</p>
        <CtaButton text="LEARN MORE" onClick={() => {}} />
      </div>
    </>
  );
};

export default FooterButtonList;
