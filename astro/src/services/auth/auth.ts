import AuthCtrl from "./AuthCtrl";

const Auth = new AuthCtrl('/auth/login', '/auth/logout', '/auth/me', '/');

export { Auth };
