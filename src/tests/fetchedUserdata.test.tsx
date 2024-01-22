import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { describe, expect, it, test, vi, vitest } from "vitest";
import React from "react";
import { Userdata, Points } from "../components/fetchedUserdata";
import {
  useFetchPoints as useFetchPoints,
  useFetchUserdata,
} from "../components/api";
import { User } from "@prisma/client";

test("fetchTest", async () => {
  vi.fn();
  await expect(useFetchUserdata("/users/1", true)).resolves.toEqual({ id: 1 });
});
