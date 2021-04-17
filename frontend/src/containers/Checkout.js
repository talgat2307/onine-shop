import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getProductDetails, productSold } from '../store/actions/productActions';
import { Link } from 'react-router-dom';
import { createOrder } from '../store/actions/orderActions';
import { Alert } from '@material-ui/lab';
import { CREATE_ORDER_RESET } from '../store/constants/orderConstants';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2, 0),
  },
  product: {
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;',
    padding: '20px',
    marginBottom: theme.spacing(2),
  },
  titleAddress: {
    marginTop: theme.spacing(4),
  },
  btn: {
    marginTop: theme.spacing(2),
  },
}));

const Checkout = ({ match }) => {

  const [order, setOrder] = useState({
    town: '',
    street: '',
    postalCode: '',
  });

  const productId = match.params.id;

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { product } = useSelector(state => state.productDetails);
  const { success } = useSelector(state => state.createOrder);

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId, success]);

  useEffect(() => {
    dispatch({ type: CREATE_ORDER_RESET });
  }, [dispatch]);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setOrder(prevState => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(createOrder(order, product && product._id));
    dispatch(productSold(product && product._id));
  };

  const classes = useStyles();
  return (
    <Container>
      <Typography variant={'h4'}>Checkout</Typography>
      <Typography className={classes.title} variant={'h6'}>
        Hello {userInfo && userInfo.name}! Please fill the form below. You want to buy
      </Typography>

      <div className={classes.product}>
        <p>Title: <Link to={`/product/${product._id}`}>{product.title}</Link></p>
        <p>Price: ${product.price}</p>
        <p>Qty: 1</p>
      </div>

      {success && <Alert severity={'success'}>Order has been placed</Alert>}

      <Typography className={classes.titleAddress} variant={'h5'}>Address</Typography>
      <form onSubmit={submitFormHandler}>
        <TextField
          onChange={inputChangeHandler}
          value={order.town}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="town"
          label="Town"
          name="town"
        />
        <TextField
          onChange={inputChangeHandler}
          value={order.street}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="street"
          label="Street"
          name="street"
        />
        <TextField
          onChange={inputChangeHandler}
          value={order.postalCode}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="postalCode"
          label="Postal Code"
          name="postalCode"
        />
        <Button
          className={classes.btn}
          variant={'contained'}
          color={'primary'}
          type={'submit'}
          disabled={success}
        >
          Buy now
        </Button>
      </form>
    </Container>
  );
};

export default Checkout;