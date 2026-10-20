import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Parameters forwarded to the claim attachment download request. */
export type ClaimDownloadClaimFileClient = Pick<ClaimDownloadClaimFileData, 'claim_id' | 'fileName'> & {
	config: MercadoPagoConfig;
};

/** Public input for downloading a claim attachment. */
export type ClaimDownloadClaimFileData = {
	claim_id: string | number;
	fileName: string;
	requestOptions?: Options;
};

/** The octet-stream response returned by the attachment download endpoint. */
export type ClaimDownloadClaimFileResponse = ArrayBuffer;