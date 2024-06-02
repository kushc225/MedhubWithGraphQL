"use client";
import Lottie from "lottie-react";
import Link from "next/link";
import medanimation from "../animation/medanimation.json";
import "./home.css";
export default function Home() {
  return (
    <>
      <div className="flex flex-col mt-5 md:flex-row ml-4 ">
        {/* content  */}

        <div className="w-2/2 mt-12 lg:w-4/6 ">

          <p className="font_page_paragraph text-3xl  pl-4 lg:text-5xl font-sans  tracking-wide home_page_para bg-transparent">
            At
            <span className="font-cursive font-bold text-5xl ml-2 ggreen cursor-pointer  inline-block">
              Medhub,
            </span>

            {`   we hold a deep-rooted belief in the fundamental principle that
            healthcare is a basic human right. We are fueled by the unwavering
            conviction that access to quality healthcare should never be
            determined by one's financial circumstances.`}
          </p>
          <div className="flex mt-12 ml-3 mx-2 ">
            <button className="hoverclass  bggreen mx-2 rounded-xl px-7 py-4 "><Link href="/donate">Donate </Link></button>
            <button className="hoverclass  bggreen mx-2 rounded-xl px-7 py-4 "><Link href="/about">Read More</Link></button>
          </div>
        </div>
        {/* images */}

        <div className="hidden w-auto md:inline-block md:w-3/6">
          <div className="lg:ml-48">
            <Lottie animationData={medanimation} style={{ height: 500, width: 500 }} loop={true} />
          </div>
        </div>
      </div>
    </>
  );
}
