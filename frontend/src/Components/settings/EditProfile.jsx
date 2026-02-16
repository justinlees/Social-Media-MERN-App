import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function EditProfile() {
  const user = useOutletContext();
  const params = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user?.accountType);
    console.log(e.target.accountType.value);
    const formData = {
      fullName: e.target.fullName.value,
      userName: e.target.userName.value,
      dob: e.target.dob.value,
      mobile: e.target.mobile.value,
      email: e.target.email.value,
      bioData: e.target.bioData.value,
      accountType: e.target.accountType.value,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/homePage/userSettings/editProfile`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );
      if (response.status === 200) {
        window.location.reload();
      } else if (response.status === 404) {
        alert("Unable to Update");
      }
    } catch (error) {
      console.error("Error sending Data");
    }
  };
  return (
    <div className="editProfilePage">
      <form method="PATCH" onSubmit={handleSubmit}>
        <fieldset>
          <legend>FullName</legend>
          <input type="text" name="fullName" defaultValue={user?.fullName} />
        </fieldset>
        <fieldset>
          <legend>UserName</legend>
          <input
            type="text"
            name="userName"
            className="disabledInput"
            disabled
            value={user?.userName}
          />
        </fieldset>
        <fieldset>
          <legend>DOB</legend>
          <input type="date" name="dob" defaultValue={user?.dob} />
        </fieldset>
        <fieldset>
          <legend>Mobile</legend>
          <input type="text" name="mobile" defaultValue={user?.mobile} />
        </fieldset>
        <fieldset>
          <legend>Email</legend>
          <input type="email" name="email" defaultValue={user?.email} />
        </fieldset>
        <fieldset>
          <legend>User Bio</legend>
          <textarea
            type="text"
            name="bioData"
            defaultValue={user?.bioData}
            placeholder="Enter bio data"
          ></textarea>
        </fieldset>
        <fieldset>
          <legend>Account Type</legend>
          {user?.accountType === "public" ? (
            <div>
              <label>
                <input
                  type="radio"
                  name="accountType"
                  defaultValue={user?.accountType}
                  defaultChecked
                />
                public
              </label>
              <label>
                <input type="radio" name="accountType" defaultValue="private" />
                private
              </label>
            </div>
          ) : (
            <div>
              <label>
                <input
                  type="radio"
                  name="accountType"
                  defaultValue={user?.accountType}
                />
                public
              </label>
              <label>
                <input
                  type="radio"
                  name="accountType"
                  defaultValue="private"
                  defaultChecked
                />
                private
              </label>
            </div>
          )}
        </fieldset>
        <fieldset>
          <button type="submit">Save</button>
        </fieldset>
      </form>
    </div>
  );
}
