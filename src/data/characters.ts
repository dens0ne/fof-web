import frameData from '../../public/assets/json/framedata.json';

export interface Character {
  name: string;
}
// Load characters
const characters: Character[] = []
Object.keys(frameData).forEach(function (key) {
  const char = {
    name: key
  }
  characters.push(char);
})

export const getCharacters = () => characters;

export const getCharacter = (name: string) => characters.find(c => c.name === name);

export interface Move {
  input: string;
  startup: string;
  block: string;
  hit: string;
  notes: string;
  damage: string;
  stun: string;
  hits: string;
  guardDmg: string;
  type: string;
}

export function getMoves(name: string) {
  const moveData = (<any>frameData)[name]
  const moves: Move[] = []
  Object.keys(moveData).forEach(function (key) {
    const move = {
      input: key,
      startup: (moveData[key]['START UP'] !== null) ? moveData[key]['START UP'] : '-',
      block: (moveData[key].BLOCK !== null) ? moveData[key].BLOCK : '-',
      hit: (moveData[key].HIT !== null) ? moveData[key].HIT : '-',
      notes: (moveData[key].NOTES !== null) ? moveData[key].NOTES : '-',
      damage: (moveData[key].DAMAGE !== null) ? moveData[key].DAMAGE : '-',
      stun: (moveData[key].STUN !== null) ? moveData[key].STUN : '-',
      hits: (moveData[key].HITS !== null) ? moveData[key].HITS : '-',
      guardDmg: (moveData[key].GUARDDMG !== null) ? moveData[key].GUARDDMG : '-',
      type: (moveData[key].TYPE !== null) ? moveData[key].TYPE : '',
    }
    moves.push(move);
  })
  return moves;
}
