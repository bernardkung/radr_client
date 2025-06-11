'use client';

import { Adr, fullAdr, fullStage } from "@/lib/definitions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FacilityForm } from "@/app/facilities/FacilityForm";
import { destroyFacility } from "@/lib/actions";
import { facilityFormSchema } from "@/lib/schemas";
import { 
  LinkIcon, 
  ChevronDownIcon,
  ClockIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
 } from "@heroicons/react/24/outline";
import { InfoSpan } from "./InfoPanel"
import { StageBanner, StageHistory, CollapsibleStageBanner } from "./Stage";

function daysLeft(due_date: string) {
  return Math.ceil(
      (new Date(due_date).getTime() - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24)
    )
}

type Props = { adr: fullAdr };

export default function AdrClientPage({adr}: Props) {

  // const defaultValues = facilityFormSchema.parse(facility);
  const fakeDeniedStage: fullStage = {
    id: "fake45",
    adr_id: adr.id,
    stage: '45',
    due_date: "2024-02-14T00:00:00Z",
    notification_date: "2024-01-01T00:00:00Z",
    submissions: [
      {
        id: "fakeSubmission",
        stage_id: "fake120",
        auditor_id: "4444444",
        submission_date: "2024-02-14T00:00:00Z",
        created_at: "2024-02-14T00:00:00Z",
        updated_at: "2024-02-14T00:00:00Z",
        auditors: {
          id: "4444444",
          name: "Taylor Doe"
        }
      }
    ],
    decisions: [
      {
        id: "fakeDecision",
        stage_id: "fake120",
        auditor_id: "4444444",
        decision_date: "2024-02-15T00:00:00Z",
        decision: "DENIED",
        created_at: "2024-02-15T00:00:00Z",
        updated_at: "2024-02-15T00:00:00Z"
      }
    ],
  }

  const fakePaidStage: fullStage = {
    id: "fakePaid",
    adr_id: adr.id,
    stage: '45',
    due_date: "2024-02-14T00:00:00Z",
    notification_date: "2024-01-01T00:00:00Z",
    submissions: [
      {
        id: "fakeSubmission",
        stage_id: "fake120",
        auditor_id: "4444444",
        submission_date: "2024-02-14T00:00:00Z",
        created_at: "2024-02-14T00:00:00Z",
        updated_at: "2024-02-14T00:00:00Z",
        auditors: {
          id: "4444444",
          name: "Taylor Doe"
        }
      }
    ],
    decisions: [
      {
        id: "fakeDecision",
        stage_id: "fake120",
        auditor_id: "4444444",
        decision_date: "2024-02-15T00:00:00Z",
        decision: "PAID IN FULL",
        created_at: "2024-02-15T00:00:00Z",
        updated_at: "2024-02-15T00:00:00Z"
      }
    ],
  }



  const fakePendingStage: fullStage = {
    id: "fake120",
    adr_id: adr.id,
    stage: '120',
    due_date: "2024-03-14T00:00:00Z",
    notification_date: "2024-02-14T00:00:00Z",
    submissions: [
      {
        id: "fakeSubmission",
        stage_id: "fake120",
        auditor_id: "4444444",
        created_at: "2024-02-14T00:00:00Z",
        updated_at: "2024-02-14T00:00:00Z",
        auditors: {
          id: "4444444",
          name: "Taylor Doe"
        }
      }
    ]
  }

  const fakeWaitingStage: fullStage = {
    id: "fake180",  
    adr_id: adr.id,
    stage: '180',
    due_date: "2024-04-14T00:00:00Z",
    notification_date: "2024-03-14T00:00:00Z",
    submissions: [
      {
        id: "fakeSubmission",
        stage_id: "fake120",
        auditor_id: "4444444",
        submission_date: "2024-02-14T00:00:00Z",
        created_at: "2024-02-14T00:00:00Z",
        updated_at: "2024-02-14T00:00:00Z",
        auditors: {
          id: "4444444",
          name: "Taylor Doe"
        }
      }
    ]
  }

  return (
    <div className="w-full h-full bg-neutral-300 m-0 p-auto flex flex-row align-start">
      <div className="p-8 ml-4 my-4 rounded-lg shadow w-96 max-w-lg bg-background">
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

        <Separator className="my-6 bg-neutral-300" />

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">Patient Name:</p>
          <p className="text-sm">{adr.patient.first_name} {adr.patient.last_name}</p>
        </div>

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">MRN:</p>
          <p className="text-sm">{adr.patient.mrn}</p>
        </div>

        <Separator className="my-6 bg-neutral-300" />

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">From Date:</p>
          <p className="text-sm">{adr.from_date}</p>
        </div>

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">To Date:</p>
          <p className="text-sm">{adr.to_date}</p>
        </div>

        <Separator className="my-6 bg-neutral-300" />

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">SRN:</p>
          <p className="text-sm">{"placeholder"}</p>
        </div>

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">DCN:</p>
          <p className="text-sm">{"placeholder"}</p>
        </div>

        <Separator className="my-6 bg-neutral-300" />

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


        <Separator className="my-6 bg-neutral-300" />

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

      <div className="px-6 py-8 m-4 rounded-lg shadow w-full bg-background flex flex-col justify-start align-start">

        <div className="flex flex-row justify-start items-center mb-1 ml-2">        
          <h1 className="text-base font-medium">Stages</h1>
        </div>

        <div>
          {adr.stages.map((stage, s) => (
            <CollapsibleStageBanner key={s} stage={stage} />
          ))}

        </div>
        

        

        

      </div>
      
      
    </div>
  )
}
