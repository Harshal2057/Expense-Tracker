"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export const createTransaction = async (data) => {
  const textValue = data.title;
  const amountValue = data.amount;

  // validation
  if (!textValue || textValue === "" || !amountValue) {
    return { error: "text or amount is missing" };
  }

  const text = textValue.toString();
  const amount = parseFloat(amountValue.toString());

  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const transactionData = await prisma.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    revalidatePath("/");

    return {
      data: {
        title: transactionData.text,
        amount: transactionData.amount,
      },
    };

  } catch (error) {
    return { error: "Failed to create transaction" };
  }
};

export const getBalance = async() => {
  try {
    const {userId} = await auth();

    if (!userId) {
      return {error: "user not found"}
    }

    const transcations = await prisma.transaction.findMany({
      where:{userId}
    })

    const balance = transcations.reduce((sum , transaction) => sum + transaction.amount , 0)

    return {balance};
  } catch (error) {
    return {error:"Database error"}
  }
}