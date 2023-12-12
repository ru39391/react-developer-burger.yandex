import React from "react";
import { Outlet } from 'react-router-dom';
import Wrapper from "../../components/wrapper/Wrapper";
import Sidebar from "../../components/sidebar/Sidebar";

function Profile() {
  return (
    <Wrapper title="" isGrid={true}>
      <Sidebar />
      <Outlet />
    </Wrapper>
  );
}

export default Profile;
