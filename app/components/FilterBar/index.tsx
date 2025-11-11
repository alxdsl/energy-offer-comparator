'use client'

import { useState } from 'react';
import { Check, SlidersHorizontal } from 'lucide-react';
import type { Provider, Offer } from '@/types'
import styles from './styles.module.css'
import Accordion from '@/app/ui/Accordion';
import Button from '@/app/ui/Button';
import Checkbox from '@/app/ui/Checkbox';
import { useUrlFilter } from '@/hooks/useUrlFilter';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function FilterBar({ providers, offers, className }: { providers: Provider[]; offers: Offer[]; className?: string; }) {
  // We hide providers without offers based on countryOffers
  const displayedProviders = offers.map(o => o.provider_id);
  const filteredCountryProviders = providers.filter(p =>
    displayedProviders.includes(p.id)
  );

  const [selectedProviders, toggleProvider] = useUrlFilter({
    paramName: 'providers',
    isMulti: true,
  });
  const [selectedTypes, toggleType] = useUrlFilter({
    paramName: 'types',
    isMulti: true,
  });
  const [selectedContracts, toggleContract] = useUrlFilter({
    paramName: 'contracts',
    isMulti: true,
  });
  const [selectedGuarantees, toggleGuarantee] = useUrlFilter({
    paramName: 'guarantees',
    isMulti: true,
  });
  const isMobile = useIsMobile();
  const [shouldDisplayFiltersButton, setShouldDisplayFiltersButton] = useState<boolean>(false);

  const energyTypeOptions = Array.from(new Set(offers.map(offer => offer.metadata.energy_type))).sort((a, b) => a.localeCompare(b));
  const contractDurationOptions = Array.from(new Set(offers.map(offer => offer.metadata.contract_duration))).sort((a, b) => a.localeCompare(b));
  const priceGuaranteeOptions = Array.from(new Set(offers.map(offer => offer.metadata.price_guarantee))).sort((a, b) => a.localeCompare(b));

  return (
    <>
      <aside
        className={
          `${styles.filters}` +
          (className ? ` ${className}` : '') +
          (!shouldDisplayFiltersButton ? ` ${styles['filters--hidden']}` : '')
        }
      >
        <Accordion title="Providers" className={styles['filters__accordion']}>
          <ul className={styles['filters__options']}>
            {filteredCountryProviders.map((provider) => (
              <li key={provider.id} className={styles['filters__option']}>
                <Checkbox
                  id={provider.id}
                  name="provider_name"
                  value={provider.id}
                  checked={selectedProviders.includes(provider.id)}
                  onChange={(e) => toggleProvider(e.target.value)}
                >
                  {provider.display_name}
                </Checkbox>
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="Energy Types" className={styles['filters__accordion']}>
          <ul className={styles['filters__options']}>
            {energyTypeOptions.map((type, index) => (
              <li key={type+index} className={styles['filters__option']}>
                <Checkbox
                  id={type}
                  name="type"
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={(e) => toggleType(e.target.value)}
                >
                  {type}
                </Checkbox>
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="Contract Durations" className={styles['filters__accordion']}>
          <ul className={styles['filters__options']}>
            {contractDurationOptions.map((contract, index) => (
              <li key={contract+index} className={styles['filters__option']}>
                <Checkbox
                  id={contract}
                  name="contract"
                  value={contract}
                  checked={selectedContracts.includes(contract)}
                  onChange={(e) => toggleContract(e.target.value)}
                >
                  {contract}
                </Checkbox>
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="Price Guarantees" className={styles['filters__accordion']}>
          <ul className={styles['filters__options']}>
            {priceGuaranteeOptions.map((guarantee, index) => (
              <li key={guarantee+index} className={styles['filters__option']}>
                <Checkbox
                  id={guarantee}
                  name="guarantee"
                  value={guarantee}
                  checked={selectedGuarantees.includes(guarantee)}
                  onChange={(e) => toggleGuarantee(e.target.value)}
                >
                  {guarantee}
                </Checkbox>
              </li>
            ))}
          </ul>
        </Accordion>

        {shouldDisplayFiltersButton && isMobile &&
          <Button
            aria-label="Filter by"
            className={styles['filters__togglePanel']}
            onClick={
              () => setShouldDisplayFiltersButton(false)
            }
          >
            <Check className={styles['filters__toggleButton']} />
          </Button>
        }
      </aside>

      {shouldDisplayFiltersButton != undefined && isMobile &&
        <Button
          aria-label="Open filters panel"
          className={styles['filters__togglePanel']}
          onClick={
            () => setShouldDisplayFiltersButton(!shouldDisplayFiltersButton)
          }
        >
          <SlidersHorizontal className={styles['filters__toggleButton']} />
        </Button>
      }
    </>
  )
}
