import Link from "next/link";
import { getAffiliate, getAffiliateEarningsSummary, listAffiliateSales } from "@/lib/erp/affiliate";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ affiliateId: string }>;
}

export default async function AffiliateDashboardPage({ params }: Props) {
  const { affiliateId } = await params;
  let affiliate = null;
  let earnings = null;
  let sales = [];
  let error: string | null = null;

  try {
    affiliate = await getAffiliate(affiliateId);
    earnings = await getAffiliateEarningsSummary(affiliateId);
    sales = await listAffiliateSales([["affiliate", "=", affiliateId]], 10);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load dashboard";
    if (error.includes("not found")) notFound();
  }

  if (!affiliate) notFound();

  const referralLink = `${process.env.NEXT_PUBLIC_STORE_URL || "https://yourstore.com"}?ref=${affiliate.name}`;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Welcome, {affiliate.affiliate_name}!</h1>
        <p>Your affiliate dashboard</p>
      </div>

      {error && <div className="error-box">{error}</div>}

      {affiliate.status === "Inactive" && (
        <div style={{ backgroundColor: "rgba(59, 130, 246, 0.1)", border: "1px solid #3b82f6", color: "#3b82f6", padding: "1rem", borderRadius: "0.375rem", marginBottom: "1.5rem" }}>
          ⏳ Your account is pending admin approval. You'll receive an email once it's approved.
        </div>
      )}

      {affiliate.status === "Suspended" && (
        <div style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", color: "#ef4444", padding: "1rem", borderRadius: "0.375rem", marginBottom: "1.5rem" }}>
          ⚠️ Your account has been suspended. Please contact support for more information.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div className="card">
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Total Earnings</p>
          <h2 style={{ color: "var(--affiliate-primary)", fontSize: "2rem", margin: "0.5rem 0" }}>
            Rp{" "}
            {new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 0,
            }).format(earnings?.total_earnings || 0)}
          </h2>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>All time earnings</p>
        </div>

        <div className="card">
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Pending Payout</p>
          <h2 style={{ color: "var(--affiliate-accent)", fontSize: "2rem", margin: "0.5rem 0" }}>
            Rp{" "}
            {new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 0,
            }).format(earnings?.pending_payout || 0)}
          </h2>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Ready for payout</p>
        </div>

        <div className="card">
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Total Paid</p>
          <h2 style={{ color: "#10b981", fontSize: "2rem", margin: "0.5rem 0" }}>
            Rp{" "}
            {new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 0,
            }).format(earnings?.total_paid || 0)}
          </h2>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Successfully paid</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2>Your Referral Link</h2>
          <div style={{ backgroundColor: "var(--affiliate-primary-soft)", padding: "1rem", borderRadius: "0.375rem", marginBottom: "1rem", wordBreak: "break-all" }}>
            <p style={{ margin: "0", fontSize: "0.875rem", color: "var(--affiliate-primary)", fontWeight: "500" }}>
              {referralLink}
            </p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(referralLink);
              alert("Link copied to clipboard!");
            }}
            className="btn"
            style={{ backgroundColor: "var(--affiliate-primary)", width: "100%" }}
          >
            Copy Link
          </button>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>
            💡 Share this link to earn commissions on every sale
          </p>
        </div>

        <div className="card">
          <h2>Account Info</h2>
          <dl className="details">
            <dt>Affiliate ID</dt>
            <dd className="monospace">{affiliate.name}</dd>
            <dt>Email</dt>
            <dd>{affiliate.email}</dd>
            <dt>Phone</dt>
            <dd>{affiliate.phone || "-"}</dd>
            <dt>Status</dt>
            <dd>
              <span className={`badge badge-${affiliate.status.toLowerCase()}`}>{affiliate.status}</span>
            </dd>
            <dt>Join Date</dt>
            <dd>{affiliate.join_date}</dd>
          </dl>
          <Link href={`/affiliate/dashboard/${affiliateId}/settings`} className="link-btn" style={{ display: "block", marginTop: "1rem" }}>
            Edit Profile →
          </Link>
        </div>
      </div>

      <div className="card">
        <h2>Recent Sales</h2>
        {sales.length === 0 ? (
          <p>No sales yet. Start sharing your referral link to earn commissions!</p>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Sales Amount</th>
                  <th>Commission</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.name}>
                    <td>{sale.sale_date}</td>
                    <td>{sale.product_name || sale.product_type}</td>
                    <td className="monospace">
                      Rp{" "}
                      {new Intl.NumberFormat("id-ID", {
                        minimumFractionDigits: 0,
                      }).format(sale.sales_amount)}
                    </td>
                    <td className="monospace">
                      Rp{" "}
                      {new Intl.NumberFormat("id-ID", {
                        minimumFractionDigits: 0,
                      }).format(sale.commission_amount)}
                    </td>
                    <td>
                      <span className={`badge badge-${sale.status.toLowerCase()}`}>{sale.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
