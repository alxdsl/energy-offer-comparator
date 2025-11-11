'use client'

import { useEffect, useState} from 'react';
import { ArrowDownWideNarrow, ArrowUpToLine, ArrowUpWideNarrow, ReceiptText, ShieldCheck, Zap } from 'lucide-react';
import Button from '@/app/ui/Button'
import Card from '@/app/ui/Card'
import Toggle from '@/app/ui/Toggle';
import type { Provider, Offer } from '@/types'
import { useUrlFilter } from '@/hooks/useUrlFilter';
import { useIsMobile } from '@/hooks/useIsMobile';
import { format } from '@/app/utils/formatting';

import styles from './styles.module.css'

export default function OffersList({ offers, providers, className }: { offers: Offer[]; providers: Provider[]; className?: string; }) {
  const [selectedProviders] = useUrlFilter({
    paramName: 'providers',
    isMulti: true,
  });
  const [selectedTypes] = useUrlFilter({
    paramName: 'types',
    isMulti: true,
  });
  const [selectedContracts] = useUrlFilter({
    paramName: 'contracts',
    isMulti: true,
  });
  const [selectedGuarantees] = useUrlFilter({
    paramName: 'guarantees',
    isMulti: true,
  });
  const [selectedSort, toggleSort] = useUrlFilter({
    paramName: 'sort',
    isMulti: false,
  });
  const [selectedPriceMode, togglePriceMode] = useUrlFilter({
    paramName: 'priceMode',
    isMulti: false,
  });
  const isMobile = useIsMobile();
  const [shouldDisplayScroll, setShouldDisplayScroll] = useState<boolean>(false);

  const filteredOffers = offers.filter((o) => {
    const matchesProvider =
      !selectedProviders.length ||
      selectedProviders.includes(
        providers.find((p) => p.id === o.provider_id)?.id || ''
      )

    const matchesType =
      !selectedTypes.length ||
      selectedTypes.includes(o.metadata.energy_type)

    const matchesContract =
      !selectedContracts.length ||
      selectedContracts.includes(o.metadata.contract_duration)

    const matchesGuarantee =
      !selectedGuarantees.length ||
      selectedGuarantees.includes(o.metadata.price_guarantee)

    return (
      matchesProvider && matchesType && matchesContract && matchesGuarantee
    )
  }).sort((a, b) => {
    const aPrice = selectedPriceMode === 'yearly' ? Number(a.annual_price) : Number(a.monthly_price)
    const bPrice = selectedPriceMode === 'yearly' ? Number(b.annual_price) : Number(b.monthly_price)

    if (selectedSort === 'price_asc') {
      return aPrice - bPrice
    } else if (selectedSort === 'price_desc') {
      return bPrice - aPrice
    } else {
      return 0
    }
  })

  // Default values for selectedSort and selectedPriceMode
  useEffect(() => {
    let isMounted = true;

    const applyUpdates = async () => {
      if (!selectedSort && isMounted) {
        await new Promise(resolve => setTimeout(resolve, 50));
        toggleSort('price_asc');
      }
      if (!selectedPriceMode && isMounted) {
        await new Promise(resolve => setTimeout(resolve, 50));
        togglePriceMode('monthly');
      }
    };

    applyUpdates();

    return () => {
      isMounted = false;
    };
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1 && isMobile) {
        setShouldDisplayScroll(true);
      } else {
        setShouldDisplayScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  })

  return (
    <section className={styles['offersList'] + (className ? ` ${className}` : '')}>
      <header className={styles['offersList__header']}>
        <h3 className={styles['offersList__title']}>{filteredOffers.length} offer{filteredOffers.length > 1 ? 's' : ''} found.</h3>

        <div className={styles['offersList__toggles']}>
          <Toggle name="price_toggle" options={[
            {
              label: 'Monthly price',
              value: 'monthly',
              checked: selectedPriceMode === 'monthly',
              onChange: () => togglePriceMode('monthly')
            },
            {
              label: 'Yearly price',
              value: 'yearly',
              checked: selectedPriceMode === 'yearly',
              onChange: () => togglePriceMode('yearly')
            }
          ]}>
            Display price:
          </Toggle>

          <Toggle name="sort_price_toggle" options={[
            {
              label: 'Price',
              Icon: ArrowUpWideNarrow,
              value: 'price_asc',
              checked: selectedSort === 'price_asc',
              onChange: () => toggleSort('price_asc')
            },
            {
              label: 'Price',
              Icon: ArrowDownWideNarrow,
              value: 'price_desc',
              checked: selectedSort === 'price_desc',
              onChange: () => toggleSort('price_desc')
            }
          ]}>
            Sort by:
          </Toggle>
        </div>
      </header>

      <div className={styles['offersList__list']}>
        {!filteredOffers.length && (
          <p className={styles['offersList__empty']}>
            No offers match the selected filters. Please adjust your filters to see available offers.
          </p>
        )}

        {filteredOffers && filteredOffers.map((o) => {
          const metaData = [
            {
              label: 'Energy Type',
              value: format(o.metadata.energy_type) as string || 'N/A',
              Icon: Zap,
            },
            {
              label: 'Contract Duration',
              value: format(o.metadata.contract_duration) as string || 'N/A',
              Icon: ReceiptText
            },
            {
              label: 'Price Guarantee',
              value: format(o.metadata.price_guarantee) as string || 'N/A',
              Icon: ShieldCheck
            }
          ]

          return (
            <Card
              key={o.id}
              subtitle={o.provider_name}
              title={o.name}
              description={o.description}
              additionalData={metaData}
              price={selectedPriceMode === 'yearly' ? o.annual_price + ' €/year' : o.monthly_price + ' €/month'}
              priceTooltip={selectedPriceMode === 'yearly'
                ? 'Estimated Monthly Price : ' + o.monthly_price + ' €/month'
                : 'Estimated Annual Price : ' + o.annual_price + ' €/year'}
              link={{ label: 'View Offer', url: o.slug }}
            />
          )
        })}

        {shouldDisplayScroll &&
          <Button
            aria-label="Scroll to top"
            className={styles['offersList__scroll']}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUpToLine className={styles['offersList__scrollIcon']} />
          </Button>
        }
      </div>
    </section>
  )
}
