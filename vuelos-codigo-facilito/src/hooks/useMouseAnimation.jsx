import { useState, useEffect, useReducer } from "react";

export const useMousePosition = () => {
  const [position, setPosition] = useReducer({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) =>
      setPosition({
        x: e.clientX - e.currentTarget.getBoundingClientRect().left,
        y: e.clientY - e.currentTarget.getBoundingClientRect().top,
      });
    document
      .getElementById("mouseAnimated")
      .addEventListener("mousemove", setFromEvent);
    console.log("Left? : " + position.x + " ; Top? : " + position.y + ".");

    return () => {
      document
        .getElementById("mouseAnimated")
        .removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return position;
};
