import CoinInfoModal from '@/components/CoinInfoModal/CoinInfoModal';
import { useCrypto } from '@/context/cryptoContext';
import { Layout, Select, Space, Button, Modal } from 'antd';
import { useEffect, useState } from 'react';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        // placeholder="Please select your current mood."
        // defaultValue={['happy']}
        // onChange={(value) => {
        //   console.log(`selected ${value}`);
        // }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{' '}
            {option.data.label}
            {/* <span role="img" aria-label={option.data.label}>
              {option.data.emoji}
            </span>
            {`${option.data.label} (${option.data.desc})`} */}
          </Space>
        )}
      />
      <Button type="primary">Add asset</Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
    </Layout.Header>
  );
}
