import Banner from "@/components/Banner";
import { Separator } from "@/components/ui/separator";
import React from "react";

const AboutUsPage = () => {
  return (
    <>
      <div>
        <h1 className=" text-3xl mb-6 text-center">About KK Fabrics</h1>
        <p className=" mb-6">
          KKFabrics, headquartered in MyinMu since 2020, has been a trusted name
          in the fabric reselling industry. Specializing in high-quality fabrics
          sourced from various regions across the country, our collection caters
          to diverse tastes and preferences
        </p>
        <p className=" mb-6">
          With a commitment to customer satisfaction, we ensure reliable
          delivery services, ensuring your orders reach you promptly and safely.
          Additionally, we offer enticing discounts, making premium fabrics
          accessible to all. Experience the epitome of quality and convenience
          with KKFabrics.
        </p>
      </div>
      <Banner />
    </>
  );
};

export default AboutUsPage;
