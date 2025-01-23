import Cookie from "js-cookie";

export const SetUserCookie = async (name, value) => {

  Cookie.set(name, value, { expires: 30 });
  console.log(Cookie.get(name));
};
