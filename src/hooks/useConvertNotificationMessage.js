import { useLanguageState } from "../Providers/LanguageProvider";

const useConvertNotificationMessage = () => {
  const lang = useLanguageState();

  const convertNotificationMessage = (_string) => {
    const array = _string.split(" ");

    const result = array.map((e, i) => {
      if (e[0] === "/" && e[e.length - 1] === "/") {
        return e.replaceAll("/", "");
      } else {
        return lang[e];
      }
    });

    return result.join(" ");
  };

  return convertNotificationMessage;
};

export { useConvertNotificationMessage };
