package com.proof.concept.services;

import java.util.List;

import com.proof.concept.beans.User;


/**
 *
 * @author Garrik Brel
 */
public interface UsersService {
	public User createOrUpdateUser(User usr);

	public List<User> getAllUsers();

	public User deleteUsers(int userId);

	public void deleteAll();

	public User findByUserName(String userName);

	public User findByUserEmail(String userEmail);

	public User findUserById(int userId);

	public User updateUserPassword(int userId, String olpPassword, String newPassword);
}
