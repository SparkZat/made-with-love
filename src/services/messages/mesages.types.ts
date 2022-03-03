export interface node {
  id: string;
  text: string;
  createdAt: string;
}

interface pageInfo {
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}
export interface message {
  nodes: [node];
  pageInfo: pageInfo;
}

export interface responseData {
  min: number;
  max: number;
  avg: string;
}

export type numberResponseNode = {
  number: responseData;
};

export type responseTimeResponseNode = {
  responseTimes: responseData;
};

export type wordsResponseNode = {
  words: responseData;
};

export type emojiResponseNode = {
  emojis: responseData;
};

export type channel = {
  messages: message;
};

export type channelResponse = {
  channel: channel;
};

export type statusResponse = {
  messages: number;
  queries: number;
  responseTime: responseData;
  characters: responseData;
  words: responseData;
  numbers: responseData;
  emojis?: responseData;
  verbs?: responseData;
  noun?: responseData;
};
