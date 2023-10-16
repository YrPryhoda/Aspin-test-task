import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import PageLayout from "../layouts/PageLayout";
import AppLayout from "../layouts/AppLayout";
import CryptoPage from "../pages/CoinPage";
import StartPage from "../pages/StartPage";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<StartPage />} />

      <Route path="crypto" element={<PageLayout />}>
        <Route path=":coinId" element={<CryptoPage />} />
      </Route>

      <Route path="*" element={<PageLayout />}>
        <Route element={<NotFound />} />
      </Route>
    </Route>
  )
);
