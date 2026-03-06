import { createClient } from "@/app/utils/supabase/client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Dashboard() {

  // Data Query
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
    `);
    
  const activeAdrs = adrs?.filter(adr => adr.active) || [];
  const dueSoonAdrs = adrs?.filter(adr => {
    if (!adr.active) return false;
  })


  return (
    <>
      Dashboard
      <Card>
        <CardHeader>
          <CardTitle>Active ADRs</CardTitle>
          {/* <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent>
          <p>{activeAdrs.length} Active ADRs</p>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </>
  )
}