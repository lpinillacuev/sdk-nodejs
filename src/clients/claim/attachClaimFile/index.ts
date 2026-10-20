import { encodePathParam } from '@utils/path';
import { RestClient } from '@src/utils/restClient';

import type { ClaimAttachClaimFileClient, ClaimAttachClaimFileResponse } from './types';

/** Attach a file to a claim as multipart form data. */
export default function attachClaimFile({ claim_id, body, config }: ClaimAttachClaimFileClient): Promise<ClaimAttachClaimFileResponse> {
	if (!body.file) {
		throw new TypeError('A claim attachment file is required');
	}
	const form = new FormData();
	form.append('file', body.file);

	return RestClient.fetch<ClaimAttachClaimFileResponse>(
		`/post-purchase/v1/claims/${encodePathParam(claim_id)}/attachments`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			body: form,
			...config.options,
			isMultipart: true,
		}
	);
}