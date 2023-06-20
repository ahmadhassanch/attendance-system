# List of Schedule endpoints

  ## Schedule

   - /getTodaySchedule
   - /getWeeklySchedule
   - /adhoc || /submitManualReading || /medicineTaken

   ### getTodaySchedule
   <img src="lib/api_workflows/screenshots/home/schedule/07_today_schedule.png" alt="image" height="500">

    req = {
        "patientId" : "xxxx-xxxx-xxx-xxx"
        "startDate" : null
    }
    response = {
        "totalTasks": 6,
        "completedTasks": 2, 
        "upcoming": [
            {
                "oderableName": "Temperature",
                "oderbaleStatus": "Overdue", 
                "sheduleTime": 1234567890, 
                "icon": "http://abc.wxy", 
                "rmsOrderItemId": "XXXX", 
                "isMedicine": false 
            },
            {
                "oderableName": "Panadol",
                "oderbaleStatus": "Overdue", 
                "sheduleTime": 1234567890, 
                "icon": "http://abc.wxy", 
                "rmsOrderItemId": "XXXX", 
                "isMedicine": true 
            }
        ], 
        "completed": [
            { 
                "oderableName": "Blood Pressure", 
                "oderableValue": [
                    {
                        "resultableName": "Systolic",
                        "resultableValue": 120.0, 
                        "status": "normal", 
                        "unit": "mmHg"
                    }, 
                    {
                        "resultableName": "Diastolic", 
                        "resultableValue": 80.0, 
                        "status": "high", 
                        "unit": "mmHg"
                    }
                ], 
                "sheduleTime": 1234567890, 
                "icon": "http://abc.wxy", 
                "readingStatus": "Normal" 
            }
        ],
        "deviceStatus": {
            "deviceName": "Body Composition Analyzer",
            "icon": "url",
            "health": "100%",
            "connectionState" : "connected"
        } 
    }

   ### getWeeklySchedule
   <img src="lib/api_workflows/screenshots/home/schedule/08_weekly_schedule.png" alt="image" height="500">
   <img src="lib/api_workflows/screenshots/home/schedule/09_device_detail.png" alt="image" height="500">

    req = { 
        startDate: 1234567890, 
        patientId: "XXXX", 
        rmsOderableId: "XXXX"
        }

    response = { 
            taskStatus: [ 
                { 
                    date: 25, 
                    day: "Monday", 
                    completed: 2, 
                    total: 6 
                }, 
                { 
                    date: 26, 
                    day: "Tuesday", 
                    completed: 1, 
                    total: 7 
                }, 
                { 
                    date: 27, 
                    day: "Wednesday", 
                    completed: 0, 
                    total: 8 
                }, 
                { 
                    date: 28, 
                    day: "Thursday", 
                    completed: 0, 
                    total: 7 
                }, 
                { 
                    date: 29, 
                    day: "Friday", 
                    completed: 0, 
                    total: 7 
                }, 
                { 
                    date: 30, 
                    day: "Saturday", 
                    completed: 0, 
                    total: 7 
                }, 
                { 
                    date: 1, 
                    day: "Sunday", 
                    completed: 0, 
                    total: 7 
                } 
            ],
           "orderables": [
            { 
                "orderableId": "XXXXX",
                "oderableName": "Blood Pressure",
                "sheduleTime": 1234567890, 
                "icon": "http://abc.wxy",
                "status": "Upcoming"
                "instructions": "How to Use this device",
                "videoUrl": "url",
            },
            { 
                "orderableId": "XXXXX",
                "oderableName": "Temprature",
                "sheduleTime": 1234567890, 
                "icon": "http://abc.wxy",
                "status": "Overdue",
                "instructions": "How to Use this device",
                "videoUrl": "url",
            }
           ]  
        }
   ### submitManualReading or submitMedice
   <img src="lib/api_workflows/screenshots/home/schedule/10_manual_reading.png" alt="image" height="500">
   <img src="lib/api_workflows/screenshots/home/schedule/11_medicine.png" alt="image" height="500">

    req = {
        "orderableId": "Blood Pressure",
        "oderableName": "Temprature",
        "isMedicine": false,
        "submitTime": 1234567890, 
        "orderableValue": [
            {
                "resultableName": "Systolic",
                "resultableValue": 120.0
            }, 
            {
                "resultableName": "Diastolic", 
                "resultableValue": 80.0
            }
        ]
    }

    response = { "submitStatus": "Ok" }
