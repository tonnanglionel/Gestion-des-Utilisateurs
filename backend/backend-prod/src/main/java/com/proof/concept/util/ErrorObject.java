package com.proof.concept.util;

/**
 * 
 * @author JAGHO Brel
 *
 */
public class ErrorObject {

	private int errorCode;
	private String stringErrorCode;
	private String errorText;
	private String errorStatus;

	public ErrorObject() {
	}

	public ErrorObject(int errorCode, String errorText) {
		this.errorCode = errorCode;
		this.errorText = errorText;
	}

	public ErrorObject(String stringErrorCode, String errorText, String errorStatus) {
		this.stringErrorCode = stringErrorCode;
		this.errorText = errorText;
		this.errorStatus = errorStatus;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorText() {
		return errorText;
	}

	public void setErrorText(String errorText) {
		this.errorText = errorText;
	}

	public String getErrorStatus() {
		return errorStatus;
	}

	public void setErrorStatus(String errorStatus) {
		this.errorStatus = errorStatus;
	}

	public String getStringErrorCode() {
		return stringErrorCode;
	}

	public void setStringErrorCode(String stringErrorCode) {
		this.stringErrorCode = stringErrorCode;
	}

}
