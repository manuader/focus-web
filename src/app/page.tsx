import { Hero } from '@/components/sections/Hero';
import { Ticker } from '@/components/sections/Ticker';
import { Manifiesto } from '@/components/sections/Manifiesto';
import { Valores } from '@/components/sections/Valores';
import { Superposicion } from '@/components/sections/Superposicion';
import { Refraccion } from '@/components/sections/Refraccion';
import { Umbral } from '@/components/sections/Umbral';
import { Servicios } from '@/components/sections/Servicios';
import { Trabajo } from '@/components/sections/Trabajo';
import { Foco } from '@/components/sections/Foco';
import { Contacto } from '@/components/sections/Contacto';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Ticker />
        <Manifiesto />
        <Valores />
        <Superposicion />
        <Refraccion />
        <Umbral />
        <Servicios />
        <Trabajo />
        <Foco />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
