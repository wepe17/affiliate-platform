"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { getAffiliate } from "@/lib/erp/affiliate";
import { updateAffiliateAction, suspendAffiliateAction, approveAffiliateAction } from "../actions";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditAffiliatePage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateAffiliateAction, null);

  return (
    <div className="page">
      <div className="page-header">
        <Link href={`/admin/affiliate/${id}`} className="link-btn">
          ← Back to Affiliate
        </Link>
        <h1>Edit Affiliate</h1>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2>Basic Information</h2>
          <form action={formAction} className="form">
            <input type="hidden" name="id" value={id} />

            {state?.error && <div className="error-box">{state.error}</div>}
            {state?.success && <div className="success-box">Affiliate updated successfully!</div>}

            <div className="form-group">
              <label htmlFor="affiliate_name">Name</label>
              <input
                id="affiliate_name"
                name="affiliate_name"
                type="text"
                disabled={pending}
                placeholder="Affiliate name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                disabled={pending}
                placeholder="+62..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="bank_name">Bank Name</label>
              <input
                id="bank_name"
                name="bank_name"
                type="text"
                disabled={pending}
                placeholder="BCA, Mandiri, etc."
              />
            </div>

            <div className="form-group">
              <label htmlFor="account_number">Account Number</label>
              <input
                id="account_number"
                name="account_number"
                type="text"
                disabled={pending}
                placeholder="0123456789"
              />
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

            <button type="submit" className="btn" disabled={pending} style={{ backgroundColor: "var(--affiliate-primary)" }}>
              {pending ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        <div className="card">
          <h2>Quick Actions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button
              className="btn"
              style={{ backgroundColor: "#ef4444" }}
              onClick={async () => {
                if (confirm("Suspend this affiliate?")) {
                  await suspendAffiliateAction(id);
                  router.refresh();
                }
              }}
            >
              Suspend Affiliate
            </button>
            <button
              className="btn"
              style={{ backgroundColor: "#10b981" }}
              onClick={async () => {
                if (confirm("Activate this affiliate?")) {
                  await approveAffiliateAction(id);
                  router.refresh();
                }
              }}
            >
              Activate Affiliate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
