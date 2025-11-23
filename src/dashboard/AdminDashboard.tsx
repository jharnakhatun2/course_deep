import type { FC } from "react";
import Sidebar from "./admin/Sidebar";
import { Outlet } from "react-router";

const AdminDashboard: FC = () => {
    return (
        <section className="min-h-screen py-5 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="lg:max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-4 ">
                    <Sidebar />
                    <main className="flex-1 w-full lg:w-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </section>
    )
}

export default AdminDashboard