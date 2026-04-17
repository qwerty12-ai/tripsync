package com.tripsync.tripsync_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tripsync.tripsync_app.model.Share;

import java.util.List;
import java.util.Optional;

public interface ShareRepository extends JpaRepository<Share, Long> {

    List<Share> findByTrip_TripId(Long tripId);

    Optional<Share> findByShareToken(String token);
}