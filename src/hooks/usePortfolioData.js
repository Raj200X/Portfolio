import { useEffect, useState } from "react";
import api from "../lib/api";
import { portfolioFallback } from "../data/portfolioFallback";

export const usePortfolioData = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("api");

  useEffect(() => {
    let active = true;

    const loadPortfolio = async () => {
      try {
        const { data } = await api.get("/portfolio");
        if (!active) return;
        setPortfolio(data.portfolio);
        setSource("api");
      } catch (error) {
        if (!active) return;
        setPortfolio(portfolioFallback);
        setSource("fallback");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadPortfolio();

    return () => {
      active = false;
    };
  }, []);

  return { portfolio, loading, source };
};
