import React from "react";
import carmodel from "../assets/carmodel.png";
const Carcomponent = ({ data }) => {
  const calculate_hour_diff_last = (exittimestamp) => {
    if (exittimestamp !== "") {
      const date1 = new Date(
        exittimestamp.seconds * 1000 + exittimestamp.nanoseconds / 1000000
      );
      const date2 = new Date();
      const timeDifference = Math.abs(date2 - date1);
      console.log(date1, date2);
      const secondsDifference = timeDifference / 1000;
      const minutesDifference = secondsDifference / 60;
      const hoursDifference = minutesDifference / 60;

      return Math.round(hoursDifference);
    }
  };
  const calculate_hour_diff = (entrytimestamp, exittimestamp) => {
    var data = data;
    if (entrytimestamp !== "" && exittimestamp !== "") {
      const date1 = new Date(
        entrytimestamp.seconds * 1000 + entrytimestamp.nanoseconds / 1000000
      );
      const date2 = new Date(
        exittimestamp.seconds * 1000 + exittimestamp.nanoseconds / 1000000
      );
      const timeDifference = Math.abs(date2 - date1);

      const secondsDifference = timeDifference / 1000;
      const minutesDifference = secondsDifference / 60;
      const hoursDifference = minutesDifference / 60;
      return hoursDifference;
    }
  };

  return (
    <div
      key={data.parkingspace_id}
      className="px-3 sm:px-0 col-span-1 w-full flex justify-center items-center"
    >
      <div
        className={`w-full lg:min-w-[350px]  h-[220px] lg:max-w-full lg:h-[220px] relative rounded-xl border border-gray-50  shadow-lg ${
          data.occupied ? "bg-[#EEEEEE]" : "bg-green-300"
        }`}
      >
        <div className="w-[130px] absolute  z-30 top-[50%] -translate-y-[50%] right-[80px] rotate-90">
          {!data.occupied ? (
            <>
              <div className="-rotate-90">
                <div className="text-[20pt]  text-green-400 bg-white rounded-lg">
                  <p className="text-center px-3">available</p>
                </div>
              </div>
            </>
          ) : (
            <img
              src={carmodel}
              className="w-full scale-110  xl:scale-[110%] "
              alt=""
            />
          )}
        </div>
        <p className="absolute parkingno top-0 text-[50pt] font-semibold text-gray-700 flex justify-center items-center gap-2 px-3">
          <span className="text-[#F05D23]">no</span>{" "}
          <span className={data.occupied ? "" : "text-gray-100"}>
            {data.parkingspace_id}
          </span>
        </p>
        {data.occupied ? (
          <div className="w-full flex justify-around items-center absolute bottom-3 text-sm">
            <p className="text-black">
              Parked{" "}
              {Math.round(
                calculate_hour_diff(
                  data.parkingdata.entry_time,
                  data.parkingdata.exit_time
                )
              )}{" "}
              hr ago.
            </p>
            <p className="px-4 py-1  rounded-r-full rounded-l-full bg-green-500 text-white">
              parked
            </p>
          </div>
        ) : (
          <div className="w-full flex justify-around items-center absolute bottom-3 text-sm">
            {data.parkingdata.entry_time !== "" ? (
              <p className="text-green-900">
                lastly used{" "}
                {calculate_hour_diff_last(data.parkingdata.exit_time)} hr ago
              </p>
            ):<p className="text-green-900">
                no data available
          </p>}
            <p className="px-4 py-1  rounded-r-full rounded-l-full bg-orange-500 text-white">
              space available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carcomponent;
