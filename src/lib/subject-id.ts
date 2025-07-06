import { btoa } from 'node:buffer';

function toAlphanumeric(input: string): string {
  return input
    .normalize('NFD') // Step 1: Decompose characters
    .replace(/[\u0300-\u036f]/g, '') // Step 2: Remove accents
    .replace(/[^a-zA-Z0-9]/g, ''); // Step 3: Remove non-alphanumerics
}

export function getSubjectID(name: string) {
  return btoa(toAlphanumeric(name));
}
