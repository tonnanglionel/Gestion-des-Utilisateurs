package com.proof.concept.util;

public class Constants {

	public static final short STATE_ACTIVATED = 0, STATE_DELETED = 2, STATE_ARCHIVE = 1, STATE_DEACTIVATED = 3;

	// Durée maximale d'inactivité (30 min)
	public static final int TIMEOUT_VALUE = 30;

	// Codes d'erreurs
	public static final int USER_NON_AUTHENTICATED = 401, CONNECTION_TIMEOUT = 403, ERROR_PAGE_NOT_FOUND = 404,
			SERVER_ERROR = 500, SERVER_DENY_RESPONSE = 504;


	public static final String BAD_REQUEST_STATUS = "400";
	public static final String NOT_SUPPORTED_STATUS = "401";
	public static final String INSUFFICIENT_AMOUNT_STATUS = "402";
	public static final String UNAUTHORISE_STATUS = "403";
	public static final String INTERNAL_ERROR_STATUS = "500";
	public static final String RATE_LIMIT_STATUS = "501";
	public static final String NETWORK_ERROR_STATUS = "0";
}
