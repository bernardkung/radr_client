

import { Separator } from "@/components/ui/separator"
import { FacilityForm } from "@/app/facilities/FacilityForm";
import { facilityFormSchema } from "@/schemas";


export default async function Page() {
  // const blankValues = {
  //   global_id: "",
  //   dl_id: "",
  //   dl_name: "",
  //   mac: "",
  //   revenue_center: "",
  //   npi: "",
  //   created_at: new Date().toISOString(),
  //   updated_at: new Date().toISOString(),
  // };
  // const defaultValues = facilityFormSchema.parse(blankValues);

  return (
    <main>
      <div>
        <h3 className="text-lg font-medium">Create Facility</h3>
        <p className="text-sm text-muted-foreground">
          This ia form for entering a new facility into the database.
        </p>
      </div>
      <Separator />
      <FacilityForm defaultValues={{}} />
    </main>
  );
}