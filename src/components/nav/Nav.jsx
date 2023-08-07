import React from 'react';
import {
    BurgerIcon,
    ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import './Nav.css';

function Nav() {
    return (
        <nav className="nav">
            <a className="nav-link nav-link_active pt-4 pb-4 pl-5 pr-5" href="/">
                <BurgerIcon />
                Конструктор
            </a>
            <a className="nav-link pt-4 pb-4 pl-5 pr-5" href="/">
                <ListIcon />
                Лента заказов
            </a>
        </nav>
    );
}

export default Nav;
