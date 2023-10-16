import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { useAppSelector } from "../../store";

const PageLayout = () => {
  const { coinsList } = useAppSelector((state) => state.coin);

  const [addCoinModalOpen, setAddCoinModalOpen] = useState(false);
  const handlerOpenAddModal = () => setAddCoinModalOpen(true);

  return (
    <div>
      <Header coins={coinsList} onModalOpen={handlerOpenAddModal} />
      <div>
        <Outlet context={[addCoinModalOpen, setAddCoinModalOpen]} />
      </div>
    </div>
  );
};

export default PageLayout;
