import './index.less';
import { Layout } from 'antd';
import FileLoader from '../../component/FileLoader';
import Canvas from '../../component/Canvas';
const { Header, Sider, Content } = Layout;

export interface IWorkSpacePageProps {}

const WorkSpacePage: React.FC<IWorkSpacePageProps> = props => {
    return (
        <Layout>
            <Header>Header</Header>
            <Layout className="content">
                <Sider width="324">
                    <FileLoader />
                </Sider>
                <Content>
                    <Canvas />
                </Content>
                <Sider>Sider</Sider>
            </Layout>
        </Layout>
    );
};

export default WorkSpacePage;
