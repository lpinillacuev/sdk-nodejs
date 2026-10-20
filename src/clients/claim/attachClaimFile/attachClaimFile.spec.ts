import attachClaimFile from '.';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { RestClient } from '@src/utils/restClient';
import { encodePathParam } from '@utils/path';
import { Claim } from '..';

import type { ClaimAttachClaimFileClient, ClaimAttachClaimFileData } from './types';

jest.mock('@utils/restClient');

describe('Testing claim, attachClaimFile', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should POST the encoded claim path with an authenticated multipart file body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const file = new Blob(['claim'], { type: 'application/pdf' });
		const body = { file };
		const claim_id = 42;
		const input: ClaimAttachClaimFileClient = { claim_id, body, config };
		const spyFetch = jest.spyOn(RestClient, 'fetch');

		await attachClaimFile(input);

		expect(spyFetch).toHaveBeenCalledTimes(1);
		expect(spyFetch).toHaveBeenCalledWith(
			`/post-purchase/v1/claims/${encodePathParam(claim_id)}/attachments`,
			expect.objectContaining({
				method: 'POST',
				headers: { Authorization: 'Bearer token' },
				body: expect.any(FormData),
				isMultipart: true,
				timeout: 5000,
			})
		);
		const sentBody = spyFetch.mock.calls[0][1]?.body as FormData;
		expect(sentBody.get('file')).toBe(file);
	});

	test('Claim facade forwards the multipart body and request options', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token' });
		const claim = new Claim(config);
		const file = new Blob(['image'], { type: 'image/png' });
		const body = { file };
		const input: ClaimAttachClaimFileData = { claim_id: 42, body, requestOptions: { timeout: 3000 } };
		const spyFetch = jest.spyOn(RestClient, 'fetch');

		await claim.attachClaimFile(input);

		expect(spyFetch).toHaveBeenCalledWith(
			'/post-purchase/v1/claims/42/attachments',
			expect.objectContaining({
				method: 'POST',
				headers: { Authorization: 'Bearer token' },
				body: expect.any(FormData),
				isMultipart: true,
				timeout: 3000,
			})
		);
		const sentBody = spyFetch.mock.calls[0][1]?.body as FormData;
		expect(sentBody.get('file')).toBe(file);
	});
});