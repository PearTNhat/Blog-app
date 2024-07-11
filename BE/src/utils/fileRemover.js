import fs from "fs";
import path from "path";

const fileRemover = (filename) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path.join(__dirname, `../uploads/${filename}`), (err) => {
      if (err) {
        if (err.code === "ENOENT") {
          reject(new Error("File dose not exist, won't remove it."));
        } else {
          reject(
            new Error(
              "Error occurred while trying to remove file " +
                filename +
                " " +
                err.message
            )
          );
        }
      } else {
        console.log(`${filename} removed`);
        resolve();
      }
    });
  });
};
export { fileRemover };
