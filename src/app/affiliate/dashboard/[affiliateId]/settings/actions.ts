"use server";

import { updateAffiliate } from "@/lib/erp/affiliate";
import { ErpError } from "@/lib/erp/client";

export async function updateAffiliateSettingsAction(prevState: any, formData: FormData) {
  try {
    const affiliateId = formData.get("affiliateId")?.toString();
    if (!affiliateId) {
      return { error: "Affiliate ID is required" };
    }

    const data: any = {};

    const affiliate_name = formData.get("affiliate_name")?.toString();
    if (affiliate_name) data.affiliate_name = affiliate_name;

    const phone = formData.get("phone")?.toString();
    if (phone) data.phone = phone;

    const bank_name = formData.get("bank_name")?.toString();
    if (bank_name) data.bank_name = bank_name;

    const account_number = formData.get("account_number")?.toString();
    if (account_number) data.account_number = account_number;

    const account_holder_name = formData.get("account_holder_name")?.toString();
    if (account_holder_name) data.account_holder_name = account_holder_name;

    if (Object.keys(data).length === 0) {
      return { error: "No changes to save" };
    }

    const result = await updateAffiliate(affiliateId, data);
    return { success: true, affiliate: result };
  } catch (err) {
    const message = err instanceof ErpError ? err.message : err instanceof Error ? err.message : "Failed to update settings";
    return { error: message };
  }
}
