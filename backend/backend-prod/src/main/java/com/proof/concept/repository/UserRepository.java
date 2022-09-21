package com.proof.concept.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.proof.concept.beans.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
        User findByUsername(String username);

        @Modifying
        @Query("UPDATE User u SET u.status = :status, u.lastUpdateOn = :lastUpdateOn WHERE u.userId = :userId")
        User deleteUser(@Param("status") short userStatus, @Param("lastUpdateOn") Date lastUpdateOn,
                @Param("userId") int userId);

        @Query("SELECT u FROM User u WHERE u.status = :activateStatus OR u.status = :deActivateStatus")
        List<User> getAllUsers(@Param("activateStatus") short userStatus,
                @Param("deActivateStatus") short userDeActivateStatus);

        @Query("SELECT u FROM User u")
        List<User> getAllUsers();

        @Modifying
        @Query("DELETE FROM User u")
        void deleteAllUsers();

        User findByUserEmail(String userEmail);
}
