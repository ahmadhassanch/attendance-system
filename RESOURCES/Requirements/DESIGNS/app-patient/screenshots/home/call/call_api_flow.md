# List of Call endPoints

## Call

   - /getRecentCalls
   - /makeCall

   ### getRecentCalls
   <img src="lib/api_workflows/screenshots/home/call/19_recent_calls.png" alt="image" height="500">

    req = {
        "userId": "XXXXXX"
        "page": 1,
        "per_page": 30,
    }
    response = {
        "total_records": 100,
        "records": [
            {
                "userId": "XXXXXX"
                "userCallId": "XXXXXX",
                "callTitle": "Title",
                "callType": "AUDIO",
                "callState": "Missed Call",
                "isGroupCall": false,
                "callDuration": "12:10",
                "dateAdded": 34567687876,
                "callParticipants": [user1, user2],
            },
            {
                "userId": "XXXXXX"
                "userCallId": "XXXXXX",
                "callTitle": "Title",
                "callType": "AUDIO",
                "callState": "Missed Call",
                "isGroupCall": false,
                "callDuration": "12:10",
                "dateAdded": 34567687876,
                "callParticipants": [user1, user2],
            },
        ]
    }

   ### makeCall
   <img src="lib/api_workflows/screenshots/home/call/20_call.png" alt="image" height="500">

    req = {
        "??": "??????????"
    }
    response = {
        "??": "??????????"
    }