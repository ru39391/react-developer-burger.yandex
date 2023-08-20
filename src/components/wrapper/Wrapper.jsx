import React from "react";
import Preloader from "../../components/preloader/Preloader";
import "./Wrapper.css";

function Wrapper({
  title,
  children,
  isLoading,
  errorMsg,
}) {
  return (
    <main className="main">
      <section className="main__content pl-5 pr-5">
        <h1 className="main__title text text_type_main-large">{title}</h1>
        {errorMsg && <p className="text text_type_main-default">{errorMsg}</p>}
        {isLoading ? <Preloader /> : children}
      </section>
    </main>
  );
}

export default Wrapper;
