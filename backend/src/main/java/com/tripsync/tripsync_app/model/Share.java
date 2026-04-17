package com.tripsync.tripsync_app.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "shares")
public class Share {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shareId;

    @Column(nullable = false)
    private String sharedWithEmail;

    // Share token
    @Column(unique = true, nullable = false)
    private String shareToken;

    @ManyToOne
    @JoinColumn(name = "trip_id", nullable = false)
    @JsonIgnoreProperties({"user", "destinations", "shares"})
    private Trip trip;

    public Share() {}

    // Getters & Setters
    public Long getShareId() { return shareId; }

    public String getSharedWithEmail() { return sharedWithEmail; }
    public void setSharedWithEmail(String sharedWithEmail) { this.sharedWithEmail = sharedWithEmail; }

    public String getShareToken() { return shareToken; }
    public void setShareToken(String shareToken) { this.shareToken = shareToken; }

    public Trip getTrip() { return trip; }
    public void setTrip(Trip trip) { this.trip = trip; }
}