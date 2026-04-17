package com.tripsync.tripsync_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tripsync.tripsync_app.model.User;

import java.util.*;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}