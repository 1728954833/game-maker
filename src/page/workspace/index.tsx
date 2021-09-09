import './index.less';
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;

export interface IWorkSpacePageProps {}

const WorkSpacePage: React.FC<IWorkSpacePageProps> = props => {
    return (
        <Layout>
            <Header>Header</Header>
            <Layout className="content">
                <Sider>Sider</Sider>
                <Content>Content</Content>
                <Sider>Sider</Sider>
            </Layout>
        </Layout>
    );
};

export default WorkSpacePage;
