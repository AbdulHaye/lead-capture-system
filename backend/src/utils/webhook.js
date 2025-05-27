const axios = require("axios");

/**
 * Sends lead data to a configured webhook
 * @param {Object} lead - Lead data to send to the webhook
 * @throws {Error} If webhook sending fails
 */
const sendWebhook = async (lead) => {
  const webhookUrl = process.env.WEBHOOK_URL;

  try {
    await axios.post(webhookUrl, lead);
    console.log(`Webhook sent for lead: ${lead.email}`);
  } catch (error) {
    console.error(`Webhook failed for lead ${lead.email}: ${error.message}`);
    throw new Error("Webhook sending failed");
  }
};

module.exports = { sendWebhook };
