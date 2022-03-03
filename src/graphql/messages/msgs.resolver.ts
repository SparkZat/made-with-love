'use strict';
import { Resolvers, StatusResponse } from '../../../generated/graphql-backend';
import { getMessagesMetaData } from '../../services/messages/messages.get';
export const resolvers: Resolvers = {
  Query: {
    status: (): Promise<StatusResponse> => {
      return getMessagesMetaData();
    },
  },
};
