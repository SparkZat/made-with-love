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

export type channel = {
  messages: message;
};

export type channelResponse = {
  channel: channel;
};
