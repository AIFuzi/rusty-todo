import { PlusCircleOutlined } from '@ant-design/icons';
import { FloatButton, Input, message, Modal, Radio, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import { getErrorMessage } from '../../messages/message';
import { invoke } from '@tauri-apps/api';

const AddTask = ({ projectId, tasks, newTask }) => {
  const [taskModal, setTaskModal] = useState(false);
  const [priority, setPriority] = useState('Low');
  const [taskName, setTaskName] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [tag, setTag] = useState('');

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  const openTaskModal = () => {
    setTaskModal(true);
  };

  const handleCancel = () => {
    setTaskModal(false);
  };

  const createTask = async () => {
    if (taskName.trim() == '') {
      getErrorMessage('Task name empty', messageApi);
      return;
    }

    await invoke('create_task', {
      projectId: projectId,
      taskName: tag == '' ? taskName : `[${tag}] - ${taskName}`,
      priority: priority,
    });

    newTask([...tasks, {
      task_name: tag == '' ? taskName : `[${tag}] - ${taskName}`,
      priority: priority,
    }]);

    setPriority('Low');
    setTaskName('');
    setTag('');

    setTaskModal(false);
  };

  const loadTasks = async () => {
    newTask(await invoke('get_tasks_by_proj_id', { projectId: projectId }));
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
            value={taskName}
            placeholder='Task name'
            showCount
            maxLength={50}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <Radio.Group
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <Radio.Button value='Low'>Low priority</Radio.Button>
            <Radio.Button value='Medium'>Medium priority</Radio.Button>
            <Radio.Button value='High'>High priority</Radio.Button>
          </Radio.Group>
          <Title level={5}>Tags:</Title>
          <Radio.Group value={tag} onChange={(e) => setTag(e.target.value)}>
            <Radio.Button value=''>None</Radio.Button>
            <Radio.Button value='NEW'>NEW</Radio.Button>
            <Radio.Button value='BUG'>BUG</Radio.Button>
            <Radio.Button value='UPDATE'>UPDATE</Radio.Button>
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
