import { Layout, Spin } from 'antd';
import AppHeader from '@/components/layout/AppHeader/AppHeader';
import AppSider from '@/components/layout/AppSider/AppSider';
import AppContent from '@/components/layout/AppContent/AppContent';
import { useContext } from 'react';
import CryptoContext from '@/context/cryptoContext';

export default function AppLayout() {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
