export default class EndPoint {
    static LOGIN = "/auth/login"
//admin
    static LIST_COMPANY = "/admin/get-company-list"
    static CREATE_COMPANY = "/admin/create-company-account"
    static UPDATE_COMPANY = "/admin/update-company-account"
    static CREATE_MEDIA = "/admin/create-media-content"
    static CREATE_NEWS = "/admin/create-news-feed"
//global
    static LIST_MEDIA_CONTENT = "/global/get-media-content"
    static LIST_NEWS = "/global/get-news-feed"
    static LIST_PROVINCE = "/global/get-provinces"
    static LIST_DISTRICT = "/global/get-districts"

//company
    static GET_COMPANY_INFO = "/company/get-info"
    static CREATE_ROUTE = "/company/create-coach-route"
    static LIST_ROUTE = "/company/get-coach-route-list"
    static DELETE_ROUTE = "/company/delete-coach-route"
    static ADD_POINT_TO_ROUTE = "/company/add-point-to-route"
    static GET_ROUTE_DETAIL = "/company/get-coach-route-detail"
    static CREATE_OFFICE = "/company/create-company-office"
    static LIST_OFFICE = "/company/get-company-office-list"
    static DEL_OFFICE ="/company/delete-company-office"
    static CREATE_COACH = "/company/create-coach"
    static CREATE_SCHEDULE = "/company/create-coach-schedule"
    static LIST_SCHEDULE = "/company/get-coach-schedule-list"
    static CREATE_SECTION = "/company/create-coach-schedule-section"
    static LIST_SECTION = "/company/get-coach-schedule-section-list"
    static CREATE_STAFF = "/company/create-employee"
    static LIST_STAFF = "/company/get-employee-list"
    static DEL_STAFF = "/company/delete-employee"
}