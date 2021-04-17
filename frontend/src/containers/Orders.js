import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import Loader from '../components/Loader';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { completeOrder, getOrders } from '../store/actions/orderActions';
import { DataGrid } from '@material-ui/data-grid';
import { productOrderCancel } from '../store/actions/productActions';

const useStyles = makeStyles((theme) => ({
  tableCon: {
    marginTop: theme.spacing(4),
  },
  table: {
    minWidth: 650,
    border: '1px solid #00000',
  },
  alert: {
    marginTop: theme.spacing(2),
  },
}));

const Orders = () => {

  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(state => state.orderList);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'customer', headerName: 'CUSTOMER NAME', width: 150 },
    { field: 'town', headerName: 'TOWN', width: 150 },
    { field: 'street', headerName: 'STREET', width: 150 },
    { field: 'postalCode', headerName: 'POSTAL CODE', width: 150 },
    {
      field: 'details',
      headerName: 'DETAILS',
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant={'outlined'} component={Link}
            to={`/product/${params.row.productId}`}
          >
            Details
          </Button>
        </>
      ),
    },
    {
      field: 'cancelOrder',
      headerName: 'CANCEL ORDER',
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            variant={'outlined'}
            color={'secondary'}
            onClick={() => {
              dispatch(productOrderCancel(params.row.productId));
              dispatch(completeOrder(params.row.orderId));
            }}
          >
            Cancel Order
          </Button>
        </>
      ),
    },
    {
      field: 'completeOrder',
      headerName: 'COMPLETE ORDER',
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            color={'primary'}
            variant={'outlined'}
            onClick={() => dispatch(completeOrder(params.row.orderId))}
          >
            Complete Order
          </Button>
        </>
      ),
    },
  ];

  const rows = orders.map((order, i) => ({
    id: i + 1,
    orderId: order._id,
    productId: order.product,
    customer: order.user.name,
    town: order.town,
    street: order.street,
    postalCode: order.postalCode,
  }));

  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h5">
        Order list
      </Typography>
      {loading ? <Loader open={loading}/> :
        error ? <Alert className={classes.alert} severity={'error'}>{error.error}</Alert> :
          (orders && orders.length === 0) ?
            <Alert className={classes.alert} severity={'info'}>No orders added yet</Alert>
            :
            <>
              <DataGrid
                className={classes.tableCon}
                pageSize={8}
                autoHeight
                rows={rows}
                columns={columns.map(column => ({
                  ...column,
                  disableClickEventBubbling: true,
                }))}
              />
            </>}
    </Container>
  );
};

export default Orders;