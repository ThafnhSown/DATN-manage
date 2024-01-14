import EndPoint from "../common/endpoints";
import { ApiAdminConfig, ApiConfig } from "./config";

export const apiLogin = async (payload) => {
    return ApiConfig(EndPoint.LOGIN, payload)
}

//admin
export const apiGetListNews = async () => {
    return ApiConfig(EndPoint.LIST_NEWS, undefined, "GET")
}

export const apiCreateNewsFeed = async (props) => {
    return ApiAdminConfig(EndPoint.CREATE_NEWS, props)
}

export const apiCreateMediaContent = async (props) => {
    return ApiAdminConfig(EndPoint.CREATE_MEDIA, props)
}

export const apiGetMediaContent = async (type) => {
    return ApiConfig(`${EndPoint.LIST_MEDIA_CONTENT}?type=${type}`, undefined, "GET")
}

export const apiGetListCompany = async() => {
    return ApiAdminConfig(EndPoint.LIST_COMPANY, undefined,"GET")
}

export const apiCreateCompany = async (props) => {
    return ApiAdminConfig(EndPoint.CREATE_COMPANY, props)
}

//global
export const apiGetListProvince = async () => {
    return ApiConfig(EndPoint.LIST_PROVINCE, undefined, "GET")
}

export const apiGetListDistrict = async (p) => {
    return ApiConfig(`${EndPoint.LIST_DISTRICT}?provinceId=${p}`, undefined, "GET")
}

export const apiGetLocation = async (p) => {
    return ApiConfig(`/global/get-location?locationId=${p}`, undefined, "GET")
}

//manage

export const apiUpdateCompany = async (props) => {
    return ApiAdminConfig(EndPoint.UPDATE_COMPANY, props)
}

export const apiGetCompanyInfo = async () => {
    return ApiAdminConfig(EndPoint.GET_COMPANY_INFO, undefined, "GET")
}

export const apiCreateCoachRoute = async (props) => {
    return ApiAdminConfig(EndPoint.CREATE_ROUTE, props)
}

export const apiGetListRoute = async (companyId) => {
    return ApiAdminConfig(`${EndPoint.LIST_ROUTE}?companyId=${companyId}`, undefined, "GET")
}

export const apiAddPointToRoute = async(props) => {
    return ApiAdminConfig(EndPoint.ADD_POINT_TO_ROUTE, props)
}

export const apiGetRouteDetail = async (id) => {
    return ApiAdminConfig(`${EndPoint.GET_ROUTE_DETAIL}?coachRouteId=${id}`)
}

export const apiDeleteRoute = async (props) => {
    return ApiAdminConfig(EndPoint.DELETE_ROUTE, props)
}

export const apiCreateOffice = async(props) => {
    return ApiAdminConfig(EndPoint.CREATE_OFFICE, props)
}

export const apiListOffice = async (companyId) => {
    return ApiAdminConfig(`${EndPoint.LIST_OFFICE}?companyId=${companyId}`, undefined, "GET")
}