import Link from "next/link";
import { listAffiliates } from "@/lib/erp/affiliate";

export const metadata = {
  title: "Affiliate Management",
};

interface SearchParams {
  status?: string;
  search?: string;
}

export default async function AffiliateListPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  let affiliates = [];
  let error: string | null = null;

  try {
    const filters: any[] = [];
    if (params.status && params.status !== "all") {
      filters.push(["status", "=", params.status]);
    }
    affiliates = await listAffiliates(filters);

    // Client-side search filtering
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      affiliates = affiliates.filter(
        (a) =>
          a.affiliate_name.toLowerCase().includes(searchLower) ||
          a.email.toLowerCase().includes(searchLower) ||
          a.name.toLowerCase().includes(searchLower),
      );
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load affiliates";
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Affiliate Management</h1>
        <p>Manage affiliate partners and their commissions</p>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <form style={{ display: "flex", gap: "0.5rem", flex: 1, minWidth: "300px" }}>
          <input
            type="text"
            name="search"
            placeholder="Search by name, email, or ID"
            defaultValue={params.search || ""}
            style={{ flex: 1, padding: "0.625rem", border: "1px solid var(--border)", borderRadius: "0.375rem" }}
          />
          <select
            name="status"
            defaultValue={params.status || "all"}
            style={{ padding: "0.625rem", border: "1px solid var(--border)", borderRadius: "0.375rem" }}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
          <button type="submit" className="btn" style={{ backgroundColor: "var(--affiliate-primary)" }}>
            Search
          </button>
          {(params.search || params.status) && (
            <Link href="/admin/affiliate" className="btn btn-secondary">
              Clear
            </Link>
          )}
        </form>
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
                <th style={{ width: "200px" }}>Actions</th>
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
                    <td style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <Link href={`/admin/affiliate/${affiliate.name}`} className="link-btn">
                        View
                      </Link>
                      <Link href={`/admin/affiliate/${affiliate.name}/edit`} className="link-btn">
                        Edit
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
