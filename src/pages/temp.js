import CustomPagination from "../components/common/CustomPagination";

export default function Temp() {
  const limit = require("../apis/pagination/limit.json")["branch"];
  const offset = require("../apis/pagination/offset.json")["branch"];

  const fake = [
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
    {
      name: "ahmad",
    },
  ];
  console.log(offset);

  return (
    <>
      <div>
        <CustomPagination data={fake} itemsPerPage={limit} />
      </div>
    </>
  );
}
