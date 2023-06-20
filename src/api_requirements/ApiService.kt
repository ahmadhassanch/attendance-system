// package com.chi.charmssdk.network

// import com.chi.charmssdk.models.*
// import com.codegini.lib.network.GenericResponse
// import okhttp3.MultipartBody
// import retrofit2.Call
// import retrofit2.http.Body
// import retrofit2.http.Multipart
// import retrofit2.http.POST
// import retrofit2.http.Part


// interface CharmsApiService
// {
//     @POST("/sso/Login")
//     fun sdkLogin(@Body request: SSORequest): Call<ApiSingleResponse<SSOResponse>>

//     @POST("/api/patient_app2/GetPatientInfo")
//     fun getPatientInfo(@Body request: ApiDataRequest): Call<ApiSingleResponse<Patient>>

//     @POST("/api/patient_app2/AddSniffedObservation")
//     fun addSniffedObservation(@Body request: SniffedResultRequest): Call<ApiGenericResponse>

//     @POST("/api/patient_app2/AddSniffedMedicineObservation")
//     fun addSniffedMedicineObservation(@Body request: SniffedResultRequest): Call<ApiGenericResponse>

//     @POST("/api/patient_app_v3/GetOrderableRanges")
//     fun GetOrderableRanges(@Body request: OrderableRangesRequest): Call<ApiSingleResponse<OrderableRangesResponse>>

//     @POST("/api/patient_measurements/List")
//     fun GetPatientMeasurements(@Body request: ApiListRequest): Call<ApiSingleResponse<MeasurementList>>

//     @POST("/api/patient_app2/GetAssignedResultables")
//     fun GetAssignedOrderResultables(@Body request: ResultablesRequest): Call<OrderableList>

//     @POST("/api/patient_app2/CGMSession")
//     fun GetCGMSession(@Body request: CGMSessionRequest): Call<ApiSingleResponse<String>>

//     @POST("/patient/api/cgm/GetActiveCGMSession")
//     fun GetActiveCGMSession(@Body request: ApiDataRequest): Call<ApiSingleResponse<CGMActiveSessionResponse>>

//     @POST("/patient/api/cgm/LogCGMData")
//     fun LogCGMData(@Body request: LogCGMDataRequest): Call<ApiGenericResponse>

//     @POST("/patient/api/cgm/LogCGMEvent")
//     fun LogCGMEvent(@Body request: LogCGMEventRequest): Call<ApiGenericResponse>

//     @POST("/api/patient_app2/GetAllTimeData")
//     fun GetAllTimeData(@Body request: CGMAllTimeRequest): Call<ApiSingleResponse<CGMAllTimeData>>

//     @POST("/api/patient_app2/GetDetailedData")
//     fun GetDetailedData(@Body request: CGMDetailDataRequest): Call<ApiListResponse<CGMDetailedDataResponse>>

//     @POST("/api/patient_app2/GetTimeInRanges")
//     fun GetTimeInRanges(@Body request: CGMAllTimeRequest): Call<ApiListResponse<CGMTimeInRangesResponse>>

//     @POST("/api/patient_app2/GetStats")
//     fun GetStats(@Body request: CGMAllTimeRequest): Call<ApiSingleResponse<CGMStatsResponse>>

//     @POST("/api/doctor_app/GetObservationDataValue")
//     fun getObservationData(@Body request: ObservationResultRequest): Call<ApiSingleResponse<DiscreteResponse>>

//     @Multipart
//     @POST("/api/user_files/Upload")
//     fun UploadFile(@Part file: MultipartBody.Part): Call<com.codegini.lib.network.ApiSingleResponse<FileResponse>>

//     @POST("/api/patient_monitoring/AppStateReport")
//     fun AppStateReport(@Body request: SessionStateEventRequest): Call<GenericResponse>

//     @POST("/api/patient_app2/GetDefaultSettings")
//     fun GetDefaultSettings(): Call<com.codegini.lib.network.ApiSingleResponse<DefaultSettings>>

//     @POST("/api/patient_monitoring/ReportEvents")
//     fun ReportEvents(@Body request: MonitoringEventRequest): Call<GenericResponse>

//     @POST("/api/patient_app2/GetPDAlarms")
//     fun GetPatientMedicationSchedule(@Body request: PDScheduleRequest): Call<ApiSingleResponse<HiPeeAlarm>>

//     @POST("/api/patient_app2/GetAssignedResultablesWithRanges")
//     fun GetAssignedResultablesWithRanges(@Body request: AssignedResultablesWithRangesRequest): Call<AssignedOrderableWithRangesList>
// }


// data class SniffedResultRequest(    val device_id: String,    val appointment_id: String? = null,    val test_order_id: String? = null,    val room_id: String? = null,    val user_id: String? = null,    val observations: List<DeviceResult>,    val is_manual: Boolean = false): ApiDataRequest()