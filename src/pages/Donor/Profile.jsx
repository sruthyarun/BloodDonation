import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { updateProfile } from "../../API/updateProfile";
import ProfileEditForm from "../../components/ProfileEditForm";
import DonorPanel from "../../components/donorPanel";

function Profile() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.currentUser);

    const [editing, setEditing] = useState(false);

    if (!user) {
        return <h2 className="text-center mt-10">Please Login</h2>;
    }

    const saveProfile = async (updatedUser) => {
        try {
            const data = await updateProfile(user.id, updatedUser);

            dispatch(setUser(data));

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data)
            );

            alert("Profile Updated Successfully");

            setEditing(false);

        } catch (err) {
            alert(err.message);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex">
            <DonorPanel />

            <div className="flex-1 p-8">
                {!editing ? (
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">

                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">
                                My Profile
                            </h1>

                            <button
                                onClick={() => setEditing(true)}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
                            >
                                Edit Profile
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="border rounded-lg p-4">
                                <p className="text-gray-500 text-sm">Full Name</p>
                                <p className="font-semibold">{user.fullName}</p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <p className="text-gray-500 text-sm">Email</p>
                                <p className="font-semibold">{user.email}</p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <p className="text-gray-500 text-sm">Phone</p>
                                <p className="font-semibold">{user.phone}</p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <p className="text-gray-500 text-sm">Blood Group</p>
                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                                    {user.bloodGroup}
                                </span>
                            </div>

                            <div className="border rounded-lg p-4">
                                <p className="text-gray-500 text-sm">Gender</p>
                                <p className="font-semibold">{user.gender}</p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <p className="text-gray-500 text-sm">Date of Birth</p>
                                <p className="font-semibold">{user.dob}</p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <p className="text-gray-500 text-sm">Weight</p>
                                <p className="font-semibold">{user.weight} kg</p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <p className="text-gray-500 text-sm">City</p>
                                <p className="font-semibold">{user.city}</p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <p className="text-gray-500 text-sm">State</p>
                                <p className="font-semibold">{user.state}</p>
                            </div>

                            <div className="border rounded-lg p-4 md:col-span-2">
                                <p className="text-gray-500 text-sm">Address</p>
                                <p className="font-semibold">{user.address}</p>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8 text-gray-800">
                            Edit Profile
                        </h1>

                        <ProfileEditForm
                            user={user}
                            onSave={saveProfile}
                            onCancel={() => setEditing(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;