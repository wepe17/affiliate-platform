export default function HomePage() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Affiliate Platform</h1>
        <p>Admin dashboard untuk mengelola program affiliate</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <h2>Admin Panel</h2>
          <p>Kelola affiliates, commission rules, dan payouts</p>
          <div style={{ marginTop: "1rem" }}>
            <a href="/admin/affiliate" className="btn" style={{ backgroundColor: "var(--affiliate-primary)" }}>
              Go to Admin Panel
            </a>
          </div>
        </div>

        <div className="card">
          <h2>Affiliate Portal</h2>
          <p>Dashboard untuk affiliates melihat earnings dan sales</p>
          <div style={{ marginTop: "1rem" }}>
            <a href="/affiliate/dashboard" className="btn btn-secondary">
              Go to Portal
            </a>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Quick Links</h2>
        <ul style={{ lineHeight: "2" }}>
          <li>
            <a href="/admin/affiliate" className="link-btn">
              View All Affiliates
            </a>
          </li>
          <li>
            <a href="/admin/commission-rules" className="link-btn">
              Manage Commission Rules
            </a>
          </li>
          <li>
            <a href="/admin/payouts" className="link-btn">
              View Payouts
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
