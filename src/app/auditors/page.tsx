

import { Auditor } from "@/lib/definitions";
import { createClient } from "../utils/supabase/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { Basic } from "next/font/google";


export default async function Page() {
  const supabase = await createClient();
  const { data: auditors, error } = await supabase.from("auditors").select();
  
  // list of filter columns
  const filterProps = [
    {
      id: "active",
      title: "Active",
      options: [true, false],
    }
  ];
  // for each filter column, list of unique values


  // Error handling
  if (error) {
    // Handle error (e.g., show a message)
    return <div>Error loading auditors.</div>;
  }
  // Temporary loading
  if (!auditors) {
    // Handle case where no auditors are found
    return <div>No auditors found.</div>;
  }





  // const auditorsTable = BasicTable(columns, auditors);
  
  return (
    <div className="flex h-screen v-full w-full flex-col items-center justify-start px-3 py-4 md:px-2">

      <DataTable data={auditors} columns={columns} />

    </div>
  )
}
