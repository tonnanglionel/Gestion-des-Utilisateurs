package com.proof.concept.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.proof.concept.beans.User;
import com.proof.concept.repository.UserRepository;
import com.proof.concept.services.UsersService;
import com.proof.concept.util.Constants;

/**
 *
 * @author Garrik Brel
 */

@Service
@Transactional
public class UserServiceImpl implements UsersService {

	@Autowired
	UserRepository usersRepository;
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public User createOrUpdateUser(User usr) {
		if (usr.getUserId() != null) {
			usr.setLastUpdateOn(new Date());
			return usersRepository.save(usr);
		}
		
		usr.setPassword(passwordEncoder.encode(usr.getPassword()));
		usr.setCreatedOn(new Date());
		return usersRepository.save(usr);
	}

	@Override
	public List<User> getAllUsers() {
		List<User> users = new ArrayList<User>();
		usersRepository.getAllUsers(Constants.STATE_ACTIVATED, Constants.STATE_DEACTIVATED).forEach(users::add);
		return users;
	}

	@Override
	public User deleteUsers(int userId) {
		User userToDelete = usersRepository.findById(userId).get();
		if (userToDelete != null) {
			userToDelete.setStatus(Constants.STATE_DELETED);
			userToDelete.setLastUpdateOn(new Date());
			return usersRepository.save(userToDelete);
		}
		return null;
	}

	@Override
	public void deleteAll() {
		usersRepository.deleteAll();
	}

	@Override
	public User findByUserName(String userName) {
		User user = usersRepository.findByUsername(userName);
		if (user != null && user.getStatus() != Constants.STATE_DELETED && user.getStatus() != Constants.STATE_DEACTIVATED)
			return user;
		return null;
	}

	@Override
	public User findByUserEmail(String userEmail) {
		User user = usersRepository.findByUserEmail(userEmail);
		if (user != null && user.getStatus() != Constants.STATE_DELETED && user.getStatus() != Constants.STATE_DEACTIVATED)
			return user;
		return null;
	}

	@Override
	public User findUserById(int userId) {
		return usersRepository.findById(userId).get();
	}

	@Override
	public User updateUserPassword(int userId, String olpPassword, String newPassword) {
		User userToUpdate = usersRepository.findById(userId).get();
		if (userToUpdate != null) {
			if (passwordEncoder.matches(olpPassword, userToUpdate.getPassword())) {
				userToUpdate.setPassword(passwordEncoder.encode(newPassword));
				userToUpdate.setLastUpdateOn(new Date());
				return userToUpdate;
			}
			return null;
		} else {
			return null;
		}
	}

}
