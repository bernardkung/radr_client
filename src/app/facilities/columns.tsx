"use client";

import { Facility } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import { 
  EllipsisHorizontalIcon, 
  EllipsisVerticalIcon,
  ArrowsUpDownIcon,
  FunnelIcon,
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

export const columns: ColumnDef<Facility>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px] mr-1"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px] mr-1"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
  {
    accessorKey: "global_id",
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Global ID
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "dl_id",
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Facility ID
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "dl_name",    
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Facility Name
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "mac",    
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            MAC
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "revenue_center",    
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Revenue Center
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "npi",    
    header: ({ column }) => {
      return (
        <span>
          NPI
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
    accessorKey: "created_at",    
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    accessorKey: "updated_at",    
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Updated
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    filterFn: 'includesString',
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const auditor = row.original;

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
              <Link href={`/facilities/${auditor.global_id}`}>View Item</Link>
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]