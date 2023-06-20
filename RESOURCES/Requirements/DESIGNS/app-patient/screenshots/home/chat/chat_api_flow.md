# List of Chat endpoints   
   
   ### getSubjects
   <img src="lib/api_workflows/screenshots/home/chat/21_subjects.png" alt="image" height="500">

    req = {
        "patientId": "XXXXXXX",
        "page": 1,
        "per_page": 30,
    }

    response = {
        "total_records": 100,
        "records": [
            {
                "subjectId": "XXXXXXX",
                "title:": "Blood Pressure",
                "unreadCount": 12,
                "lastMessage": "Arslan Chi unassigned ECG of Danial",
                "lastMessageTime": 52423675457,
                "status": "Orderable",
            },
            {
                "subjectId": "XXXXXXX",
                "title:": "Generic",
                "unreadCount": 9,
                "lastMessage": "Subject "Generic" created",
                "lastMessageTime": 52423675457,
                "status": "Generic",
            }
        ]
    }

   ### getMessages
   <img src="lib/api_workflows/screenshots/home/chat/22_messages.png" alt="image" height="500">

    req = {
        "subjectId": "XXXXXXX",
        "page": 2,
        "per_page": 30,
        "filter": ["Generic", "Closed"],
    }

    response = {
        "total_records": 100,
        "records": [
            {
                "messageId": "XXXXXXX",
                "userId": "XXXXXXX",
                "title:": "Blood Pressure",
                "fullName": "Usman Arif",
                "message": "Arslan Chi unassigned ECG of Danial",
                "dateTime": 52423675457,
                "status": "Orderable",
                "messageType": "text",
                "audioUrl": "http://abc.xyz.mp3",
                "imageUrl": "http://abc.xyz.png",
                "audioDuration": 2354576878,
            },
            {
                "messageId": "XXXXXXX",
                "userId": "XXXXXXX",
                "title:": "Generic",
                "fullName": "Omair Yousaf",
                "message": "Subject "Generic" created",
                "dateTime": 52423675457,
                "status": "Generic",
                "messageType": "text",
                "audioUrl": "http://abc.xyz.mp3",
                "imageUrl": "http://abc.xyz.png",
                "audioDuration": 2354576878,
            }
        ]
    } 

   ### uploadFile
    req = {
        "file": messages/files/file.mp3,
    }
    response = {
        "fileUrl": "http://abc.xyz.mp3",
        "status": "Ok",
    }

   ### sendMessage
    req = {
        "userId": "XXXXXX",
        "subjectId": "XXXXXX",
        "message": "Dr. sb Please look at it.",
        "messageType": "text",
        "audioUrl": "http://abc.xyz.mp3",
        "imageUrl": "http://abc.xyz.png",
        "audioDuration": 2354576878,
        "copyToPatient": false,
    }
    response = {
        "status": "Ok",
    }