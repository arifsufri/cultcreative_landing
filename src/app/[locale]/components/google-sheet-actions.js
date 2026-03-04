"use server";

import { google } from "googleapis";

const spreadsheetId =
  process.env.SPREADSHEET_ID || "1ryIQJNqotuRbQQob4S2xQjDW3jzPCPOA2JkCsJ4iEw4";

const getService = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
};

export const createBrand = async (values) => {
  const service = await getService();
  try {
    await service.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      valueInputOption: "RAW",
      range: "Brands!A2",
      requestBody: {
        values: [[...Object.values(values)]],
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createCreator = async (values) => {
  const service = await getService();
  try {
    await service.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      valueInputOption: "RAW",
      range: "Creators!A2",
      requestBody: {
        values: [[...Object.values(values)]],
      },
    });
  } catch (error) {
    return error;
  }
};

export const createContact = async (values) => {
  const service = await getService();
  try {
    // Order values to match sheet headers: Created On | Company Name | Work Email | Subject | Message
    const orderedValues = [
      values.createdOn,
      values.name,
      values.email,
      values.subject,
      values.message,
    ];
    
    await service.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      valueInputOption: "RAW",
      range: "Contact Us!A2",
      requestBody: {
        values: [orderedValues],
      },
    });
    console.log("Contact saved to sheet:", orderedValues);
  } catch (error) {
    console.log("Error appending to sheet:", error);
    return error;
  }
};
