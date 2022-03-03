import { GraphQLClient } from 'graphql-request';
import { GET_STATUS } from './messages.queries';
import { node, channelResponse } from './mesages.types';
import { StatusResponse } from '../../../generated/graphql-backend';

import { getCharacters, getEmojis, getNouns, getNumbers, getResponseTimes, getVerbs, getWords, formatToRequiredResponse } from '../../utils/utils';

const CLIENT_TOKEN = `Bearer ${process.env.CLIENT_TOKEN}`;
const client = new GraphQLClient(process.env.SERVER_URL || '', {
  headers: { Authorization: CLIENT_TOKEN },
});

export const getMessagesMetaData = async (): Promise<StatusResponse> => {
  const allNodes: node[] = [];
  const nodes = await loadResponse(null, allNodes);
  const wordNodeResults: number[] = [];
  const charNodeResults: number[] = [];
  const numberNodeResults: number[] = [];
  const emojiNodeResults: number[] = [];
  let responseNodeResults: number[] = [];
  const verbsNoderesults: number[] = [];
  const nounNodeResults: number[] = [];

  nodes.map(({ text }) => {
    wordNodeResults.push(getWords(text));
    charNodeResults.push(getCharacters(text));
    numberNodeResults.push(getNumbers(text));
    emojiNodeResults.push(getEmojis(text));
    nounNodeResults.push(getNouns(text));
    verbsNoderesults.push(getVerbs(text));
    nounNodeResults.push(getNouns(text));
  });

  responseNodeResults = getResponseTimes(nodes);

  return {
    messages: nodes?.length | 0,
    queries: Math.ceil(nodes?.length / 20),
    responseTime: formatToRequiredResponse(responseNodeResults),
    words: formatToRequiredResponse(wordNodeResults),
    numbers: formatToRequiredResponse(numberNodeResults),
    characters: formatToRequiredResponse(charNodeResults),
    emojis: formatToRequiredResponse(emojiNodeResults),
  };
};

const loadResponse = async (cursor: string | null, allNodes: node[]): Promise<node[]> => {
  const {
    channel: {
      messages: { nodes: nodes, pageInfo: pageInfo },
    },
  }: channelResponse = await fetchData(cursor);
  allNodes.length ? (allNodes = [...allNodes, ...nodes]) : (allNodes = nodes);
  if (pageInfo.hasNextPage) {
    return loadResponse(pageInfo.endCursor, allNodes);
  }

  return allNodes;
};

const fetchData = async (after: string | null): Promise<channelResponse> => {
  const variables = {
    channelId: process.env.CHANNEL_ID,
    pageSize: process.env.PAGE_SIZE,
    after,
  };
  return client.request(GET_STATUS, variables);
};
