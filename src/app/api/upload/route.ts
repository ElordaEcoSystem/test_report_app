import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "Нет файла" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileExt = file.name.split(".").pop();
  const filename = `${uuidv4()}.${fileExt}`;
  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "report_photo"
  );
  const filePath = path.join(uploadDir, filename);

  try {
    await fs.mkdir(uploadDir, { recursive: true });
    await writeFile(filePath, buffer);

    const baseUrl = process.env.PUBLIC_UPLOAD_URL || "";
    return NextResponse.json({ url: `${baseUrl}/${filename}` });
  } catch (error) {
    console.error("Ошибка при сохранении файла:", error);
    return NextResponse.json(
      { error: "Ошибка при сохранении файла" },
      { status: 500 }
    );
  }
}
