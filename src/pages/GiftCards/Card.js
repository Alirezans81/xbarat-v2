import { useThemeState } from "../../Providers/ThemeProvider";
import Apple from "../../Images/pages/gif-cards/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpg";
export default function Card({ data }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  return (
    <div
      className={`w-full h-full  bg-${theme}-back rounded-3xl flex flex-row `}
    >
      <div className="w-1/2 h-full p-3 flex justify-center items-center">
        <img alt="" src={Apple} className="w-fit h-fit min-h-max" />
      </div>
      <div className="w-1/2 h-full flex flex-col">
        <span
          className={`w-full h-1/3 flex justify-start items-center text-lg text-${oppositeTheme}`}
        >
          gif card xxx {data.number}
        </span>
        <span
          className={`w-full h-1/3 flex justify-start items-center text-2xl text-${oppositeTheme}`}
        >
          {data.amount}
        </span>
        <span
          className={`w-full h-1/3 flex justify-start items-center text-lg text-gray`}
        >
          exp {data.exp_date}
        </span>
      </div>
    </div>
  );
}
