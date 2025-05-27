"use client";

import { useState } from "react";
import LeadForm from "../components/LeadForm";
import LeadResults from "../components/LeadResults";

export default function Home() {
  const [submittedLeads, setSubmittedLeads] = useState([]);

  const handleLeadSubmitted = (lead) => {
    setSubmittedLeads((prev) => [lead, ...prev]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #F3F4F6 0%, #E0E7FF 50%, #E0E7FF 100%)",
      }}
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container py-4 text-center">
          <h1
            className="display-5 fw-bold mb-2"
            style={{
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Lead Capture System
          </h1>
          <p className="text-muted mb-0" style={{ fontSize: "16px" }}>
            Connect with us and grow your business
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <LeadForm onLeadSubmitted={handleLeadSubmitted} />
          </div>
          <div className="col-12 col-lg-6">
            <LeadResults leads={submittedLeads} />
          </div>
        </div>
      </main>
    </div>
  );
}
