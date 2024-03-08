import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#E3F2FD", // Lighter shade of blue
        color: "#37474F", // Darker text color
        py: 4,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          "& .MuiIconButton-root": {
            color: '#546E7A', // Adjusted icon color for better visibility
            fontSize: '2rem',
            transition: 'color 0.4s, transform 0.4s',
            "&:hover": {
              color: 'goldenrod',
              transform: 'translateY(-5px)',
            }
          }
        }}
      >
        {/* Open Instagram link in a new tab */}
        <IconButton aria-label="Instagram" href="https://www.instagram.com/shubh_zarekar?igsh=NTc4MTIwNjQ2YQ==" target="_blank" >
            <InstagramIcon />
        </IconButton>
        <IconButton aria-label="X">
          <XIcon />
        </IconButton>
        <IconButton aria-label="Food Bank">
          <FoodBankIcon />
        </IconButton>
        <IconButton aria-label="WhatsApp" href="https://wa.me/1234567890" target="_blank">
          <WhatsAppIcon />
        </IconButton>
      </Box>
      <Typography variant='h5' sx={{ mt: 2 }}>
        All Rights Reserved &copy; ApliMessMenu
      </Typography>
    </Box>
  )
}
export default Footer;
