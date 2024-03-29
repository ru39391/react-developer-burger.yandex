import { TIngredientPos, TCustomData } from '../types';

const DEFAULT_DOC_TITLE = 'Stellar Burgers';

const HOME_TITLE = 'Соберите бургер';
const CONSTRUCTOR_TITLE = 'Конструктор';
const FEED_TITLE = 'Лента заказов';
const PROFILE_TITLE = 'Личный кабинет';
const LOGIN_TITLE = 'Вход';
const REGISTER_TITLE = 'Регистрация';
const FORGOT_PASSWORD_TITLE = 'Восстановление пароля';

const PROFILE_NAV_TITLE = 'Профиль';
const ORDERS_NAV_TITLE = 'История заказов';
const EXIT_NAV_TITLE = 'Выход';

const BUN_PRODUCT_NAME = 'bun';
const MAIN_PRODUCT_NAME = 'main';
const SAUCE_PRODUCT_NAME = 'sauce';

const BUN_PRODUCT_CAPTION = 'Булки';
const MAIN_PRODUCT_CAPTION = 'Начинки';
const SAUCE_PRODUCT_CAPTION = 'Соусы';

const TOP_PRODUCT_CAPTION = 'верх';
const BOTTOM_PRODUCT_CAPTION = 'низ';

const NO_ORDERS = 'Заказов нет';
const UNDER_CONSTRUCTION_TEXT = 'Раздел находится в разработке';

const FEED_URL = 'feed';
const ORDERS_URL = 'orders';
const PROFILE_URL = 'profile';
const LOGIN_URL = 'login';
const REGISTER_URL = 'register';
const FORGOT_PASSWORD_URL = 'forgot-password';
const RESET_PASSWORD_URL = 'reset-password';
const INGREDIENTS_URL = 'ingredients';
const USER_URL = 'user';
const TOKEN_URL = 'token';
const LOGOUT_URL = 'logout';
const RESET_URL = 'reset';

const WS_FEED_URL = 'wss://norma.nomoreparties.space/orders';
const API_URL = 'https://norma.nomoreparties.space/api/';
const INGREDIENTS_ALIAS = 'ingredients';
const ORDERS_ALIAS = 'orders';
const AUTH_ALIAS = 'auth';
const ALL_ALIAS = 'all';
const RESET_PASSWORD_ALIAS = 'password-reset';

const FEED_ERROR_MSG = 'Невозможно обработать данные заказов';
const TOKEN_ERROR_MSG = 'Невозможно обработать данные пользователя';
const ACTION_ERROR_MSG = 'Передан неизвестный тип';
const UPDATE_ERROR_MSG = 'Ошибка обновления данных';
const RESPONSE_ERROR_MSG = 'Ошибка при получении данных';
const NAME_ERROR_MSG = 'Имя должно состоять из букв и быть не короче 2 символов';
const EMAIL_ERROR_MSG = 'Введите e-mail';
const PASSWORD_ERROR_MSG = 'Пароль может включать цифры и латиницу, длина - не менее 8 символов';
const CODE_ERROR_MSG = 'Введите код в формате xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, где x - цифра или символ латиницы';

const NAME_PLS = 'Имя';
const EMAIL_PLS = 'E-mail';
const PASSWORD_PLS = 'Пароль';

const PASSWORD_DEFAULT_VAL = '12345678';

const CALORIES_CAPTION = 'Калории,ккал';
const PROTEINS_CAPTION = 'Белки, г';
const FAT_CAPTION = 'Жиры, г';
const CARBOHYDRATES_CAPTION = 'Углеводы, г';

const ID_KEY = '_id';
const PRICE_KEY = 'price';

const TOP_KEY: TIngredientPos = 'top';
const BOTTOM_KEY: TIngredientPos = 'bottom';

const IS_LOGGED_KEY = 'isLogged';
const IS_PASSWORD_REQ_SENT_KEY = 'isPasswordReqSent';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const DONE_STATE = 'done';
const CREATED_STATE = 'created';
const PENDING_STATE = 'pending'
const ORDER_STATES: TCustomData<string> = {
  [DONE_STATE]: 'Выполнен',
  [CREATED_STATE]: 'Создан',
  [PENDING_STATE]: 'Готовится'
};

export {
  DEFAULT_DOC_TITLE,
  HOME_TITLE,
  CONSTRUCTOR_TITLE,
  FEED_TITLE,
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

  NO_ORDERS,
  UNDER_CONSTRUCTION_TEXT,

  NAME_PLS,
  EMAIL_PLS,
  PASSWORD_PLS,

  PASSWORD_DEFAULT_VAL,

  WS_FEED_URL,
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

  FEED_URL,
  API_URL,
  INGREDIENTS_ALIAS,
  ORDERS_ALIAS,
  AUTH_ALIAS,
  ALL_ALIAS,
  RESET_PASSWORD_ALIAS,

  FEED_ERROR_MSG,
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

  IS_LOGGED_KEY,
  IS_PASSWORD_REQ_SENT_KEY,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,

  DONE_STATE,
  CREATED_STATE,
  PENDING_STATE,
  ORDER_STATES
};
