package com.tripsync.tripsync_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tripsync.tripsync_app.model.Destination;
import com.tripsync.tripsync_app.service.DestinationService;

import java.util.List;

@RestController
@RequestMapping("/destinations")
@CrossOrigin(origins="http://localhost:5173")
public class DestinationController {

    @Autowired
    private DestinationService destService;

    // Add destination
    @PostMapping("/{tripId}")
    public ResponseEntity<?> addDestination(@PathVariable Long tripId,
                                            @RequestBody Destination destination) {
        try {
            return ResponseEntity.status(201)
                    .body(destService.addDestination(tripId, destination));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Trip not found");
        }
    }

    // Get destinations
    @GetMapping("/{tripId}")
    public ResponseEntity<List<Destination>> getDestinations(@PathVariable Long tripId) {
        return ResponseEntity.ok(destService.getDestinations(tripId));
    }
    
    // Update destination
    @PutMapping("/{destinationId}")
    public ResponseEntity<?> updateDestination(@PathVariable Long destinationId,
                                               @RequestBody Destination updated) {
        try {
            Destination dest = destService.getById(destinationId);

            dest.setLocationName(updated.getLocationName());
            dest.setDate(updated.getDate());

            return ResponseEntity.ok(destService.save(dest));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Destination not found");
        }
    }

    // Delete destination
    @DeleteMapping("/{destinationId}")
    public ResponseEntity<?> deleteDestination(@PathVariable Long destinationId) {
        try {
            destService.delete(destinationId);
            return ResponseEntity.ok("Destination deleted");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Destination not found");
        }
    }
}