"use client";

import {
  Calendar,
  Mail,
  Building,
  Briefcase,
  Globe,
  MessageSquare,
  Users,
} from "lucide-react";

export function LeadResults({ leads }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getQualityBadgeClass = (quality) => {
    switch (quality) {
      case "High":
        return "badge bg-success text-white";
      case "Medium":
        return "badge bg-warning text-dark";
      case "Low":
        return "badge bg-danger text-white";
      default:
        return "badge bg-secondary text-white";
    }
  };

  if (!leads || leads.length === 0) {
    return (
      <div className="card shadow-sm border-0" style={{ borderRadius: "12px" }}>
        <div
          className="card-header text-white py-3 px-4"
          style={{
            background: "#10B981",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <Users size={20} />
            <h5 className="mb-0 fw-semibold">Recent Submissions</h5>
          </div>
          <p className="mb-0 mt-1" style={{ fontSize: "14px", opacity: 0.9 }}>
            Submitted leads will appear here in real-time
          </p>
        </div>

        <div className="card-body text-center py-5">
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#F3F4F6",
              borderRadius: "50%",
            }}
          >
            <Users size={32} style={{ color: "#9CA3AF" }} />
          </div>
          <h6 className="text-dark mb-2">No leads submitted yet</h6>
          <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
            Fill out the form to see your first submission here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0" style={{ borderRadius: "12px" }}>
      <div
        className="card-header text-white py-3 px-4"
        style={{
          background: "#10B981",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <Users size={20} />
            <h5 className="mb-0 fw-semibold">Recent Submissions</h5>
          </div>
          <span
            className="badge bg-white text-success px-2 py-1"
            style={{
              color: "#10B981",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {leads.length} {leads.length === 1 ? "Lead" : "Leads"}
          </span>
        </div>
        <p className="mb-0 mt-1" style={{ fontSize: "14px", opacity: 0.9 }}>
          Latest lead submissions from your form
        </p>
      </div>

      <div className="card-body p-4">
        <div style={{ maxHeight: "600px", overflowY: "auto" }}>
          {leads.map((lead, index) => (
            <div
              key={lead.id}
              className={`p-3 ${index !== leads.length - 1 ? "mb-3" : ""}`}
              style={{
                backgroundColor: "#F9FAFB",
                borderRadius: "8px",
                border: "1px solid #F3F4F6",
              }}
            >
              <div className="d-flex align-items-start gap-3">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center fw-semibold text-white"
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                    fontSize: "14px",
                  }}
                >
                  {getInitials(lead.name)}
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0 fw-semibold text-dark">{lead.name}</h6>
                    <small className="text-muted d-flex align-items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(lead.createdAt)}
                    </small>
                  </div>

                  <div className="row g-2 mb-2">
                    <div className="col-12 col-md-6">
                      <div
                        className="d-flex align-items-center gap-2"
                        style={{ fontSize: "14px" }}
                      >
                        <Mail size={14} style={{ color: "#3B82F6" }} />
                        <span className="text-dark">{lead.email}</span>
                      </div>
                    </div>

                    {lead.companySize && (
                      <div className="col-12 col-md-6">
                        <div
                          className="d-flex align-items-center gap-2"
                          style={{ fontSize: "14px" }}
                        >
                          <Building size={14} style={{ color: "#A855F7" }} />
                          <span className="text-dark">{lead.companySize}</span>
                        </div>
                      </div>
                    )}

                    {lead.jobTitle && (
                      <div className="col-12 col-md-6">
                        <div
                          className="d-flex align-items-center gap-2"
                          style={{ fontSize: "14px" }}
                        >
                          <Briefcase size={14} style={{ color: "#10B981" }} />
                          <span className="text-dark">{lead.jobTitle}</span>
                        </div>
                      </div>
                    )}

                    {lead.website && (
                      <div className="col-12 col-md-6">
                        <div
                          className="d-flex align-items-center gap-2"
                          style={{ fontSize: "14px" }}
                        >
                          <Globe size={14} style={{ color: "#F59E0B" }} />
                          <span className="text-dark">{lead.website}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {lead.message && (
                    <div
                      className="mt-3 p-2 bg-white"
                      style={{
                        borderRadius: "6px",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <div className="d-flex align-items-start gap-2">
                        <MessageSquare size={14} className="text-muted mt-1" />
                        <p
                          className="mb-0 text-dark"
                          style={{ fontSize: "14px" }}
                        >
                          {lead.message}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-2">
                    <span
                      className={getQualityBadgeClass(lead.score)} // Updated to use 'score' as the quality field
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      Quality: {lead.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeadResults;
