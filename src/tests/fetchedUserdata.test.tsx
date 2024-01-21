import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { describe, expect, it, test, vi } from "vitest";
import React from "react";
import { Userdata, Points } from "../components/fetchedUserdata";
import {
  useFetchPoints as useFetchPoints,
  useFetchUserdata,
} from "../components/api";
import { User } from "@prisma/client";

test("fetchTest", async () => {
  const points = await useFetchPoints("/points/leaderboard/1");

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(expectedData),
  });

  const pointsId = points?.[0].id;
  expect(pointsId).toBe(10);
});
