import { RestClient } from '@utils/restClient';

import type { QRIntegratorCreateQRIntegratorConfigClient, QRIntegratorCreateQRIntegratorConfigResponse } from './types';

/** Create or update the authenticated seller's QR integrator configuration. */
export default function createQRIntegratorConfig({ body, config }: QRIntegratorCreateQRIntegratorConfigClient): Promise<QRIntegratorCreateQRIntegratorConfigResponse> {
	return RestClient.fetch<QRIntegratorCreateQRIntegratorConfigResponse>(
		'/instore/integrator',
		{
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options,
		}
	);
}