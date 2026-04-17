package com.tripsync.tripsync_app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tripsync.tripsync_app.model.Share;
import com.tripsync.tripsync_app.model.Trip;
import com.tripsync.tripsync_app.repository.ShareRepository;
import com.tripsync.tripsync_app.repository.TripRepository;

import java.util.List;
import java.util.UUID;

@Service
public class ShareService {

    @Autowired
    private ShareRepository shareRepo;

    @Autowired
    private TripRepository tripRepo;

    // Create share link
    public Share shareTrip(Long tripId, String email) {

        Trip trip = tripRepo.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        Share share = new Share();
        share.setTrip(trip);
        share.setSharedWithEmail(email);

        // Generate unique token
        share.setShareToken(UUID.randomUUID().toString());

        return shareRepo.save(share);
    }

    public List<Share> getShares(Long tripId) {
        return shareRepo.findByTrip_TripId(tripId);
    }

    // Get trip by token
    public Trip getTripByToken(String token) {
        Share share = shareRepo.findByShareToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid link"));

        return share.getTrip();
    }
}