import FacilityClientPage from "./FacilityClientPage";
import { createClient } from "@/app/utils/supabase/server";


export default async function Page({ params }: { params: Promise<{ id: number }> }) {

  const { id } = await params
  const supabase = await createClient();
  const { data: facility, error } = await supabase
    .from("facilities")
    .select()
    .eq("global_id", id)
    .single();

  // Error handling
  if (error) {
    // Handle error (e.g., show a message)
    return <div>Error loading facility.</div>;
  }
  // Temporary loading
  if (!facility) {
    // Handle case where no auditors are found
    return <div>No facility found.</div>;
  }



  // Pass the id as a prop to the client component
  return (
    <>
      <FacilityClientPage facility={facility} />
    </>
  )
}