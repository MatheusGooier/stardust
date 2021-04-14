import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="inset-x-0 top-0 ">
      <ul className="flex bg-gray-800 text-gray-200">
        <Link to={"/"} className="nav-link">
          <li className="flex p-2 pl-4 border-solid border-r-2 border-gray-400">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="mx-2 ">Financeiro </span>
          </li>
        </Link>

        <Link to={"/cc"} className="nav-link">
          <li className="flex p-2 pl-4 border-solid border-r-2 border-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
              />
            </svg>
            <span className="mx-2">Centro de custos</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
}
