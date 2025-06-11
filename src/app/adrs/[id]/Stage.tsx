import '@/app/globals.css';
import { Stage, Submission, Decision, fullStage } from "@/lib/definitions";
import { 
  LinkIcon, 
  ChevronDownIcon,
  ClockIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InboxArrowDownIcon,
  PaperClipIcon,
  ScaleIcon,
 } from "@heroicons/react/24/outline";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { iso } from 'zod/v4';
 
function daysLeft(due_date: string) {
  return Math.ceil(
      (new Date(due_date).getTime() - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24)
    )
}


export function StageContainerBar1({label, value}: {label?: string, value: React.ReactNode}) {
  return (
    <div className="flex flex-col justify-between items-center mr-2 h-12 w-16 rounded-md border-0 border-neutral-300 text-nowrap first:ml-0 last:mr-0">
      <p className="text-lg grow flex items-center justify-center h-6 pt-1">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  )
}

export function StageContainerBar2({label, value}: {label: string, value: React.ReactNode}) {
  return (
    <div className="flex flex-col justify-between items-center mr-2 h-12 w-24 rounded border-0 border-neutral-300 text-nowrap first:ml-0 last:mr-0">
      <p className="text-lg grow flex items-center justify-center h-6 pt-1">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  )
}

export function StageContainerBar3({label, value, link}: {label: string, value: React.ReactNode, link: string}) {
  return (
    <div className="flex flex-col justify-between items-left flex-3 mr-2 px-2 h-12 min-w-24 rounded border-0 border-neutral-300 text-nowrap first:ml-0 last:mr-0">
      <p className="text-lg grow flex items-center justify-start h-6 pt-1">
        {link ? <a href={link}>{value}</a> : value}
      </p>
      { label ? <p className="text-xs text-gray-400">{label}</p> : null}
    </div>
  )
}

export function StageStatus ({status}:{status: String}) {
  switch (status) {
    case "Preparing":
      return (
        <StageContainerBar1
          label="Preparing"
          value={ <PencilSquareIcon className="h-8 w-6 text-blue-600" /> }
        />
      )
    case "Waiting":
      return (
        <StageContainerBar1
          label="Waiting"
          value={ <ClockIcon className="h-8 w-6 text-yellow-600" /> }
        />
      )
    case "DENIED":
      return (
        <StageContainerBar1 
          label="Denied"
          value={ <XCircleIcon className="h-8 w-6 text-red-700" /> }
        />
      )
    case "PAID IN FULL":
      return (
        <StageContainerBar1 
          label="Approved"
          value={ <CheckCircleIcon className="h-8 w-6 text-green-600" /> }
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

export function StageDaysWaited (stage: fullStage) {
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

export function StageDecisionDate (stage: fullStage) {
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

  
export function StageBanner({ stage, ...props }: { stage: fullStage } & React.HTMLAttributes<HTMLDivElement>) {
  const isOpen = props['data-state'] === 'open';
  
  const status = stage.decisions && stage.decisions.length > 0
    ? stage.decisions[0].decision
    : stage.submissions && stage.submissions[0].submission_date
      ? "Waiting"
      : "Preparing";

  const StageContent = () => {
    switch (status) {
      case "Preparing":
        return (
          <div className="flex flex-row justify-stretch items-center flex-2">
            <StageDueDate {...stage} />
            <StageDaysLeft {...stage} />
            <StageAuditor {...stage} />
          </div>
        )
      case "Waiting":
        return (
          <div className="flex flex-row justify-stretch items-center flex-2">
            <StageSubmissionDate {...stage} />
            <StageDaysWaited {...stage} />
          </div>
        )
      default:
        return (
          <div className="flex flex-row justify-stretch items-center flex-2">
            <StageDecisionDate {...stage} />
            <StageDecision {...stage} />
          </div>
        )
      }
  }


  return (
    <div 
      {...props} 
      className="flex flex-row justify-between items-center rounded-md border-0 border-neutral-300 w-full bg-white"
    >

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
      {/* <div className="flex flex-col justify-between items-center flex-0 mx-4 mr-0 rounded border-1 border-neutral-300 w-20">
        <ChevronDownIcon className="h-8 w-6 text-gray-500" />
      </div> */}
      <StageContainerBar1
        value={ isOpen 
          ? <ChevronDownIcon className="h-8 w-6 text-gray-500 rotate-180" />
          : <ChevronDownIcon className="h-8 w-6 text-gray-500" /> 
        }
      />

    </div>
  )
}

export function CollapsibleStageBanner({ stage, ...props }: { stage: fullStage } & React.HTMLAttributes<HTMLDivElement>) {

  return (        
    <div className="flex flex-row justify-between items-center rounded-md border-1 border-neutral-300 p-2 my-2 w-full bg-white shadow-sm">
      <Collapsible className="w-full">
        <CollapsibleTrigger className="w-full" asChild>
          <StageBanner stage={stage} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="pb-2">
            <Separator className="mt-2 mb-3 bg-neutral-300" />
            <StageHistory stage={stage} /> 
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}



export function EventContainer({ content }: { content: React.ReactNode }) {
  return (
    <div className="text-sm flex flex-row justify-center last:justify-start items-center border-0 border-neutral-300 bg-white w-16 px-1 first:pl-2 last:pr-2 mx-1 first:ml-0 last:mr-0 last:flex-1 first:rounded-l-sm last:rounded-r-sm">
      {content}
    </div>
  )
}

export function EventBanner({ eventDate, eventLogo, eventType, eventDetail }: { eventDate: string, eventLogo: React.ReactNode, eventType: string, eventDetail: string }) {
   
  return (
    <div className="flex flex-row justify-start items-center rounded-sm border-1 border-neutral-300 w-full bg-white p-1 mt-1 first:mt-0">
      <EventContainer 
        content={ new Date(eventDate).toLocaleDateString("en-US", {
          year: "2-digit",
          month: "numeric",
          day: "numeric",
        }) }
      />
      {/* <EventContainer
        content={eventType}
      /> */}
      <EventContainer
        content={eventLogo}
      />
      <EventContainer
        content={eventDetail}
      />
    </div>
  )
}


export function StageHistory({ stage }: { stage: fullStage }) {
  // list each submission and decision in a stage
  function getEventLogo(eventType: "Notification" | "Submission" | "Decision") {
    const key ={
      "Notification": <InboxArrowDownIcon className="size-5 text-emerald-600" />,
      "Submission": <PaperClipIcon className="size-5 text-blue-600" />,
      "Decision": <ScaleIcon className="size-5 text-amber-600" />,
    }
    return key[eventType]
  }

    // Build a list of events (notification, submissions, decisions) and sort by date
    type Event = {
      type: "Notification" | "Submission" | "Decision",
      date: string,
      detail: string,
      logo: React.ReactNode,
    };

    const events = []
    
    // Add submission banners
    if (stage.submissions && stage.submissions.length > 0) {
      events.push(
        ...stage.submissions.map(submission => ({
          type: "Submission",
          date: submission.submission_date,
          detail: `Submitted by ${submission.auditors.name}`,
          logo: getEventLogo("Submission"),
        }))
      );
    }

    // Add decision banners
    if (stage.decisions && stage.decisions.length > 0) {
      events.push(
        ...stage.decisions.map(decision => ({
          type: "Decision",
          date: decision.decision_date,
          detail: `"${decision.decision}" decision received`,
          logo: getEventLogo("Decision"),
        }))
      );
    }

    // Add the notification event at the beginning
    events.unshift({
      type: "Notification",
      date: stage.notification_date,
      detail: `${stage.stage} Stage started`,
      logo: getEventLogo("Notification"),
    });

    // Sort events by date
    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
      <div className="flex flex-col justify-start items-start w-full">
        {events.map((event, e) => (
          <EventBanner
            key={e}
            eventDate={event.date}
            eventLogo={event.logo}
            eventType={event.type}
            eventDetail={event.detail}
          />
        ))}
      </div>
    )


  // return (
  //   <div className="flex flex-col justify-start items-start w-full">
  //     <EventBanner
  //       eventDate={stage.notification_date}
  //       eventLogo={getEventLogo("Notification")}
  //       eventType="Notification"
  //       eventDetail={`${stage.stage} Stage started`}
  //     />
  //     <EventBanner
  //       eventDate={stage.submissions ? stage.submissions[0].submission_date : ""}
  //       eventLogo={getEventLogo("Submission")}
  //       eventType="Submission"
  //       eventDetail={`Submitted by ${stage.submissions ? stage.submissions[0].auditors.name : ""}`}
  //     />
  //     <EventBanner
  //       eventDate={stage.decisions ? stage.decisions[0].decision_date : ""}
  //       eventLogo={getEventLogo("Decision")}
  //       eventType="Decision"
  //       eventDetail={`"${stage.decisions ? stage.decisions[0].decision : ""}" decision received`}
  //     />
  //   </div>
  // )
}