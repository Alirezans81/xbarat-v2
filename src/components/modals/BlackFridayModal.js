import React from "react";
import { isMobile } from "react-device-detect";
import Confetti from "react-confetti";
const BlackFridayModal = ({ closeModal }) => {
  const photo = isMobile
    ? require("../../Images/blackFridayXS.webp")
    : require("../../Images/blackFridayMD.webp");
  return (
    <div className="w-full md:w-[1350px] h-full flex flex-col md:flex-row-reverse">
      <div className="absolute -z-10 w-screen h-screen top-0 left-0">
        <Confetti
          colors={["#E42F08", "#FCB819"]}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
      <div className="w-full px-3 md:w-11/12 h-full flex justify-center items-center ">
        <img
          className={` ${
            isMobile ? "w-[300px]" : "w-11/12 rounded-3xl mb-14"
          }  `}
          src={photo}
          alt="Black Friday Poster"
        />
      </div>
      <div
        dir="rtl"
        className={`mt-5 ${
          isMobile ? "w-[300px]" : "w-1/2 h-full"
        } font-Fa-regular`}
      >
        <span
          dir="rtl"
          className="w-full h-fit flex flex-col text-xl text-white  text-start"
        >
          بلک‌فرایدی ایکس برات شروع شد.🥳
          <br />
          کمپین سال صفر ـــ ۵ تا ۱۰ آذر🎯
          <br />
          در این طرح فوق العاده، ۵ کاربر به مدت یک سال از پرداخت هرگونه کارمزد
          معاف خواهند بود وکارمزد ۱ درصد برای آن ها کاملا صفر می‌شود.🤝
          <br />
          با توجه به حجم بالای تراکنش بسیاری از کاربران، حذف کارمزد می‌تواند
          موجب صرفه‌جویی مالی قابل توجهی شود؛ از حدود ۱۰۰ میلیون تا نزدیک به یک
          میلیارد تومان در طول یک سال!📈
          <br />
          شرایط ورود به قرعه کشی:
          <br />
          انجام حداقل یک تراکنش در تاریخ ۵ تا ۱۰ آذر (حتی با مبلغ ۱۰ دلار)
          <br />
          اسامی برندگان در تاریخ ۱۱ آذر
        </span>
        <div
          dir="rtl"
          className="w-full flex font-Fa-bold  justify-center h-fit mt-5"
        >
          <button
            dir="rtl"
            className="bg-blue rounded-xl p-2  text-white flex text-start"
            onClick={() => closeModal()}
          >
            متوجه شدم.
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlackFridayModal;
