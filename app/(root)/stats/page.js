import StatsDashboard from "@/components/pages-component/stats/StatsDashboard/StatsDashboard";
import MainLoader from "@/components/reusable/MainLoader/MainLoader";
import Section from "@/components/reusable/Section/Section";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<MainLoader />}>
      <Section>
        <StatsDashboard />
      </Section>
    </Suspense>
  );
};

export default page;
