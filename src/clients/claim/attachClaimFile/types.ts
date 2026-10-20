import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Multipart request body for attaching a JPEG, PNG, or PDF (up to 10 MB). */
export type ClaimAttachClaimFileBody = {
	/** Binary file appended to the multipart form as the required `file` part. */
	readonly file: Blob;
};

export type ClaimAttachClaimFileClient = {
	claim_id: number;
	body: ClaimAttachClaimFileBody;
	config: MercadoPagoConfig;
};

export type ClaimAttachClaimFileData = {
	claim_id: number;
	body: ClaimAttachClaimFileBody;
	requestOptions?: Options;
};

/** JSON response returned when the attachment is created. */
export type ClaimAttachClaimFileResponse = {
	file_id: string;
	file_name: string;
};
