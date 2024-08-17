import React from "react";
import SubmitButton from "../common/SubmitButton";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { Formik } from "formik";
import { useFontState } from "../../Providers/FontProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useCreateChat } from "../../apis/pages/Tickets/hooks";
import { useUserState } from "../../Providers/UserProvider";
import { useModalDataClose } from "../../Providers/ModalDataProvider";

export default function NewTicketModal({ category, refreshChats }) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const userInfo = useUserState();
  const closeModal = useModalDataClose();

  const { createChat, isLoading: createChatIsLoading } = useCreateChat();

  return (
    <div className="">
      <Formik
        initialValues={{
          title: "",
          message: "",
        }}
        onSubmit={(values) => {
          const params = {
            user: userInfo && userInfo.url ? userInfo.url : "",
            category: category && category.url ? category.url : "",
            title: values.title,
          };

          createChat(params, () => {
            closeModal();
            refreshChats();
          });
        }}
      >
        {({ handleBlur, handleChange, values, handleSubmit }) => (
          <div className={`flex flex-col gap-y-3 font-${font}-regular`}>
            <div className="flex flex-col gap-1">
              <span className={`text-${oppositeTheme}`}>Title</span>
              <input
                className={`hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-9 rounded-lg w-full`}
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className={`text-${oppositeTheme}`}>Message</span>
              <textarea
                className={`hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} border border-gray bg-${theme} px-3 outline-1 h-32 rounded-lg w-full`}
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
            </div>
            <div>
              <SubmitButton
                disabled={createChatIsLoading}
                type="button"
                onClick={handleSubmit}
                rounded="full"
                className="w-full text-lg py-1 mt-4 mb-1"
              >
                {lang["submit"]}
              </SubmitButton>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
