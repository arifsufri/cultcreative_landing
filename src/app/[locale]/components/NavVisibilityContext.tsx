"use client";

import { createContext, useContext } from "react";

export const NavVisibilityContext = createContext<boolean>(true);

export const useNavVisibility = () => useContext(NavVisibilityContext);
