import { Switch, Route } from 'react-router-dom';
import Layout from './components/GlobalLayout/Layout';
import Login from './containers/Authentication/Login';
import Register from './containers/Authentication/Register';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import Products from './containers/Products';
import ProductDetails from './containers/ProductDetails';
import ProductCreate from './containers/ProductCreate';
import ProductEdit from './containers/ProductEdit';
import Checkout from './containers/Checkout';
import Orders from './containers/Orders';

const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
  return isAllowed ? <Route {...props}/> : <Redirect to={redirectTo}/>;
};

const App = () => {
  const user = useSelector(state => state.userLogin.userInfo);

  return (
    <>
      <Layout>
        <Switch>
          <Route path={'/'} exact component={Products}/>
          <ProtectedRoute path={'/register'} component={Register} isAllowed={!user} redirectTo={'/'}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/product/:id'} exact component={ProductDetails}/>
          <ProtectedRoute
            path={'/admin/product-create'}
            exact
            component={ProductCreate}
            isAllowed={user && user.role === 'admin'}
            redirectTo={'/'}/>
          <ProtectedRoute
            path={'/admin/product/:id/edit'}
            exact
            component={ProductEdit}
            isAllowed={user && user.role === 'admin'}
            redirectTo={'/'}/>
          <ProtectedRoute path={'/checkout/:id'} component={Checkout} isAllowed={user} redirectTo={'/login'}/>
          <ProtectedRoute
            path={'/admin/orders'}
            component={Orders}
            isAllowed={user && user.role === 'admin'}
            redirectTo={'/'}/>
        </Switch>
      </Layout>
    </>
  );
};

export default App;
