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
  {
    accessorKey: "placeholder",
    header: "SRN"
  },
  {
    accessorKey: "placeholder",
    header: "MRN",
  },
  {
    accessorKey: "placeholder",
    header: "Facility ID"
  },
  {
    accessorKey: "placeholder",
    header: "From Date"
  },
  {
    accessorKey: "placeholder",
    header: "To Date"
  },
  {
    accessorKey: "placeholder",
    header: "Stage"
  },
  {
    accessorKey: "placeholder",
    header: "Due Date"
  },
  {
    accessorKey: "placeholder",
    header: "Submission Date"
  },
  {
    accessorKey: "placeholder",
    header: "Decision"
  },
  {
    accessorKey: "placeholder",
    header: "Decision Date"
  }
]