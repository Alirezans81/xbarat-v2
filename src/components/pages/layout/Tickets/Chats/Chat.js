import React, { useEffect, useRef, useState } from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../../Providers/FontProvider";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";
import { Formik } from "formik";
import {
  useGetMessages,
  useSendMessage,
} from "../../../../../apis/pages/Tickets/hooks";
import Message from "./Chat/Message";
import { useUserState } from "../../../../../Providers/UserProvider";

export default function Chat({ data, onBackClick }) {
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setLoading = useIsLoadingSplashScreenSetState();
  const user = useUserState();
  const [messages, setMessages] = useState([]);
  const [send, setSend] = useState(false);

  const { getMessages, isLoading: getMessagesIsLoading } = useGetMessages();
  useEffect(() => setLoading(getMessagesIsLoading), [getMessagesIsLoading]);

  useEffect(() => {
    data && data.code && getMessages(data.code, setMessages);
  }, [send]);

  const { sendMessages, isLoading: sendMessagesIsLoading } = useSendMessage();
  useEffect(() => setLoading(sendMessagesIsLoading), [sendMessagesIsLoading]);

  const formikRef = useRef();
  const AddMessage = (values) => {
    const params = {
      user: user.url,
      ticket: data.url,
      text: values.text,
    };
    sendMessages(params);
    setSend(!send);
  };

  return (
    <div
      className={`w-full h-full flex flex-col relative font-${font}-regular text-${oppositeTheme} items-center gap-y-4`}
    >
      <button onClick={onBackClick} className="absolute left-0 top-1">
        <img
          alt=""
          className="w-8 h-8"
          src={require(`../../../../../Images/arrow-left-${oppositeTheme}.png`)}
        />
      </button>

      <span className={`text-3xl font-${font}-bold mt-1`}>
        {data && data.title ? data.title : ""}
      </span>
      <div
        className={`flex-1 w-full bg-${theme}-back rounded-3xl px-6 py-5 relative`}
      >
        <div className="w-full h-full flex flex-col gap-y-3 pb-20">
          {messages.map((message, index) => (
            <Message key={index} data={message} />
          ))}
        </div>

        <div className={`w-full absolute left-0 bottom-5 px-6`}>
          <Formik
            innerRef={formikRef}
            initialValues={{ text: "" }}
            onSubmit={(e) => {
              AddMessage(e);
              formikRef.current.resetForm();
            }}
          >
            {({ handleChange, handleBlur, values, handleSubmit }) => (
              <form
                className={`w-full h-full bg-${theme} rounded-full pl-4 pr-5 py-4 flex justify-between`}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <div className="flex-1 flex gap-x-2">
                  <button type="button" className="">
                    <img
                      alt=""
                      className="w-8 h-8"
                      src={require(`../../../../../Images/pages/Tickets/pin-${oppositeTheme}.png`)}
                    />
                  </button>
                  <input
                    name="text"
                    onChange={handleChange("text")}
                    onBlur={handleBlur("text")}
                    value={values.text}
                    autoComplete="off"
                    className={`flex-1 h-full placeholder:text-gray font-${font}-regular bg-transparent text-lg pt-1 ticket-input`}
                    placeholder="Write your message here"
                  />
                </div>
                <button type="submit">
                  <img
                    alt=""
                    className="w-8 h-8"
                    src={require(`../../../../../Images/pages/Tickets/send-${oppositeTheme}.png`)}
                  />
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
