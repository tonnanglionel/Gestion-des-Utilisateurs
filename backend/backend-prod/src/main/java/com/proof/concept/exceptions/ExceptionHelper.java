package com.proof.concept.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.proof.concept.util.Constants;
import com.proof.concept.util.ErrorObject;

import org.springframework.http.HttpStatus;

/**
 * 
 * @author Garrik Brel
 *
 */

@ControllerAdvice
public class ExceptionHelper {

    private static final Logger logger = LoggerFactory.getLogger(ExceptionHelper.class);

    @ExceptionHandler(value = { InvalidInputException.class })
    public ResponseEntity<?> handleInvalidInputException(InvalidInputException ex) {
        logger.error("Invalid Input Exception: ", ex.getMessage());
        ErrorObject errorObject = new ErrorObject(Constants.SERVER_ERROR, ex.getMessage());
        return new ResponseEntity<Object>(errorObject, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = { UnauthorizedException.class })
    public ResponseEntity<?> handleUnauthorizedException(UnauthorizedException ex) {
        logger.error("Unauthorized Exception: ", ex.getMessage());
        ErrorObject errorObject = new ErrorObject(Constants.USER_NON_AUTHENTICATED, ex.getMessage());
        return new ResponseEntity<Object>(errorObject, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = { ApiException.class })
    public ResponseEntity<?> handleApiException(ApiException ex) {
        logger.error("ApiException Exception: ", ex.getMessage());
        ErrorObject errorObject = new ErrorObject(ex.getCode(), ex.getMessage(), ex.getStatus());
        return new ResponseEntity<Object>(errorObject, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = { Exception.class })
    public ResponseEntity<?> handleException(Exception ex) {
        ex.printStackTrace();
        logger.error("Exception: ", ex.getMessage());
        ErrorObject errorObject = new ErrorObject(Constants.SERVER_ERROR, ex.getMessage());
        return new ResponseEntity<Object>(errorObject, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
