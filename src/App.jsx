import { CryptoContextProvider } from '@/context/cryptoContext';
import AppLayout from './components/AppLayout/AppLayout';

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}
