import getStore from './getStore';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { StoreGetStoreData, StoreGetStoreResponse } from './getStore/types';

/** Client for retrieving MercadoPago stores. */
export class Store {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	getStore({ id, requestOptions }: StoreGetStoreData): Promise<StoreGetStoreResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getStore({ id, config: this.config });
	}
}