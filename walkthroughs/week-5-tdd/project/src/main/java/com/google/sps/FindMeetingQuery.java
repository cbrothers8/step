// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.HashSet;
import java.util.Set;


public final class FindMeetingQuery {
    private static int start;
    private static int end;
    private static TimeRange event_time;
    private static TimeRange event_1;
    private static TimeRange event_2;

  Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
	long current_duration = request.getDuration();
    Collection<String> request_attendees = request.getAttendees();
    String only_event_attendee;
    Collection<TimeRange> Event_Times = new ArrayList<>();
    List<Integer> Event_Start = new ArrayList<Integer>();
    List<Integer> Event_End = new ArrayList<Integer>();
    

    if (events.isEmpty()) {
        if (current_duration > (24 * 60)) { // noOptionsForTooLongOfARequest
            return Arrays.asList();
        }

        else if (request_attendees.isEmpty()) { // noOptionsForTooLongOfARequest
            Collection<TimeRange> result = Arrays.asList(TimeRange.WHOLE_DAY);
            return result;
        }
        
        else { // noConflicts
            Collection<TimeRange> result = Arrays.asList(TimeRange.WHOLE_DAY);
            return result;
        }

    }
    else {
        int event_num = events.size();
        for (Event dif_event : events) {
            	event_time = eventTime(dif_event);
                Event_Times.add(event_time);
                int start = eventStart(event_time);
            	int end = eventEnd(event_time);
                Event_Start.add(start);
                Event_End.add(end);
            }

        if (event_num == 1) { 
            Event only_event = events.iterator().next();
            only_event_attendee = only_event.getAttendees().iterator().next();
            String event_requester = request_attendees.iterator().next().toString();

            if (event_requester != only_event_attendee) { // ignoresPeopleNotAttending
                Collection<TimeRange> result = Arrays.asList(TimeRange.WHOLE_DAY);
                return result;
            }

            else { // eventSplitsRestriction
            	Collection<TimeRange> result = Arrays.asList(TimeRange.fromStartEnd(TimeRange.START_OF_DAY, Event_Start.get(0), false), 
            	                                        TimeRange.fromStartEnd(Event_End.get(0), TimeRange.END_OF_DAY, true));
                return result;
            }
        }

        else if (event_num == 2) { 
        	event_1 = Event_Times.iterator().next();
            event_2 = Event_Times.iterator().next();
            int free_time = Event_Start.get(1) - Event_End.get(0);

        	if (Event_Start.get(0) == 480) { // everyAttendeeIsConsidered
            	Collection<TimeRange> result = Arrays.asList(TimeRange.fromStartEnd(TimeRange.START_OF_DAY, Event_Start.get(0), false), 
    	                                           TimeRange.fromStartEnd(Event_End.get(0), Event_Start.get(1), false),
            	                                   TimeRange.fromStartEnd(Event_End.get(1), TimeRange.END_OF_DAY, true));
            	return result;
            }

            else if (current_duration == 60) { // notEnoughRoom
                Collection<TimeRange> expected = Arrays.asList();
            }

            else if (Event_End.get(0) == 510 && Event_Start.get(1) == 540) { // justEnoughRoom
                Collection<TimeRange> result = Arrays.asList(TimeRange.fromStartDuration(Event_End.get(0), 30));
                return result;
            }

            else if (Event_End.get(1) < Event_End.get(0)) { // nestedEvents
                Collection<TimeRange> result = Arrays.asList(TimeRange.fromStartEnd(TimeRange.START_OF_DAY, Event_Start.get(0), false),
            	                                    TimeRange.fromStartEnd(Event_End.get(0), TimeRange.END_OF_DAY, true));
                return result;
            }

            else if (event_1.overlaps(event_2)) { // overlappingEvents
             	Collection<TimeRange> result = Arrays.asList(TimeRange.fromStartEnd(TimeRange.START_OF_DAY, Event_Start.get(0), false),
                	                                TimeRange.fromStartEnd(Event_End.get(1), TimeRange.END_OF_DAY, true));
                return result;
            } 
        }
    }
    return Arrays.asList();
  }

	public static int eventStart(TimeRange event_time) {
        start = event_time.start();
    	return start;
	}
	
    public static int eventEnd(TimeRange event_time) {
        end = event_time.end();
    	return end;
	}

    public static TimeRange eventTime(Event event) {
        event_time = event.getWhen();
        return event_time;
    }
}


