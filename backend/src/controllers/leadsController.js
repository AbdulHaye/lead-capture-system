const { check, validationResult } = require("express-validator");
const Lead = require("../models/lead");
const { getLeadScore } = require("../utils/openai");
const { sendEmailNotification } = require("../utils/mail");
const { sendWebhook } = require("../utils/webhook");
const { AppError } = require("../middleware/errorHandler");

/**
 * Validates incoming lead data
 */
const validateLead = [
  check("name").notEmpty().withMessage("Name is required").trim().escape(),
  check("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  check("companySize").optional().trim().escape(),
  check("jobTitle").optional().trim().escape(),
  check("website").optional().trim().escape(),
  check("message").optional().trim().escape(),
];

/**
 * Creates a new lead with scoring and automation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const createLead = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }

  const { name, email, companySize, jobTitle, website, message } = req.body;

  try {
    // Score the lead using OpenAI
    const score = await getLeadScore({
      name,
      email,
      companySize,
      jobTitle,
      website,
      message,
    });

    // Save lead to database
    const lead = await Lead.create({
      name,
      email,
      companySize,
      jobTitle,
      website,
      message,
      score,
    });

    console.log(`Lead created: ${lead.email} with score ${score}`);

    // Automation for high-quality leads
    if (score === "High") {
      try {
        await Promise.all([
          sendEmailNotification(lead.dataValues),
          sendWebhook(lead.dataValues),
        ]);
        console.log(`Automation triggered for lead: ${lead.email}`);
      } catch (automationError) {
        console.error(
          `Automation failed for lead ${lead.email}: ${automationError.message}`
        );
        // Continue with response even if automation fails
      }
    }

    res.status(201).json({ message: "Lead created successfully", lead });
  } catch (error) {
    console.error(`Error creating lead: ${error.message}`);
    next(new AppError("Internal server error", 500));
  }
};

module.exports = { createLead, validateLead };
