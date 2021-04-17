import React from 'react';
import { Box, Typography } from '@material-ui/core';

const Footer = () => {
  return (
    <Box display='flex' justifyContent='center' marginBottom='30px'>
      <Typography variant='body2' color="textSecondary">
        Copyright &copy; Online shop {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;