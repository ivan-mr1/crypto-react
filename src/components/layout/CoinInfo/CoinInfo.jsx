export default function CoinInfo({ coin, withSymbol }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <img src={coin?.icon} alt={coin?.name ?? ''} width={40} />
      <h2 style={{ margin: 0 }}>
        {withSymbol && coin?.symbol ? `(${coin.symbol}) ` : ''}
        {coin?.name ?? 'Unknown'}
      </h2>
    </div>
  );
}
