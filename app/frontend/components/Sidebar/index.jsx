import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";
import { Button, CheckBox, Popover, SelectBox, Text } from "@switchdreams/ui";
import React, { useEffect, useState } from "react";

import { TimeOptions } from "./constants";

const DayAvailability = ({
  index,
  day,
  times,
  setTimes,
  enabled,
  toggleEnabled,
  initialTimes,
  error,
}) => {
  const [periods, setPeriods] = useState(1);

  useEffect(() => {
    if (initialTimes.length > 0) {
      setPeriods(initialTimes.length);
      toggleEnabled(index);
    }
  }, [initialTimes]);

  const handleChange = (day, action, value, index) => {
    if (action == "start") {
      const newTime = times[day][index]
        ? { startTime: value, endTime: times[day][index].endTime }
        : { startTime: value, endTime: "" };
      const newArray = times[day];
      newArray[index] = newTime;
      setTimes({ ...times, [day]: newArray });
    }
    if (action == "end") {
      const newTime = times[day][index]
        ? { startTime: times[day][index].startTime, endTime: value }
        : { startTime: "", endTime: value };
      const newArray = times[day];
      newArray[index] = newTime;
      setTimes({ ...times, [day]: newArray });
    }
  };

  return (
    <div className="flex w-full flex-col border-b border-coolGray-300">
      <div className="flex w-full items-center justify-between px-8 py-7">
        <div className="flex items-center gap-2">
          <CheckBox
            name={day.toLowerCase()}
            size="small"
            checked={enabled}
            onChange={() => {
              toggleEnabled(index);
              handleChange(index, "enable", !enabled);
            }}
          />
          <Text>{day}</Text>
        </div>
        <Popover
          className={`z-[60] mt-10 ${!enabled && "pointer-events-none"}`}
          button={
            <div className="flex items-center justify-center gap-1">
              <Text
                className={`font-poppins font-medium text-coolGray-600 ${!enabled && "text-coolGray-400"}`}
                size="sm"
              >
                {periods} período(s)
              </Text>
              <ChevronDownIcon className="h-4 text-primary-600" />
            </div>
          }
          disabled={!enabled}
        >
          <div className="flex size-fit w-32 flex-col items-center justify-center border border-coolGray-400 bg-white">
            {[1, 2, 3, 4].map((period) => (
              <div key={period} className="w-fit">
                <Button
                  label={`${period} período${period > 1 ? "s" : ""}`}
                  onClick={() => {
                    if (periods > period) {
                      setTimes({ ...times, [index]: times[index].slice(0, period) });
                      toggleEnabled(index);
                    }
                    setPeriods(period);
                  }}
                  disabled={!enabled}
                />
              </div>
            ))}
          </div>
        </Popover>
      </div>
      {error && <Text className="px-8 pb-4 text-error-600">Erro: os horários se sobrepõem</Text>}
      <div className="flex flex-col gap-3 pb-7">
        {Array.from({ length: periods }).map((_, idx) => (
          <div key={idx} className="flex flex-col">
            <Text className="px-8">{idx + 1} período</Text>
            <div className="flex items-center gap-3 px-8">
              <div className="w-[45%]">
                <SelectBox
                  label=""
                  options={TimeOptions}
                  placeholder="-"
                  size="md"
                  className={`w-full rounded-2xl ${error && "border-error-400"}`}
                  disabled={!enabled}
                  onChange={(e) => handleChange(index, "start", e, idx)}
                  value={initialTimes[idx]?.startTime.replace(/ /g, "")}
                />
              </div>
              <div className="h-px w-[15%] bg-coolGray-300" />
              <div className="w-[45%]">
                <SelectBox
                  label=""
                  options={TimeOptions}
                  placeholder="-"
                  size="md"
                  className={`w-full rounded-2xl ${error && "border-error-400"}`}
                  disabled={!enabled}
                  onChange={(e) => handleChange(index, "end", e, idx)}
                  defaultValue={initialTimes[idx]?.endTime}
                  value={initialTimes[idx]?.endTime.replace(/ /g, "")}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TimeSidebar = ({ open, setOpen, doctorAvailabilities, userId }) => {
  const [times, setTimes] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

  const [errorDays, setErrorDays] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const hasTimeOverlaps = (key) => {
    const timeSlots = times[key];
    for (let i = 0; i < timeSlots.length - 1; i++) {
      const slot1 = timeSlots[i];
      for (let j = i + 1; j < timeSlots.length; j++) {
        const slot2 = timeSlots[j];
        if (isOverlapping(slot1.startTime, slot1.endTime, slot2.startTime, slot2.endTime)) {
          return true;
        }
      }
    }
    return false;
  };

  useEffect(() => {
    setErrorDays({
      0: hasTimeOverlaps(0),
      1: hasTimeOverlaps(1),
      2: hasTimeOverlaps(2),
      3: hasTimeOverlaps(3),
      4: hasTimeOverlaps(4),
      5: hasTimeOverlaps(5),
      6: hasTimeOverlaps(6),
    });
  }, [times]);

  // console.log(errorDays)

  const isOverlapping = (startTime1, endTime1, startTime2, endTime2) => {
    // Helper function to check for overlap between two time ranges
    const start1 = convertTimeStringToNumber(startTime1);
    const end1 = convertTimeStringToNumber(endTime1);
    const start2 = convertTimeStringToNumber(startTime2);
    const end2 = convertTimeStringToNumber(endTime2);

    // Overlap exists if:
    // - Start time of one range falls within the other range
    // - End time of one range falls within the other range
    // - One range completely encompasses the other
    return (
      (start1 < end2 && start1 >= start2) ||
      (end1 > start2 && end1 <= end2) ||
      (start1 <= start2 && end1 >= end2)
    );
  };

  const convertTimeStringToNumber = (timeString) => {
    // Helper function to convert time string (e.g., "06:00") to a number (e.g., 600)
    const [hours, minutes] = timeString.trim().split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  };

  const [enabledDays, setEnabledDays] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  useEffect(() => {
    if (doctorAvailabilities) {
      const translatedDays = {
        monday: 0,
        tuesday: 1,
        wednesday: 2,
        thursday: 3,
        friday: 4,
        saturday: 5,
        sunday: 6,
      };
      const initialTimes = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      };
      Array.from({ length: days.length }).map((_, idx) => {
        const formatedAvailabilities = doctorAvailabilities
          .filter((availability) => translatedDays[availability.day_of_week] == idx)
          .map((availability) => {
            return {
              startTime: availability.start_time,
              endTime: availability.end_time,
            };
          });
        initialTimes[idx] = formatedAvailabilities;
      });
      setTimes(initialTimes);
    }
  }, []);

  const toggleEnabled = (day) => {
    setEnabledDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const submitAvailability = () => {
    const submitObject = {
      0: enabledDays[0] && times[0],
      1: enabledDays[1] && times[1],
      2: enabledDays[2] && times[2],
      3: enabledDays[3] && times[3],
      4: enabledDays[4] && times[4],
      5: enabledDays[5] && times[5],
      6: enabledDays[6] && times[6],
    };
    router.post("/doctor_availabilities", { availability: submitObject, user_id: userId });
    setOpen(false);
  };

  return (
    <>
      <div
        className={`fixed right-0 top-0 z-50 h-full w-screen bg-gray-500 opacity-40 max-md:hidden ${
          !open && "hidden"
        }`}
        onClick={() => setOpen(!open)}
      />
      <div
        className={`absolute z-50 ${open ? "w-[30rem] max-md:w-full" : "w-0 overflow-hidden"} duration-400 right-0 top-0 h-full overflow-auto scroll-smooth bg-white transition-all ease-in-out`}
      >
        <div className="flex w-full items-center justify-between border-b border-coolGray-300 px-8 py-7">
          <Text className="font-quicksand font-semibold text-coolGray-950" size="lg">
            Defina seus horários de atendimento
          </Text>
          <XMarkIcon className="size-5 cursor-pointer" onClick={() => setOpen(false)} />
        </div>
        {days.map((day, index) => (
          <DayAvailability
            key={index}
            index={index}
            day={day}
            times={times}
            setTimes={setTimes}
            enabled={enabledDays[index]}
            toggleEnabled={toggleEnabled}
            initialTimes={times[index]}
            error={errorDays[index]}
          />
        ))}
        <div className="flex gap-6 px-8 py-6 max-md:flex-col">
          <Button
            label="Cancelar"
            className="qpx-10 flex w-1/2 rounded-2xl border border-coolGray-400 bg-white py-2 font-poppins text-sm font-medium text-coolGray-800 duration-500 hover:bg-primary-600 max-md:w-full "
            onClick={() => setOpen(false)}
          />
          <Button
            label="Confirmar"
            className="flex w-1/2 rounded-2xl border border-primary-400 bg-primary-500 px-10 py-2 font-poppins text-sm font-medium text-white duration-500 hover:bg-primary-600 max-md:w-full"
            onClick={() => submitAvailability()}
            disabled={Object.values(errorDays).some((value) => Boolean(value))}
          />
        </div>
      </div>
    </>
  );
};

export default TimeSidebar;
