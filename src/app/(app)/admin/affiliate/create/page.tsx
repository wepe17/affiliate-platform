"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createAffiliateAction } from "../actions";

export default function CreateAffiliatePage() {
  const [state, formAction, pending] = useActionState(createAffiliateAction, null);

  return (
    <div className="page">
      <div className="page-header">
        <Link href="/admin/affiliate" className="link-btn">
          ← Back to Affiliates
        </Link>
        <h1>Add New Affiliate</h1>
        <p>Create a new affiliate account</p>
      </div>

      <div className="card" style={{ maxWidth: "600px" }}>
        <form action={formAction} className="form">
          {state?.error && <div className="error-box">{state.error}</div>}
          {state?.success && <div className="success-box">Affiliate created successfully!</div>}

          <div className="form-group">
            <label htmlFor="affiliate_name">Name *</label>
            <input id="affiliate_name" name="affiliate_name" type="text" required disabled={pending} placeholder="Affiliate name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input id="email" name="email" type="email" required disabled={pending} placeholder="email@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" disabled={pending} placeholder="+62..." />
          </div>

          <div className="form-group">
            <label htmlFor="bank_name">Bank Name</label>
            <input id="bank_name" name="bank_name" type="text" disabled={pending} placeholder="BCA, Mandiri, etc." />
          </div>

          <div className="form-group">
            <label htmlFor="account_number">Account Number</label>
            <input id="account_number" name="account_number" type="text" disabled={pending} placeholder="0123456789" />
          </div>

          <div className="form-group">
            <label htmlFor="account_holder_name">Account Holder Name</label>
            <input
              id="account_holder_name"
              name="account_holder_name"
              type="text"
              disabled={pending}
              placeholder="Name on bank account"
            />
          </div>

          <div className="form-group">
            <label htmlFor="commission_rate">Commission Rate (%)</label>
            <input
              id="commission_rate"
              name="commission_rate"
              type="number"
              step="0.01"
              min="0"
              max="100"
              disabled={pending}
              placeholder="10"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn" disabled={pending} style={{ backgroundColor: "var(--affiliate-primary)" }}>
              {pending ? "Creating..." : "Create Affiliate"}
            </button>
            <Link href="/admin/affiliate" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
