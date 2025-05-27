

import { Facility } from "@/lib/definitions";
import { createClient } from "@/app/utils/supabase/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import  Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { Separator } from "@/components/ui/separator";



export default async function Page() {
  const supabase = await createClient();
  const { data: facilities, error } = await supabase.from("facilities").select();
  
  // Error handling
  if (error) {
    // Handle error (e.g., show a message)
    return <div>Error loading facilities.</div>;
  }
  // Temporary loading
  if (!facilities) {
    // Handle case where no auditors are found
    return <div>No facilities found.</div>;
  }



  return (
    <div className="flex h-screen v-full w-full flex-col items-center justify-start px-3 py-4 md:px-2">
      <div className="flex h-screen v-full w-full mx-auto px-auto flex-col items-start justify-start ">
        <h3 className="text-2xl font-bold mb-4">Facilities</h3>
        <Separator className="my-4" />
        <Link href="/facilities/create">
          <Button variant="outline" className="mb-4">
            Create Facility
          </Button>
        </Link>
        <DataTable data={facilities} columns={columns}/>
      </div>
    </div>
  )
}
