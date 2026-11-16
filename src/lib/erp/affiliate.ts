import "server-only";
import { listDocs, getDoc, createDoc, updateDoc } from "./client";

export interface Affiliate {
  name: string;
  affiliate_name: string;
  email: string;
  phone?: string;
  status: "Active" | "Inactive" | "Suspended";
  commission_rate?: number;
  join_date?: string;
  bank_name?: string;
  account_number?: string;
  account_holder_name?: string;
  total_earnings: number;
  total_paid: number;
  pending_payout: number;
}

export interface CommissionRule {
  name: string;
  rule_name: string;
  status: "Active" | "Inactive";
  product_type: "Physical" | "Digital" | "Service" | "Subscription";
  product_category?: string;
  commission_percentage: number;
  min_order_value?: number;
  valid_from?: string;
  valid_to?: string;
}

export interface AffiliateSale {
  name: string;
  affiliate: string;
  product_type: "Physical" | "Digital" | "Service" | "Subscription";
  product_name?: string;
  status: "Pending" | "Confirmed" | "Paid" | "Cancelled";
  sales_amount: number;
  commission_percentage: number;
  commission_amount: number;
  sale_date: string;
  invoice_reference?: string;
}

export interface CommissionPayment {
  name: string;
  affiliate: string;
  period: string;
  payment_status: "Draft" | "Submitted" | "Paid" | "Cancelled";
  payment_date?: string;
  total_commission_amount: number;
  payment_method?: string;
  reference_number?: string;
}

export async function listAffiliates(filters?: any[], limit = 25): Promise<Affiliate[]> {
  return listDocs<Affiliate>("Affiliate", {
    fields: ["name", "affiliate_name", "email", "status", "total_earnings", "total_paid", "pending_payout"],
    filters,
    limit,
    orderBy: "creation desc",
  });
}

export async function getAffiliate(id: string): Promise<Affiliate> {
  return getDoc<Affiliate>("Affiliate", id);
}

export async function createAffiliate(data: {
  affiliate_name: string;
  email: string;
  phone?: string;
  status?: string;
  commission_rate?: number;
  bank_name?: string;
  account_number?: string;
  account_holder_name?: string;
}): Promise<Affiliate> {
  return createDoc<Affiliate>("Affiliate", {
    affiliate_name: data.affiliate_name,
    email: data.email,
    phone: data.phone,
    status: data.status || "Active",
    commission_rate: data.commission_rate,
    bank_name: data.bank_name,
    account_number: data.account_number,
    account_holder_name: data.account_holder_name,
    join_date: new Date().toISOString().split("T")[0],
  });
}

export async function updateAffiliate(id: string, data: Partial<Affiliate>): Promise<Affiliate> {
  return updateDoc<Affiliate>("Affiliate", id, data);
}

export async function approveAffiliate(id: string): Promise<Affiliate> {
  return updateDoc<Affiliate>("Affiliate", id, { status: "Active" });
}

export async function suspendAffiliate(id: string): Promise<Affiliate> {
  return updateDoc<Affiliate>("Affiliate", id, { status: "Suspended" });
}

export async function listCommissionRules(filters?: any[]): Promise<CommissionRule[]> {
  return listDocs<CommissionRule>("Affiliate Commission Rule", {
    fields: ["name", "rule_name", "product_type", "product_category", "commission_percentage", "status"],
    filters,
    orderBy: "creation desc",
  });
}

export async function getCommissionRule(id: string): Promise<CommissionRule> {
  return getDoc<CommissionRule>("Affiliate Commission Rule", id);
}

export async function createCommissionRule(data: {
  rule_name: string;
  product_type: string;
  commission_percentage: number;
  product_category?: string;
  min_order_value?: number;
  valid_from?: string;
  valid_to?: string;
}): Promise<CommissionRule> {
  return createDoc<CommissionRule>("Affiliate Commission Rule", {
    rule_name: data.rule_name,
    product_type: data.product_type,
    commission_percentage: data.commission_percentage,
    product_category: data.product_category,
    min_order_value: data.min_order_value,
    valid_from: data.valid_from,
    valid_to: data.valid_to,
    status: "Active",
  });
}

export async function updateCommissionRule(id: string, data: Partial<CommissionRule>): Promise<CommissionRule> {
  return updateDoc<CommissionRule>("Affiliate Commission Rule", id, data);
}

export async function listAffiliateSales(filters?: any[], limit = 50): Promise<AffiliateSale[]> {
  return listDocs<AffiliateSale>("Affiliate Sale", {
    fields: ["name", "affiliate", "product_type", "product_name", "status", "sales_amount", "commission_amount", "sale_date"],
    filters,
    limit,
    orderBy: "sale_date desc",
  });
}

export async function getAffiliateSale(id: string): Promise<AffiliateSale> {
  return getDoc<AffiliateSale>("Affiliate Sale", id);
}

export async function listPayments(filters?: any[]): Promise<CommissionPayment[]> {
  return listDocs<CommissionPayment>("Commission Payment", {
    fields: ["name", "affiliate", "period", "payment_status", "total_commission_amount", "payment_date", "reference_number"],
    filters,
    orderBy: "creation desc",
  });
}

export async function getPayment(id: string): Promise<CommissionPayment> {
  return getDoc<CommissionPayment>("Commission Payment", id);
}

export async function createPaymentBatch(data: {
  affiliate: string;
  period: string;
}): Promise<CommissionPayment> {
  return createDoc<CommissionPayment>("Commission Payment", {
    affiliate: data.affiliate,
    period: data.period,
    payment_status: "Draft",
  });
}

export async function recordPayment(
  id: string,
  data: {
    payment_date: string;
    reference_number: string;
    payment_method?: string;
  },
): Promise<CommissionPayment> {
  return updateDoc<CommissionPayment>("Commission Payment", id, {
    payment_status: "Paid",
    payment_date: data.payment_date,
    reference_number: data.reference_number,
    payment_method: data.payment_method,
  });
}

export async function getAffiliateEarningsSummary(id: string): Promise<{
  total_earnings: number;
  total_paid: number;
  pending_payout: number;
}> {
  const affiliate = await getAffiliate(id);
  return {
    total_earnings: affiliate.total_earnings,
    total_paid: affiliate.total_paid,
    pending_payout: affiliate.pending_payout,
  };
}
