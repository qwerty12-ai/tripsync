package com.tripsync.tripsync_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tripsync.tripsync_app.model.Trip;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {

    List<Trip> findByUser_UserId(Long userId);
}