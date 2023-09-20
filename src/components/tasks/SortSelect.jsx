import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Link from 'antd/es/typography/Link';
import React from 'react';

const SortSelect = () => {
  const items = [
    {
      key: '1',
      label: 'Complete',
    },
    {
      key: '2',
      label: 'Priority',
    },
    {
      key: '3',
      label: 'Name',
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Link>
        <Space>
          Sort by
          <DownOutlined />
        </Space>
      </Link>
    </Dropdown>
  );
};

export default SortSelect;
