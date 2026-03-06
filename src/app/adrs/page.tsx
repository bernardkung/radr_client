import { createClient } from "@/app/utils/supabase/client";

import { Button } from "@/components/ui/button";
import  Link from "next/link";
import { columns } from "./components/columns";
// import { adrTable  } from "./adrTable";
import { DataTable } from "@/components/table/data-table";
import { AdrTable } from "./components/adrTable";
import { Separator } from "@/components/ui/separator";





export default async function Page() {
  const supabase = await createClient();
  const { data: adrs, error } = await supabase
    .from("adrs")
    .select(`
      id,
      patient_id,
      facility_id,
      from_date,
      to_date,
      expected_reimbursement,
      active,
      created_at,
      updated_at,
      facilities(
        dl_id,
        dl_name),
      patients(
        mrn,
        first_name,
        last_name
        ),
      stages (
        *, 
        submissions (*), 
        decisions (*)
      )
    `).range(0, 99);
  // const { data:adrs, error } = await supabase.from('adrs_with_latest_stage').select('*');
  console.log(JSON.stringify(adrs?.[0], null, 2))

  // Error handling
  if (error) {
    // Handle error (e.g., show a message)
    console.error("Error loading ADRs:", error);
    return <div>Error loading ADRs.</div>;
  }
  // Temporary loading
  if (!adrs) {
    // Handle case where no adrs are found
    return <div>No ADRs found.</div>;
  }

  // console.log(adrs);


  return (
    <div className="flex h-screen v-full w-full flex-col items-center justify-start px-3 py-4 md:px-2">
      <div className="flex h-screen v-full w-full mx-auto px-auto flex-col items-start justify-start m-4 px-4">
        <h3 className="text-2xl font-bold mb-4 px-4">ADRs</h3>
        <Separator className="my-4" />

        {/* <DataTable data={adrs} columns={columns}/> */}
        <AdrTable data={adrs} columns={columns}/>

        <Link href="/adrs/create">
          <Button variant="outline" className="mt-4">
            Create ADR
          </Button>
        </Link>
      </div>
    </div>
  )
}
