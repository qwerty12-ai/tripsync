package com.tripsync.tripsync_app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tripsync.tripsync_app.model.Destination;
import com.tripsync.tripsync_app.model.Trip;
import com.tripsync.tripsync_app.repository.DestinationRepository;
import com.tripsync.tripsync_app.repository.TripRepository;

import java.util.List;

@Service
public class DestinationService {

    @Autowired
    private DestinationRepository destRepo;

    @Autowired
    private TripRepository tripRepo;

    public Destination addDestination(Long tripId, Destination destination) {
        Trip trip = tripRepo.findById(tripId).orElseThrow();
        destination.setTrip(trip);
        return destRepo.save(destination);
    }

    public List<Destination> getDestinations(Long tripId) {
        return destRepo.findByTrip_TripId(tripId);
    }

    public Destination getById(Long id) {
        return destRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Destination not found"));
    }

    public Destination save(Destination d) {
        return destRepo.save(d);
    }

    public void delete(Long id) {
        destRepo.deleteById(id);
    }
}