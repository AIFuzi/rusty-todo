import { PlusCircleOutlined } from '@ant-design/icons';
import { FloatButton, Input, message, Modal, Radio, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { getErrorMessage } from '../../messages/message';

const AddTask = () => {
  const [taskModal, setTaskModal] = useState(false);
  const [priority, setPriority] = useState(1);
  const [taskName, setTaskName] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const openTaskModal = () => {
    setTaskModal(true);
  };

  const handleCancel = () => {
    setTaskModal(false);
  };

  const createTask = () => {
    if (taskName.trim() == '') {
      getErrorMessage('Task name empty', messageApi);
      return;
    }

    console.log(`${taskName} - ${priority}`);
  };

  return (
    <div>
      {contextHolder}
      <Modal
        open={taskModal}
        onCancel={handleCancel}
        onOk={createTask}
      >
        <Space direction='vertical' style={{ display: 'flex' }}>
          <Title level={4}>Add task</Title>
          <Input
            placeholder='Task name'
            showCount
            maxLength={50}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <Radio.Group
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <Radio.Button value='1'>Low priority</Radio.Button>
            <Radio.Button value='2'>Medium priority</Radio.Button>
            <Radio.Button value='3'>High priority</Radio.Button>
          </Radio.Group>
        </Space>
      </Modal>
      <FloatButton
        icon={<PlusCircleOutlined />}
        onClick={openTaskModal}
      />
    </div>
  );
};

export default AddTask;
