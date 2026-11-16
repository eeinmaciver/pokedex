import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import PokemonCard from "./PokemonCard";

describe("pokemon card", () => {
  test("test pokemon card displays name(capiltalised), pokemon id & image", () => {
    render(<PokemonCard name="bulbasaur" id={1}/>);

    expect(
      screen.getByText("Bulbasaur"),
    ).toBeInTheDocument();
  });
})