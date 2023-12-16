import { TIngredientPos } from '../types';

const DEFAULT_DOC_TITLE = 'Stellar Burgers';

const HOME_TITLE: string = 'Соберите бургер';
const CONSTRUCTOR_TITLE: string = 'Конструктор';
const ORDERS_TITLE: string = 'Лента заказов';
const PROFILE_TITLE: string = 'Личный кабинет';
const LOGIN_TITLE: string = 'Вход';
const REGISTER_TITLE: string = 'Регистрация';
const FORGOT_PASSWORD_TITLE: string = 'Восстановление пароля';

const PROFILE_NAV_TITLE: string = 'Профиль';
const ORDERS_NAV_TITLE: string = 'История заказов';
const EXIT_NAV_TITLE: string = 'Выход';

const BUN_PRODUCT_NAME: string = 'bun';
const MAIN_PRODUCT_NAME: string = 'main';
const SAUCE_PRODUCT_NAME: string = 'sauce';

const BUN_PRODUCT_CAPTION: string = 'Булки';
const MAIN_PRODUCT_CAPTION: string = 'Начинки';
const SAUCE_PRODUCT_CAPTION: string = 'Соусы';

const TOP_PRODUCT_CAPTION: string = 'верх';
const BOTTOM_PRODUCT_CAPTION: string = 'низ';

const UNDER_CONSTRUCTION_TEXT: string = 'Раздел находится в разработке';

const ORDERS_URL: string = 'orders';
const PROFILE_URL: string = 'profile';
const LOGIN_URL: string = 'login';
const REGISTER_URL: string = 'register';
const FORGOT_PASSWORD_URL: string = 'forgot-password';
const RESET_PASSWORD_URL: string = 'reset-password';
const INGREDIENTS_URL: string = 'ingredients';
const USER_URL: string = 'user';
const TOKEN_URL: string = 'token';
const LOGOUT_URL: string = 'logout';
const RESET_URL: string = 'reset';

const API_URL: string = 'https://norma.nomoreparties.space/api/';
const INGREDIENTS_ALIAS: string = 'ingredients';
const ORDERS_ALIAS: string = 'orders';
const AUTH_ALIAS: string = 'auth';
const RESET_PASSWORD_ALIAS: string = 'password-reset';

const TOKEN_ERROR_MSG: string = 'Невозможно обработать данные пользователя';
const ACTION_ERROR_MSG: string = 'Передан неизвестный тип';
const UPDATE_ERROR_MSG: string = 'Ошибка обновления данных';
const RESPONSE_ERROR_MSG: string = 'Ошибка при получении данных';
const NAME_ERROR_MSG: string = 'Имя должно состоять из букв и быть не короче 2 символов';
const EMAIL_ERROR_MSG: string = 'Введите e-mail';
const PASSWORD_ERROR_MSG: string = 'Пароль может включать цифры и латиницу, длина - не менее 8 символов';
const CODE_ERROR_MSG: string = 'Введите код в формате xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, где x - цифра или символ латиницы';

const NAME_PLS: string = 'Имя';
const EMAIL_PLS: string = 'E-mail';
const PASSWORD_PLS: string = 'Пароль';

const PASSWORD_DEFAULT_VAL: string = '12345678';

const CALORIES_CAPTION: string = 'Калории,ккал';
const PROTEINS_CAPTION: string = 'Белки, г';
const FAT_CAPTION: string = 'Жиры, г';
const CARBOHYDRATES_CAPTION: string = 'Углеводы, г';

const ID_KEY: string = '_id';
const PRICE_KEY: string = 'price';

const TOP_KEY: string = 'top';
const BOTTOM_KEY: string = 'bottom';

const TOP_POS_KEY: TIngredientPos = 'top';
const BOTTOM_POS_KEY: TIngredientPos = 'bottom';

const IS_LOGGED_KEY: string = 'isLogged';
const IS_PASSWORD_REQ_SENT_KEY: string = 'isPasswordReqSent';
const ACCESS_TOKEN_KEY: string = 'accessToken';
const REFRESH_TOKEN_KEY: string = 'refreshToken';

export {
  DEFAULT_DOC_TITLE,
  HOME_TITLE,
  CONSTRUCTOR_TITLE,
  ORDERS_TITLE,
  PROFILE_TITLE,
  LOGIN_TITLE,
  REGISTER_TITLE,
  FORGOT_PASSWORD_TITLE,

  PROFILE_NAV_TITLE,
  ORDERS_NAV_TITLE,
  EXIT_NAV_TITLE,

  BUN_PRODUCT_NAME,
  MAIN_PRODUCT_NAME,
  SAUCE_PRODUCT_NAME,

  BUN_PRODUCT_CAPTION,
  MAIN_PRODUCT_CAPTION,
  SAUCE_PRODUCT_CAPTION,

  TOP_PRODUCT_CAPTION,
  BOTTOM_PRODUCT_CAPTION,

  UNDER_CONSTRUCTION_TEXT,

  NAME_PLS,
  EMAIL_PLS,
  PASSWORD_PLS,

  PASSWORD_DEFAULT_VAL,

  ORDERS_URL,
  PROFILE_URL,
  LOGIN_URL,
  REGISTER_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  INGREDIENTS_URL,
  USER_URL,
  TOKEN_URL,
  LOGOUT_URL,
  RESET_URL,

  API_URL,
  INGREDIENTS_ALIAS,
  ORDERS_ALIAS,
  AUTH_ALIAS,
  RESET_PASSWORD_ALIAS,

  TOKEN_ERROR_MSG,
  ACTION_ERROR_MSG,
  UPDATE_ERROR_MSG,
  RESPONSE_ERROR_MSG,
  NAME_ERROR_MSG,
  EMAIL_ERROR_MSG,
  PASSWORD_ERROR_MSG,
  CODE_ERROR_MSG,

  CALORIES_CAPTION,
  PROTEINS_CAPTION,
  FAT_CAPTION,
  CARBOHYDRATES_CAPTION,

  ID_KEY,
  PRICE_KEY,
  TOP_KEY,
  BOTTOM_KEY,

  TOP_POS_KEY,
  BOTTOM_POS_KEY,

  IS_LOGGED_KEY,
  IS_PASSWORD_REQ_SENT_KEY,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY
};
