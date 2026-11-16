import Link from "next/link";
import { listCommissionRules } from "@/lib/erp/affiliate";

export const metadata = {
  title: "Commission Rules",
};

export default async function CommissionRulesPage() {
  let rules = [];
  let error: string | null = null;

  try {
    rules = await listCommissionRules();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load rules";
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Commission Rules</h1>
        <p>Define commission percentages by product type</p>
      </div>

      <div className="page-toolbar">
        <Link href="/admin/commission-rules/create" className="btn" style={{ backgroundColor: "var(--affiliate-primary)" }}>
          Add Rule
        </Link>
      </div>

      {error ? (
        <div className="error-box">{error}</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rule Name</th>
                <th>Product Type</th>
                <th>Category</th>
                <th>Commission %</th>
                <th>Status</th>
                <th>Valid From</th>
                <th>Valid To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    No rules found
                  </td>
                </tr>
              ) : (
                rules.map((rule) => (
                  <tr key={rule.name}>
                    <td>{rule.rule_name}</td>
                    <td>{rule.product_type}</td>
                    <td>{rule.product_category || "-"}</td>
                    <td>{rule.commission_percentage}%</td>
                    <td>
                      <span className={`badge badge-${rule.status.toLowerCase()}`}>{rule.status}</span>
                    </td>
                    <td>{rule.valid_from || "-"}</td>
                    <td>{rule.valid_to || "-"}</td>
                    <td>
                      <Link href={`/admin/commission-rules/${rule.name}`} className="link-btn">
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
