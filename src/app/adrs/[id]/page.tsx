import AdrClientPage from './adrClientPage';
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
  fullSubmission
} from '@/lib/definitions';



export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  // ID is global_id in the database, not the primary key

  const { id } = await params
  const supabase = await createClient();
  const { data: adr, error } = await supabase
    .from("adrs")
    .select(`
      *,
      facilities (id, dl_id, dl_name, global_id),
      patients (id, mrn, first_name, last_name),
      stages (
        *,
        submissions (*, auditors (*)),
        decisions (*)
      )
    `)
    .eq("id", id)
    .single();
    
  const fullAdr: fullAdr = {
    ...adr,
    facility: adr.facilities as Facility,
    patient: adr.patients as Patient,
    stages: (adr.stages as fullStage[]).map((stage: fullStage) => ({
      ...stage,
      // submissions: stage.submissions || [],
      submissions: (stage.submissions as fullSubmission[]).map((submission: fullSubmission) => ({
        ...submission,
        auditor: submission.auditor as Auditor
      })) || [],
      decisions: stage.decisions || []
    }))
  };

  console.log("adr:", adr);
  // Error handling
  if (error) {
    // Handle error (e.g., show a message)
    return <div>Error loading ADR.</div>;
  }
  // Temporary loading
  if (!adr) {
    // Handle case where no facilities are found
    return <div>No ADR found.</div>;
  }


  // Pass the id as a prop to the client component
  return (
    <div className="w-full h-full bg-foreground m-0 p-auto">
      <AdrClientPage adr={fullAdr} />
    </div>
  )
}