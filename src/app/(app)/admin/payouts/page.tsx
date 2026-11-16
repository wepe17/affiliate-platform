import Link from "next/link";
import { listPayments } from "@/lib/erp/affiliate";

export const metadata = {
  title: "Commission Payouts",
};

export default async function PayoutsPage() {
  let payments = [];
  let error: string | null = null;

  try {
    payments = await listPayments();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load payouts";
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Commission Payouts</h1>
        <p>Track and manage affiliate commission payments</p>
      </div>

      <div className="page-toolbar">
        <Link href="/admin/payouts/create" className="btn" style={{ backgroundColor: "var(--affiliate-primary)" }}>
          Create Payout Batch
        </Link>
      </div>

      {error ? (
        <div className="error-box">{error}</div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Affiliate</th>
                <th>Period</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment Date</th>
                <th>Reference</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.name}>
                    <td className="monospace">{payment.name}</td>
                    <td>{payment.affiliate}</td>
                    <td>{payment.period}</td>
                    <td className="monospace">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(payment.total_commission_amount)}
                    </td>
                    <td>
                      <span className={`badge badge-${payment.payment_status.toLowerCase()}`}>{payment.payment_status}</span>
                    </td>
                    <td>{payment.payment_date || "-"}</td>
                    <td className="monospace">{payment.reference_number || "-"}</td>
                    <td>
                      <Link href={`/admin/payouts/${payment.name}`} className="link-btn">
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
