"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAdminRoutes, getRoutes } from "@/utilities/routes/getRoute";
import { Path } from "@/types/path.types";

//import {TourGuideClient} from "@sjmc11/tourguidejs/src/Tour" // JS
//import '@sjmcl1/tourguidejs/tourguide.css';

//Dist way
//import Tour from '../tour/tour.js';

type User = {
  name: string;
};

const startTour = () => {
  console.log("In Tour Guide");
  /* const steps = [{

    content: "This is a short guide to get you set up and show you where things are",
    title: "Welcome aboard 👋",
    target: "",
    order: 1,
    group: ""

  }] 

  const tg = new TourGuideClient({
    steps: steps

  }) */

  /* const tg = new TourGuideClient({
    exitOnClickOutside: false
  }) */
  
  //tg.start();

  //dist way
  /* const tour = new Tour();
  tour.init();
  tour.start(); */
  
};

export default function Header() {
  const pathname = usePathname();
  const state = useSelector((state: any) => state.user);
  const { user } = state;
  const [pages, setPages] = useState<Path[]>(
    user.isAdmin ? getRoutes().concat(getAdminRoutes()) : getRoutes()
  );

  //data-tg-tour tag helps TourGuide to get nodes to display in tour
  return (
    <header className={"header top-bar"} id="header">
      <div className="header_toggle">
        <h2>Jacobs</h2>
      </div>
      <div className="nav-menu" data-tg-tour='<p>Nav Bar</p>' data-tg-order="0">
        {pages.map((e: Path, index) => (
          <Link
            href={e.url}
            key={index}
            className={pathname == e.url ? "nav-item active" : "nav-item"}
          >
            {e.name}
          </Link>
        ))}
      </div>
      <div className="header_toggle" data-tg-tour='TourGuide' data-tg-order="2" onClick={startTour}>
        <h2>Tour Guide</h2>
      </div>
      <div className="dropdown" data-tg-tour='Profile' data-tg-order="3">
        <div
          className="header_img float-end dropdown-toggle"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {" "}
          <img src="https://i.imgur.com/hczKIze.jpg" alt="" />{" "}
        </div>
        {/* <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Dropdown button
        </button> */}
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Action
          </a>
          <a className="dropdown-item" href="#">
            Another action
          </a>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </div>
      </div>
    </header>
  );
}
