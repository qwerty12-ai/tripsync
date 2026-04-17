package com.tripsync.tripsync_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tripsync.tripsync_app.model.Trip;
import com.tripsync.tripsync_app.service.TripService;

import java.util.List;

@RestController
@RequestMapping("/trips")
@CrossOrigin(origins="http://localhost:5173")
public class TripController {

    @Autowired
    private TripService tripService;

    // Add Trip
    @PostMapping("/{userId}")
    public ResponseEntity<?> createTrip(@PathVariable Long userId,
                                        @RequestBody Trip trip) {
        try {
            return ResponseEntity.status(201)
                    .body(tripService.createTrip(userId, trip));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Trip>> getTrips(@PathVariable Long userId) {
        return ResponseEntity.ok(tripService.getTripsByUser(userId));
    }

    @GetMapping("/{tripId}")
    public ResponseEntity<?> getTrip(@PathVariable Long tripId) {
        try {
            return ResponseEntity.ok(tripService.getTripById(tripId));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Trip not found");
        }
    }
    
    // Update Trip
    @PutMapping("/{tripId}")
    public ResponseEntity<?> updateTrip(@PathVariable Long tripId,
                                        @RequestBody Trip updatedTrip) {
        try {
            Trip trip = tripService.getTripById(tripId);

            trip.setTitle(updatedTrip.getTitle());
            trip.setStartDate(updatedTrip.getStartDate());
            trip.setEndDate(updatedTrip.getEndDate());

            return ResponseEntity.ok(tripService.saveTrip(trip));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Trip not found");
        }
    }

    // Delete Trip
    @DeleteMapping("/{tripId}")
    public ResponseEntity<?> deleteTrip(@PathVariable Long tripId) {
        try {
            tripService.deleteTrip(tripId);
            return ResponseEntity.ok("Trip deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Trip not found");
        }
    }
}