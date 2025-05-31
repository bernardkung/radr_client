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
import { 
  LinkIcon, 
  ChevronDownIcon,
  ClockIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
 } from "@heroicons/react/24/outline";
import { InfoSpan } from "./InfoPanel"

function daysLeft(due_date: string) {
  return Math.ceil(
      (new Date(due_date).getTime() - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24)
    )
}

type Props = { adr: fullAdr };

export default function AdrClientPage({adr}: Props) {

  // const defaultValues = facilityFormSchema.parse(facility);

  return (
    <div className="w-full h-full bg-neutral-300 m-0 p-auto flex flex-row align-start">
      <div className="p-8 m-4 rounded shadow w-md max-w-lg bg-background">
        {/* ADR INFO */}
        <div className="flex flex-row justify-start items-center mb-1">        
          <h1 className="text-base font-medium">ADR Info</h1>
        </div>

        <div className="flex flex-row justify-start items-center mt-1 mb-6">
          <p className="text-xs text-gray-500">{adr.id}</p>
        </div>

        <InfoSpan 
          label="Facility"
          value={`${adr.facility.dl_id} - ${adr.facility.dl_name}`}
        />

        <Separator className="my-1" />

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">Patient Name:</p>
          <p className="text-sm">{adr.patient.first_name} {adr.patient.last_name}</p>
        </div>

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">MRN:</p>
          <p className="text-sm">{adr.patient.mrn}</p>
        </div>

        <Separator className="my-1" />

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">From Date:</p>
          <p className="text-sm">{adr.from_date}</p>
        </div>

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">To Date:</p>
          <p className="text-sm">{adr.to_date}</p>
        </div>

        <Separator className="my-1" />

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">SRN:</p>
          <p className="text-sm">{"placeholder"}</p>
        </div>

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">DCN:</p>
          <p className="text-sm">{"placeholder"}</p>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-row justify-start items-center my-2">
          <h2 className="text-sm font-medium">Facility Info</h2>
          <a href={`/facilities/${adr.facility.global_id}`}>
            <LinkIcon className="h-3 w-3 mx-2"/>
          </a>
        </div>

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">Name:</p>
          <p className="text-sm">{adr.facility.dl_id} - {adr.facility.dl_name}</p>
        </div>


        <Separator className="my-6" />

        <div className="flex flex-row justify-start items-center my-2">
          <h2 className="text-sm font-medium">Patient Info</h2>
          <a href={`/patients/${adr.patient.mrn}`}>
            <LinkIcon className="h-3 w-3 mx-2"/>
          </a>
        </div>


        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">Name:</p>
          <p className="text-sm">{adr.patient.first_name} {adr.patient.last_name}</p>
        </div>

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">MRN:</p>
          <p className="text-sm">{adr.patient.mrn}</p>
        </div>

      </div>

      <div className="p-8 m-4 rounded shadow w-full bg-background">
        <div className="flex flex-row justify-start items-center mb-1 ml-2">        
          <h1 className="text-base font-medium">Stages</h1>
        </div>

        <div>
          {adr.stages.map((stage, s) => (
            <div key={s} className="flex flex-row justify-start items-center rounded border-1 border-neutral-300 p-2 my-2">

              {/* Stage */}
              <div className="flex flex-col justify-start items-center m-2">
                <p className="h-8 w-6 text-xl font-bold">{stage.stage}</p>
                <p className="text-xs text-gray-500">Stage</p>
              </div>

              {/* Status */}
              <div className="flex flex-col justify-start items-center mx-4">

                <PencilSquareIcon className="h-8 w-6 text-blue-500" />
                <p className="text-xs text-gray-500">Preparing</p>

                {/* <ClockIcon className="h-8 w-6 text-amber-500" />
                <p className="text-xs text-gray-500">Waiting</p> */}

                {/* <CheckCircleIcon className="h-8 w-6 text-green-500" />
                <p className="text-xs text-gray-500">Approved</p> */}

                {/* <XCircleIcon className="h-8 w-6 text-red-500" />
                <p className="text-xs text-gray-500">Denied</p> */}
              </div>

              {/* Auditor */}
              <div className="flex flex-col justify-start items-center mx-4">
                <p className="text-lg h-6 my-1">
                  <a href={`/auditors/${stage.submissions[0].auditor_id}`}>
                    {stage.submissions[0].auditors.name}
                  </a>
                </p>
                <p className="text-xs text-gray-500">Auditor</p>
              </div>

              {/* Due Date */}
              <div className="flex flex-col justify-start items-center mx-4">
                <p className="text-lg h-6 my-1">
                  {stage.due_date ? new Date(stage.due_date).toLocaleDateString("en-US") : ""}</p>
                <p className="text-xs text-gray-500">Due Date</p>
              </div>

              {/* Days Left */}
              <div className="flex flex-col justify-start items-center mx-4">
                <p className="text-lg h-6 my-1">
                  {daysLeft(stage.due_date)}
                </p>
                <p className="text-xs text-gray-500">Days Left</p>
              </div>

              {/* Last Submission */}

              {/* Last Decision */}


            </div>
          ))}
        </div>


      </div>
      
      
    </div>
  )
}
