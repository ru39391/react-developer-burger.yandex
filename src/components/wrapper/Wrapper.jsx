import React from 'react';
import './Wrapper.css';

function Wrapper({
    children,
    title
}) {
    return (
        <main className="main">
            <section className="main__content pl-5 pr-5">
                <h1 className="main__title text text_type_main-large">{title}</h1>
                <div className="main__wrapper">{children}</div>
            </section>
        </main>
    );
}

export default Wrapper;
