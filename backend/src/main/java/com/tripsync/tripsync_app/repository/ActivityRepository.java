package com.tripsync.tripsync_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tripsync.tripsync_app.model.Activity;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByDestination_DestinationId(Long destinationId);
}