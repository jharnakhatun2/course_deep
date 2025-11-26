import { useState, type FC } from "react";
import {
    useDeleteUserMutation,
    useUpdateUserRoleMutation,
} from "../../features/auth/authApi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import { showSuccessToast } from "../../ult/toast/toast";
import type { User } from "../../ult/types/types";

interface AllUsersProps {
    filteredUsers: User[];
}

const AllUsers: FC<AllUsersProps> = ({ filteredUsers}) => {
    const [deleteUser] = useDeleteUserMutation();
    const [updateUserRole] = useUpdateUserRoleMutation();

    const [editId, setEditId] = useState<string | null>(null);
    const [newRole, setNewRole] = useState("");

    
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
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Enrolled Courses</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Joined Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-zinc-200">
                    {filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-zinc-50">
                            <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-zinc-900">{user.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-zinc-600">{user.email}</div>
                            </td>
                            {/* user role */}
                            <td className="border border-gray-200 p-2 text-sm">
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
                            <td className="flex justify-center px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-zinc-500">{user.enrolledCourses >= 0 ? user.enrolledCourses : 0}</div>
                            </td>
                            <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-zinc-600">
                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </div>
                            </td>
                            <td className="border border-gray-200 p-2 space-x-2">
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
    );
};

export default AllUsers;

