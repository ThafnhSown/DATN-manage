import {store} from './redux/store'
import { Provider } from "react-redux"
import { WebRoutes } from './routes';
import { history } from './utils/history';
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { SnackbarProvider } from "notistack"
import locale from 'antd/locale/vi_VN'
import dayjs from 'dayjs';
import 'dayjs/locale/vi'
dayjs.locale('vi-vn')

function App() {
  return (
  <ConfigProvider
  locale={locale}
  theme={{
    token: {
      colorFillContent: '#006D38',
      colorPrimary: '#006D38',
      borderRadius: 12,
    }
  }}>
   <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <SnackbarProvider maxSnack={3}>
            <WebRoutes />
          </SnackbarProvider>
        </BrowserRouter>
      </Provider>
   </PersistGate>
    
  </ConfigProvider>
    

    
  )
}

export default App;
