import { useEffect, useState } from "react";
import { portfolioFallback } from "../data/portfolioFallback";

export const usePortfolioData = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPortfolio(portfolioFallback);
    setLoading(false);
  }, []);

  return { portfolio, loading };
};
