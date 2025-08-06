import SeatedList from "@/components/pages-component/seated/SeatedList/SeatedList";
import MainLoader from "@/components/reusable/MainLoader/MainLoader";
import Section from "@/components/reusable/Section/Section";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<MainLoader />}>
      <Section>
        <SeatedList />
      </Section>
    </Suspense>
  );
};

export default page;
