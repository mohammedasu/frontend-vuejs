const userUrl = {
    fetchUserBackendUrl: "/dpn-user/fetchuserbasicdetails"
};

const fetchPostBackendUrl = "/dpn-post/fetchpostdetails";
const fetchUserPostBackendUrl = "/dpn-post/fetchuserpost"; // fetching the post for user (not login user)
const fetchConnectionBackendUrl = "/dpn-connection/connection-request";
const fetchSentConnectionBackendUrl = "/dpn-connection/sent-request";
const addPostBackendUrl = "/dpn-post/addpostdetails";
const deletePostBackendUrl = "/dpn-post/deletepostdetails";
const deletePostFromMultiplePlaces =
    "/dpn-post/delete_post_from_multiple_places";
const addLikeBackendUrl = "/dpn-post-like/post";
const deleteLikeBackendUrl = "/dpn-post-like/post";
const addCommentBackendUrl = "/dpn-post-comment/addpostcommentdetails";
const deleteCommentBackendUrl = "/dpn-post-comment/deletepostcommentdetails";
const addCommentLikeBackendUrl = "/dpn-post-comment/addcommentlike";
const deleteCommentLikeBackendUrl = "/dpn-post-comment/deletecommentlike";
const fetchPostCommentsUrl = "/dpn-post-comment/fetchpostcommentdetails";

const fetchNearByDoctorsBackendUrl = "/dpn-doctor/fetchnearbydoctorlist";
const connectionBackendUrl = "/dpn-connection/connection";
const fetchNearByPatientsBackendUrl = "/dpn-patient/fetchnearbypatientlist";
const fetchConfirmConnectionBackendUrl = "/dpn-connection/confirm-request";
const fetchConnectionperParams = "/dpn-connection/fetch-connections";
const fetchOnlineConsultationDoctorsBackendUrl =
    "/dpn-doctor/fetchonlineconsultationdoctorlist";
const fetchAppointmentTimeSlots = "/dpn-appointment/fetchappointmenttimeslots";
const searchDataBackendUrl = "/dpn-doctor/searchdata";
const addappointmentBackendUrl = "dpn-appointment/addappointment";
const sendMessageBackendUrl = "/dpn-chat/sendmessage";
const fetchMessageBackendUrl = "/dpn-chat/fetchmessage";
const fileDownloadBackendUrl = "/dpn-chat/filedownload";
const fetchContactsBackendUrl = "/dpn-chat/contacts";
const markReadMessagesBackendUrl = "/dpn-chat/markread";
const checkConnectionBackendUrl = "/dpn-connection/check-connection";
const singlePostBackendUrl = "/dpn-post/singlepostdetails";
const fetchDoctorProfileDetails = "/dpn-doctor/fetchdoctorprofiledetails";
const fetchAlumniDoctorList = "/dpn-doctor/fetchalumnidoctorlist";
const addPageBackendUrl = "/dpn-page/addpage";
const fetchPageBackendUrl = "/dpn-page/fetchpages";
const fetchAllPageBackendUrl = "/dpn-page/fetchallpages";
const fetchIndustryBackendUrl = "/dpn-industries/fetch";
const fetchSinglePageBackendUrl = "/dpn-page/fetch";
const updatePageBackendUrl = "/dpn-page/updatepage";
const deletePageBackendUrl = "/dpn-page/deletepage";
const contactusBackendUrl = "/dpn-page/contact-us";
const fetchServiceBackendUrl = "/dpn-doctor/fetchnearbyservicelist";
const fetchPagePostsBackendUrl = "/dpn-page/fetchpageposts";
const PageLikeBackendUrl = "/dpn-page-like/page";
const fetchLikePagesBackendUrl = "/dpn-page/fetch_like_pages";
const searchPageBackendUrl = "/dpn-page/searchpages";
const fetchMultiplePageBackendUrl = "/dpn-page/fetch_source_pages_data";

const crmUrl = {
    fetchCrmPatientBackendUrl: "/doctor-crm/patient",
    addCrmPatientBackendUrl: "/doctor-crm/patient",
    fetchCrmAppointmentBackendUrl: "/doctor-crm/appointment",
    addCrmAppointmentBackendUrl: "/doctor-crm/appointment",
    fetchCrmPrescriptionBackendUrl: "/doctor-crm/prescription",
    addCrmPrescriptionBackendUrl: "/doctor-crm/prescription",
    getCrmPatientListUrl: "/doctor-crm/get-patient-list"
};

const groupUrl = {
    fetchGroupBackendUrl: "/dpn-group/fetchgroups",
    fetchAllGroupBackendUrl: "/dpn-group/fetchallgroups",
    fetchSingleGroupBackendUrl: "/dpn-group/fetch",
    updateGroupBackendUrl: "/dpn-group/updategroup",
    deleteGroupBackendUrl: "/dpn-group/deletegroup",
    addGroupBackendUrl: "/dpn-group/addgroup",
    fetchGroupPostsBackendUrl: "/dpn-group/fetchgroupposts",
    searchGroupBackendUrl: "/dpn-group/searchgroups",
    fetchMultipleGroupBackendUrl: "/dpn-group/fetch_source_groups_data",
    fetchJoinedGroupsBackendUrl: "/dpn-group/fetch_joined_groups"
};

const groupMemberUrl = {
    updateMemberBackendUrl: "/dpn-group-member/update",
    updateUserRequest: "/dpn-group-member/update_user_request",
    deleteMemberBackendUrl: "/dpn-group-member/delete",
    addMemberBackendUrl: "/dpn-group-member/add",
    fetchMemberBackendUrl: "/dpn-group-member/fetch", // for status =1
    fetchJoiningRequest: "/dpn-group-member/fetch_joining_request_data", // for status =0
    fetchUserSentRequested: "/dpn-group-member/fetch_user_sent_request_data",
    fetchUserReceivedRequested:
        "/dpn-group-member/fetch_user_received_request_data",
    addInviteBackendUrl: "/dpn-group-member/add_invite",
    fetchInvitationSent: "/dpn-group-member/fetch_invitation_sent",
    fetchMutualConnections: "/dpn-group-member/fetch_mutual_connections"
};

const profile = {
    saveuserbasicdetails: "dpn-user/saveuserbasicdetails",
    submitForVerification: "dpn-user/submitforverification",
    fetchDoctorProfessionalDetails: "dpn-doctor/fetchdoctorprofessionaldetails",
    editdoctorProfessionalDetails: "dpn-doctor/editdoctorprofessionaldetails",
    fetchSpecialityMasterList: "dpn-master/fetchspecialitymasterlist",
    fetchDoctorSpeciality: "dpn-doctor/fetchdoctorspeciality",
    editDoctorSpeciality: "dpn-doctor/editdoctorspeciality",
    fetchUserAddress: "dpn-user/fetchuseraddress",
    editUserAddress: "dpn-user/edituseraddress",
    fetchCity: "dpn-user/fetchcity",
    fetchServiceMasterList: "dpn-master/fetchservicemasterlist",
    fetchDoctorServiceList: "dpn-doctor/fetchdoctorservicelist",
    saveDoctorServiceDetails: "/dpn-doctor/savedoctorservicedetails",
    fetchSymptomMasterList: "dpn-master/fetchsymptommasterlist",
    fetchPatientDetails: "dpn-patient/fetchpatientdetails",
    editPatientDetails: "dpn-patient/editpatientdetails",
    fetchMedicalStudentDetails:
        "dpn-medical-student/fetchmedicalstudentdetails",
    editMedicalStudentDetails: "dpn-medical-student/editmedicalstudentdetails",
    fetchInstituteMasterList: "dpn-master/fetchinstitutemasterlist",
    fetchqualificationlevellist: "dpn-master/fetchqualificationlevel",
    fetchCountryCodeList: "dpn-master/fetch_country_codes"
};

const webinar = {
    createRoom: "dpn-webinar/live-webinar"
};

const learningUrl = {
    sendJournal: "dpn-learning/send-journal-request"
};
const trackingUrl = {
    addTracking: "dpn-tracking/add_tracking_data",
    addJoinEventTracking: "dpn-tracking/add_joinevent_tracking_data"
};

const StudioSeries = {
    fetchSeries: "dpn-studio-series/fetchseries",
    singleSeries: "dpn-studio-series/singleseries"
};

const StudioSlider = {
    fetchSlider: "dpn-studio-slider/fetch"
};

const Episode = {
    fetchEpisodes: "dpn-episodes/fetchepisodes",
    fetchEpisode: "dpn-episodes/fetchepisode",
    addLikeBackendUrl: "/dpn-episode-like/episode",
    fetchLikesBackendUrl: "/dpn-episode-like/episode",
    deleteLikeBackendUrl: "/dpn-episode-like/episode",
    addCommentBackendUrl: "/dpn-episode-comment/addepisodecommentdetails",
    deleteCommentBackendUrl: "/dpn-episode-comment/deleteepisodecommentdetails",
    fetchEpisodeCommentsUrl: "/dpn-episode-comment/fetchepisodecommentdetails"
};
const Season = {
    fetchSeason: "dpn-seasons/fetchseason"
};

const eventUrl = {
    fetchEventBackendUrl: "/dpn-event/fetchevents",
    fetchAllEventBackendUrl: "/dpn-event/fetchallevents",
    fetchTodayEventBackendUrl: "/dpn-event/fetchtodayevents",
    fetchUpcomingEventBackendUrl: "/dpn-event/fetchupcomingevents",
    fetchPastEventBackendUrl: "/dpn-event/fetchpastevents",
    fetchSingleEventBackendUrl: "/dpn-event/fetch",
    updateEventBackendUrl: "/dpn-event/updateevent",
    deleteEventBackendUrl: "/dpn-event/deleteevent",
    deleteEventImageBackendUrl: "/dpn-event/deleteeventimage",
    addEventBackendUrl: "/dpn-event/addevent",
    checkUserCanJoinBackendUrl: "/dpn-event/check_user_can_join"
};

const educationUrl = {
    educationdetails: "dpn-education-details/education-details"
};

const categoryUrl = {
    categorydetails: "dpn-category/categories"
};
const productUrl = {
    productdetails: "dpn-product/products",
    destroysingleimage: "dpn-product/destroy-single-image",
    singleproductdetail: "dpn-product/get-product-details"
};
const courseUrl = {
    productdetails: "dpn-course/courses",
    destroysingleimage: "dpn-course/destroy-single-image",
    singleproductdetail: "dpn-course/get-course-details"
};
const serviceUrl = {
    productdetails: "dpn-pageservice/services",
    destroysingleimage: "dpn-pageservice/destroy-single-image",
    singleproductdetail: "dpn-pageservice/get-pageservice-details"
};

const notificationUrl = {
    fetchUserNotifications: "dpn-user-notification/fetch"
};

export {
    fetchPostBackendUrl,
    addPostBackendUrl,
    addLikeBackendUrl,
    deleteLikeBackendUrl,
    addCommentBackendUrl,
    userUrl,
    addCommentLikeBackendUrl,
    deleteCommentLikeBackendUrl,
    fetchPostCommentsUrl,
    fetchNearByDoctorsBackendUrl,
    connectionBackendUrl,
    fetchNearByPatientsBackendUrl,
    fetchConnectionBackendUrl, // for not approved request,
    fetchConfirmConnectionBackendUrl,
    crmUrl,
    fetchOnlineConsultationDoctorsBackendUrl,
    fetchAppointmentTimeSlots,
    searchDataBackendUrl,
    addappointmentBackendUrl,
    sendMessageBackendUrl,
    fetchMessageBackendUrl,
    fileDownloadBackendUrl,
    fetchContactsBackendUrl,
    markReadMessagesBackendUrl,
    checkConnectionBackendUrl,
    deletePostBackendUrl,
    fetchSentConnectionBackendUrl,
    deleteCommentBackendUrl,
    profile,
    fetchConnectionperParams,
    singlePostBackendUrl,
    fetchDoctorProfileDetails,
    fetchAlumniDoctorList,
    addPageBackendUrl,
    fetchPageBackendUrl,
    fetchIndustryBackendUrl,
    fetchSinglePageBackendUrl,
    updatePageBackendUrl,
    deletePageBackendUrl,
    contactusBackendUrl,
    fetchServiceBackendUrl,
    fetchPagePostsBackendUrl,
    PageLikeBackendUrl,
    fetchUserPostBackendUrl,
    fetchAllPageBackendUrl,
    searchPageBackendUrl,
    fetchMultiplePageBackendUrl,
    groupUrl,
    groupMemberUrl,
    webinar,
    learningUrl,
    deletePostFromMultiplePlaces,
    trackingUrl,
    StudioSeries,
    Episode,
    Season,
    StudioSlider,
    eventUrl,
    educationUrl,
    categoryUrl,
    productUrl,
    fetchLikePagesBackendUrl,
    courseUrl,
    serviceUrl,
    notificationUrl
};
