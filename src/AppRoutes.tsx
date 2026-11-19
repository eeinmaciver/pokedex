
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import PokedexPage from "./pages/PokedexPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./pages/Layout";
import PokemonPage from "./pages/PokemonPage";
import Random from "./pages/Random";
import TeamPage from "./pages/TeamPage";

export default function AppRoutes() {

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="pokedex" element={<PokedexPage />} />
                <Route path="pokedex/:pokemonId" element={<PokemonPage />}/>
                <Route path="team/:teamId" element={<TeamPage />}/>
                <Route path="pokedex/random" element={<Random/>}/>
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )

}