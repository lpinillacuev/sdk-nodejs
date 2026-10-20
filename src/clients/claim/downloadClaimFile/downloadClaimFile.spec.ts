import downloadClaimFile from '.';
import { Claim } from '@src/clients/claim';
import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { ClaimDownloadClaimFileClient, ClaimDownloadClaimFileData } from './types';

jest.mock('@utils/restClient');

describe('Testing claim, downloadClaimFile', () => {
	test('downloads the attachment as binary with both path parameters encoded and no body', async () => {
		const config = new MercadoPagoConfig({ accessToken: 'token', options: { timeout: 5000 } });
		const data: ClaimDownloadClaimFileData = { claim_id: 'claim /é', fileName: 'report /é.pdf' };
		const request: ClaimDownloadClaimFileClient = {
			claim_id: data.claim_id,
			fileName: data.fileName,
			config,
		};
		const binary = new Uint8Array([0, 255]).buffer;
		const spyFetch = jest.spyOn(RestClient, 'fetch').mockResolvedValue(binary);

		const result = await downloadClaimFile(request);
		expect(result).toBe(binary);

		expect(encodePathParam(data.claim_id)).toBe('claim%20%2F%C3%A9');
		expect(encodePathParam(data.fileName)).toBe('report%20%2F%C3%A9.pdf');
		expect(spyFetch).toHaveBeenCalledWith(
			'/post-purchase/v1/claims/claim%20%2F%C3%A9/attachments/report%20%2F%C3%A9.pdf/download',
			{
				method: 'GET',
				headers: { Authorization: 'Bearer token' },
				timeout: 5000,
				responseType: 'arrayBuffer',
			}
		);
		expect(spyFetch).toHaveBeenCalledTimes(1);
		expect(spyFetch.mock.calls[0][1]).not.toHaveProperty('body');
		expect(spyFetch.mock.calls[0][1]).toHaveProperty('responseType', 'arrayBuffer');
		expect(result).toBeInstanceOf(ArrayBuffer);
	});
});