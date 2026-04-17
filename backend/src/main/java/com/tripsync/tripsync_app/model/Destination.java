package com.tripsync.tripsync_app.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@Entity
@Table(name = "destinations")
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long destinationId;

    @Column(nullable = false)
    private String locationName;

    private String date;

    
    @ManyToOne
    @JoinColumn(name = "trip_id", nullable = false)
    @JsonIgnoreProperties({"user", "destinations", "shares"})
    private Trip trip;

    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Activity> activities;

    public Destination() {}

    public Destination(String locationName, String date, Trip trip) {
        this.locationName = locationName;
        this.date = date;
        this.trip = trip;
    }

    // Getters & Setters
    public Long getDestinationId() { return destinationId; }

    public String getLocationName() { return locationName; }
    public void setLocationName(String locationName) { this.locationName = locationName; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public Trip getTrip() { return trip; }
    public void setTrip(Trip trip) { this.trip = trip; }

    public List<Activity> getActivities() { return activities; }
    public void setActivities(List<Activity> activities) { this.activities = activities; }
}