
import { createClient } from "@/app/utils/supabase/server";
import { 
  Adr,
  Stage, 
  Facility, 
  Patient,
  Auditor,
  Submission,
  Decision,
  fullAdr,
  fullStage,
  fullSubmission,
  Srn, 
  fullSrn,
  Dcn,
  Payment,
} from '@/lib/definitions';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InfoPanel,
  InfoSpan,
  InfoMainHeader,
  InfoSubHeader,
  InfoCard,
} from '@/components/InfoPanel'
import { columns } from "./columns";
// import { DataTable } from "@/components/table/data-table";
import { AdrTable } from "./adrTable";
import { 
  LinkIcon, 
  ClockIcon,
  PencilSquareIcon,
  PencilIcon
 } from "@heroicons/react/24/outline";



export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  // ID is global_id in the database, not the primary key

  const { id } = await params
  const supabase = await createClient();
  // const [auditorRes, kpiRes] = await Promise.all([
  //   supabase
  //     .from("auditors")
  //     .select(`
  //       *
  //     `)
  //     .eq("id", id)
  //     .single(),

  //   supabase
  //     .rpc("get_auditor_kpis", { auditor_id: id }),

  // ])

  // const { data: auditor, error: auditorError } = auditorRes;
  // const { data: kpis, error: kpiError } = kpiRes;


  // Define the expected type for kpis
  type AuditorKpis = {
    active_adrs: number;
    awaiting_decision: number;
    pending_submission: number;
    total_submissions: number;
  };
    
  type AuditorKpisArgs = {
    q_auditor_id: string; // assuming UUID is represented as string in JS
  };

  
  const { data: auditor, error } = await supabase
    .from("auditors")
    .select("*")
    .eq("id", id)
    .single();

  // const { data: kpis } = await supabase
  //   .rpc("get_auditor_kpis", { q_auditor_id: id })
  //   .single();

  const { data: kpis, error: kpiError } = await supabase
    .rpc("get_auditor_kpis", { q_auditor_id: id })
    .single();
    

  // const { data: adrs } = await supabase
  const { data: adrs, error: adrError } = await supabase
    .from("adrs_with_latest_stage")
    // .select('*')
    .select('id, mrn, dl_id, facility_id, patient_id, from_date, to_date, stage, due_date, auditor_id')
    .is('submission_date', null)
    .eq('auditor_id', id)
    .order('due_date', { ascending: true })
    .limit(10)
  
    ;


  console.log("auditor", auditor)
  console.log("kpis", kpis)
  console.log("adrs", adrs, adrError)



  // console.log("auditor:", auditor);
  // Error handling
  if (error ) {
    // Handle error (e.g., show a message)
    return <div>Error loading Auditor.</div>;
  }
  // Temporary loading
  if (!auditor) {
    // Handle case where no facilities are found
    return <div>No Auditor found.</div>;
  }


  // Pass the id as a prop to the client component
  return (
    <div id="pageContainer" className="w-full h-full flex flex-col items-start justify-start space-y-4">
      {/* INFO PANEL */}
      <InfoPanel>
        <InfoMainHeader label={"Auditor"} link={""}/>
        
        <div className="flex flex-row justify-start items-center mt-1 mb-6">
          <p className="text-xs text-gray-500">{auditor.id}</p>
        </div>

        <InfoSpan label={"Name"} value={auditor.name} />
        <InfoSpan label={"Status"} value={auditor.active ? "Active" : "Inactive"} />

      </InfoPanel>
    

      {/* KPI CARDS */}
      <div className="flex flex-row justify-between items-center w-full space-x-4">
        <Card>
          <CardContent>
            <p className="text-2xl font-bold">{ kpis['active_adrs'] }</p>
            <h2 className="text-sm font-small text-gray-500">Active ADRs</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent> 
            {/* <PencilIcon className="h-8 w-6 text-blue-600" /> */}
            <p className="text-2xl font-bold">{ kpis['pending_submission'] }</p>
            <h2 className="text-sm font-small text-gray-500">Pending Submission</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            {/* <ClockIcon className="h-8 w-6 text-yellow-600" /> */}
            <p className="text-2xl font-bold">{ kpis['awaiting_decision'] }</p>
            <h2 className="text-sm font-small text-gray-500">Awaiting Decision</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-2xl font-bold">{ kpis['total_submissions'] }</p>
            <h2 className="text-sm font-small text-gray-500">Total Submissions</h2>
          </CardContent>
        </Card>
      </div>

      {/* AUDITOR ADRS */}
      <div className="flex flex-col justify-between items-start w-full space-x-4 border-2 border-black">
        <p className="px-4 pt-3 text-sm text-gray-500">Upcoming ADRs</p>
        {adrs ? <AdrTable data={adrs} columns={columns} /> : <></>}
      </div>
        
    </div>
  )
}