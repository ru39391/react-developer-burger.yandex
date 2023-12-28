import React, { FC } from "react";
import { Outlet } from 'react-router-dom';
import Wrapper from "../../components/wrapper/Wrapper";
import Sidebar from "../../components/sidebar/Sidebar";

const Profile: FC = () => {
  return (
    <Wrapper isGrid={true}>
      <Sidebar />
      <Outlet />
    </Wrapper>
  );
}

export default Profile;
