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
            <h2 className="text-md sm:text-lg mb-2 uppercase font-semibold text-zinc-700">All Users</h2>

            <div className="overflow-x-auto">
                <table className="w-full border">
                    <thead>
                        <tr className=" text-sm bg-gray-100">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users?.map((user: any) => (
                            <tr key={user._id}>
                                <td className="border p-2 text-sm">{user.name}</td>
                                <td className="border p-2 text-sm">{user.email}</td>

                                <td className="border p-2 text-sm">
                                    {editId === user._id ? (
                                        <select
                                            value={newRole}
                                            onChange={(e) => setNewRole(e.target.value)}
                                            className="border px-2 py-1"
                                        >
                                            <option value="student">Student</option>
                                            <option value="instructor">Instructor</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    ) : (
                                        <span className="font-medium flex justify-center text-sm capitalize">{user.role}</span>
                                    )}
                                </td>

                                <td className="border p-2 space-x-2">
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
