"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createCommissionRuleAction } from "../actions";

export default function CreateRulePage() {
  const [state, formAction, pending] = useActionState(createCommissionRuleAction, null);

  return (
    <div className="page">
      <div className="page-header">
        <Link href="/admin/commission-rules" className="link-btn">
          ← Back to Rules
        </Link>
        <h1>Add Commission Rule</h1>
        <p>Define commission percentage for a product type</p>
      </div>

      <div className="card" style={{ maxWidth: "600px" }}>
        <form action={formAction} className="form">
          {state?.error && <div className="error-box">{state.error}</div>}
          {state?.success && <div className="success-box">Commission rule created successfully!</div>}

          <div className="form-group">
            <label htmlFor="rule_name">Rule Name *</label>
            <input
              id="rule_name"
              name="rule_name"
              type="text"
              required
              disabled={pending}
              placeholder="e.g., Digital 25%, Physical 15%"
            />
          </div>

          <div className="form-group">
            <label htmlFor="product_type">Product Type *</label>
            <select id="product_type" name="product_type" required disabled={pending}>
              <option value="">Select product type</option>
              <option value="Physical">Physical Products</option>
              <option value="Digital">Digital Products</option>
              <option value="Service">Services</option>
              <option value="Subscription">Subscriptions</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="product_category">Product Category (Optional)</label>
            <input
              id="product_category"
              name="product_category"
              type="text"
              disabled={pending}
              placeholder="e.g., Electronics, Books"
            />
          </div>

          <div className="form-group">
            <label htmlFor="commission_percentage">Commission Percentage (%) *</label>
            <input
              id="commission_percentage"
              name="commission_percentage"
              type="number"
              step="0.01"
              min="0"
              max="100"
              required
              disabled={pending}
              placeholder="25"
            />
          </div>

          <div className="form-group">
            <label htmlFor="min_order_value">Minimum Order Value (Optional)</label>
            <input
              id="min_order_value"
              name="min_order_value"
              type="number"
              min="0"
              disabled={pending}
              placeholder="100000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="valid_from">Valid From (Optional)</label>
            <input id="valid_from" name="valid_from" type="date" disabled={pending} />
          </div>

          <div className="form-group">
            <label htmlFor="valid_to">Valid To (Optional)</label>
            <input id="valid_to" name="valid_to" type="date" disabled={pending} />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn" disabled={pending} style={{ backgroundColor: "var(--affiliate-primary)" }}>
              {pending ? "Creating..." : "Create Rule"}
            </button>
            <Link href="/admin/commission-rules" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
