export type Provider = {
  id: string;
  slug: string;
  display_name: string;
  country: string;
}

export type OfferMetaData = {
  energy_type: string;
  contract_duration: string;
  price_guarantee: string;
}

export type Offer = {
  id: string;
  slug: string;
  provider_name: string;
  name: string;
  description: string;
  provider_id: string;
  consumption_pricing: number;
  subscription_cost: number;
  metadata: OfferMetaData;
  monthly_price: string;
  annual_price: string;
}
