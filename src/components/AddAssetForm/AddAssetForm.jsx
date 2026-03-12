import { useState } from 'react';
import {
  Select,
  Space,
  Divider,
  Form,
  Button,
  InputNumber,
  DatePicker,
  Result,
} from 'antd';
import { useCrypto } from '@/context/cryptoContext';
import CoinInfo from '../layout/CoinInfo/CoinInfo';

const validateMessages = {
  required: '${label} is required!',
  types: { number: '${label} is not a valid number!' },
  number: { range: '${label} must be between ${min} and ${max}' },
};

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedAsset, setSubmittedAsset] = useState(null);

  if (submitted && submittedAsset) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${submittedAsset.amount} of ${coin.name} by price ${submittedAsset.price}`}
        extra={[
          <Button type="primary" key="close" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        placeholder="Please select your coin."
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        options={crypto.map((c) => ({
          label: c.name,
          value: c.id,
          icon: c.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  const updateTotal = () => {
    const amount = form.getFieldValue('amount') || 0;
    const price = form.getFieldValue('price') || 0;
    form.setFieldsValue({ total: +(amount * price).toFixed(2) });
  };

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.toDate() ?? new Date(),
    };
    setSubmittedAsset(newAsset);
    setSubmitted(true);
    addAsset(newAsset);
  };

  return (
    <Form
      form={form}
      validateMessages={validateMessages}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{ price: coin?.price ? +coin.price.toFixed(2) : 0 }}
      onFinish={onFinish}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, type: 'number', min: 0 }]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          style={{ width: '100%' }}
          onChange={updateTotal}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber style={{ width: '100%' }} onChange={updateTotal} />
      </Form.Item>

      <Form.Item label="Date and time" name="date">
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
