import * as fs from 'fs/promises';

export const writeDataToFile = async (fileName, content) => {
  try {
    await fs.writeFile(fileName, JSON.stringify(content), { encoding:'utf8', flag:'w' });

  } catch (err) {
    console.log(err);
  }
}
