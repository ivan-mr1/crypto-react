import { useContext } from 'react';
import { Layout, Card, Statistic, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '@/utils/utils';
import CryptoContext from '@/context/cryptoContext';

const siderStyle = {
  padding: '1rem',
};

const growColor = '#3f8600';
const dropColor = '#cf1322';

export default function AppSider() {
  const { assets } = useContext(CryptoContext);

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => {
        const color = asset.grow ? growColor : dropColor;
        const growPercent = asset.growPercent ?? 0;

        return (
          <Card key={asset.id} style={{ marginBottom: '1rem' }}>
            <Statistic
              title={capitalize(asset.id)}
              value={+asset.totalAmount.toFixed(2)}
              precision={2}
              style={{ color }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />

            <div
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Profit</span>
                <Tag color={color}>{growPercent}%</Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Asset Amount</span>
                <span>{asset.amount}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </Layout.Sider>
  );
}
