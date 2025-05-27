'use client';

import { Facility } from "@/lib/definitions";
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


type Props = { facility: Facility };

export default function FacilityClientPage({facility}: Props) {

  const defaultValues = facilityFormSchema.parse(facility);

  return (

    <div className="flex h-screen v-full w-full flex-col items-start justify-start mx-20 px-3 py-4 md:px-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/facilities">Facilities</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Facility #{facility.global_id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h3 className="text-2xl font-bold mb-4">{facility.dl_id} - {facility.dl_name}</h3>
      <p className="text-sm text-muted-foreground mb-4">Facility Information</p>
      <Separator />
      <div className="rounded-md border  w-full max-w-xl">
        { <FacilityForm defaultValues={defaultValues} />}
      </div>

      <Button 
        variant={"secondary"} 
        className="mt-4" 
      >
        <Link href={`/facilities/${facility.global_id}/edit`}>
          Edit Facility
        </Link>
      </Button>

      <Button 
        variant={"destructive"} 
        className="mt-4" 
        onClick={() => destroyFacility(facility.global_id)}
      >
        Delete Facility
      </Button>

    </div>

  )
}
