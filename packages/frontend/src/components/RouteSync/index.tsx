import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/location/locationSlice";

const RouteSync: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let currentPage = "";
    const pathNodes = location.pathname.split("/");

    switch (pathNodes[1]) {
      case "passage":
        currentPage = pathNodes[2] === "new" ? "createPassage" : "home";
        break;

      case "register":
        currentPage = "register";
        break;

      case "login":
        currentPage = "logIn";
        break;
    }
    dispatch(setCurrentPage(currentPage));
  }, [location, dispatch]);

  return null;
};

export default RouteSync;
