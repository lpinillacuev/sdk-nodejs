import createQRIntegratorConfig from '.';
import { QRIntegrator } from '..';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@utils/restClient';
import type { QRIntegratorCreateQRIntegratorConfigClient, QRIntegratorCreateQRIntegratorConfigData } from './types';

jest.mock('@utils/restClient');

describe('Testing QR integrator configuration', () => {
	test('should send a PATCH request with JSON body and bearer authorization', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const body = { callback_url: 'https://example.com/qr/callback' };
		const data: QRIntegratorCreateQRIntegratorConfigData = { body };
		const client: QRIntegratorCreateQRIntegratorConfigClient = { body: data.body, config };
		const spyFetch = jest.spyOn(RestClient, 'fetch');

		await createQRIntegratorConfig(client);

		expect(spyFetch).toHaveBeenCalledTimes(1);
		expect(spyFetch).toHaveBeenCalledWith('/instore/integrator', {
			method: 'PATCH',
			headers: { Authorization: 'Bearer token' },
			body: JSON.stringify(body),
			timeout: 5000,
		});
	});

	test('should forward body and requestOptions through the QRIntegrator facade', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000, platformId: 'platform' } });
		const qrIntegrator = new QRIntegrator(config);
		const body = { callback_url: 'https://example.com/qr/callback' };
		const data: QRIntegratorCreateQRIntegratorConfigData = { body, requestOptions: { timeout: 2500 } };
		const spyFetch = jest.spyOn(RestClient, 'fetch');

		await qrIntegrator.createQRIntegratorConfig(data);

		expect(spyFetch).toHaveBeenCalledTimes(1);
		expect(spyFetch).toHaveBeenCalledWith('/instore/integrator', {
			method: 'PATCH',
			headers: { Authorization: 'Bearer token' },
			body: JSON.stringify(body),
			timeout: 2500,
			platformId: 'platform',
		});
	});
});