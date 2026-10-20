import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { StoreGetStoreClient, StoreGetStoreResponse } from './types';

export default function getStore({ id, config }: StoreGetStoreClient): Promise<StoreGetStoreResponse> {
	return RestClient.fetch<StoreGetStoreResponse>(
		`/stores/${encodePathParam(id)}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
		}
	);
}