

//if datatype of resutlable is DATA(array) no normal ranges.
let admission_devices_request: {patientId: '22'};

let admission_devices_response: {}[] = [
    {
        rmsOrderId: '4422',
        orderableKey: '_ECG_',
        orderableName: "ECG (Continuous)",
        isContinuous: true,
        deviceInfo: {
            deviceModel: 'CHECKMEPRO',//enum field
            deviceInventoryId: '',
            uniqueCode: '',
            macAddress: '',
            deviceIOSName: '',       
        },
        resultables: [
            {key: '_ECG1_', name:"ECG-I"},
        ],
    },
        {
        rmsOrderId: '4421',
        orderableKey: '_BP_',
        orderableName: "Blood Pressure (Discrete)",
        isContinuous: false,
        deviceInfo: {
            deviceModel: 'BP2',//enum field
            deviceInventoryId: '',
            uniqueCode: '',
            macAddress: '',
            deviceIOSName: '',       
        },
        resultables: [
            {key: '_SYSTOLIC_', name:"Systolic", minValue: 20, warnLow: 40, normalLow: 60, normalHigh: 95, warnHigh:110, maxValue: 120 },
            {key: '_DISTOLIC_', name:"Distolic", minValue: 120, warnLow: 140, normalLow: 160, normalHigh: 195, warnHigh:210, maxValue: 220 },
        ],
    }
];

let orderValue1 : {}={
    deviceInventoryId : "",//optional
    rmsOrderId: '4422',
    acquisitionTime: 3234,
    captureTime: 4422,
    resultables: [{'_ECG1_': [234, 43, 441, 332]}]
};

let orderValue2 : {}={
    deviceInventoryId : "",//optional
    rmsOrderId: '4421',
    acquisitionTime: 3234,
    captureTime: 4422,
    resultables: [{'_SYSTOLIC_': 120},{'_DISTOLIC_': 80} ]
};






// We should keep a record of all the devices which are being used by the user.
let request: {} = {//shift to login
    "app_version": "3.2.10-000",
    "os_name": "Android"
};

let response: {} = {
    "data": {
        "user_id": "GB0Q2XIYB2",
        "device_id": "c5d1a020b3f0d620", //current device
        "user_device_id": "GBZ3PF7QZ2", //may many to many table of users and devices
        "image": null,
        "first_name": "Daniyal",
        "last_name": "Altaf",
        
        "mobile_phone": "02003004434",
        "full_name": "Daniyal Altaf",
        "full_name_to_display": "Daniyal Altaf",
        "mr_no": null,
        "reg_no": "CHI-CC-0020",
        "user_name": "DaniyalP",
        "email": "admin@chi.com",
        "gender": "Male",
        "gender_to_display": "Male",
        "birth_date": 709326000,
        "age": 30,
        "height": 178,
        "weight": null,
        "mobile": "02003004434",
        "group": {
            "group_id": "2",
            "group_name": "Patient",
            "group_type": "Patient"
        },
        "episode_id": "GB0Q2XJ9P6",
        "devices": [],
        "SymptomChecker": true,
        "JazzCashEnabled": true,
        "EasyPayEnabled": true,
        "permissions_v2": {
            "make_call": true,
            "appointments": true,
            "bill_payments": true,
            "send_message": true,
            "doctor_notes": true,
            "upload_documents": true,
            "symptom_checker": true,
            "homecare": true,
            "question_answer": true,
            "doctor_list": true,
            "whatsapp": true,
            "progress_report": true,
            "sos": true,
            "patient_education": true,
            "medical_imaging": true,
            "subscription": true
        },
        "symptomate_app_id": "6de524ad",
        "symptomate_app_key": "225857a4bee1a0e237b5d6b0bd702586",
        "show_billable_event": true,
        "total_balance": 0,
        "clinics": [
            {
                "clinic_mr_no": "PN-GB0Q2XMWHR",
                "clinic_name": "Cardiology Clinic",
                "clinic_logo_url": "https://charms-qa.cognitivehealthintl.com/files/G6X2ZMJ0BH/R0FRMFZIVVNYMw.jpg",
                "clinic_address": "Model Town - Lahore",
                "balance": 0
            },
            {
                "clinic_mr_no": "PN-GB4AVSG2ZH",
                "clinic_name": "Arslan Clinic",
                "clinic_logo_url": "https://charms-qa.cognitivehealthintl.com/files/G6O9GTNOS4/R0FXQjRXUVBSNg.jpg",
                "clinic_address": "Islamabad",
                "balance": 0
            },
            {
                "clinic_mr_no": "PN-GBD1RQ3K0U",
                "clinic_name": "CHI CLINIC",
                "clinic_logo_url": "https://charms-qa.cognitivehealthintl.com/files/2/R0FLQVUzNllONA.png",
                "clinic_address": "Islamabad",
                "balance": 0
            }
        ],
        "has_subscription": false
    },
    "Status": "Ok",
    "Time": 1679459998.995,
    "Duration": 0.069
};