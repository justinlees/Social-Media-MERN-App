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
        `http://localhost:5000/${params.userId}/homePage/userSettings/editProfile`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
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
    <div>
      <form method="PATCH" onSubmit={handleSubmit}>
        <input type="text" name="fullName" defaultValue={user?.fullName} />
        <input type="text" name="userName" readOnly value={user?.userName} />
        <input type="date" name="dob" defaultValue={user?.dob} />
        <input type="text" name="mobile" defaultValue={user?.mobile} />
        <input type="email" name="email" defaultValue={user?.email} />
        <textarea
          type="text"
          name="bioData"
          defaultValue={user?.bioData}
          placeholder="Enter bio data"
        ></textarea>
        <label>
          <input
            type="radio"
            name="accountType"
            defaultValue={user?.accountType}
            defaultChecked
          />
          {user?.accountType}
        </label>
        <label>
          <input type="radio" name="accountType" defaultValue="private" />
          private
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
