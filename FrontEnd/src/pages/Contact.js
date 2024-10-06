import React from "react";
import Layout from "./../components/Layout/Layout";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import '../styles/Contact.css'; // Import custom CSS for additional styling
// import contactImage from "../assets/contact.jpg";
import contact from '../Images/contact.jpg';


const Contact = () => {
  return (
    <Layout>
      <Box className="contact-container" style={{backgroundImage: `url(${contact})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <Typography variant="h3" className="contact-heading">
          Get In Touch With Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <div className="contact-info">
              <Typography variant="h4" className="contact-info-title">
                Contact Information
              </Typography>
              <ContactItem
                icon={<SupportAgentIcon className="contact-item-icon" />}
                label="Customer Support"
                value="1800-00-0000 (toll-free)"
              />
              <ContactItem
                icon={<MailIcon className="contact-item-icon" />}
                label="Email"
                value="shubhamzarekar33@gmail.com"
              />
              <ContactItem
                icon={<CallIcon className="contact-item-icon" />}
                label="Phone"
                value="7276386900"
              />
              <ContactItem
                icon={<LocationOnIcon className="contact-item-icon" />}
                label="Address"
                value="123 Main St, City, Country"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="contact-form">
              <Typography variant="h4" className="contact-form-title">
                Send us a message
              </Typography>
              <form>
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="message"
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained" color="primary">
                  Send Message
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

const ContactItem = ({ icon, label, value }) => {
  return (
    <div className="contact-item">
      {icon}
      <div>
        <Typography variant="h6" className="contact-item-label">
          {label}
        </Typography>
        <Typography>{value}</Typography>
      </div>
    </div>
  );
};

export default Contact;
