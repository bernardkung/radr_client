"use client";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { Facility } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const facilityFormSchema = z.object({
  global_id: z.number().gte(100000).lte(999999),
  dl_id: z.number().gte(1000).lte(999999),
  dl_name: z.string(),
  mac: z.string(),
  revenue_center: z.string(),
  npi: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

type ProfileFormValues = z.infer<typeof facilityFormSchema>


export function ProfileForm(facility: Facility) {
  // 1. Define your form.
  const form = useForm<z.input<typeof facilityFormSchema>>({
    resolver: zodResolver(facilityFormSchema),
    defaultValues: facility,
  })



  // 2. Define a submit handler.
  function onSubmit(values: z.output<typeof facilityFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  // if (!facility) {
  //   return <div>Facility not found</div>
  // }
    
  return (
    <div className="rounded-md border flex flex-wrap h-screen v-full  w-full max-w-xl flex-col items-center justify-start px-3 py-4 ml-px:4 md:px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-xl flex-col items-start justify-start flex flex-wrap ">
          {Object.entries(facility).map(([key, value]) => (
            <FormField
              key={key}
              control={form.control}
              name={key as any}
              render={({ field }) => (
                <FormItem> 
                  <FormLabel>{key.toUpperCase()}</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-96"/>
                  </FormControl>
                  {/* <FormDescription>
                    This is the {key} of the facility.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}



          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
  
}
