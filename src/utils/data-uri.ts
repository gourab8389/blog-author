import DataUriParser from "datauri/parser.js";
import path from "path";

export const getBuffer = (file: any) => {
  const parser = new DataUriParser();

  const extName = path.extname(file.originalname).toString();

  return parser.format(extName, file.buffer);
};
