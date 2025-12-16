import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const DATA_DIR = path.join(__dirname, "../../data");

function getSheetName(eventId: string): string {
  if (eventId.length <= 31) return eventId;
  const hash = crypto.createHash("md5").update(eventId).digest("hex").slice(0, 6);
  return eventId.slice(0, 24) + "-" + hash;
}

interface RegistrationData {
  name: string;
  email: string;
  fields: Record<string, string | string[] | boolean>;
  timestamp: string;
}

export async function addRegistration(eventId: string, data: RegistrationData): Promise<void> {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const filePath = path.join(DATA_DIR, "registrations.xlsx");
  let workbook: ExcelJS.Workbook;

  if (fs.existsSync(filePath)) {
    workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
  } else {
    workbook = new ExcelJS.Workbook();
  }

  const sheetName = getSheetName(eventId);
  let worksheet = workbook.getWorksheet(sheetName);

  if (!worksheet) {
    worksheet = workbook.addWorksheet(sheetName);
    const headers = ["Timestamp", "Name", "Email"];
    Object.keys(data.fields).forEach((key) => headers.push(key));
    worksheet.addRow(headers);
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.commit();
  }

  const existingHeaders = worksheet.getRow(1).values as string[];
  const newFieldKeys = Object.keys(data.fields);

  newFieldKeys.forEach((key) => {
    if (!existingHeaders.includes(key)) {
      const nextCol = existingHeaders.length;
      worksheet!.getCell(1, nextCol).value = key;
      existingHeaders.push(key);
    }
  });

  const rowData: (string | number | boolean)[] = [data.timestamp, data.name, data.email];

  for (let i = 4; i < existingHeaders.length; i++) {
    const header = existingHeaders[i];
    const value = data.fields[header];
    if (Array.isArray(value)) {
      rowData.push(value.join(", "));
    } else if (typeof value === "boolean") {
      rowData.push(value ? "Yes" : "No");
    } else {
      rowData.push(value || "");
    }
  }

  worksheet.addRow(rowData);

  try {
    await workbook.xlsx.writeFile(filePath);
  } catch (err: any) {
    if (err.code === "EBUSY") {
      throw new Error("Excel file is currently open. Please close it and try again.");
    }
    throw err;
  }
}

export function getExcelFilePath(): string {
  return path.join(DATA_DIR, "registrations.xlsx");
}
