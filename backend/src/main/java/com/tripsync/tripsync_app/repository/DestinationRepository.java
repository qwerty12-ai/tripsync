package com.tripsync.tripsync_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tripsync.tripsync_app.model.Destination;

import java.util.List;

public interface DestinationRepository extends JpaRepository<Destination, Long> {

    List<Destination> findByTrip_TripId(Long tripId);
}