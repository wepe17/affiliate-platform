"use server";

import { createAffiliate, updateAffiliate, approveAffiliate, suspendAffiliate } from "@/lib/erp/affiliate";
import { ErpError } from "@/lib/erp/client";

export async function createAffiliateAction(prevState: any, formData: FormData) {
  try {
    const affiliate_name = formData.get("affiliate_name")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();
    const bank_name = formData.get("bank_name")?.toString();
    const account_number = formData.get("account_number")?.toString();
    const account_holder_name = formData.get("account_holder_name")?.toString();
    const commission_rate = formData.get("commission_rate")?.toString();

    if (!affiliate_name || !email) {
      return { error: "Name and email are required" };
    }

    const result = await createAffiliate({
      affiliate_name,
      email,
      phone,
      bank_name,
      account_number,
      account_holder_name,
      commission_rate: commission_rate ? parseFloat(commission_rate) : undefined,
    });

    return { success: true, affiliate: result };
  } catch (err) {
    const message = err instanceof ErpError ? err.message : err instanceof Error ? err.message : "Failed to create affiliate";
    return { error: message };
  }
}

export async function updateAffiliateAction(prevState: any, formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    if (!id) return { error: "Affiliate ID is required" };

    const affiliate_name = formData.get("affiliate_name")?.toString();
    const phone = formData.get("phone")?.toString();
    const bank_name = formData.get("bank_name")?.toString();
    const account_number = formData.get("account_number")?.toString();
    const account_holder_name = formData.get("account_holder_name")?.toString();
    const status = formData.get("status")?.toString();

    const data: any = {};
    if (affiliate_name) data.affiliate_name = affiliate_name;
    if (phone) data.phone = phone;
    if (bank_name) data.bank_name = bank_name;
    if (account_number) data.account_number = account_number;
    if (account_holder_name) data.account_holder_name = account_holder_name;
    if (status) data.status = status;

    const result = await updateAffiliate(id, data);
    return { success: true, affiliate: result };
  } catch (err) {
    const message = err instanceof ErpError ? err.message : err instanceof Error ? err.message : "Failed to update affiliate";
    return { error: message };
  }
}

export async function approveAffiliateAction(id: string) {
  try {
    await approveAffiliate(id);
    return { success: true };
  } catch (err) {
    const message = err instanceof ErpError ? err.message : err instanceof Error ? err.message : "Failed to approve affiliate";
    return { error: message };
  }
}

export async function suspendAffiliateAction(id: string) {
  try {
    await suspendAffiliate(id);
    return { success: true };
  } catch (err) {
    const message = err instanceof ErpError ? err.message : err instanceof Error ? err.message : "Failed to suspend affiliate";
    return { error: message };
  }
}
