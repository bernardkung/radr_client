"use client";

import { Adr } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { 
  EllipsisHorizontalIcon, 
  EllipsisVerticalIcon,
  ArrowsUpDownIcon,
  FunnelIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";  
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<Adr>[] = [
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
    accessorKey: "facilities.dl_id",
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            DL ID
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    cell: ({ row }) => {
      const adr = row.original;
      return (
        <p className="text-center">
          {adr.facilities?.dl_id || "N/A"}
        </p>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "mrn",
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            MRN
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  // {
  //   accessorKey: "patients.first_name",
  //   header: ({ column }) => {
  //     return (
  //       <span>
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           First Name
  //           <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
  //         </Button>
  //       </span>
  //     )
  //   },
  //   filterFn: 'includesString',
  // },
  // {
  //   accessorKey: "patients.last_name",
  //   header: ({ column }) => {
  //     return (
  //       <span>
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Last Name
  //           <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
  //         </Button>
  //       </span>
  //     )
  //   },
  //   filterFn: 'includesString',
  // },
  {
    accessorKey: "from_date",    
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            From Date
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "to_date",    
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            To Date
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "expected_reimbursement",    
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Expected Reimbursement
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "active",    
    header: ({ column }) => {
      return (
        <span>
          Active
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "stage",    
    header: ({ column }) => {
      return (
        <span>
          Stage
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "submission_date",    
    header: ({ column }) => {
      return (
        <span>
          Submission Date
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "Auditor",    
    header: ({ column }) => {
      return (
        <span>
          Auditor
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "decision",    
    header: ({ column }) => {
      return (
        <span>
          Decision
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "decision_date",    
    header: ({ column }) => {
      return (
        <span>
          Decision Date
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  // {
  //   accessorKey: "created_at",    
  //   header: ({ column }) => {
  //     return (
  //       <span>
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Created At
  //           <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
  //         </Button>
  //       </span>
  //     )
  //   },
  //   filterFn: 'includesString',
  // },
  // {
  //   accessorKey: "updated_at",    
  //   header: ({ column }) => {
  //     return (
  //       <span>
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Last Updated
  //           <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
  //         </Button>
  //       </span>
  //     )
  //   },
  //   filterFn: 'includesString',
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const adr = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/adrs/${adr.id}`}>View Item</Link>
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]