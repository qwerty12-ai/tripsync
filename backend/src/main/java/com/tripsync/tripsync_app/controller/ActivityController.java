package com.tripsync.tripsync_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tripsync.tripsync_app.model.Activity;
import com.tripsync.tripsync_app.service.ActivityService;

import java.util.List;

@RestController
@RequestMapping("/activities")
@CrossOrigin(origins="http://localhost:5173")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    // Add activity
    @PostMapping("/{destinationId}")
    public ResponseEntity<?> addActivity(@PathVariable Long destinationId,
                                         @RequestBody Activity activity) {
        try {
            return ResponseEntity.status(201)
                    .body(activityService.addActivity(destinationId, activity));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Destination not found");
        }
    }

    // Get activities
    @GetMapping("/{destinationId}")
    public ResponseEntity<List<Activity>> getActivities(@PathVariable Long destinationId) {
        return ResponseEntity.ok(activityService.getActivities(destinationId));
    }
    
    // Update activity
    @PutMapping("/{activityId}")
    public ResponseEntity<?> updateActivity(@PathVariable Long activityId,
                                            @RequestBody Activity updated) {
        try {
            Activity act = activityService.getById(activityId);

            act.setActivityName(updated.getActivityName());
            act.setTime(updated.getTime());
            act.setNotes(updated.getNotes());

            return ResponseEntity.ok(activityService.save(act));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Activity not found");
        }
    }

    // Delete activity
    @DeleteMapping("/{activityId}")
    public ResponseEntity<?> deleteActivity(@PathVariable Long activityId) {
        try {
            activityService.delete(activityId);
            return ResponseEntity.ok("Activity deleted");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Activity not found");
        }
    }
}