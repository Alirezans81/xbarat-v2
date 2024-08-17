import React, { useEffect, useRef, useState } from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../../Providers/FontProvider";
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
  const user = useUserState();
  const [messages, setMessages] = useState([]);

  const messagesDivRef = useRef();

  const { getMessages } = useGetMessages();

  useEffect(() => {
    data && data.code && getMessages(data.code, setMessages);
  }, []);

  const { sendMessages } = useSendMessage();

  const formikRef = useRef();
  const AddMessage = (values) => {
    const params = {
      user: user.url,
      ticket: data.url,
      text: values.text,
    };
    sendMessages(params, () => getMessages(data.code, setMessages));
  };

  useEffect(() => {
    messages.length > 0 &&
      messagesDivRef.current.lastElementChild.scrollIntoView();
  }, [messages]);

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
      <div className={`flex-1 w-full bg-${theme}-back rounded-3xl relative`}>
        <div
          ref={messagesDivRef}
          className="w-full h-full flex flex-col gap-y-3 pb-28 absolute left-0 top-0 px-6 py-5 overflow-y-auto scroll-smooth"
        >
          {messages.map((message, index) => (
            <Message key={index} data={message} />
          ))}
        </div>

        <div
          className={`w-full absolute left-0 bottom-0 rounded-3xl py-4 px-6 backdrop-blur-md`}
        >
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
                    src={require(`../../../../../Images/pages/Tickets/send-blue.png`)}
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
