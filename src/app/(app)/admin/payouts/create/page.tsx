"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { createPayoutBatchAction } from "../actions";
import { listAffiliates } from "@/lib/erp/affiliate";
import { use } from "react";

export default function CreatePayoutBatchPage() {
  const [state, formAction, pending] = useActionState(createPayoutBatchAction, null);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    listAffiliates().then((data) => {
      setAffiliates(data);
      setLoaded(true);
    });
  }

  return (
    <div className="page">
      <div className="page-header">
        <Link href="/admin/payouts" className="link-btn">
          ← Back to Payouts
        </Link>
        <h1>Create Payout Batch</h1>
        <p>Generate commission payments for a specific period</p>
      </div>

      <div className="card" style={{ maxWidth: "600px" }}>
        <form action={formAction} className="form">
          {state?.error && <div className="error-box">{state.error}</div>}
          {state?.success && <div className="success-box">Payout batch created successfully!</div>}

          <div className="form-group">
            <label htmlFor="period">Period *</label>
            <input
              id="period"
              name="period"
              type="text"
              required
              disabled={pending}
              placeholder="e.g., November 2026"
            />
          </div>

          <div className="form-group">
            <label htmlFor="affiliate">Affiliate *</label>
            <select id="affiliate" name="affiliate" required disabled={pending}>
              <option value="">Select affiliate</option>
              {affiliates.map((aff) => (
                <option key={aff.name} value={aff.name}>
                  {aff.affiliate_name} ({aff.name}) - Pending: Rp{" "}
                  {new Intl.NumberFormat("id-ID", {
                    minimumFractionDigits: 0,
                  }).format(aff.pending_payout)}
                </option>
              ))}
            </select>
          </div>

          <div style={{ backgroundColor: "var(--affiliate-primary-soft)", padding: "1rem", borderRadius: "0.375rem", marginBottom: "1rem" }}>
            <p style={{ color: "var(--affiliate-primary)", fontSize: "0.875rem" }}>
              💡 <strong>Tip:</strong> Select an affiliate to create a commission payment batch. The system will calculate commissions from sales in this period.
            </p>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn" disabled={pending} style={{ backgroundColor: "var(--affiliate-primary)" }}>
              {pending ? "Creating..." : "Create Batch"}
            </button>
            <Link href="/admin/payouts" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
