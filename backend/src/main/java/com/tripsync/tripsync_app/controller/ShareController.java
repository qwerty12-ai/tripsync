package com.tripsync.tripsync_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tripsync.tripsync_app.model.Share;
import com.tripsync.tripsync_app.service.ShareService;

import java.util.List;

@RestController
@RequestMapping("/share")
@CrossOrigin(origins="http://localhost:5173")
public class ShareController {

    @Autowired
    private ShareService shareService;

    // Create share (returns link)
    @PostMapping("/{tripId}")
    public ResponseEntity<?> shareTrip(@PathVariable Long tripId,
                                       @RequestParam String email) {
        try {
            Share share = shareService.shareTrip(tripId, email);

            String link = "http://localhost:8080/share/view/" + share.getShareToken();

            return ResponseEntity.status(201).body(link);

        } catch (Exception e) {
            return ResponseEntity.status(404).body("Trip not found");
        }
    }

    // View shared trip
    @GetMapping("/view/{token}")
    public ResponseEntity<?> viewSharedTrip(@PathVariable String token) {
        try {
            return ResponseEntity.ok(shareService.getTripByToken(token));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Invalid or expired link");
        }
    }

    // Existing
    @GetMapping("/{tripId}")
    public ResponseEntity<List<Share>> getShares(@PathVariable Long tripId) {
        return ResponseEntity.ok(shareService.getShares(tripId));
    }
}