"use client";

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { LinkIcon } from "@heroicons/react/24/outline";
import { fullAdr } from "@/lib/definitions";



export const columns: ColumnDef<fullAdr>[] = [
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      const adr = row.original;
      return (
        <Button variant="link" className="p-0 flex justify-center items-center w-full">
          <Link href={`/adrs/${adr.id}`}>
              <LinkIcon className="h-4 w-4" />
          </Link>
        </Button>
      )
    },
    meta: {
      headerClassName: 'text-center',
    },
    
  },
  // {
  //   accessorKey: "placeholder",
  //   header: "SRN"
  // },
  {
    accessorKey: "mrn",
    header: "MRN",
  },
  {
    accessorKey: "dl_id",
    header: "Facility ID"
  },
  {
    accessorKey: "from_date",
    header: "From Date"
  },
  {
    accessorKey: "to_date",
    header: "To Date"
  },
  {
    accessorKey: "stage",
    header: "Stage"
  },
  {
    accessorKey: "due_date",
    header: "Due Date"
  },
  {
    accessorKey: "auditor_id",
    header: "Auditor ID"
  },
  // {
  //   accessorKey: "submission_date",
  //   header: "Submission Date"
  // },
  // {
  //   accessorKey: "decision",
  //   header: "Decision"
  // },
  // {
  //   accessorKey: "decision_date",
  //   header: "Decision Date"
  // }
]