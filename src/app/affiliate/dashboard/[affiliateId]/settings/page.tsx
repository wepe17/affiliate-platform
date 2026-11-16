"use client";

import Link from "next/link";
import { useActionState, use } from "react";
import { updateAffiliateSettingsAction } from "./actions";

interface Props {
  params: Promise<{ affiliateId: string }>;
}

export default function AffiliateSettingsPage({ params }: Props) {
  const { affiliateId } = use(params);
  const [state, formAction, pending] = useActionState(updateAffiliateSettingsAction, null);

  return (
    <div className="page">
      <div className="page-header">
        <Link href={`/affiliate/dashboard/${affiliateId}`} className="link-btn">
          ← Back to Dashboard
        </Link>
        <h1>Account Settings</h1>
        <p>Update your profile and payment information</p>
      </div>

      <div className="card" style={{ maxWidth: "600px" }}>
        <form action={formAction} className="form">
          <input type="hidden" name="affiliateId" value={affiliateId} />

          {state?.error && <div className="error-box">{state.error}</div>}
          {state?.success && <div className="success-box">Settings updated successfully!</div>}

          <fieldset disabled={pending}>
            <legend style={{ fontWeight: "600", marginBottom: "1rem" }}>Personal Information</legend>

            <div className="form-group">
              <label htmlFor="affiliate_name">Full Name</label>
              <input
                id="affiliate_name"
                name="affiliate_name"
                type="text"
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+62..."
              />
            </div>

            <fieldset style={{ marginTop: "2rem", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
              <legend style={{ fontWeight: "600", marginBottom: "1rem" }}>Bank Information</legend>

              <div className="form-group">
                <label htmlFor="bank_name">Bank Name</label>
                <select id="bank_name" name="bank_name">
                  <option value="">Select bank</option>
                  <option value="BCA">BCA</option>
                  <option value="Mandiri">Mandiri</option>
                  <option value="BNI">BNI</option>
                  <option value="BTN">BTN</option>
                  <option value="CIMB Niaga">CIMB Niaga</option>
                  <option value="Permata">Permata</option>
                  <option value="Danamon">Danamon</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="account_number">Account Number</label>
                <input
                  id="account_number"
                  name="account_number"
                  type="text"
                  placeholder="0123456789"
                />
              </div>

              <div className="form-group">
                <label htmlFor="account_holder_name">Account Holder Name</label>
                <input
                  id="account_holder_name"
                  name="account_holder_name"
                  type="text"
                  placeholder="Name on bank account"
                />
              </div>
            </fieldset>

            <button
              type="submit"
              className="btn"
              disabled={pending}
              style={{ backgroundColor: "var(--affiliate-primary)", marginTop: "2rem" }}
            >
              {pending ? "Saving..." : "Save Changes"}
            </button>
          </fieldset>
        </form>
      </div>

      <div className="card" style={{ maxWidth: "600px", marginTop: "2rem" }}>
        <h2>Help & Support</h2>
        <p style={{ marginBottom: "1rem" }}>Need help with your account?</p>
        <ul style={{ lineHeight: "2" }}>
          <li>
            <a href="mailto:support@example.com" className="link-btn">
              Contact Support
            </a>
          </li>
          <li>
            <a href="/faq" className="link-btn">
              FAQ & Resources
            </a>
          </li>
          <li>
            <Link href={`/affiliate/dashboard/${affiliateId}`} className="link-btn">
              Back to Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
