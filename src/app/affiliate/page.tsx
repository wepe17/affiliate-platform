import Link from "next/link";

export const metadata = {
  title: "Affiliate Program",
};

export default function AffiliateLandingPage() {
  return (
    <div className="page">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ color: "var(--affiliate-primary)", fontSize: "2.5rem", marginBottom: "1rem" }}>
            Become an Affiliate
          </h1>
          <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", marginBottom: "2rem" }}>
            Earn commissions by referring customers to our products and services
          </p>
        </div>

        <div className="grid-2" style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h3 style={{ color: "var(--affiliate-primary)", marginBottom: "0.75rem" }}>💰 Earn Commissions</h3>
            <p>Get 15-25% commission on every sale you refer. The more you sell, the better your rates.</p>
          </div>

          <div className="card">
            <h3 style={{ color: "var(--affiliate-primary)", marginBottom: "0.75rem" }}>🔗 Easy Sharing</h3>
            <p>Get a unique referral link to share with your audience. Track your sales in real-time.</p>
          </div>

          <div className="card">
            <h3 style={{ color: "var(--affiliate-primary)", marginBottom: "0.75rem" }}>📊 Track Everything</h3>
            <p>Detailed dashboard showing your sales, commissions, and payout history.</p>
          </div>

          <div className="card">
            <h3 style={{ color: "var(--affiliate-primary)", marginBottom: "0.75rem" }}>💳 Quick Payouts</h3>
            <p>Get paid monthly or quarterly directly to your bank account. No delays.</p>
          </div>
        </div>

        <div className="card" style={{ backgroundColor: "var(--affiliate-primary-soft)", marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--affiliate-primary)", marginBottom: "1rem" }}>How It Works</h2>
          <ol style={{ paddingLeft: "1.5rem", lineHeight: "2" }}>
            <li>
              <strong>Sign up</strong> - Create your affiliate account in minutes
            </li>
            <li>
              <strong>Get your link</strong> - Receive a unique referral link to share
            </li>
            <li>
              <strong>Share & earn</strong> - Share your link and earn commission on every sale
            </li>
            <li>
              <strong>Get paid</strong> - Receive monthly payouts to your bank account
            </li>
          </ol>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          <Link href="/affiliate/signup" className="btn" style={{ backgroundColor: "var(--affiliate-primary)", textAlign: "center", padding: "1rem" }}>
            Join Now
          </Link>
          <a href="#faq" className="btn btn-secondary" style={{ textAlign: "center", padding: "1rem" }}>
            Learn More
          </a>
        </div>

        <div className="card" id="faq">
          <h2>Frequently Asked Questions</h2>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ color: "var(--affiliate-primary)", marginBottom: "0.5rem" }}>How much do I earn?</h3>
            <p>Commission rates vary by product type: Physical products (15%), Digital products (25%), Services (20%). Your rate may increase with volume.</p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ color: "var(--affiliate-primary)", marginBottom: "0.5rem" }}>When do I get paid?</h3>
            <p>We pay commissions monthly. Your earnings are calculated at the end of each month and paid by the 15th of the following month.</p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ color: "var(--affiliate-primary)", marginBottom: "0.5rem" }}>Is there a minimum payout?</h3>
            <p>Yes, you need at least Rp 100,000 in pending commission to request a payout. Otherwise, it will roll over to the next month.</p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ color: "var(--affiliate-primary)", marginBottom: "0.5rem" }}>Can I track my sales?</h3>
            <p>Absolutely! Your affiliate dashboard shows all your referral sales, commission amounts, and payout history in real-time.</p>
          </div>

          <div>
            <h3 style={{ color: "var(--affiliate-primary)", marginBottom: "0.5rem" }}>Need more help?</h3>
            <p>
              Contact our support team at{" "}
              <a href="mailto:support@example.com" className="link-btn">
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
