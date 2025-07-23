"use client";
import useDisclosure from "@/hooks/use-disclosure";
import { PortfolioCard } from "./components/portfolio-card";
import PortfolioHeader from "./components/portfolio-header";
import AddnewWorkFormModal from "./templates/add-new-work";
import BuildYourPortfolioTemplate from "./templates/build-portfolio-template";

function PortfolioAndWorksPageTemplate() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div className="space-y-5  page-fade-in">
      <PortfolioHeader onAddWorkModalOpen={onOpen} />
      <div className="p-4 portfolio-grid bg-white">
        <PortfolioCard />
        <PortfolioCard />
        <PortfolioCard />
        <PortfolioCard />
        <PortfolioCard />
        <PortfolioCard />
        <PortfolioCard />
      </div>
      <BuildYourPortfolioTemplate onAddWorkModalOpen={onOpen} />
      <AddnewWorkFormModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default PortfolioAndWorksPageTemplate;
