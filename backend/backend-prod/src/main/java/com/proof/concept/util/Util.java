package com.proof.concept.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.Random;

public class Util {

    protected static SecureRandom random = new SecureRandom();

    /**
     * Cette fonction permet de générer une clé pour les vendors et les products
     *
     * @param productOrVendorName
     * @return
     */
    public static String generateKey(String productOrVendorName) {
        Random rand = new Random();
        long longToken = Math.abs(random.nextLong());
        String randomValue = "";
        for (int i = 0; i < 15; i++) {
            char c = (char) (rand.nextInt(60) + 69);
            randomValue += c;
        }
        randomValue = randomValue + Long.toString(longToken, 16);
        String token = productOrVendorName + "-" + randomValue + (new Date().getTime());
        return Base64.getEncoder().withoutPadding().encodeToString(token.getBytes());
    }


    /**
     * Cette fonction permet de retrouver la forme objet d'une chaîne Json
     *
     * @param jsonObject
     * @param objectClass
     * @return
     */
    public static Object getObjectFromJson(String jsonObject, Class objectClass) {
        try {
            Object obj;
            final GsonBuilder builder = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
            final Gson gson = builder.create();
            obj = gson.fromJson(jsonObject, objectClass);
            return obj;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Fonction permettant de retrouver le format Json d'un objet
     *
     * @param obj
     * @param ojectClass
     * @return
     */
    public static String getJsonFromObject(Object obj, Class ojectClass) {
        try {
            String json = null;
            final GsonBuilder builder = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
            final Gson gson = builder.create();
            json = gson.toJson(obj, ojectClass);
            return json;
        } catch (Exception e) {
            String error = "Errors while converting";
            String json = null;
            final GsonBuilder builder = new GsonBuilder();
            final Gson gson = builder.create();
            json = gson.toJson(error, String.class);
            e.printStackTrace();
            return json;
        }
    }

    
    /**
     * Cette fonction permet de générer un mot de passe pour un utilisateur ayant oublié le sien
     *
     * @return
     */
    public static String generateRandomUserPassword() {
        Random rand = new Random();
        String password = "";
        for (int i = 0; i < 6; i++) {
            char c = (char) (rand.nextInt(60) + 69);
            password += c;
        }
        return Base64.getEncoder().withoutPadding().encodeToString(password.getBytes());
    }

    public static boolean isNetWorkAvailable(){
        try {
            InetAddress ip=InetAddress.getByName("www.google.com");
            return ip.isReachable(10000);
        } catch (UnknownHostException e) {
            // TODO Auto-generated catch block
            // e.printStackTrace();
            return false;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            // e.printStackTrace();
            return false;
        } 
    }
}
