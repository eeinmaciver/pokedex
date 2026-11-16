import { describe, expect, test } from "vitest";
// import { render, screen } from "@testing-library/react";
import idFromUrl from "./pokemon";


describe("id from url", () => {
  test("test that a url with a trailing slash returns a pokemons id", () => {
    expect(idFromUrl("https://pokeapi.co/api/v2/pokemon/25/")).toBe(25);
  });
  test("test that a url without a trailing slash returns a pokemons id", () => {
    expect(idFromUrl("https://pokeapi.co/api/v2/pokemon/25")).toBe(25);
  });
  test("test that a url with no number returns error", () => {
    expect(() => idFromUrl("https://pokeapi.co/api/v2/pokemon/")).toThrow();
  });
})