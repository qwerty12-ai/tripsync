package com.tripsync.tripsync_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TripsyncAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(TripsyncAppApplication.class, args);
		System.out.println("Backend Is running on PORT: 8080, Open URL: http://localhost:8080");
	}

}
