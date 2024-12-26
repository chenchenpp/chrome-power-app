import {useEffect, useState} from 'react';
import {Layout, Typography, message} from 'antd';
import {Outlet, Route, Routes, useLocation} from 'react-router-dom';
import dayjs from 'dayjs';
import Navigation from '../navigation';
import {useRoutes, useRoutesMap} from '../../routes';
import Header from '../header';
import {CommonBridge} from '#preload';
import {MESSAGE_CONFIG} from '../../constants';

const {Title} = Typography;

const {Content, Sider} = Layout;

dayjs.locale('zh-cn');

const LayoutRoute = () => {
  const routes = useRoutes();
  const routesMap = useRoutesMap();
  const [isVisible, setIsVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage(MESSAGE_CONFIG);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100); // 延迟显示组件
  }, []);

  const location = useLocation();

  return (
    <Layout className={`h-full fade-in ${isVisible ? 'visible' : ''}`}>
      {contextHolder}
      <Header></Header>

      <Layout>
        <Sider
          width={164}
          className="sider"
        >
          <Navigation></Navigation>
        </Sider>
        <Content className="content">
          <Title
            className="mt-0"
            level={2}
          >
            {routesMap[location.pathname]?.name}
          </Title>
          <main>
            <Outlet></Outlet>
          </main>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutRoute;
