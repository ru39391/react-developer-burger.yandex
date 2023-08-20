import React from "react";
import Wrapper from "../../components/wrapper/Wrapper";

import { PROFILE_TITLE, UNDER_CONSTRUCTION_TEXT } from "../../utils/constants";

function Profile() {
  return (
    <Wrapper title={PROFILE_TITLE}>
      <p className="text text_type_main-default">{UNDER_CONSTRUCTION_TEXT}</p>
    </Wrapper>
  );
}

export default Profile;
