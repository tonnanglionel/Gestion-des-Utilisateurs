package com.proof.concept.security;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.proof.concept.beans.User;
import com.proof.concept.model.LoginViewModel;
import com.proof.concept.util.Constants;
import com.proof.concept.util.ErrorObject;
import com.proof.concept.util.Util;
import com.proof.concept.util.UserWrapper;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    /*
     * Trigger when we issue POST request to /login We also need to pass in
     * {"username":"dan", "password":"dan123"} in the request body
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        // Grab credentials and map them to login viewmodel
        LoginViewModel credentials = null;
        try {
            credentials = new ObjectMapper().readValue(request.getInputStream(), LoginViewModel.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Create login token
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                credentials.getUsername(), credentials.getPassword(), new ArrayList<>());

        // Authenticate user
        Authentication auth = authenticationManager.authenticate(authenticationToken);
        return auth;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        // Grab principal
        UserPrincipal principal = (UserPrincipal) authResult.getPrincipal();
        User connectedUser = principal.getUser();

        // Create JWT Token
        Date expiresAt = new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME);
        String token = JWT.create().withSubject(principal.getUsername()).withExpiresAt(expiresAt)
                .sign(HMAC512(JwtProperties.SECRET.getBytes()));

        // Add token in response
        if (connectedUser.getStatus() == Constants.STATE_ACTIVATED) {
            UserWrapper wrapper = new UserWrapper();
            wrapper.setUser(connectedUser);
            wrapper.setToken(token);
            wrapper.setTokenExpiresAt(expiresAt);
            response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + token);
            response.setContentType("text/json; charset=UTF-8");
            response.getWriter().write(Util.getJsonFromObject(wrapper, UserWrapper.class));
            return;
        } else {
            ErrorObject errorObject = new ErrorObject("ACCOUNT_DESACTIVATED", "User account is desactivated",
                    Constants.NOT_SUPPORTED_STATUS);
            response.setContentType("text/json; charset=UTF-8");
            response.setStatus(Constants.USER_NON_AUTHENTICATED);
            response.getWriter().write(Util.getJsonFromObject(errorObject, ErrorObject.class));
            return;
        }
    }
}
