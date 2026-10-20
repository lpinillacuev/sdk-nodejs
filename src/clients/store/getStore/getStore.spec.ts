import getStore from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import type { StoreGetStoreClient, StoreGetStoreData } from './types';
import { Store } from '..';

jest.mock('@utils/restClient');

describe('Testing store, getStore', () => {
	test('should GET the encoded store path with authorization and no body', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
	const id = 'store/123';
	const request: StoreGetStoreClient = { id, config };
	const spyFetch = jest.spyOn(RestClient, 'fetch');

	await getStore(request);

	expect(encodePathParam(id)).toBe('store%2F123');
	expect(spyFetch).toHaveBeenCalledWith('/stores/store%2F123', {
		method: 'GET',
		headers: { Authorization: 'Bearer token' },
		timeout: 5000,
	});
	expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
});

test('should expose getStore on the Store facade', async () => {
	const config = new MercadoPagoConfig({ accessToken: 'token' });
	const store = new Store(config);
	const data: StoreGetStoreData = { id: 'store/123', requestOptions: { timeout: 5000 } };
	const spyFetch = jest.spyOn(RestClient, 'fetch');

	await store.getStore(data);

	expect(spyFetch).toHaveBeenCalledWith('/stores/store%2F123', {
		method: 'GET',
		headers: { Authorization: 'Bearer token' },
		timeout: 5000,
	});
	expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
});
});