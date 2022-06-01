import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from 'fs';
import path from "path";

const ERR_MESSAGE = 'FS operation failed';
const FOLDER = 'src/fs/files';
const DESTINATION_FOLDER = 'src/fs/files_copy';

export const copy = async () => {

  const copyRecursiveSync = (src, dest) => {
    try {
      if (!existsSync(src)) throw new Error(ERR_MESSAGE);
      if (existsSync(dest)) throw new Error(ERR_MESSAGE);

      const stats = statSync(src);
      const isDirectory = stats.isDirectory();

      if (isDirectory) {
        mkdirSync(dest);
        return readdirSync(src).forEach((fileName) => copyRecursiveSync(path.join(src, fileName), path.join(dest, fileName)));
      } else {
        return copyFileSync(src, dest);
      }
    } catch (e) {
      console.error(e);
    }
  };

  copyRecursiveSync(FOLDER, DESTINATION_FOLDER);
};


await copy();