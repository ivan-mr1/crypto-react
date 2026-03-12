import { Divider, Tag, Typography } from 'antd';
import CoinInfo from '../layout/CoinInfo/CoinInfo';

const CHANGE_METRICS = [
  { label: '1 hour', key: 'priceChange1h' },
  { label: '1 day', key: 'priceChange1d' },
  { label: '1 week', key: 'priceChange1w' },
];

export default function CoinInfoModal({ coin }) {
  return (
    <>
      <CoinInfo coin={coin} withSymbol />
      <Divider />

      <Typography.Paragraph>
        {CHANGE_METRICS.map(({ label, key }) => (
          <span key={key} style={{ marginRight: 8 }}>
            <Typography.Text strong>{label}: </Typography.Text>
            <Tag color={coin[key] > 0 ? 'green' : 'red'}>{coin[key]}%</Tag>
          </span>
        ))}
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Price: </Typography.Text>
        {coin.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        $
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: </Typography.Text>
        {coin.priceBtc}
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: </Typography.Text>
        {coin.marketCap.toLocaleString()}$
      </Typography.Paragraph>

      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>Contract Address: </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  );
}
