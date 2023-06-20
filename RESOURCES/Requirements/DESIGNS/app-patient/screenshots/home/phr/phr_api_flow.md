# List of PHR endPoints

  ## PHR

   - /getPHRData 
   - /getECGData
   - /getComplianceList
   - /getComplianceDetails

### getPHRData
   <img src="lib/api_workflows/screenshots/home/phr/13_phr_dashboard.png" alt="image" height="500">
    
    req = {
        "start_date": 3434125356,
        "end_date": 2343445324,
        "patient_id" : "XXXXXXX"
    }

    response = {
        "homecareCompliance" : 100, 
        "medicationCompliance" : 100, 
        "ecgCount": 5, 
        "orderableGraphData" : []
    }

   ### getEcgGraphData
   <img src="lib/api_workflows/screenshots/home/phr/14_ecg_graph.png" alt="image" height="500">
    
    req = {
        "orderableId": "XXXXXX",
        "episodeId": "XXXXXX",
    }

    response = {
        "ecg": [43,24,77,38],
        "time": 975867876,
        "disease": "",
        "hr": 56,
        "rr: 93,
    } 

   ### getComplianceList
   <img src="lib/api_workflows/screenshots/home/phr/15_homecare_compliances.png" alt="image" height="500">
   <img src="lib/api_workflows/screenshots/home/phr/16_medication_compliances.png" alt="image" height="500">

    req = {
        "patientId" : "XXXXXXX", 
        "complianceType" : "Homecare",
        "page": 1,
        "per_page": 30,
    }

    response = {
        "total_records": 100,
        "compliances" : [ 
            { 
                "orderableName": "Temperature", 
                "taken": 5, 
                "total": 20, 
                "icon": "chitech.com/icon" 
            },
            { 
                "orderableName": "Blood Pressure", 
                "taken": 5, 
                "total": 20, 
                "icon": "chitech.com/icon" 
            } 
        ]
    }

   ### getComplianceDetails
   <img src="lib/api_workflows/screenshots/home/phr/17_taken_compliance_detail.png" alt="image" height="500">
   <img src="lib/api_workflows/screenshots/home/phr/18_missed_compliance_detail.png" alt="image" height="500">

    req = { 
        "patientId": "XXXXXXX", 
        "complianceType": "Homecare", 
        "status": "Taken"
        } 
        
    response = { 
        "complianceDetails" : [
             { 
                "orderableName": "Blood Pressure", 
                "assignDate": 532443532, 
                "takenDate": 3252423453 
                "icon": "chitech.com/icon" 
            },
            { 
                "orderableName": "Temprature", 
                "assignDate": 532443532, 
                "takenDate": 3252423453 
                "icon": "chitech.com/icon" 
            } 
        ] 
    }