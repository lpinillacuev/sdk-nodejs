import { RestClient } from '@utils/restClient';
import { encodePathParam } from '@utils/path';

import type { ClaimDownloadClaimFileClient } from './types';

/** Download an attached claim file as binary content. */
export default function downloadClaimFile({ claim_id, fileName, config }: ClaimDownloadClaimFileClient): Promise<ArrayBuffer> {
	return RestClient.fetch<ArrayBuffer>(
		`/post-purchase/v1/claims/${encodePathParam(claim_id)}/attachments/${encodePathParam(fileName)}/download`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			...config.options,
			responseType: 'arrayBuffer',
		}
	);
}