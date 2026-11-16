"use server";

import { createCommissionRule, updateCommissionRule } from "@/lib/erp/affiliate";
import { ErpError } from "@/lib/erp/client";

export async function createCommissionRuleAction(prevState: any, formData: FormData) {
  try {
    const rule_name = formData.get("rule_name")?.toString();
    const product_type = formData.get("product_type")?.toString();
    const product_category = formData.get("product_category")?.toString();
    const commission_percentage = formData.get("commission_percentage")?.toString();
    const min_order_value = formData.get("min_order_value")?.toString();
    const valid_from = formData.get("valid_from")?.toString();
    const valid_to = formData.get("valid_to")?.toString();

    if (!rule_name || !product_type || !commission_percentage) {
      return { error: "Rule name, product type, and commission percentage are required" };
    }

    const result = await createCommissionRule({
      rule_name,
      product_type,
      commission_percentage: parseFloat(commission_percentage),
      product_category: product_category || undefined,
      min_order_value: min_order_value ? parseFloat(min_order_value) : undefined,
      valid_from: valid_from || undefined,
      valid_to: valid_to || undefined,
    });

    return { success: true, rule: result };
  } catch (err) {
    const message = err instanceof ErpError ? err.message : err instanceof Error ? err.message : "Failed to create rule";
    return { error: message };
  }
}

export async function updateCommissionRuleAction(prevState: any, formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    if (!id) return { error: "Rule ID is required" };

    const commission_percentage = formData.get("commission_percentage")?.toString();
    const min_order_value = formData.get("min_order_value")?.toString();
    const valid_from = formData.get("valid_from")?.toString();
    const valid_to = formData.get("valid_to")?.toString();
    const status = formData.get("status")?.toString();

    const data: any = {};
    if (commission_percentage) data.commission_percentage = parseFloat(commission_percentage);
    if (min_order_value) data.min_order_value = parseFloat(min_order_value);
    if (valid_from) data.valid_from = valid_from;
    if (valid_to) data.valid_to = valid_to;
    if (status) data.status = status;

    const result = await updateCommissionRule(id, data);
    return { success: true, rule: result };
  } catch (err) {
    const message = err instanceof ErpError ? err.message : err instanceof Error ? err.message : "Failed to update rule";
    return { error: message };
  }
}
