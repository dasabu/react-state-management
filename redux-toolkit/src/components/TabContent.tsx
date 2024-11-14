import { Tabs } from 'antd'
import UserTable from './UserTable'
import BlogTable from './BlogTable'

const { TabPane } = Tabs

const TabContent = () => {
  return (
    <Tabs defaultActiveKey="user">
      <TabPane tab="User" key="user">
        <UserTable />
      </TabPane>
      <TabPane tab="Blog" key="blog">
        <BlogTable />
      </TabPane>
    </Tabs>
  )
}

export default TabContent
