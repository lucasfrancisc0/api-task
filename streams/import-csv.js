import { parse } from "csv-parse";
import fs from 'node:fs';

const csvPath = new URL('./tasks.csv', import.meta.url);



const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true, 
  fromLine: 2
});

export async function run(tasks){
  const stream = fs.createWriteStream(csvPath, { flags: 'w'});


  for await (const task of tasks){
    const [title, description] = Object.values(task);

    stream.write(`${title}, ${description}\n`);

  }

  stream.end()

};

function wait(ms){
  return new Promise((resolve) => setTimeout(resolve, ms))
};