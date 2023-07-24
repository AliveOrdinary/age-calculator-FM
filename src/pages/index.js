import { useState } from "react";

import arrow from "../images/icon-arrow.svg";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const [days, setDays] = useState("");
  const [months, setMonths] = useState("");
  const [years, setYears] = useState("");

  function calculateAge(birthYear, birthMonth, birthDay) {
    // Get the current date
    const currentDate = new Date();

    // Create a new date object from the provided birth year, month, and day
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

    // Calculate the age in milliseconds
    let ageInMilliseconds = currentDate - birthDate;

    // Convert milliseconds to years, months, and days
    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
    const years = Math.floor(ageInMilliseconds / millisecondsPerYear);
    ageInMilliseconds %= millisecondsPerYear;

    const millisecondsPerMonth = 1000 * 60 * 60 * 24 * 30.44;
    const months = Math.floor(ageInMilliseconds / millisecondsPerMonth);
    ageInMilliseconds %= millisecondsPerMonth;

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const days = Math.floor(ageInMilliseconds / millisecondsPerDay);

    return {
      years,
      months,
      days,
    };
  }

  let diffInDays = calculateAge(years, months, days).days;
  let diffInMonths = calculateAge(years, months, days).months;
  let diffInYears = calculateAge(years, months, days).years;

  return (
    <>
      <Head>
        <title>Frontend Mentor | Age Calculator</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <main className="lg:flex lg:items-center lg:justify-center lg:h-screen">
        <div
          style={{
            borderBottomRightRadius: "100px",
          }}
          className="max-w-lg mx-auto bg-white rounded-3xl shadow p-10"
        >
          <div>
            <form className="flex gap-4">
              <article>
                <label
                  htmlFor="day"
                  className={`${days > 31 && "text-rose-600"}`}
                >
                  Day
                </label>
                <input
                  className={`${days > 31 && "border-rose-600"}`}
                  type="number"
                  name="day"
                  id="day"
                  placeholder="DD"
                  min="1"
                  max="31"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
                {days > 31 && (
                  <small className="text-rose-600 text-xs block mt-2">
                    Must be a valid day.
                  </small>
                )}
              </article>
              <article>
                <label
                  htmlFor="month"
                  className={`${months > 12 && "text-rose-600"}`}
                >
                  Month
                </label>
                <input
                  className={`${months > 12 && "border-rose-600"}`}
                  type="number"
                  name="month"
                  id="month"
                  placeholder="MM"
                  min="1"
                  max="12"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
                {months > 12 && (
                  <small className="text-rose-600 text-xs block mt-2">
                    Must be a valid month.
                  </small>
                )}
              </article>
              <article>
                <label
                  htmlFor="year"
                  className={`${years > 2023 && "text-rose-600"}`}
                >
                  Year
                </label>
                <input
                  className={`${years > 2023 && "border-rose-600"}`}
                  type="number"
                  name="year"
                  id="year"
                  placeholder="YYYY"
                  min="1"
                  max="2023"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
                {years > 2023 && (
                  <small className="text-rose-600 text-xs block mt-2">
                    Must be in the past.
                  </small>
                )}
              </article>
            </form>
          </div>
          <div className="mt-10 relative ">
            <article className="border-b border-slate-400"></article>
            <article className="absolute right-0 -top-6">
              <Image
                className="bg-purple-600 rounded-full
             p-1"
                width={50}
                height={50}
                src={arrow}
                alt="arrow-icon"
              />
            </article>
          </div>
          <div className="mt-8">
            <ul className="flex flex-col gap-2">
              <li className="text-5xl italic font-bold">
                <span className="text-purple-600 mr-2">{`${
                  days ? diffInYears : "--"
                }`}</span>
                years
              </li>
              <li className="text-5xl italic font-bold">
                <span className="text-purple-600 mr-2">{`${
                  days ? diffInMonths : "--"
                }`}</span>
                months
              </li>
              <li className="text-5xl italic font-bold">
                <span className="text-purple-600 mr-2">{`${
                  days ? diffInDays : "--"
                }`}</span>
                days
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
