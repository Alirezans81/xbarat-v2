import { useLanguageState } from "../Providers/LanguageProvider";

const convertNotif = (lang, _str) => {
  if (_str) {
    let array = _str.split("/");
    array = array.map((e) => {
      e = e.trim();
      if (lang[e]) {
        return lang[e];
        // return e;
      } else {
        return e;
      }
    });

    return array.join(" ");
  } else {
    return "";
  }
};

const useConvertNotif = () => {
  const lang = useLanguageState();
  console.log(lang);
  return (_str) => convertNotif(lang, _str);
};

export { useConvertNotif };
