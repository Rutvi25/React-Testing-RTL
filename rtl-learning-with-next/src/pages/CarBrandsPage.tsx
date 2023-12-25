import { useState } from 'react';
import { CarBrands } from '../components/SWR/CarBrands';
import { SwrConfig } from '../components/SWR/SWRConfig';

export default function CarBransPage() {
  const [country, setCountry] = useState<'Germany' | 'France' | 'Italy'>(
    'Germany'
  );
  return (
    <SwrConfig>
      <h1>Car App</h1>
      <button onClick={() => setCountry('Germany')}>Germany</button>
      <button onClick={() => setCountry('France')}>France</button>
      <button onClick={() => setCountry('Italy')}>Italy</button>

      <CarBrands country={country} />
    </SwrConfig>
  );
}
