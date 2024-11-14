import { ConfigProvider, Layout } from 'antd'
import Header from './components/Header'
import TabContent from './components/TabContent'
import { useAppSelector } from './redux/hooks'
const { Content } = Layout

const App = () => {
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode)
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: isDarkMode ? '#576e83' : '#001529',
          colorBgBase: isDarkMode ? '#141414' : '#ffffff',
          colorTextBase: isDarkMode ? '#ffffff' : '#000000',
        },
      }}
    >
      <Layout className={isDarkMode ? 'dark-mode' : ''}>
        <Header />
        <Content style={{ padding: '20px' }}>
          <TabContent />
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
