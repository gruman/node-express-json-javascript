import { Request, Response, NextFunction } from 'express';
import facts from '../constants/facts.json';
import * as fs from 'fs';
import * as path from 'path';

function randomInt(min: number, max: number): number {
  // Ensure that the input values are integers
  min = Math.ceil(min);
  max = Math.floor(max);

  // Generate a random integer within the specified range
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}

export const getItems = (req: Request, res: Response, next: NextFunction): void => {
  let array = facts;
  shuffle(array);
  res.send([array[0], array[1]]);
};

export const getAll = (req: Request, res: Response, next: NextFunction): void => {
  const sortedFacts = facts.slice().sort((a, b) => b.elo - a.elo);

  res.send(sortedFacts);
};

export const update = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const eloData = req.body; // Assuming the request body contains an array of objects with { id, elo }
    console.log(eloData)

    // Use __dirname to get the directory of the current module
    const factsFilePath = path.join(__dirname, '../constants/facts.json');
    const factsData = JSON.parse(fs.readFileSync(factsFilePath, 'utf-8'));

    // Update the Elo ratings based on the provided data
    eloData.forEach((eloInfo: { id: string; elo: number }) => {
      const factToUpdate = factsData.find((fact: { id: string }) => fact.id === eloInfo.id);

      if (factToUpdate) {
        factToUpdate.elo = eloInfo.elo;
      }
    });

    // Save the updated facts back to the JSON file
    fs.writeFileSync(factsFilePath, JSON.stringify(factsData, null, 2), 'utf-8');

    res.send('Elo ratings updated successfully');
  } catch (error) {
    console.error('Error updating Elo ratings:', error);
    res.status(500).send('Internal Server Error');
  }
};
