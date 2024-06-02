"use client";
import Lottie from "lottie-react";
import aboutUsAnimation from "../../animation/about.json";
import "./about.css";
export default function Home() {
    return (
        <>
            <div className="ml-5 pb-4 lg:justify-normal  md:flex md:flex-row-reverse md:justify-center md:mt-5">
                <div className="md:inline-block lg:hidden hidden">
                    {/* <Lottie className="" options={defaultOptions} height={400} width={400} /> */}
                    <Lottie animationData={aboutUsAnimation} style={{ height: 400, width: 400 }} loop={true} />
                </div>
                <div className="lg:inline-block hidden">

                    {/* <Lottie className="" options={defaultOptions} height={600} width={600} /> */}
                    {/* <Lottie className="" options={aboutUsAnimation} height={600} width={600} /> */}
                    <Lottie animationData={aboutUsAnimation} style={{ height: 600, width: 600 }} loop={true} />

                </div>

                <div className=" lg:w-2/3">
                    <div>
                        <h1 className="text-5xl font-bold font-sarif ggreen  lg:text-7xl lg:underline">{`About Us`}</h1>
                    </div>
                    <div>

                        <p className="mt-2 lg:mt-5 text-xl lg:text-2xl text_black">
                            {`Welcome to`} <span className="ggreen text_black">{`MedHub`}</span>{`- a hub of passion, innovation, and community-driven change. Our story is one of purpose, collaboration, and a shared commitment to making a positive impact.`}</p>

                    </div>
                    <div className="mt-5 lg:mt-10">
                        <h1 className="font-bold text-2xl lg:text-4xl text_black"> {`Our Journey Begins`}</h1>
                        <p className="mt-2 lg:text-2xl lg:mt-5 text_black">
                            {`In 2023, a group of student from `}<span className="font-bold">ABESIT</span> {`came together with a common vision: to address the pressing issue of medicine wastage. Fueled by the belief that every individual deserves Medicine, we set out on a journey to create change.`}
                        </p>
                    </div>
                    <div className=" md:hidden lg:inline-block">
                        <div className="mt-5">
                            <h1 className="font-bold text-2xl lg:text-4xl text_black"> {`Our Mission`}</h1>
                            <p className="mt-2 lg:mt-2 lg:text-2xl text_black">
                                {`At the heart of our mission lies MedHub. We are dedicated to provide a plateform in order to make sure that every needy people get medicine. Our commitment to integrity, transparency guides every step we take.`}
                            </p>
                        </div>

                        <div className="mt-5 lg:hidden">
                            <h1 className="font-bold text-4xl lg:text-4xl text_black"> {`Empowering Communities`}
                            </h1>
                            <p className="mt-2 lg:mt-4 lg:text-2xl text_black">
                                {`  We believe that real change happens when communities come together. That's why we've built a thriving network of people who share our vision and values. Through collaboration and collective action, we are creating sustainable solutions.`}
                            </p>

                        </div>


                        <div className="mt-5 lg:hidden">
                            <h1 className="font-bold text-4xl lg:text-4xl text_black"> {`Our Vision`}
                            </h1>
                            <p className="mt-2 lg:mt-4 lg:text-2xl text_black">
                                {` Our journey has just begun, and we're excited about the future. We invite you to join us on this path to  and contribute to a world where healthcare is a basic right.`} <span className="ggreen uppercase text_black">
                                    {` Together, we can turn our vision into reality.`}
                                </span>
                            </p>
                        </div>

                    </div>


                </div>
            </div>

            {/* outside the box  */}
            <div className="hidden md:flex md:justify-center  ml-5 lg:flex-col">
                <div className="mt-5">
                    <h1 className="font-bold text-2xl lg:text-4xl text_black">{` Our Mission`}</h1>
                    <p className="mt-2 lg:mt-5 lg:text-2xl text_black">
                        {` At the heart of our mission lies MedHub. We are dedicated to provide a plateform in order to make sure that every needy people get medicine. Our commitment to integrity, transparency guides every step we take.`}
                    </p>

                </div>

                <div className="mt-5 ">
                    <h1 className="font-bold text-2xl lg:text-4xl text_black">{` Empowering Communities`}
                    </h1>
                    <p className="mt-2 lg:mt-5 lg:text-2xl text_black">
                        {` We believe that real change happens when communities come together. That's why we've built a thriving network of people who share our vision and values. Through collaboration and collective action, we are creating sustainable solutions.`}
                    </p>

                </div>
            </div>
            <div className="mt-5 hidden md:block ml-5 w-1/2 lg:hidden text_black">
                <h1 className="font-bold text-2xl lg:text-4xl text_black"> Our Vision
                </h1>
                <p className="mt-2 lg:mt-5 lg:text-2xl text_black">
                    {`Our journey has just begun, and we're excited about the future. We invite you to join us on this path to  and contribute to a world where healthcare is a basic right. `}<span className="text-yellow-300 uppercase text_black">
                        {`    Together, we can turn our vision into reality.`}
                    </span>
                </p>
            </div>

        </>
    );
}
