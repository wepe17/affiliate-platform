"use server";

import { createAffiliate } from "@/lib/erp/affiliate";
import { ErpError } from "@/lib/erp/client";

export async function signupAffiliateAction(prevState: any, formData: FormData) {
  try {
    const affiliate_name = formData.get("affiliate_name")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();
    const bank_name = formData.get("bank_name")?.toString();
    const account_number = formData.get("account_number")?.toString();
    const account_holder_name = formData.get("account_holder_name")?.toString();

    if (!affiliate_name || !email || !bank_name || !account_number || !account_holder_name) {
      return {
        error: "Please fill in all required fields (name, email, bank name, account number, account holder)",
      };
    }

    // Validate email format
    if (!email.includes("@")) {
      return { error: "Please enter a valid email address" };
    }

    const result = await createAffiliate({
      affiliate_name,
      email,
      phone,
      bank_name,
      account_number,
      account_holder_name,
      status: "Inactive", // Start as Inactive, requires admin approval
    });

    return { success: true, affiliateId: result.name };
  } catch (err) {
    let message = "Failed to create account";
    if (err instanceof ErpError) {
      message = err.message;
      // Handle specific errors
      if (message.includes("duplicate") || message.includes("unique")) {
        message = "This email address is already registered";
      }
    } else if (err instanceof Error) {
      message = err.message;
    }
    return { error: message };
  }
}
