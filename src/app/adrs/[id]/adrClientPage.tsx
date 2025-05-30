'use client';

import { Adr, fullAdr } from "@/lib/definitions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FacilityForm } from "@/app/facilities/FacilityForm";
import { Separator } from "@/components/ui/separator";
import { destroyFacility } from "@/lib/actions";
import { facilityFormSchema } from "@/lib/schemas";


type Props = { adr: fullAdr };

export default function AdrClientPage({adr}: Props) {

  // const defaultValues = facilityFormSchema.parse(facility);

  return (
    <div>
      <div>
        {/* ADR INFO */}
        <h2>ADR Info</h2>
        <span>
          <p>ID</p>
          <p>{adr.id}</p>
        </span>

        <span>
          <p>From Date</p>
          <p>{adr.from_date}</p>
        </span>

        <span>
          <p>To Date</p>
          <p>{adr.to_date}</p>
        </span>

        <h2>Facility Info</h2>
        <span>
          <p>DL ID</p>
          <p>{adr.facility.dl_id}</p>
        </span>

      </div>
      
      
    </div>
  )
}
