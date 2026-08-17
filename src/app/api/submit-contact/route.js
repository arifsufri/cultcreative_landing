import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { google } from "googleapis";

const prisma = new PrismaClient();
const sheets = google.sheets("v4");

export const POST = async (req) => {
  try {
    // Parse the request body
    const { companyName, workEmail, subject, message } = await req.json();

    // Prepare data for the database
    const data = {
      createdOn: new Date(),
      name: companyName,
      email: workEmail,
      subject,
      message,
    };

    // Save the data to the database using Prisma
    // await prisma.contact.create({ data });

    // Save to Google Sheets
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          type: "service_account",
          project_id: process.env.GOOGLE_PROJECT_ID,
          private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          client_id: process.env.GOOGLE_CLIENT_ID,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const spreadsheetId = "1ryIQJNqotuRbQQob4S2xQjDW3jzPCPOA2JkCsJ4iEw4";
      const sheetName = "Contact Us";

      const response = await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: `'${sheetName}'!A:E`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [data.createdOn, data.name, data.email, data.subject, data.message],
          ],
        },
      });

      console.log("Successfully appended to Google Sheets:", response.data);
    } catch (sheetsError) {
      console.error("Error appending to Google Sheets:", sheetsError);
      // Don't fail the request if Google Sheets fails
    }

    // Return a success message
    return NextResponse.json(
      { message: `Submitted. Thanks, ${data.name}!` },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving message:", error);

    // Return an error response with 500 status
    return NextResponse.json(
      { error: "Form failed to submit. Please contact our admin." },
      { status: 500 },
    );
  }
};
