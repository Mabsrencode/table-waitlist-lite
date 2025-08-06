import { Suspense } from "react";

import GuestForm from "@/components/pages-component/waitlist/GuestForm/GuestForm";
import SearchAndFilter from "@/components/pages-component/waitlist/SearchAndFilters/SearchAndFilter";
import GuestList from "@/components/pages-component/waitlist/GuestList/GuestList";
import LoadingSkeleton from "@/components/reusable/LoadingSkeleton/LoadingSkeleton";
import Section from "@/components/reusable/Section/Section";

export default function page({ searchParams }) {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <GuestForm />
        </div>

        <div className="lg:col-span-2">
          <SearchAndFilter />
          <Suspense fallback={<LoadingSkeleton />}>
            <GuestList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}
