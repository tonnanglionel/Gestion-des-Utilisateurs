package com.proof.concept.repository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.proof.concept.beans.User;
import com.proof.concept.util.Constants;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
*
* @author Garrik Brel
*/
@Service
public class DbInit implements CommandLineRunner {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public DbInit(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        try {
        	// Delete all
            this.userRepository.deleteAll();

            // Create users
            User dan = new User("dan",passwordEncoder.encode("dan123"),"USER","GET_ALL_USERS", new Date(), "Dan", "dan@gmail.com");
            dan.setStatus(Constants.STATE_ACTIVATED);
            User admin = new User("admin",passwordEncoder.encode("admin123"),"ADMIN","CREATE_USER,UPDATE_USER,DELETE_USER,FIND_USER_BY_ID,UPDATE_USER_PASSWORD,GET_ALL_USERS", new Date(), "Administrator", "administrator@gmail.com");
            admin.setStatus(Constants.STATE_ACTIVATED);
            User manager = new User("manager",passwordEncoder.encode("manager123"),"MANAGER","CREATE_USER,FIND_USER_BY_ID,GET_ALL_USERS", new Date(), "Manager", "manager@gmail.com");
            manager.setStatus(Constants.STATE_ACTIVATED);

            List<User> users = Arrays.asList(dan,admin,manager);

            // Save to db
            this.userRepository.saveAll(users);
        }
    	catch(Exception ex) {
    		ex.printStackTrace();
    	}
    }
}
