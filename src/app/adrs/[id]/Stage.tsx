import '@/app/globals.css';
import { Stage, fullStage } from "@/lib/definitions";
import { 
  LinkIcon, 
  ChevronDownIcon,
  ClockIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
 } from "@heroicons/react/24/outline";
import React from 'react';
 
function daysLeft(due_date: string) {
  return Math.ceil(
      (new Date(due_date).getTime() - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24)
    )
}


export function StageContainerBar1({label, value}: {label: string, value: React.ReactNode}) {
  return (
    <div className="flex flex-col justify-between items-center flex-0 mx-4 h-16 w-xl first:ml-0 last:mr-0 rounded border-1 border-neutral-300">
      <p className="text-lg h-6 my-1">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}

export function StageContainerBar2({label, value}: {label: string, value: React.ReactNode}) {
  return (
    <div className="flex flex-col justify-between items-center flex-2 mx-4 h-16 w-14 first:ml-0 last:mr-0 rounded border-1 border-neutral-300">
      <p className="text-lg h-6 my-1">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}

export function StageContainerBar3({label, value, link}: {label: string, value: React.ReactNode, link: string}) {
  return (
    <div className="flex flex-col justify-between items-center flex-3 mx-4 h-16 w-14 first:ml-0 last:mr-0 rounded border-1 border-neutral-300">
      <p className="text-base h-6 mt-2 mb-1">
        {link ? <a href={link}>{value}</a> : value}
      </p>
      { label ? <p className="text-xs text-gray-500">{label}</p> : null}
    </div>
  )
}

export function StageStatus ({status}:{status: String}) {
  switch (status) {
    case "Preparing":
      return (
        <StageContainerBar1
          label="Preparing"
          value={ <PencilSquareIcon className="h-8 w-6 text-blue-500" /> }
        />
      )
    case "Waiting":
      return (
        <StageContainerBar1
          label="Waiting"
          value={ <ClockIcon className="h-8 w-6 text-amber-500" /> }
        />
      )
    case "DENIED":
      return (
        <StageContainerBar1 
          label="Denied"
          value={ <XCircleIcon className="h-8 w-6 text-red-500" /> }
        />
      )
    case "PAID IN FULL":
      return (
        <StageContainerBar1 
          label="Approved"
          value={ <CheckCircleIcon className="h-8 w-6 text-green-500" /> }
        />
      )
    }
  }

export function StageDueDate (stage: fullStage) {
  return (
    <StageContainerBar2
      label="Due Date"
      value={stage.due_date ? new Date(stage.due_date).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      }) : ""}
    
    />
  )
}


export function StageDaysLeft (stage: fullStage) {
  return (
    <StageContainerBar2
      label="Days Left"
      value={daysLeft(stage.due_date).toString()}
    />
  )
}

export function StageAuditor (stage: fullStage) {
  return (  
    <StageContainerBar3
      label="Auditor"
      value={stage.submissions && stage.submissions.length > 0 ? stage.submissions[0].auditors.name : "N/A"}
      link={stage.submissions && stage.submissions.length > 0 ? `/auditors/${stage.submissions[0].auditor_id}` : ""}
    />
  )
}

export function StageSubmissionDate (stage: fullStage) {
  return (
    <StageContainerBar2
      label="Submission Date"
      value={stage.submissions && stage.submissions.length > 0 ? new Date(stage.submissions[0].submission_date).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      }) : "N/A"} 
    />
  )
}

export function  StageDaysWaited (stage: fullStage) {
  return (
    <StageContainerBar2
      label="Days Waited" 
      value={stage.submissions && stage.submissions.length > 0 ? 
        Math.ceil(
          (new Date().getTime() - new Date(stage.submissions[0].submission_date).getTime()) / (1000 * 60 * 60 * 24)
        ).toString()
      : "N/A"}
    />
  )
}

export function  StageDecisionDate (stage: fullStage) {
  return (
    <StageContainerBar2
      label="Decision Date"
      value={stage.decisions && stage.decisions.length > 0 ? new Date(stage.decisions[0].decision_date).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      }) : "N/A"}
    />
  )
}

export function  StageDecision (stage: fullStage) {
  return (
    <StageContainerBar3
      label="Decision"
      value={stage.decisions && stage.decisions.length > 0 ? stage.decisions[0].decision : "N/A"}
      link={stage.decisions && stage.decisions.length > 0 ? `/decisions/${stage.decisions[0].id}` : ""}
    />
  )
}

  
export function StageBar({ stage }: { stage: fullStage }) {
  const status = stage.decisions
    ? stage.decisions[0].decision
    : stage.submissions
      ? "Waiting"
      : "Preparing";

  const StageContent = () => {
    switch (status) {
      case "Preparing":
        return (
          <div className="flex flex-row justify-stretch items-center flex-2 mx-4">
            <StageDueDate {...stage} />
            <StageDaysLeft {...stage} />
            <StageAuditor {...stage} />
          </div>
        )
      case "Waiting":
        return (
          <div className="flex flex-row justify-stretch items-center flex-2 mx-4">
            <StageSubmissionDate {...stage} />
            <StageDaysWaited {...stage} />
          </div>
        )
      default:
        return (
          <div className="flex flex-row justify-stretch items-center flex-2 mx-4">
            <StageDecisionDate {...stage} />
            <StageDecision {...stage} />
          </div>
        )
      }
  }


  return (
    <div className="flex flex-row justify-between items-center rounded border-1 border-neutral-300 p-2 my-2 h-20">

      {/* Stage */}
      <StageContainerBar1
        label="Stage"
        value={stage.stage}
      />

      {/* Status */}
      <StageStatus status={status} />
      
      {/* Content */}
      <StageContent />

      {/* Expand Icon */}
      <div className="flex flex-col justify-between items-center flex-0 mx-4 mr-0 rounded border-1 border-neutral-300 w-20">
        <ChevronDownIcon className="h-8 w-6 text-gray-500" />
      </div>

    </div>
  )
}