package com.tripsync.tripsync_app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tripsync.tripsync_app.model.Activity;
import com.tripsync.tripsync_app.model.Destination;
import com.tripsync.tripsync_app.repository.ActivityRepository;
import com.tripsync.tripsync_app.repository.DestinationRepository;

import java.util.List;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepo;

    @Autowired
    private DestinationRepository destRepo;

    public Activity addActivity(Long destinationId, Activity activity) {
        Destination destination = destRepo.findById(destinationId).orElseThrow();
        activity.setDestination(destination);
        return activityRepo.save(activity);
    }

    public List<Activity> getActivities(Long destinationId) {
        return activityRepo.findByDestination_DestinationId(destinationId);
    }
    
    // Get activity by ID
    public Activity getById(Long id) {
        return activityRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found"));
    }

    // Save / Update activity
    public Activity save(Activity activity) {
        return activityRepo.save(activity);
    }

    // Delete activity
    public void delete(Long id) {
        if (!activityRepo.existsById(id)) {
            throw new RuntimeException("Activity not found");
        }
        activityRepo.deleteById(id);
    }
}