import Link from "next/link";
import { listAffiliates, listCommissionRules, listPayments } from "@/lib/erp/affiliate";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboard() {
  let stats = {
    totalAffiliates: 0,
    activeAffiliates: 0,
    pendingEarnings: 0,
    commissionRules: 0,
    draftPayments: 0,
  };
  let error: string | null = null;

  try {
    const [affiliates, rules, payments] = await Promise.all([
      listAffiliates(),
      listCommissionRules(),
      listPayments(),
    ]);

    stats.totalAffiliates = affiliates.length;
    stats.activeAffiliates = affiliates.filter((a) => a.status === "Active").length;
    stats.pendingEarnings = affiliates.reduce((sum, a) => sum + a.pending_payout, 0);
    stats.commissionRules = rules.length;
    stats.draftPayments = payments.filter((p) => p.payment_status === "Draft").length;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load stats";
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Affiliate program overview</p>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <Link href="/admin/affiliate" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <h3 style={{ color: "var(--affiliate-primary)", marginBottom: "0.5rem" }}>Total Affiliates</h3>
          <p style={{ fontSize: "2rem", fontWeight: "700", margin: "0.5rem 0" }}>{stats.totalAffiliates}</p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{stats.activeAffiliates} active</p>
        </Link>

        <Link href="/admin/payouts" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <h3 style={{ color: "var(--affiliate-primary)", marginBottom: "0.5rem" }}>Pending Earnings</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "700", margin: "0.5rem 0" }}>
            Rp{" "}
            {new Intl.NumberFormat("id-ID", {
              minimumFractionDigits: 0,
            }).format(stats.pendingEarnings)}
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{stats.draftPayments} draft payouts</p>
        </Link>

        <Link href="/admin/commission-rules" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <h3 style={{ color: "var(--affiliate-primary)", marginBottom: "0.5rem" }}>Commission Rules</h3>
          <p style={{ fontSize: "2rem", fontWeight: "700", margin: "0.5rem 0" }}>{stats.commissionRules}</p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Active rules</p>
        </Link>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2>Quick Actions</h2>
          <ul style={{ lineHeight: "2" }}>
            <li>
              <Link href="/admin/affiliate/create" className="link-btn">
                + Add New Affiliate
              </Link>
            </li>
            <li>
              <Link href="/admin/commission-rules/create" className="link-btn">
                + Create Commission Rule
              </Link>
            </li>
            <li>
              <Link href="/admin/payouts/create" className="link-btn">
                + Generate Payout Batch
              </Link>
            </li>
          </ul>
        </div>

        <div className="card">
          <h2>Recent Activity</h2>
          <ul style={{ lineHeight: "2", fontSize: "0.875rem" }}>
            <li>
              <Link href="/admin/affiliate" className="link-btn">
                View all affiliates
              </Link>
            </li>
            <li>
              <Link href="/admin/payouts" className="link-btn">
                View payment history
              </Link>
            </li>
            <li>
              <Link href="/admin/commission-rules" className="link-btn">
                Manage commission rules
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
