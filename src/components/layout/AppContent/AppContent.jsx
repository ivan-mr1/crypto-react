import { useCrypto } from '@/context/cryptoContext';
import { Layout, Typography } from 'antd';
import PortfolioChart from '../PortfolioChart/PortfolioChart';
import AssetsTable from '../AssetsTable/AssetsTable';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  const totalPortfolio = assets
    .reduce(
      (sum, asset) => sum + asset.amount * (cryptoPriceMap[asset.id] || 0),
      0,
    )
    .toFixed(2);

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Portfolio: {totalPortfolio}$
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
