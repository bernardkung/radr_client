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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { Separator } from "@/components/ui/separator";
import { Facility } from "@/lib/definitions";
import { facilityFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createFacility, updateFacility } from "@/lib/actions";
import { z } from "zod/v4";
import { useParams, usePathname } from 'next/navigation';
import { Link } from "lucide-react";



type facilityFormValues = z.input<typeof facilityFormSchema>

// const defaultValues: Partial<facilityFormValues> = {
//   // global_id: "111111",
//   // dl_id: "",
//   // dl_name: "1111",
//   // mac: "",
//   // revenue_center: "NORTH",
//   // npi: "",
//   // created_at: new Date().toISOString(),
//   // updated_at: new Date().toISOString(),
// }


export function FacilityForm(
  // defaultValues?: Partial<facilityFormValues>
  { defaultValues }: { defaultValues?: Partial<facilityFormValues> }
) {

  const params = useParams();
  const pathname = usePathname();

  const isEdit = pathname.includes("/edit");
  const isCreate = pathname.includes("/create");

  // Defining the form
  const form = useForm<facilityFormValues>({
    resolver: zodResolver(facilityFormSchema),
    defaultValues: defaultValues,
    mode: "onSubmit",
  })

  // 2. Define a submit handler.
  function onSubmit(data: z.output<typeof facilityFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (isEdit) {
      console.log("DFV", defaultValues, data)
      updateFacility(data)
    } else if (isCreate) {
      createFacility(data)
    }
  }

  // if (!facility) {
  //   return <div>Facility not found</div>
  // }
    
  return (
    <div className="rounded-md border flex flex-wrap h-screen v-full  w-full max-w-xl flex-col items-center justify-start px-3 py-4 ml-px:4 md:px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-xl flex-col items-start justify-start flex flex-wrap ">
          
          <FormField
            control={form.control}
            name={"global_id"}
            render={({ field }) => (
              <FormItem> 
                <FormLabel>{"Global ID"}</FormLabel>
                <FormControl>
                  <Input {...field} className="w-96" disabled={!isEdit} />
                </FormControl>
                {/* <FormDescription>
                  This is the {key} of the facility.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"dl_id"}
            render={({ field }) => (
              <FormItem> 
                <FormLabel>{"DL ID"}</FormLabel>
                <FormControl>
                  <Input {...field} className="w-96" disabled={!isEdit} />
                </FormControl>
                <FormDescription>
                  This is the facility ID.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"dl_name"}
            render={({ field }) => (
              <FormItem> 
                <FormLabel>{"DL Name"}</FormLabel>
                <FormControl>
                  <Input {...field} className="w-96" disabled={!isEdit} />
                </FormControl>
                <FormDescription>
                  This is the current facility name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"mac"}
            render={({ field }) => (
              <FormItem> 
                <FormLabel>{"MAC"}</FormLabel>
                <FormControl>
                  <Input {...field} className="w-96" disabled={!isEdit} />
                </FormControl>
                {/* <FormDescription>
                  This is the {key} of the facility.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"revenue_center"}
            render={({ field }) => (
              <FormItem> 
                <FormLabel>{"Revenue Center"}</FormLabel>
                <FormControl>
                  <Input {...field} className="w-96" disabled={!isEdit} />
                </FormControl>
                {/* <FormDescription>
                  This is the {key} of the facility.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"npi"}
            render={({ field }) => (
              <FormItem> 
                <FormLabel>{"NPI"}</FormLabel>
                <FormControl>
                  <Input {...field} className="w-96" disabled={!isEdit} />
                </FormControl>
                {/* <FormDescription>
                  This is the {key} of the facility.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"created_at"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Created At"}</FormLabel>
                <FormControl>
                  <Input {...field} className="w-96"  disabled={!isEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"updated_at"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Updated At"}</FormLabel>
                <FormControl>
                  <Input {...field} className="w-96"  disabled={!isEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEdit 
            ? <Button type="submit">Update</Button> 
            : isCreate
              ? <Button type="submit">Create</Button>
              : null
          }
        </form>
      </Form>
    </div>
  )
  
}
