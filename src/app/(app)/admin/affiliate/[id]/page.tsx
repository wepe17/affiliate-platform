import Link from "next/link";
import { getAffiliate, listAffiliateSales } from "@/lib/erp/affiliate";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AffiliateDetailPage({ params }: Props) {
  const { id } = await params;
  let affiliate = null;
  let sales = [];
  let error: string | null = null;

  try {
    affiliate = await getAffiliate(id);
    sales = await listAffiliateSales([["affiliate", "=", id]]);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load affiliate";
    notFound();
  }

  if (!affiliate) {
    notFound();
  }

  return (
    <div className="page">
      <div className="page-header">
        <Link href="/admin/affiliate" className="link-btn">
          ← Back to Affiliates
        </Link>
        <h1>{affiliate.affiliate_name}</h1>
        <p>{affiliate.email}</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2>Basic Information</h2>
          <dl className="details">
            <dt>ID</dt>
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
        </div>

        <div className="card">
          <h2>Earnings Summary</h2>
          <dl className="details">
            <dt>Total Earnings</dt>
            <dd className="monospace">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(affiliate.total_earnings)}
            </dd>
            <dt>Total Paid</dt>
            <dd className="monospace">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(affiliate.total_paid)}
            </dd>
            <dt>Pending Payout</dt>
            <dd className="monospace">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(affiliate.pending_payout)}
            </dd>
          </dl>
        </div>
      </div>

      <div className="card">
        <h2>Bank Details</h2>
        <dl className="details">
          <dt>Bank Name</dt>
          <dd>{affiliate.bank_name || "-"}</dd>
          <dt>Account Number</dt>
          <dd className="monospace">{affiliate.account_number || "-"}</dd>
          <dt>Account Holder</dt>
          <dd>{affiliate.account_holder_name || "-"}</dd>
        </dl>
      </div>

      <div className="card">
        <h2>Recent Sales</h2>
        {sales.length === 0 ? (
          <p>No sales recorded</p>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product Type</th>
                  <th>Sales Amount</th>
                  <th>Commission %</th>
                  <th>Commission Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.name}>
                    <td>{sale.sale_date}</td>
                    <td>{sale.product_type}</td>
                    <td className="monospace">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(sale.sales_amount)}
                    </td>
                    <td>{sale.commission_percentage}%</td>
                    <td className="monospace">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
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

      <div className="page-toolbar">
        <Link href={`/admin/affiliate/${id}/edit`} className="btn">
          Edit Affiliate
        </Link>
      </div>
    </div>
  );
}
