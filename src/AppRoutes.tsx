
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import PokedexPage from "./pages/PokedexPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./pages/Layout";

export default function AppRoutes() {

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="pokedex" element={<PokedexPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )

}