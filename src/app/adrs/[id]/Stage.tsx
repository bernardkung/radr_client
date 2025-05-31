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
 
function daysLeft(due_date: string) {
  return Math.ceil(
      (new Date(due_date).getTime() - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24)
    )
}

export function StageBar({ stage }: { stage: fullStage }) {
  const status = stage.decisions
    ? stage.decisions[0].decision
    : stage.submissions
      ? "Waiting"
      : "Preparing";

  const statusDiv = () => {
    switch (status) {
      case "Preparing":
        return (
          <div className="flex flex-col justify-start items-center flex-1 mx-4 w-12">
            <PencilSquareIcon className="h-8 w-6 text-blue-500" />
            <p className="text-xs text-gray-500">Preparing</p>
          </div>
        )
      case "Waiting":
        return (
          <div className="flex flex-col justify-start items-center flex-1 mx-4 w-12">
            <ClockIcon className="h-8 w-6 text-amber-500" />
            <p className="text-xs text-gray-500">Waiting</p>
          </div>
        )
      case "DENIED":
        return (
          <div className="flex flex-col justify-start items-center flex-1 mx-4 w-12">
            <XCircleIcon className="h-8 w-6 text-red-500" />
            <p className="text-xs text-gray-500">Denied</p>
          </div>
        )
      case "PAID IN FULL":
        return (
          <div className="flex flex-col justify-start items-center flex-1 mx-4 w-12">
            <CheckCircleIcon className="h-8 w-6 text-green-500" />
            <p className="text-xs text-gray-500">Approved</p>
          </div>
        )
      }
    }



  return (
    <div className="flex flex-row justify-between items-center rounded border-1 border-neutral-300 p-2 my-2">

      {/* Stage */}
      <div className="flex flex-col justify-start items-center flex-1 m-2 w-12 ">
        <p className="h-8 text-xl font-bold">{stage.stage}</p>
        <p className="text-xs text-gray-500">Stage</p>
      </div>

      {/* Status */}
      {statusDiv()}

      {/* Auditor */}
      <div className="flex flex-col justify-start items-center flex-3 mx-4">
        <p className="text-base h-6 mt-2 mb-1">
          <a href={`/auditors/${stage.submissions[0].auditor_id}`}>
            {stage.submissions[0].auditors.name}
          </a>
        </p>
        <p className="text-xs text-gray-500">Auditor</p>
      </div>

      {/* Due Date */}
      <div className="flex flex-col justify-start items-center flex-2 mx-4">
        <p className="text-lg h-6 my-1">
          {stage.due_date ? new Date(stage.due_date).toLocaleDateString("en-US") : ""}</p>
        <p className="text-xs text-gray-500">Due Date</p>
      </div>

      {/* Days Left */}
      <div className="flex flex-col justify-start items-center flex-2 mx-4">
        <p className="text-lg h-6 my-1">
          {daysLeft(stage.due_date)}
        </p>
        <p className="text-xs text-gray-500">Days Left</p>
      </div>

      {/* Expand Icon */}
      <div className="flex flex-col justify-start items-center flex-1 mx-4">
        <ChevronDownIcon className="h-8 w-6 text-gray-500" />
      </div>

      {/* Last Submission */}

      {/* Last Decision */}
    </div>
  )
}