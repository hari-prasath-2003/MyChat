import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";

//generate file name and writing the file content in fie system

export default function fileUploader(req, res) {
  // directory name
  const dirName = process.cwd();
  // subfolder name like [profile,image,video,audio]
  const assetType = req.headers["assettype"];
  // .png , .jpg etc
  const fileType = req.headers["filetype"];
  // random file name
  const fileName = `${uuidv4()}.${fileType}`;
  // generating actual filepath all file will be stored in asset folder
  const filePath = path.join(dirName, "assets", assetType, fileName);

  req.on("data", (chunk) => {
    fs.appendFileSync(filePath, chunk);
  });

  req.on("end", () => {
    return res.json({ success: true, fileName: fileName });
  });
}
