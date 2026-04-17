package com.tripsync.tripsync_app.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId;

    @Column(nullable = false)
    private String activityName;

    private String time;
    private String notes;

    
    @ManyToOne
    @JoinColumn(name = "destination_id", nullable = false)
    @JsonIgnoreProperties({"trip", "activities"})
    private Destination destination;

    public Activity() {}

    public Activity(String activityName, String time, String notes, Destination destination) {
        this.activityName = activityName;
        this.time = time;
        this.notes = notes;
        this.destination = destination;
    }

    // Getters & Setters
    public Long getActivityId() { return activityId; }

    public String getActivityName() { return activityName; }
    public void setActivityName(String activityName) { this.activityName = activityName; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Destination getDestination() { return destination; }
    public void setDestination(Destination destination) { this.destination = destination; }
}