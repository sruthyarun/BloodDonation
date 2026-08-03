import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaTint,
    FaVenusMars,
    FaBirthdayCake,
    FaWeight,
    FaMapMarkerAlt,
    FaEdit,
} from "react-icons/fa";

import { setUser } from "../../redux/userSlice";
import { updateProfile } from "../../API/updateProfile";
import ProfileEditForm from "../../components/ProfileEditForm";
import RecipientPanel from "../../components/RecipientPanel";


function Profile() {

    const dispatch = useDispatch();

    const user = useSelector(
        (state) => state.user.currentUser
    );


    const [editing, setEditing] = useState(false);



    if (!user) {

        return (
            <h2 className="text-center mt-10 text-xl">
                Please Login
            </h2>
        );

    }




    const saveProfile = async (updatedUser) => {

        try {

            const data =
                await updateProfile(
                    user.id,
                    updatedUser
                );


            dispatch(
                setUser(data)
            );


            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data)
            );


            alert(
                "Profile Updated Successfully"
            );


            setEditing(false);


        } catch (error) {

            alert(
                error.message
            );

        }

    };




    return (

        <div className="min-h-screen bg-gray-100 flex">


            <RecipientPanel />



            <div className="flex-1 p-8">


                {!editing ? (


                    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">


                        <div className="flex justify-between items-center mb-8">


                            <div>

                                <h1 className="text-3xl font-bold text-gray-800">
                                    My Profile
                                </h1>

                                <p className="text-gray-500 mt-1">
                                    Manage your personal information
                                </p>

                            </div>


                            <button

                                onClick={() =>
                                    setEditing(true)
                                }

                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"

                            >

                                <FaEdit />

                                Edit Profile

                            </button>


                        </div>





                        <div className="grid md:grid-cols-2 gap-6">



                            <ProfileItem
                                icon={<FaUser />}
                                label="Name"
                                value={user.fullName}
                            />


                            <ProfileItem
                                icon={<FaEnvelope />}
                                label="Email"
                                value={user.email}
                            />



                            <ProfileItem
                                icon={<FaPhone />}
                                label="Phone"
                                value={user.phone}
                            />



                            <ProfileItem
                                icon={<FaTint />}
                                label="Blood Group"
                                value={user.bloodGroup}
                            />



                            <ProfileItem
                                icon={<FaVenusMars />}
                                label="Gender"
                                value={user.gender}
                            />



                            <ProfileItem
                                icon={<FaBirthdayCake />}
                                label="Date of Birth"
                                value={user.dob}
                            />



                            <ProfileItem
                                icon={<FaWeight />}
                                label="Weight"
                                value={user.weight}
                            />



                            <ProfileItem
                                icon={<FaMapMarkerAlt />}
                                label="City"
                                value={user.city}
                            />



                            <ProfileItem
                                icon={<FaMapMarkerAlt />}
                                label="State"
                                value={user.state}
                            />



                            <ProfileItem
                                icon={<FaMapMarkerAlt />}
                                label="Address"
                                value={user.address}
                            />



                        </div>


                    </div>




                ) : (



                    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">


                        <h1 className="text-3xl font-bold mb-8">
                            Edit Profile
                        </h1>



                        <ProfileEditForm

                            user={user}

                            onSave={saveProfile}

                            onCancel={() =>
                                setEditing(false)
                            }

                        />


                    </div>



                )}



            </div>


        </div>

    );

}





function ProfileItem({
    icon,
    label,
    value
}) {

    return (

        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">


            <div className="text-red-600 text-xl">

                {icon}

            </div>



            <div>

                <p className="text-sm text-gray-500">
                    {label}
                </p>


                <p className="font-semibold text-gray-800">

                    {value || "Not Provided"}

                </p>


            </div>


        </div>

    );

}


export default Profile;