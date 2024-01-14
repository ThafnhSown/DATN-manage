import AppLayout from "../../../components/layouts/app";
import RequireAuth from "../../../routes/requireAuth";
import { Outlet } from "react-router-dom";
import Transport from "./transport";
import Location from "./location"
import Staff from "./staff";
import InfoCompany from "./infoCompany";
import Report from "./report";
import Policy from "./policy";
import Schedule from "./schedule";

export const companyRouteList = [
    {
        path: '/',
        element: (
            <AppLayout>
                <RequireAuth allowedRoles={["ROLE_COMPANY"]}>
                    <Outlet />
                </RequireAuth>
            </AppLayout>
        ),
        children: [
            {
                path: '',
                element: <Location />
            },
            {
                path: 'phuong-tien',
                element: <Transport />
            },
            {
                path: 'chinh-sach',
                element: <Policy />
            },
            {
                path: 'lich-xuat-ben',
                element: <Schedule />
            },
            {
                path: 'nhan-vien',
                element: <Staff />
            },
            {
                path: 'thong-tin',
                element: <InfoCompany />
            },
            {
                path: 'bao-cao',
                element: <Report />
            }
        ]
    }
]