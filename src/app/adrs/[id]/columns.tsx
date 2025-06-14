"use client";

import { fullPayment } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";


export const columns: ColumnDef<fullPayment>[] = [
  {
    accessorKey: "payment.payment_date",
    header: "Date"
  },
  {
    accessorKey: "payment.srn",
    header: "SRN",
  },
  {
    accessorKey: "payment.payment_amount",
    header: "Amount"
  }
]