'use server';

import { z } from "zod/v4";
import { createClient } from "@/app/utils/supabase/client";
import { facilityFormSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type facilityFormValues = z.output<typeof facilityFormSchema>;


export async function createFacility(data: facilityFormValues) {

  // parsing already happened client-side, validation is not needed here
  // Parse the form data using the schema
  // const parsedData = facilityFormSchema.safeParse(data);
  // if (!parsedData.success) {
  //   console.error("Validation errors:", parsedData.error);
  //   return;
  // }

  const supabase = createClient();
  const { error } = await supabase.from("facilities").insert(data);

  if (error) {
    console.error("Error inserting data:", error);
    return  { error };
  }
    
  revalidatePath('/facilities');
  redirect('/facilities');
}

export async function updateFacility(data: facilityFormValues) {

  if (!data.id) {
    throw new Error("Missing primary key (ID) for facility update");
  }

  const { id, ...updateFields } = data;

  const supabase = createClient();

  const { error } = await supabase
    .from("facilities")
    .update(updateFields)
    .eq("id", id);

  if (error) {
    console.error("Error updating data:", error);
    return { error };
  }

  revalidatePath('/facilities');
  redirect('/facilities');
}



export async function destroyFacility(global_id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('facilities')
    .delete()
    .eq('global_id', global_id)

  if (error) {
    console.error('error', error)
  }

  revalidatePath('/facilities');
  redirect('/facilities');
}