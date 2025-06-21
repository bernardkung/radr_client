"use client";

import { Auditor } from "@/lib/definitions";
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
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<Auditor>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <span>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
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
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Active
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </span>
      )
    },
    cell: ({ row }) => {
      const active = row.getValue("active")
      const formatted = active ? "Active" : "Inactive"
 
      return <div className="text-center">{formatted}</div>
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
              <Link href={`/auditors/${auditor.id}`}>
                View Auditor
              </Link>
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]