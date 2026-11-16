"use server";

import { createPaymentBatch, recordPayment } from "@/lib/erp/affiliate";
import { ErpError } from "@/lib/erp/client";

export async function createPayoutBatchAction(prevState: any, formData: FormData) {
  try {
    const affiliate = formData.get("affiliate")?.toString();
    const period = formData.get("period")?.toString();

    if (!affiliate || !period) {
      return { error: "Affiliate and period are required" };
    }

    const result = await createPaymentBatch({
      affiliate,
      period,
    });

    return { success: true, batch: result };
  } catch (err) {
    const message = err instanceof ErpError ? err.message : err instanceof Error ? err.message : "Failed to create batch";
    return { error: message };
  }
}

export async function recordPaymentAction(prevState: any, formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    const payment_date = formData.get("payment_date")?.toString();
    const reference_number = formData.get("reference_number")?.toString();
    const payment_method = formData.get("payment_method")?.toString();

    if (!id || !payment_date || !reference_number) {
      return { error: "ID, payment date, and reference number are required" };
    }

    const result = await recordPayment(id, {
      payment_date,
      reference_number,
      payment_method: payment_method || undefined,
    });

    return { success: true, payment: result };
  } catch (err) {
    const message = err instanceof ErpError ? err.message : err instanceof Error ? err.message : "Failed to record payment";
    return { error: message };
  }
}
