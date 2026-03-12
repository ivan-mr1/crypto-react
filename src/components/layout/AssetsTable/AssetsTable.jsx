import { useCrypto } from '@/context/cryptoContext';
import { Table } from 'antd';

export default function AssetsTable() {
  const { assets } = useCrypto();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Price $',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Total $',
      dataIndex: 'totalValue',
      sorter: (a, b) => a.totalValue - b.totalValue,
    },
  ];

  const data = assets.map((a) => ({
    key: a.id,
    name: a.name,
    price: a.price ?? 0,
    amount: a.amount ?? 0,
    totalValue: +(a.price ?? 0) * (a.amount ?? 0),
  }));

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      showSorterTooltip={{ title: 'Click to sort' }}
    />
  );
}
