import { Layout, Switch } from 'antd'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { toggleTheme } from '../redux/theme/theme.slice'

const { Header: AntHeader } = Layout

const Header = () => {
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector((state) => state.themeReducer.isDarkMode)

  return (
    <AntHeader
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: isDarkMode ? '#001529' : '#dbd9d9',
      }}
    >
      <h1 style={{ margin: 0 }}>My Dashboard</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>Dark Mode</span>
        <Switch checked={isDarkMode} onChange={() => dispatch(toggleTheme())} />
      </div>
    </AntHeader>
  )
}

export default Header
