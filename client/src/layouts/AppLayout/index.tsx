import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { getCoinsList } from "../../store/coin/coin.actions";

const PageLayout = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.coin);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getCoinsList()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded || loading) {
    return <p> Loading ...</p>;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default PageLayout;
