"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signupAffiliateAction } from "./actions";

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signupAffiliateAction, null);

  if (state?.success) {
    return (
      <div className="page">
        <div className="card" style={{ maxWidth: "600px", margin: "2rem auto" }}>
          <h1 style={{ color: "var(--affiliate-primary)", marginBottom: "1rem" }}>✓ Signup Successful!</h1>
          <p style={{ marginBottom: "1rem" }}>
            Welcome to our affiliate program! Your account has been created and is pending admin approval.
          </p>

          <div style={{ backgroundColor: "var(--affiliate-primary-soft)", padding: "1rem", borderRadius: "0.375rem", marginBottom: "1.5rem" }}>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>Affiliate ID:</strong> <span className="monospace">{state.affiliateId}</span>
            </p>
            <p>We'll notify you via email once your account is approved. Thank you!</p>
          </div>

          <Link href="/" className="btn" style={{ backgroundColor: "var(--affiliate-primary)" }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ color: "var(--affiliate-primary)", marginBottom: "0.5rem" }}>Join Our Affiliate Program</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
          Earn commissions by referring customers to our products and services
        </p>

        <form action={formAction} className="form">
          {state?.error && <div className="error-box">{state.error}</div>}

          <fieldset disabled={pending}>
            <legend style={{ fontWeight: "600", marginBottom: "1rem" }}>Personal Information</legend>

            <div className="form-group">
              <label htmlFor="affiliate_name">Full Name *</label>
              <input
                id="affiliate_name"
                name="affiliate_name"
                type="text"
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
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
              <legend style={{ fontWeight: "600", marginBottom: "1rem" }}>Bank Information (for Payouts)</legend>

              <div className="form-group">
                <label htmlFor="bank_name">Bank Name *</label>
                <select id="bank_name" name="bank_name" required>
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
                <label htmlFor="account_number">Account Number *</label>
                <input
                  id="account_number"
                  name="account_number"
                  type="text"
                  required
                  placeholder="0123456789"
                />
              </div>

              <div className="form-group">
                <label htmlFor="account_holder_name">Account Holder Name *</label>
                <input
                  id="account_holder_name"
                  name="account_holder_name"
                  type="text"
                  required
                  placeholder="Name as shown on bank account"
                />
              </div>
            </fieldset>

            <div
              style={{
                backgroundColor: "var(--affiliate-primary-soft)",
                padding: "1rem",
                borderRadius: "0.375rem",
                marginTop: "2rem",
                marginBottom: "1rem",
                fontSize: "0.875rem",
                lineHeight: "1.6",
              }}
            >
              <p>
                ✓ By signing up, you agree to our affiliate program terms and conditions. Your account will be reviewed by our admin team
                before approval.
              </p>
            </div>

            <button type="submit" className="btn" disabled={pending} style={{ backgroundColor: "var(--affiliate-primary)", width: "100%" }}>
              {pending ? "Creating Account..." : "Join Now"}
            </button>
          </fieldset>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          Already a member?{" "}
          <Link href="/affiliate/login" className="link-btn">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
