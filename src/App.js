import {store} from './redux/store'
import { Provider } from "react-redux"
import { WebRoutes } from './routes';
import { history } from './utils/history';
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { SnackbarProvider } from "notistack"

function App() {
  return (
  <ConfigProvider
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
