import attachClaimFile from './attachClaimFile';
import downloadClaimFile from './downloadClaimFile';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { ClaimAttachClaimFileData, ClaimAttachClaimFileResponse } from './attachClaimFile/types';
import type { ClaimDownloadClaimFileData, ClaimDownloadClaimFileResponse } from './downloadClaimFile/types';

/** Client for claim attachment operations. */
export class Claim {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/** Attach a JPEG, PNG or PDF file (up to 10 MB) to a claim. */
	attachClaimFile({ claim_id, body, requestOptions }: ClaimAttachClaimFileData): Promise<ClaimAttachClaimFileResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return attachClaimFile({ claim_id, body, config: this.config });
	}

	/** Download an attachment from a claim as binary content. */
	downloadClaimFile({ claim_id, fileName, requestOptions }: ClaimDownloadClaimFileData): Promise<ClaimDownloadClaimFileResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return downloadClaimFile({ claim_id, fileName, config: this.config });
	}
}