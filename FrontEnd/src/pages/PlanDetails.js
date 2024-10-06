import React, { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/auth/LogoutButton'; // Import LogoutButton component
import '../styles/PlanDetails.css';

const PlanDetails = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0(); // Destructure isAuthenticated, user, and loginWithRedirect

  // Redirect to login if not authenticated or user is not available
  useEffect(() => {
    if (!isAuthenticated || !user) {
      loginWithRedirect(); 
    }
  }, [isAuthenticated, user, loginWithRedirect]);

  // Dummy plan information
  const planInfo = {
    planName: "Gold Plan",
    price: "$99",
    features: ["Unlimited meals", "Access Menu", "Personal Details"],
    owner: "Ravi  Shinde", // Assuming John Doe is the owner
  };

  // Check if user is available before rendering user info
  const renderUserInfo = () => {
    if (!user) return null;
    return (
      <div className="user-info">
        <img className="user-avatar" src={user.picture} alt="User Profile" />
        <div className="profile-text">
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="plan-details-container">
        <div className="user-profile">
          <div className="profile-section">
            {renderUserInfo()}
            <LogoutButton /> {/* Use the LogoutButton component */}
          </div>
        </div>
        <div className="plan-details">
          <div className="plan-details-item">
            <h1>{planInfo.planName}</h1>
            <p>Owner: {planInfo.owner}</p>
            <p>Price: {planInfo.price}</p>
          </div>
          <div className="plan-details-item">
            <h2>Features:</h2>
            <ul className="feature-list">
              {planInfo.features.map((feature, index) => (
                <li key={index} className="feature-list-item">{feature}</li>
              ))}
            </ul>
          </div>
          <div className="plan-details-item">
            {/* Add any additional plan details here */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlanDetails;
