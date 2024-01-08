import React, { FC, ReactNode } from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import Sidebar from "../../components/sidebar/Sidebar";

interface IProfile {
  children: ReactNode;
};

const Profile: FC<IProfile> = ({ children }) => {
  return (
    <Wrapper isGrid={true}>
      <Sidebar />
      {children}
    </Wrapper>
  );
}

export default Profile;
