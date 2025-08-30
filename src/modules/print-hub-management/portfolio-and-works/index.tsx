"use client";
import useDisclosure from "@/lib/hooks/use-disclosure";
import { PortfolioCard } from "./components/portfolio-card";
import PortfolioHeader from "./components/portfolio-header";
import AddnewWorkFormModal from "./templates/add-new-work";
import BuildYourPortfolioTemplate from "./templates/build-portfolio-template";

function PortfolioAndWorksPageTemplate() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div className="page-fade-in space-y-5">
      <PortfolioHeader onAddWorkModalOpen={onOpen} />
      <div className="portfolio-grid bg-white p-4">
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
