package com.tripsync.tripsync_app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tripsync.tripsync_app.model.Trip;
import com.tripsync.tripsync_app.model.User;
import com.tripsync.tripsync_app.repository.TripRepository;
import com.tripsync.tripsync_app.repository.UserRepository;

import java.util.List;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepo;

    @Autowired
    private UserRepository userRepo;

    // Create trip
    public Trip createTrip(Long userId, Trip trip) {
        User user = userRepo.findById(userId).orElseThrow();
        trip.setUser(user);
        return tripRepo.save(trip);
    }

    // Get all trips of a user
    public List<Trip> getTripsByUser(Long userId) {
        return tripRepo.findByUser_UserId(userId);
    }

    // ADD THIS (Get single trip)
    public Trip getTripById(Long tripId) {
        return tripRepo.findById(tripId).orElseThrow();
    }

    // ADD THIS (Save/update trip)
    public Trip saveTrip(Trip trip) {
        return tripRepo.save(trip);
    }

    // Delete trip (cascade will handle children)
    public void deleteTrip(Long tripId) {
        tripRepo.deleteById(tripId);
    }
}