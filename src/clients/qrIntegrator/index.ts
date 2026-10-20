import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import createQRIntegratorConfig from './createQRIntegratorConfig';
import type { QRIntegratorCreateQRIntegratorConfigData, QRIntegratorCreateQRIntegratorConfigResponse } from './createQRIntegratorConfig/types';

/** Client for configuring QR integrator callbacks. */
export class QRIntegrator {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/** Create or update the QR integrator configuration. */
	createQRIntegratorConfig({ body, requestOptions }: QRIntegratorCreateQRIntegratorConfigData): Promise<QRIntegratorCreateQRIntegratorConfigResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createQRIntegratorConfig({ body, config: this.config });
	}
}