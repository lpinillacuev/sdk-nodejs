import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

export declare type StoreGetStoreClient = {
	id: string | number;
	config: MercadoPagoConfig;
};

export declare type StoreGetStoreData = {
	id: string | number;
	requestOptions?: Options;
};

/** JSON response for a store returned by GET /stores/{id}. */
export declare interface StoreGetStoreResponse extends ApiResponse {
	id?: number;
	name?: string;
	external_id?: string;
	date_creation?: string;
}
