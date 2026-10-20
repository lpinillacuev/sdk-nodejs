/**
 * Request types for creating or updating QR integrator configuration.
 *
 * @module qrIntegrator/createQRIntegratorConfig/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** Configuration sent to the QR integrator endpoint. */
export declare type QRIntegratorCreateQRIntegratorConfigRequest = {
	/** Callback URL for QR integration events. */
	callback_url: string;
	/** @deprecated Notification URL for QR integration events. */
	notification_url?: string;
};

/** The 200 response has no defined payload schema; HTTP metadata is always available. */
export declare type QRIntegratorCreateQRIntegratorConfigResponse = ApiResponse;
/** Response alias used by the QR integrator facade. */
export declare type QRIntegratorConfigResponse = QRIntegratorCreateQRIntegratorConfigResponse;

/** Internal parameters passed to the operation implementation. */
export declare type QRIntegratorCreateQRIntegratorConfigClient = {
	body: QRIntegratorCreateQRIntegratorConfigRequest;
	config: MercadoPagoConfig;
};

/** Public input for creating or updating QR integrator configuration. */
export declare type QRIntegratorCreateQRIntegratorConfigData = {
	body: QRIntegratorCreateQRIntegratorConfigRequest;
	requestOptions?: Options;
};