import { Fragment, useEffect } from 'react';
import routes from './path';
import { Route, Routes } from 'react-router-dom';
import { useGetCartsQuery } from '../services/cart/index.hook';
import { CartActions } from '../redux/cart.slice';
import { useAppDispatch } from '../hooks/hooks';
import { AppDispatch } from '../app/store';

//? pages

const App = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { data, isLoading } = useGetCartsQuery();

  useEffect(() => {
    if (!isLoading) {
      dispatch(CartActions.updateTotalCart(data?.total_cart || 0));
    }
  }, [isLoading]);
  return (
    <Routes>
      {routes?.map((route: any, index: number) => {
        const Layout = route.layout === null ? Fragment : route.layout;
        const Page = route.component;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                {/* {route.path !== '/' ? (
                  <Suspense fallback={<div>Loading ...</div>}>
                    <Page />
                  </Suspense>
                ) : (
                  <Page />
                )} */}
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
};

export default App;
