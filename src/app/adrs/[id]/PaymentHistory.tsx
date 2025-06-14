"use client";

import { fullAdr, fullPayment } from "@/lib/definitions"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  formatDate,
  formatMoney,
} from "@/lib/formats"


export function PaymentHistory({ payments }: { payments: fullPayment[] }) {

  const totalPayment = payments.reduce((sum: number, payment: fullPayment) => sum + parseFloat(payment.payment_amount), 0)

  return (
    <div className="px-6 py-8 m-4 rounded-lg shadow w-full bg-background flex flex-col justify-start align-start">

      <div className="flex flex-row justify-start items-center mb-1 ml-2">        
        <h1 className="text-base font-medium">Payment History</h1>
      </div>
        
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SRN</TableHead>
            <TableHead className="text-center">Payment Date</TableHead>
            <TableHead className="text-right">Payment Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map(payment=>(
            <TableRow>
              <TableCell>{payment.srn}</TableCell>
              <TableCell className="text-center">{formatDate(payment.payment_date)}</TableCell>
              <TableCell className="text-right">{formatMoney(payment.payment_amount)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>

            <TableCell className="text-right">{formatMoney(totalPayment)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>




    </div>
  )

}


