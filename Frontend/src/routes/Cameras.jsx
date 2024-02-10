import React from "react";
import { Card } from "@tremor/react";
import CameraCard from "../components/CameraCard";
import Navbar from "../components/NavbarVideo";
import Carousel from "../components/Carousel";

const images = [
  "https://getsafeandsound.com/wp-content/uploads/2019/12/store-security-in-retail-management.jpg",
  "https://active-cctv.co.uk/wp-content/uploads/2021/05/cctv-for-retail-shops.jpg",
  "https://www.marchnetworks.com/wp-content/uploads/2019/01/banner-solutions-retail@2x.jpg",
];

const paths = [
  "dashboard/src2.mp4",
  "dashboard/src3.mp4",
  "dashboard/src4.mp4",
];

const Cameras = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-fit mx-auto p-10 flex flex-col ">
        <div className="grid grid-cols-2 gap-4 mx-auto ">
          <h1 className="text-7xl font-light self-start ml-8 col-span-2">
            Welcome Back
          </h1>
          <p className="col-span-2 text-2xl font-thin ml-8 mb-4">
            View analysis of footages
          </p>
          <Carousel images={images} paths={paths} />
        </div>
      </div>
    </>
  );
};

export default Cameras;
