import { readFileSync, readFile } from "node:fs";

export const myReadFileSync = () => {
  const data = readFileSync("dummy.txt", { encoding: "utf-8" });
  console.log(data);
};

const promiseOne = new Promise((resolve, reject) => {
  const data = readFile("dummy.txt", { encoding: "utf-8" }, (err, data) => {
    if (err) reject("Error....!!!!");
    else resolve(data);
  });
});

export const myReadFileAsync = () => {
  promiseOne
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const myReadFileAwait = async () => {
  try {
    const data = await promiseOne;
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};