import Link from "next/link";
import { listAffiliates } from "@/lib/erp/affiliate";

export const metadata = {
  title: "Affiliate Management",
};

export default async function AffiliateListPage() {
  let affiliates = [];
  let error: string | null = null;

  try {
    affiliates = await listAffiliates();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load affiliates";
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Affiliate Management</h1>
        <p>Manage affiliate partners and their commissions</p>
      </div>

      <div className="page-toolbar">
        <Link href="/admin/affiliate/create" className="btn" style={{ backgroundColor: "var(--affiliate-primary)" }}>
          Add Affiliate
        </Link>
      </div>

      {error ? (
        <div className="error-box">
          <p>{error}</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Total Earnings</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {affiliates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    No affiliates found
                  </td>
                </tr>
              ) : (
                affiliates.map((affiliate) => (
                  <tr key={affiliate.name}>
                    <td className="monospace">{affiliate.name}</td>
                    <td>{affiliate.affiliate_name}</td>
                    <td>{affiliate.email}</td>
                    <td>
                      <span className={`badge badge-${affiliate.status.toLowerCase()}`}>{affiliate.status}</span>
                    </td>
                    <td className="monospace">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(affiliate.total_earnings)}
                    </td>
                    <td>{affiliate.join_date}</td>
                    <td>
                      <Link href={`/admin/affiliate/${affiliate.name}`} className="link-btn">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
