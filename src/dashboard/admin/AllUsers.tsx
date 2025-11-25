import { useState } from "react";
import {
    useDeleteUserMutation,
    useGetUsersQuery,
    useUpdateUserRoleMutation,
} from "../../features/auth/authApi";
import Loader from "../../ult/loader/Loader";
import { RiDeleteBin2Line } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import { showSuccessToast } from "../../ult/toast/toast";
import { FaUserFriends } from "react-icons/fa";

const AllUsers = () => {
    const { data: users, isLoading } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUserRole] = useUpdateUserRoleMutation();

    const [editId, setEditId] = useState<string | null>(null);
    const [newRole, setNewRole] = useState("");

    if (isLoading) return <Loader />;

    const startEdit = (id: string, currentRole: string) => {
        setEditId(id);
        setNewRole(currentRole);
    };

    const cancelEdit = () => {
        setEditId(null);
        setNewRole("");
    };

    const saveRole = (id: string) => {
        updateUserRole({ id, role: newRole });
        setEditId(null);
        showSuccessToast("User Role Updated Succssfuly!")
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            deleteUser(id);
        }
        showSuccessToast("User Deleted Succssfuly!")
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-xl lg:text-2xl font-bold text-zinc-700 flex items-center gap-3">
                    <FaUserFriends className="w-6 h-6" />
                    All Users
                </h1>
                <p className="text-zinc-500 mt-1 font-light">Manage all users and their account roles.</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border ">
                    <thead>
                        <tr className=" text-sm bg-gray-200">
                            <th className="border border-gray-400 p-2">Name</th>
                            <th className="border border-gray-400 p-2">Email</th>
                            <th className="border border-gray-400 p-2">Role</th>
                            <th className="border border-gray-400 p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users?.map((user: any) => (
                            <tr key={user._id}>
                                <td className="border border-gray-300 p-2 text-sm">{user.name}</td>
                                <td className="border border-gray-300 p-2 text-sm">{user.email}</td>

                                <td className="border border-gray-300 p-2 text-sm">
                                    <div className="flex justify-center w-full">
                                        {editId === user._id ? (
                                            <select
                                                value={newRole}
                                                onChange={(e) => setNewRole(e.target.value)}
                                                className="border px-2 py-1 cursor-pointer outline-none"
                                            >
                                                <option value="student">Student</option>
                                                <option value="instructor">Instructor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        ) : (
                                            <span className="font-medium text-sm capitalize">
                                                {user.role}
                                            </span>
                                        )}
                                    </div>
                                </td>

                                <td className="border border-gray-300 p-2 space-x-2">
                                    {editId === user._id ? (
                                        <>
                                            <div className="flex justify-center items-center space-x-3">
                                                <button
                                                    onClick={() => saveRole(user._id)}
                                                    className="bg-yellow-500 hover:bg-yellow-400 text-white px-3 py-1 text-sm transition-smooth cursor-pointer"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 text-sm transition-smooth cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-center items-center space-x-3">
                                                <button
                                                    onClick={() => startEdit(user._id, user.role)}
                                                    className="text-blue-500 hover:text-blue-600 cursor-pointer"
                                                >
                                                    <LiaEditSolid />
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="text-red-500 hover:text-red-600 cursor-pointer"
                                                >
                                                    <RiDeleteBin2Line />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
