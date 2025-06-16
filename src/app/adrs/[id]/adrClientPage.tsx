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
import { InfoSpan, InfoTitle } from "./InfoPanel"
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
    <div className="w-full h-full bg-neutral-50 m-0 p-auto flex flex-row align-start">

      {/* ADR INFO */}
      <div className="p-8 ml-4 my-4 shadow w-96 max-w-lg bg-background border-2 border-black">
        {/* ADR INFO */}
        <div className="flex flex-row justify-start items-center mb-1">        
          <h1 className="text-base font-medium">ADR Info</h1>
        </div>

        <div className="flex flex-row justify-start items-center mt-1 mb-6">
          <p className="text-xs text-gray-500">{adr.id}</p>
        </div>


        <Separator className="my-6 bg-zinc-400" />


        <InfoTitle label={"Facility Info"} link={`/facilities/${adr.facility.global_id}`} />

        <InfoSpan 
          label="Facility"
          value={`${adr.facility.dl_id} - ${adr.facility.dl_name}`}
        />

        <Separator className="my-6 bg-zinc-400" />

        <InfoTitle label={"Patient Info"} link={`/patients/${adr.patient.mrn}`} />

        <InfoSpan label={"Patient Name"} value={`${adr.patient.first_name} ${adr.patient.last_name}`} />
        <InfoSpan label={"MRN"} value={`${adr.patient.mrn}`} />

        <Separator className="my-6 bg-zinc-400" />

        <InfoTitle label={"Claim Info"} link={``} />

        <InfoSpan label={"From Date"} value={`${adr.from_date}`} />
        <InfoSpan label={"To Date"} value={`${adr.to_date}`} />

        <Separator className="my-2 " />
 
        <InfoSpan label={"SRN"} value={`${adr.srns[0].srn}`} />
        <InfoSpan label={"DCN"} value={`${adr.dcns[0].dcn}`} />

        <Separator className="my-2 " />

        <InfoSpan label={"Expected Reimbursement"} value={formatMoney(adr.expected_reimbursement)} />
        <InfoSpan 
          label={"Total Payment"} 
          value={formatMoney(
            payments.reduce((sum: number, payment: fullPayment) => sum + parseFloat(payment.payment_amount), 0)
          )} 
        />
        <InfoSpan 
          label={"Current Balance"} 
          value={formatMoney(
            adr.expected_reimbursement - payments.reduce((sum: number, payment: fullPayment) => sum + parseFloat(payment.payment_amount), 0)
          )} 
        />

        <Separator className="my-2 " />

        <InfoSpan label={"Status"} value={adr.active ? "Active" : "Inactive"} />

        <Separator className="my-6 bg-zinc-400" />


      </div>

      <div className="flex flex-col justify-start align-center pr-8 w-2xl h-full">
        {/* STAGES */}
        <div className="px-6 py-8 m-4 shadow w-full bg-background flex flex-col justify-start align-start border-2 border-black">

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
