import type { Offer } from '@/types';

export const calculateOfferPrices = (offer: Omit<Offer, 'annual_price'| 'monthly_price'>) => {
  const annualConsumptionCost = offer.consumption_pricing * 400;
  const annualTotalCost = annualConsumptionCost + offer.subscription_cost;
  const monthlyCost = annualTotalCost / 12;

  return {
    monthly_price: monthlyCost.toFixed(2),
    annual_price: annualTotalCost.toFixed(2),
  }
}
