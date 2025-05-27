"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Building,
  Briefcase,
  Globe,
  MessageSquare,
  Send,
} from "lucide-react";
import { API_URLS } from "../constants/api";

function LeadForm({ onLeadSubmitted }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(API_URLS.CREATE_LEAD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your lead has been submitted successfully.",
        });
        reset();
        onLeadSubmitted(result.lead); // Pass the lead object with quality score
      } else {
        const errorData = await response.json();
        setSubmitStatus({
          type: "error",
          message: errorData.message || "Failed to submit lead.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "An error occurred. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm border-0" style={{ borderRadius: "12px" }}>
      <div
        className="card-header text-white py-3 px-4"
        style={{
          background: "#4F46E5",
          borderRadius: "12px 12px 0 0",
        }}
      >
        <div className="d-flex align-items-center gap-2">
          <Send size={20} />
          <h5 className="mb-0 fw-semibold">Get in Touch</h5>
        </div>
        <p className="mb-0 mt-1" style={{ fontSize: "14px", opacity: 0.9 }}>
          Fill out the form below and we'll get back to you within 24 hours.
        </p>
      </div>

      <div className="card-body p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-medium text-dark mb-2">
                <User size={16} className="me-2" />
                Name *
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter your full name"
                style={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  padding: "12px 16px",
                }}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium text-dark mb-2">
                <Mail size={16} className="me-2" />
                Email *
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="your.email@company.com"
                style={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  padding: "12px 16px",
                }}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label fw-medium text-dark mb-2">
                <Building size={16} className="me-2" />
                Company Size
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., 10-50 employees"
                style={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  padding: "12px 16px",
                }}
                {...register("companySize")}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-medium text-dark mb-2">
                <Briefcase size={16} className="me-2" />
                Job Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Marketing Manager"
                style={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  padding: "12px 16px",
                }}
                {...register("jobTitle")}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="form-label fw-medium text-dark mb-2">
              <Globe size={16} className="me-2" />
              Website
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="https://yourcompany.com"
              style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                padding: "12px 16px",
              }}
              {...register("website")}
            />
          </div>

          <div className="mt-4">
            <label className="form-label fw-medium text-dark mb-2">
              <MessageSquare size={16} className="me-2" />
              Message
            </label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Tell us about your project or how we can help you..."
              style={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                padding: "12px 16px",
                resize: "vertical",
              }}
              {...register("message")}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 py-3 mt-4 d-flex align-items-center justify-content-center gap-2 fw-semibold"
            disabled={isSubmitting}
            style={{
              background: "#4F46E5",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "16px",
            }}
          >
            {isSubmitting ? (
              <>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Submitting...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Lead
              </>
            )}
          </button>

          {submitStatus && (
            <div
              className={`alert mt-3 ${
                submitStatus.type === "success"
                  ? "alert-success"
                  : "alert-danger"
              }`}
              role="alert"
            >
              {submitStatus.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default LeadForm;
