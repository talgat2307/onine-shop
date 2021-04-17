import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Loader from '../components/Loader';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import { getProductList } from '../store/actions/productActions';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tableCon: {
    marginTop: theme.spacing(4),
  },
  table: {
    minWidth: 750,
    border: '1px solid #00000',
  },
  alert: {
    marginTop: theme.spacing(2),
  },
}));

const Products = () => {

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { products, loading, error } = useSelector(state => state.productList);

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'title',
      headerName: 'TITLE',
      width: 500,
      renderCell: (params) => (
        <Link to={`product/${params.row.productId}`}>{params.row.title}</Link>
      ),
    },
    { field: 'price', headerName: 'PRICE $', width: 250 },
    { field: 'stock', headerName: 'STOCK', width: 250 },
  ];

  const rows = products.map((product, i) => ({
    id: i + 1,
    productId: product._id,
    title: product.title,
    price: product.price,
    stock: product.countInStock,
  }));

  const classes = useStyles();
  return (
    <Container>
      <div className={classes.header}>
        <Typography variant="h5">
          Product List
        </Typography>
        {userInfo && userInfo.role === 'admin' &&
        <Button
          component={Link}
          to={'/admin/product-create'}
          variant={'outlined'}
          color={'primary'}
        >
          + Create Product
        </Button>}
      </div>
      {loading ? <Loader open={loading}/>
        :
        error ? <Alert className={classes.alert} severity={'error'}>{error.error}</Alert>
          :
          products && products.length === 0 ? <Alert className={classes.alert} severity={'info'}>No products added yet</Alert>
            :
            (
              <DataGrid
                className={classes.tableCon}
                pageSize={10}
                autoHeight
                rows={rows}
                columns={columns.map(column => ({
                  ...column,
                  disableClickEventBubbling: true,
                }))}
              />
            )}
    </Container>
  );
};

export default Products;