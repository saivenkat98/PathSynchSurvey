import { google } from "npm:googleapis@131.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: Deno.env.get("GOOGLE_CLIENT_EMAIL"),
    private_key: Deno.env.get("GOOGLE_PRIVATE_KEY")?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = Deno.env.get("GOOGLE_SPREADSHEET_ID");

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { speakerInfo, responses } = body;

    // Format data for Google Sheets
    const row = [
      new Date().toISOString(), // Timestamp
      speakerInfo.name,         // Speaker Name
      speakerInfo.date,         // Event Date
      speakerInfo.time,         // Event Time
      responses.name || "",      // Respondent Name
      responses.email || "",     // Respondent Email
      responses.phone || "",     // Respondent Phone
      responses.clarity,         // Presentation Clarity
      responses.relevance,       // Content Relevance
      responses.takeaway,        // Key Takeaway
      responses.engagement,      // Speaker Engagement
      responses.recommend,       // Would Recommend
      responses.additional || "" // Additional Comments
    ];

    // Append row to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Responses!A:M", // Adjust range based on your columns
      valueInputOption: "RAW",
      requestBody: {
        values: [row],
      },
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to submit survey" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});