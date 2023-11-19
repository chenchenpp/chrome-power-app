import {Form, Input, Select} from 'antd';
import AddableSelect from '/@/components/addable-select';
import {useEffect, useState} from 'react';
import type {DB} from '../../../../../../shared/types/db';
import {GroupBridge, TagBridge, ProxyBridge} from '#preload';
import {TAG_COLORS} from '/@/constants';

const {TextArea} = Input;

const WindowEditForm = ({
  formValue,
  formChangeCallback,
}: {
  formValue: DB.Window;
  formChangeCallback: (changed: DB.Window, data: DB.Window) => void;
}) => {
  const [form] = Form.useForm();
  const [groups, setGroups] = useState<DB.Group[]>([]);
  const [tags, setTags] = useState<DB.Tag[]>([]);
  const [proxies, setProxies] = useState<DB.Proxy[]>([]);

  useEffect(() => {
    if (JSON.stringify(formValue) === '{}') {
      form?.resetFields();
    } else {
      form?.setFieldsValue(formValue);
    }
  }, [formValue]);

  const fetchGroups = async () => {
    const groups = await GroupBridge?.getAll();
    setGroups(groups);
  };
  const fetchTags = async () => {
    const tags = await TagBridge?.getAll();
    setTags(tags);
  };
  const fetchProxies = async () => {
    const proxies = await ProxyBridge?.getAll();
    proxies.splice(0, 0, {id: undefined, ip: 'No Proxy'});
    setProxies(proxies);
  };

  useEffect(() => {
    fetchGroups();
    fetchTags();
    fetchProxies();
  }, []);

  const onAddGroup = async (name: string) => {
    const createdIds = await GroupBridge?.create({name});
    if (createdIds.length) {
      await fetchGroups();
      return true;
    } else {
      return false;
    }
  };
  const onAddTag = async (name: string) => {
    const createdIds = await TagBridge?.create({
      name,
      color: TAG_COLORS[tags.length % TAG_COLORS.length],
    });
    if (createdIds.length) {
      await fetchTags();
      return true;
    } else {
      return false;
    }
  };

  const filterProxyOption = (input: string, option?: DB.Proxy) => {
    return (option?.ip ?? '').toLowerCase().includes(input.toLowerCase());
  };

  type FieldType = DB.Window;

  return (
    <Form
      layout="horizontal"
      form={form}
      size="large"
      initialValues={formValue}
      onValuesChange={formChangeCallback}
      labelCol={{span: 6}}
    >
      <Form.Item<FieldType>
        label="Name"
        name="name"
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item<FieldType>
        name="group_id"
        label="Group"
      >
        <AddableSelect
          options={groups}
          onAddItem={onAddGroup}
          addBtnLabel="Add Group"
          placeholder="Please select group"
        ></AddableSelect>
      </Form.Item>

      <Form.Item<FieldType>
        name="tags"
        label="Tags"
      >
        <AddableSelect
          mode="multiple"
          options={tags}
          value={formValue.tags}
          onAddItem={onAddTag}
          addBtnLabel="Add Tag"
          placeholder="Please select tag"
        ></AddableSelect>
      </Form.Item>

      {/* <Form.Item<FieldType>
        name="ua"
        label="UserAgent"
      >
        <TextArea
          rows={4}
          placeholder="UserAgent"
        />
      </Form.Item> */}

      {/* <Form.Item<FieldType>
        name="cookie"
        label="Cookie"
      >
        <TextArea
          rows={4}
          placeholder="Cookie"
        />
      </Form.Item> */}

      <Form.Item<FieldType>
        name="remark"
        label="Remark"
      >
        <TextArea
          rows={4}
          placeholder="Remark"
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="proxy_id"
        label="Proxy"
      >
        <Select
          placeholder="Proxy"
          options={proxies}
          showSearch
          filterOption={filterProxyOption}
          fieldNames={{label: 'ip', value: 'id'}}
        ></Select>
      </Form.Item>
    </Form>
  );
};

export default WindowEditForm;
