import approved from "../assets/approved.png";
import disapproved from "../assets/disapproved.png";
import { useThemeState } from "../../../Providers/ThemeProvider";
const Rows = ({ index, transfers }) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  let temp = transfers.datetime;
  temp = temp.toString();
  let createDate = [
    temp[0],
    temp[1],
    temp[2],
    temp[3],
    "/",
    temp[5],
    temp[6],
    "/",
    temp[8],
    temp[9],
    " ",
    temp[11],
    temp[12],
    ":",
    temp[14],
    temp[15],
    ":",
    temp[17],
    temp[18],
  ].join("");

  return (
    <>
      <div
        className={`bg-${theme}-back rounded-full`}
        style={
          index % 11 === 0
            ? {
                position: "absolute",
                left: "4.5%",
                top: "10%",
                width: "91%",
                height: "6%",
              }
            : index % 11 === 1
            ? {
                position: "absolute",
                left: "4.5%",
                top: "17.5%",
                width: "91%",
                height: "6%",
              }
            : index % 11 === 2
            ? {
                position: "absolute",
                left: "4.5%",
                top: "25%",
                width: "91%",
                height: "6%",
              }
            : index % 11 === 3
            ? {
                position: "absolute",
                left: "4.5%",
                top: "32.5%",
                width: "91%",
                height: "6%",
              }
            : index % 11 === 4
            ? {
                position: "absolute",
                left: "4.5%",
                top: "40%",
                width: "91%",
                height: "6%",
              }
            : index % 11 === 5
            ? {
                position: "absolute",
                left: "4.5%",
                top: "47.5%",
                width: "91%",
                height: "6%",
              }
            : index % 11 === 6
            ? {
                position: "absolute",
                left: "4.5%",
                top: "55%",
                width: "91%",
                height: "6%",
              }
            : index % 11 === 7
            ? {
                position: "absolute",
                left: "4.5%",
                top: "62.5%",
                width: "91%",
                height: "6%",
              }
            : index % 11 === 8
            ? {
                position: "absolute",
                left: "4.5%",
                top: "70%",
                width: "91%",
                height: "6%",
              }
            : index % 11 === 9
            ? {
                position: "absolute",
                left: "4.5%",
                top: "77.5%",
                width: "91%",
                height: "6%",
              }
            : {
                position: "absolute",
                left: "4.5%",
                top: "84.6%",
                width: "91%",
                height: "6%",
              }
        }
      >
        <div
          className={`text-${oppositeTheme}`}
          style={{ position: "absolute", left: "4.8%", top: "16%" }}
        >
          {transfers.user_sender}
        </div>
        <div
          className={`text-${oppositeTheme}`}
          style={{ position: "absolute", left: "21%", top: "16%" }}
        >
          {transfers.user_receiver}
        </div>
        <div
          className={`text-${oppositeTheme}`}
          style={{ position: "absolute", left: "34%", top: "16%" }}
        >
          {transfers.currency}
        </div>
        <div
          className={`text-${oppositeTheme}`}
          style={{ position: "absolute", left: "54.5%", top: "16%" }}
        >
          {transfers.amount}
        </div>
        <div
          className={`text-${oppositeTheme}`}
          style={{ position: "absolute", left: "69%", top: "16%" }}
        >
          {createDate}
        </div>

        <button
          style={{
            position: "absolute",
            left: "89%",
            top: "16%",
            width: "2.5%",
          }}
        >
          <img alt="" src={approved} />
        </button>
        <button
          style={{
            position: "absolute",
            left: "93%",
            top: "16%",
            width: "2.5%",
          }}
        >
          <img alt="" src={disapproved} />
        </button>
      </div>
    </>
  );
};

export default Rows;
