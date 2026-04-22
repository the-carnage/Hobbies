"use client";

import { getSession } from "../services/session";

export const verifyUser = () => Boolean(getSession());
