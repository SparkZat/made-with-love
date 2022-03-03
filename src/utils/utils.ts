import { node } from '../services/messages/mesages.types';
import { Response } from '../../generated/graphql-backend';
import { Tag } from 'en-pos';

export const getVerbs = (text: string): number => {
  const txtArray = text
    .replace(/[^-a-zA-Z0-9.()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');

  const tags = new Tag(txtArray)
    .initial() // initial dictionary and pattern based tagging
    .smooth().tags;

  return tags.reduce((acc: number, val: string) => (['MD', 'VBN', 'VBD', 'VBG', 'VBZ', 'VBP', 'VB'].includes(val) ? acc + 1 : acc), 0);
};

export const getNouns = (text: string): number => {
  const txtArray = text
    .replace(/[^-a-zA-Z0-9.()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');

  const tags = new Tag(txtArray)
    .initial() // initial dictionary and pattern based tagging
    .smooth().tags;

  return tags.reduce((acc: number, val: string) => (['NN', 'NNS', 'NNP', 'NNPS'].includes(val) ? acc + 1 : acc), 0);
};
export const getResponseTimes = (nodes: node[]): number[] => nodes.slice(1).map((node, index) => new Date(node.createdAt).getTime() - new Date(nodes[index].createdAt).getTime());

export const getWords = (text: string): number => text.match(/(\w+)/g)?.length ?? 0;

export const getCharacters = (text: string): number => text.length ?? 0; //if incase we just consider alphabets characters then /[a-z]/gi

export const formatToRequiredResponse = (results: number[]): Response => {
  const sortedIntervals: number[] = results.sort((first, second) => {
    return first - second;
  });
  const totalSum: number = sortedIntervals.reduce((acc, i) => acc + i, 0);
  const average: number = totalSum / sortedIntervals.length;

  return {
    min: Math.round(sortedIntervals[0]),
    max: Math.round(sortedIntervals[sortedIntervals.length - 1]),
    avg: average.toFixed(2),
  };
};

export const getNumbers = (text: string): number =>
  text
    .replace(/[^-a-zA-Z0-9.()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((chr) => !isNaN(Number(chr)))
    .filter(Boolean).length;

export const getEmojis = (text: string): number => text.match(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g)?.length ?? 0;
