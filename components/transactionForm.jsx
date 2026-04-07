"use client"; // ✅ ADDED (important for React Hook Form in Next.js)

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

//  Shadcn UI imports
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter, // (kept)
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createTransaction } from "@/modules/transaction/actions";

// ❌ REMOVED unused imports (InputGroup, Description etc.)

// ✅ CHANGED (better validation)
const formSchema = z.object({
  title: z
    .string()
    .min(1, "Transaction title must be at least 1 char")
    .max(20, "Transaction title must be at most 20 char"),

amount: z.preprocess(
  (val) => Number(val),
  z.number()
)
   
});


export const TransactionForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: 0,
    },
  });

  // ✅ ADDED submit handler
const onSubmit = async () => {
  const { data: resData, error } = await createTransaction(data);

  if (error) {
    toast.error(error);
  } else {
    toast.success("Transaction added successfully");
    form.reset(); // optional but good UX
  }
};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
      </CardHeader>

      <CardContent>
        {/* ✅ ADDED form handler */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* TITLE */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Title</FieldLabel>

                  {/* ✅ unchanged */}
                  <Input {...field} />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* AMOUNT */}
            <Controller
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Amount</FieldLabel>

                  {/* ✅ FIXED INPUT */}
                  <Input
                    type="number"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(e.target.value)
                    }
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* ✅ ADDED submit button */}
          <div className="mt-4">
            <Button type="submit">Add Transaction</Button>
          </div>
        </form>
      </CardContent>

      {/* optional footer */}
      <CardFooter />
    </Card>
  );
};

export default TransactionForm;