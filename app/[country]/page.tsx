import NextLink from "next/link"
import FilterBar from '@/app/components/FilterBar'
import OffersList from '@/app/components/OffersList'
import offersData from '@/data/offers.json'
import providersData from '@/data/providers.json'
import { calculateOfferPrices } from '@/app/utils/pricing'

import styles from './styles.module.css'

export default async function CountryPage({ params }: { params: { country: string } }) {
  const { country } = await params;

  const countries = [...new Set(
    providersData.energy_providers.map((p) => p.country)
  )];

  const countriesToDisplay = countries.filter(c => c !== country);

  // Filter providers & offers for this country
  const countryProviders = providersData.energy_providers.filter(
    (p) => p.country === country
  );

  const countryProvidersIds = new Set(countryProviders.map((p) => p.id));

  const countryOffers = offersData.energy_offers.filter((o) =>
    countryProvidersIds.has(o.provider_id)
  ).map(offer =>
    ({
      ...offer,
      provider_id: countryProviders.find(
        provider => provider.id === offer.provider_id
      )?.id || 'Unknown Provider',
      provider_name: countryProviders.find(
        provider => provider.id === offer.provider_id
      )?.display_name || 'Unknown Provider',
    })
  ).map(offer => ({
    ...offer,
    ...calculateOfferPrices(offer)
  }))

  return (
    <main className={styles.page}>
      <header className={styles['page__header']}>
        <h1 className={styles['page__title']}>Energy offers in {country}</h1>
      </header>

      <FilterBar
        offers={countryOffers}
        providers={countryProviders}
        className={styles['page__filters']}
      />

      <OffersList
        offers={countryOffers}
        providers={countryProviders}
        className={styles['page__list']}
      />

      <footer className={styles['page__footer']}>
        <nav className={styles['page__nav']}>
          <ul className={styles['page__navList']}>
            {countries && countriesToDisplay && countriesToDisplay.map((c) => (
              <li key={c} className={styles['page__navItem']}>
                <NextLink href={`/${c}`}>See energy offers in {c}</NextLink>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </main>
  )
}
