import { useMemo, useState } from "react";

const initialReports = [
  {
    id: "MRV-2026-001",
    project: "Pichavaram Mangrove Restoration",
    period: "Jan 2026 - Jun 2026",
    area: 125,
    baseline: 820,
    current: 1015,
    leakage: 12,
    buffer: 10,
    status: "Approved",
    submittedOn: "2026-06-30",
  },
  {
    id: "MRV-2026-002",
    project: "Muthupet Blue Carbon Project",
    period: "Jan 2026 - Jun 2026",
    area: 78,
    baseline: 510,
    current: 605,
    leakage: 8,
    buffer: 10,
    status: "Pending Verification",
    submittedOn: "2026-07-05",
  },
];

function getNetCredits(report) {
  const grossBenefit = Math.max(
    0,
    Number(report.current) - Number(report.baseline) - Number(report.leakage)
  );

  const bufferDeduction = grossBenefit * (Number(report.buffer) / 100);

  return Math.max(0, grossBenefit - bufferDeduction).toFixed(2);
}

function MRV() {
  const [reports, setReports] = useState(initialReports);
  const [activeTab, setActiveTab] = useState("reports");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    project: "",
    period: "",
    area: "",
    baseline: "",
    current: "",
    leakage: "",
    buffer: "10",
    evidence: "",
  });

  const totalApprovedCredits = useMemo(() => {
    return reports
      .filter((report) => report.status === "Approved")
      .reduce((total, report) => total + Number(getNetCredits(report)), 0)
      .toFixed(2);
  }, [reports]);

  const pendingReports = reports.filter(
    (report) => report.status === "Pending Verification"
  ).length;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.project ||
      !formData.period ||
      !formData.area ||
      !formData.baseline ||
      !formData.current
    ) {
      setMessage("Please fill all required MRV fields.");
      return;
    }

    const newReport = {
      id: `MRV-2026-${String(reports.length + 1).padStart(3, "0")}`,
      project: formData.project,
      period: formData.period,
      area: Number(formData.area),
      baseline: Number(formData.baseline),
      current: Number(formData.current),
      leakage: Number(formData.leakage || 0),
      buffer: Number(formData.buffer || 10),
      status: "Pending Verification",
      submittedOn: new Date().toISOString().split("T")[0],
      evidence: formData.evidence,
    };

    setReports((previousReports) => [newReport, ...previousReports]);

    setFormData({
      project: "",
      period: "",
      area: "",
      baseline: "",
      current: "",
      leakage: "",
      buffer: "10",
      evidence: "",
    });

    setMessage(
      `${newReport.id} submitted successfully. It is waiting for verifier approval.`
    );
    setActiveTab("reports");
  };

  const approveReport = (id) => {
    setReports((previousReports) =>
      previousReports.map((report) =>
        report.id === id
          ? { ...report, status: "Approved" }
          : report
      )
    );

    setMessage(`${id} has been approved. Carbon credits are ready for issuance.`);
  };

  const rejectReport = (id) => {
    setReports((previousReports) =>
      previousReports.map((report) =>
        report.id === id
          ? { ...report, status: "Clarification Required" }
          : report
      )
    );

    setMessage(`${id} needs additional evidence or corrections.`);
  };

  const issueCredits = (report) => {
  const credits = getNetCredits(report);

  setReports((previousReports) =>
    previousReports.map((item) =>
      item.id === report.id
        ? {
            ...item,
            status: "Credits Issued",
            issuedCredits: credits,
          }
        : item
    )
  );

  setMessage(
    `${credits} tCO₂e credits issued successfully for ${report.project}.`
  );

  alert(
    `${credits} tCO₂e carbon credits issued successfully!\n\nProject: ${report.project}`
  );
};

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <p style={styles.eyebrow}>BLUE CARBON REGISTRY</p>
          <h1 style={styles.title}>MRV Management</h1>
          <p style={styles.subtitle}>
            Measure, report, verify, and issue blue-carbon credits.
          </p>
        </div>

        <button
          style={styles.primaryButton}
          onClick={() => {
            setActiveTab("new-report");
            setMessage("");
          }}
        >
          + Create MRV Report
        </button>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total MRV Reports</p>
          <h2 style={styles.statValue}>{reports.length}</h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Pending Verification</p>
          <h2 style={styles.statValue}>{pendingReports}</h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Approved Credits</p>
          <h2 style={styles.statValue}>{totalApprovedCredits} tCO₂e</h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Registry Status</p>
          <h2 style={{ ...styles.statValue, color: "#138a4b" }}>Active</h2>
        </div>
      </div>

      <div style={styles.tabs}>
        <button
          style={activeTab === "reports" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("reports")}
        >
          MRV Reports
        </button>

        <button
          style={activeTab === "new-report" ? styles.activeTab : styles.tab}
          onClick={() => {
            setActiveTab("new-report");
            setMessage("");
          }}
        >
          Submit Monitoring Data
        </button>
      </div>

      {message && <div style={styles.message}>{message}</div>}

      {activeTab === "reports" ? (
        <div style={styles.tableContainer}>
          <div style={styles.tableHeader}>
            <h2 style={styles.sectionTitle}>Monitoring & Verification Reports</h2>
            <span style={styles.tableCount}>{reports.length} reports</span>
          </div>

          <div style={styles.tableScroll}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Report ID</th>
                  <th style={styles.th}>Project</th>
                  <th style={styles.th}>Monitoring Period</th>
                  <th style={styles.th}>Net Credits</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td style={styles.td}>{report.id}</td>
                    <td style={styles.td}>
                      <strong>{report.project}</strong>
                      <br />
                      <span style={styles.smallText}>{report.area} hectares</span>
                    </td>
                    <td style={styles.td}>{report.period}</td>
                    <td style={styles.td}>
                      <strong>{getNetCredits(report)} tCO₂e</strong>
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...(report.status === "Approved"
                           ?  styles.approved
                           : report.status === "Pending Verification"
                           ? styles.pending
                           : report.status === "Credits Issued"
                           ? styles.issued
                           : styles.clarification),
                        }}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {report.status === "Pending Verification" && (
                        <div style={styles.actionGroup}>
                          <button
                            style={styles.approveButton}
                            onClick={() => approveReport(report.id)}
                          >
                            Approve
                          </button>
                          <button
                            style={styles.rejectButton}
                            onClick={() => rejectReport(report.id)}
                          >
                            Request Info
                          </button>
                        </div>
                      )}

                      {report.status === "Approved" && (
                        <button
                          style={styles.issueButton}
                          onClick={() => issueCredits(report)}
                        >
                          Issue Credits
                        </button>
                      )}

                      {report.status === "Clarification Required" && (
                        <span style={styles.smallText}>Waiting for project owner</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={styles.formCard}>
          <h2 style={styles.sectionTitle}>Submit Monitoring Data</h2>
          <p style={styles.formIntro}>
            Add field, satellite, and carbon stock data for the monitoring period.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              <div>
                <label style={styles.label}>Project Name *</label>
                <input
                  style={styles.input}
                  type="text"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  placeholder="Example: Pichavaram Mangrove Restoration"
                />
              </div>

              <div>
                <label style={styles.label}>Monitoring Period *</label>
                <input
                  style={styles.input}
                  type="text"
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  placeholder="Example: Jul 2026 - Dec 2026"
                />
              </div>

              <div>
                <label style={styles.label}>Project Area (hectares) *</label>
                <input
                  style={styles.input}
                  type="number"
                  min="0"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="125"
                />
              </div>

              <div>
                <label style={styles.label}>Baseline Carbon (tCO₂e) *</label>
                <input
                  style={styles.input}
                  type="number"
                  min="0"
                  name="baseline"
                  value={formData.baseline}
                  onChange={handleChange}
                  placeholder="820"
                />
              </div>

              <div>
                <label style={styles.label}>Current Carbon Stock (tCO₂e) *</label>
                <input
                  style={styles.input}
                  type="number"
                  min="0"
                  name="current"
                  value={formData.current}
                  onChange={handleChange}
                  placeholder="1015"
                />
              </div>

              <div>
                <label style={styles.label}>Leakage Deduction (tCO₂e)</label>
                <input
                  style={styles.input}
                  type="number"
                  min="0"
                  name="leakage"
                  value={formData.leakage}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div>
                <label style={styles.label}>Uncertainty Buffer (%)</label>
                <input
                  style={styles.input}
                  type="number"
                  min="0"
                  max="100"
                  name="buffer"
                  value={formData.buffer}
                  onChange={handleChange}
                  placeholder="10"
                />
              </div>

              <div>
                <label style={styles.label}>Evidence Link / IPFS Hash</label>
                <input
                  style={styles.input}
                  type="text"
                  name="evidence"
                  value={formData.evidence}
                  onChange={handleChange}
                  placeholder="ipfs://... or report URL"
                />
              </div>
            </div>

            <div style={styles.calculationBox}>
              <strong>Credit calculation:</strong>
              <span>
                {" "}
                (Current Carbon − Baseline Carbon − Leakage) − Uncertainty Buffer
              </span>
            </div>

            <div style={styles.formActions}>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={() => setActiveTab("reports")}
              >
                Cancel
              </button>

              <button type="submit" style={styles.primaryButton}>
                Submit for Verification
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f8f7",
    padding: "32px",
    fontFamily: "Arial, sans-serif",
    color: "#17352a",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "28px",
    flexWrap: "wrap",
  },
  eyebrow: {
    color: "#16824c",
    fontWeight: "700",
    fontSize: "12px",
    letterSpacing: "1.2px",
    margin: "0 0 8px",
  },
  title: {
    margin: "0",
    fontSize: "32px",
  },
  subtitle: {
    color: "#5d746b",
    marginBottom: "0",
  },
  primaryButton: {
    border: "none",
    background: "#137a45",
    color: "white",
    padding: "12px 18px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "16px",
    marginBottom: "28px",
  },
  statCard: {
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(18, 67, 48, 0.08)",
  },
  statLabel: {
    margin: "0 0 10px",
    color: "#6b8179",
    fontSize: "14px",
  },
  statValue: {
    margin: 0,
    fontSize: "24px",
    color: "#17352a",
  },
  tabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "18px",
  },
  tab: {
    padding: "10px 16px",
    background: "transparent",
    border: "1px solid #c9d9d2",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#476158",
    fontWeight: "600",
  },
  activeTab: {
    padding: "10px 16px",
    background: "#dff4e8",
    border: "1px solid #16824c",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#136f3f",
    fontWeight: "700",
  },
  message: {
    background: "#e3f6e9",
    color: "#176c3f",
    border: "1px solid #bce4c9",
    padding: "14px",
    borderRadius: "8px",
    marginBottom: "18px",
  },
  tableContainer: {
    background: "white",
    padding: "22px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(18, 67, 48, 0.08)",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "20px",
  },
  tableCount: {
    color: "#668078",
    fontSize: "14px",
  },
  tableScroll: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "850px",
  },
  th: {
    textAlign: "left",
    background: "#eff6f2",
    padding: "14px",
    color: "#426157",
    fontSize: "13px",
  },
  td: {
    padding: "14px",
    borderBottom: "1px solid #e2ebe6",
    fontSize: "14px",
  },
  smallText: {
    color: "#6a8278",
    fontSize: "12px",
  },
  statusBadge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
  },
  approved: {
    background: "#dcf6e6",
    color: "#167541",
  },
  pending: {
    background: "#fff2d7",
    color: "#9a6500",
  },
  clarification: {
    background: "#fde1e1",
    color: "#a32e2e",
  },
  issued: {
  background: "#dbeafe",
  color: "#1d4ed8",
},
  actionGroup: {
    display: "flex",
    gap: "8px",
  },
  approveButton: {
    background: "#16824c",
    border: "none",
    color: "white",
    padding: "8px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  rejectButton: {
    background: "white",
    border: "1px solid #d7a4a4",
    color: "#a23333",
    padding: "8px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  issueButton: {
    background: "#1c5c91",
    border: "none",
    color: "white",
    padding: "8px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  formCard: {
    background: "white",
    padding: "26px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(18, 67, 48, 0.08)",
  },
  formIntro: {
    color: "#647c72",
    marginTop: "8px",
    marginBottom: "24px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "18px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#36594b",
  },
  input: {
    width: "100%",
    padding: "11px",
    border: "1px solid #cbdad3",
    borderRadius: "7px",
    boxSizing: "border-box",
    outlineColor: "#16824c",
  },
  calculationBox: {
    marginTop: "24px",
    background: "#eef8f2",
    padding: "14px",
    borderRadius: "8px",
    color: "#315a48",
    fontSize: "14px",
  },
  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "24px",
  },
  cancelButton: {
    border: "1px solid #b9cbc2",
    background: "white",
    color: "#466259",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },
};

export default MRV;