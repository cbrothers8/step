package com.google.sps.servlets;

import java.lang.Object;
import com.google.maps;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.GeocodingApi.ComponentFilter;
import com.google.maps.GeocodingApiRequest;
import com.google.maps.model.*;
import static org.hamcrest.CoreMatchers.not;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.time.Duration;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.Test;
import org.junit.experimental.categories.Category;

GeoApiContext context = new GeoApiContext.Builder()
		    .apiKey(API_KEY)
		    .build();

DirectionsApiRequest apiRequest = DirectionsApi.newRequest(context);
apiRequest.origin(new com.google.maps.model.LatLng(latitude, longitude));
apiRequest.destination(new com.google.maps.model.LatLng(latitude, longitude));
apiRequest.mode(TravelMode.DRIVING); //set travelling mode

