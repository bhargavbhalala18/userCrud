import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Component/layout/Navbar';
import MainTable from './Component/pages/MainTable'
import About from './Component/pages/About';
import AddUser from './Component/pages/AddUser';
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme.js'
import store from './store';
import './App.css'
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={MainTable}></Route>
            <Route exact path='/adduser' component={AddUser}></Route>
            <Route exact path='/about' component={About}></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
