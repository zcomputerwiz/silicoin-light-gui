import { createApi } from '@reduxjs/toolkit/query/react';
import silicoinLazyBaseQuery from '../silicoinLazyBaseQuery';
import { ConnectionState, ServiceName } from '@silicoin/api';

const baseQuery = silicoinLazyBaseQuery();

export const clientApi = createApi({
  reducerPath: 'clientApi',
  baseQuery,
  endpoints: (build) => ({
    close: build.mutation<boolean, {
      force?: boolean;
    }>({
      query: ({ force }) => ({
        command: 'close',
        client: true,
        args: [force]
      }),
    }),
    getState: build.query<{
      state: ConnectionState;
      attempt: number;
      serviceName?: ServiceName;
    }, undefined>({
      query: () => ({
        command: 'getState',
        client: true,
      }),
      async onCacheEntryAdded(_arg, api) {
        const { updateCachedData, cacheDataLoaded, cacheEntryRemoved } = api;
        let unsubscribe;
        try {
          await cacheDataLoaded;

          const response = await baseQuery({
            command: 'onStateChange',
            client: true,
            args: [(data: any) => {
              updateCachedData((draft) => {
                Object.assign(draft, {
                  ...data,
                });
              });
            }],
          }, api, {});

          unsubscribe = response.data;
        } finally {
          await cacheEntryRemoved;
          if (unsubscribe) {
            unsubscribe();
          }
        }
      },
    }),
  }),
});

export const { 
  useCloseMutation,
  useGetStateQuery,
} = clientApi;
