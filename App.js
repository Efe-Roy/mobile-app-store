import Navigation from './navigation';
import { Provider } from 'react-redux'
import store from './redux/store';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

