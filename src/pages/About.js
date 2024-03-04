import React from "react";
import Layout from "./../components/Layout/Layout";
import { Box, Typography, Grid, Button, IconButton } from "@mui/material";
import '../styles/About.css'; // Import custom CSS for additional styling
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const About = () => {
  const [rating, setRating] = React.useState(4.5); // Set initial rating to 4.5

  // Disable rating click
  const handleRatingClick = () => {
    // Do nothing
  };

  return (
    <Layout>
      <Box className="container">
        <Typography variant="h2" className="heading">
          <span className="gradient-text">Discover Delicious Meals</span>
        </Typography>
        <Typography variant="h5" className="subheading">
          Explore our diverse menu options
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box className="content-box">
              <Typography variant="body1" className="content-text">
                At our mess, we strive to provide a diverse and delicious
                selection of meals to satisfy every palate. From hearty
                breakfasts to fulfilling dinners, our menu is designed to keep
                you energized throughout the day.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="content-box">
              <Typography variant="body1" className="content-text">
                Our chefs source the freshest ingredients to create
                mouthwatering dishes that cater to various dietary
                preferences. Whether you're a vegetarian, vegan, or a meat
                lover, there's something on our menu for everyone.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="h5" className="section-heading">
            About Us
          </Typography>
          <Typography variant="body1" className="about-text">
            We are dedicated to helping you find the best menu options for
            your meals. With our diverse selection of dishes and attention to
            quality ingredients, we ensure that every dining experience is
            satisfying and enjoyable. Whether you're looking for a hearty
            breakfast to start your day or a fulfilling dinner to end it, we've
            got you covered.
          </Typography>
          <Typography variant="body1" className="about-text">
            Our mission is to make it easy for you to discover delicious meals
            that suit your preferences and dietary needs. From traditional
            favorites to innovative creations, our menu has something for
            everyone. We take pride in offering a variety of options to cater to
            different tastes and lifestyles.
          </Typography>
          <Typography variant="h6" className="section-heading-cleint">
            Client Reviews
          </Typography>
          <Box className="review-container">
            <Box className="review">
              <Typography variant="body1" className="review-text">
                "Great food and excellent service! I highly recommend trying
                their special dishes."
              </Typography>
              <Typography variant="body2" className="client-name">
                - Pankaj
              </Typography>
              <div className="rating">
                {[...Array(5)].map((_, index) => (
                  <IconButton
                    key={index}
                    onClick={handleRatingClick}
                    className={index < rating ? "star-filled" : ""}
                  >
                    <FaStar />
                  </IconButton>
                ))}
              </div>
            </Box>
            <Box className="review">
              <Typography variant="body1" className="review-text">
                "Amazing experience! The menu offers a wide range of options
                and everything is delicious."
              </Typography>
              <Typography variant="body2" className="client-name">
                - Ravi
              </Typography>
              <div className="rating">
                {[...Array(5)].map((_, index) => (
                  <IconButton
                    key={index}
                    onClick={handleRatingClick}
                    className={index < rating ? "star-filled" : ""}
                  >
                    <FaStar />
                  </IconButton>
                ))}
              </div>
            </Box>
            <Box className="review">
              <Typography variant="body1" className="review-text">
                "Excellent service and food quality! Highly recommended."
              </Typography>
              <Typography variant="body2" className="client-name">
                - Aditya
              </Typography>
              <div className="rating">
                {[...Array(5)].map((_, index) => (
                  <IconButton
                    key={index}
                    onClick={handleRatingClick}
                    className={index < rating ? "star-filled" : ""}
                  >
                    <FaStar />
                  </IconButton>
                ))}
              </div>
            </Box>
            <Box className="review">
              <Typography variant="body1" className="review-text">
                "Best place for delicious meals! I visit regularly and never
                disappointed."
              </Typography>
              <Typography variant="body2" className="client-name">
                - Vishal
              </Typography>
              <div className="rating">
                {[...Array(5)].map((_, index) => (
                  <IconButton
                    key={index}
                    onClick={handleRatingClick}
                    className={index < rating ? "star-filled" : ""}
                  >
                    <FaStar />
                  </IconButton>
                ))}
              </div>
            </Box>
          </Box>
        </Box>
        <Link to="/mess">
          <Button variant="contained" className="cta-button">
            View Menu
          </Button>
        </Link>
      </Box>
    </Layout>
  );
};

export default About;
