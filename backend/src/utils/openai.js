require("dotenv").config();
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getLeadScore(data) {
  const prompt = `Based on the following lead data, determine the quality of the lead as High, Medium, or Low:
  Name: ${data.name}
  Email: ${data.email}
  Company Size: ${data.companySize || "Not provided"}
  Job Title: ${data.jobTitle || "Not provided"}
  Website: ${data.website || "Not provided"}
  Message: ${data.message || "Not provided"}
  Provide only the score as a single word.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a lead scoring assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1,
      temperature: 0.2,
    });

    const score = response.choices[0].message.content.trim();
    return ["High", "Medium", "Low"].includes(score) ? score : "Low";
  } catch (error) {
    console.error(`OpenAI API error for lead ${data.email}: ${error.message}`);
    return "Low"; // Fallback score on error
  }
}

module.exports = { getLeadScore };
