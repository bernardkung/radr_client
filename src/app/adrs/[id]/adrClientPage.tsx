'use client';

import { 
  Adr, 
  fullAdr, 
  fullStage,
  Payment,
  fullPayment
 } from "@/lib/definitions";
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
import { PaymentHistory } from './PaymentHistory';
import { formatMoney } from "@/lib/formats";

function daysLeft(due_date: string) {
  return Math.ceil(
      (new Date(due_date).getTime() - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24)
    )
}

type Props = { adr: fullAdr };

export default function AdrClientPage({adr}: Props) {

  const payments = (adr.srns ?? []).flatMap(srn =>{
    return (srn.payments ?? []).map((payment: Payment) => {
      return {
      srn: srn.srn,
      ...payment
      }
    })}
  ).sort((a, b) =>
    new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime()
  );;


  // Build SRN display
    // Determine last SRN
    // Collapsible SRN history


  // Build DCN display
    // Determine last DCN
    // Collapsible DCN history

  return (
    <div className="w-full h-full bg-neutral-300 m-0 p-auto flex flex-row align-start">

      {/* ADR INFO */}
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
          <p className="text-sm">{adr.srns[0].srn}</p>
        </div>

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">DCN:</p>
          <p className="text-sm">{adr.dcns[0].dcn}</p>
        </div>

        <Separator className="my-6 bg-neutral-300" />

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">Expected Reimbursement:</p>
          <p className="text-sm">{formatMoney(adr.expected_reimbursement)}</p>
        </div>

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">Total Payment:</p>
          <p className="text-sm">
            { formatMoney(
              payments.reduce((sum: number, payment: fullPayment) => sum + parseFloat(payment.payment_amount), 0)
            )}
          </p>
        </div>

        <div className="flex flex-row justify-start items-center">
          <p className="text-sm text-gray-500 mr-2">Current Balance:</p>
          <p className="text-sm">{formatMoney(
            adr.expected_reimbursement - payments.reduce((sum: number, payment: fullPayment) => sum + parseFloat(payment.payment_amount), 0)
            )}</p>
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

      <div className="flex flex-col justify-start align-center pr-8 w-2xl h-full">
        {/* STAGES */}
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

        {/* PAYMENT HISTORY */}
        <PaymentHistory payments={payments} />

      </div>

        

    </div>
  )
}
