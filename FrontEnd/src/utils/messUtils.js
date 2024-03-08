// messUtils.js

// Simulated mess data
const messData = [
    { id: 1, name: 'Mess A', rating: 4.5, latitude: 40.7128, longitude: -74.0060 },
    { id: 2, name: 'Mess B', rating: 4.2, latitude: 34.0522, longitude: -118.2437 },
    // Add more mess data as needed
  ];
  
  // Utility function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (coord1, coord2) => {
    const { latitude: lat1, longitude: lon1 } = coord1;
    const { latitude: lat2, longitude: lon2 } = coord2;
  
    const earthRadius = 6371; // Radius of the Earth in kilometers
  
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadius * c; // Distance in kilometers
  
    return distance;
  };
  
  // Utility function to get the nearest mess based on user's location
  export const getNearestMess = (userLocation) => {
    let nearestMess = null;
    let minDistance = Infinity;
  
    messData.forEach(mess => {
      const distance = calculateDistance(userLocation, { latitude: mess.latitude, longitude: mess.longitude });
      if (distance < minDistance) {
        minDistance = distance;
        nearestMess = mess;
      }
    });
  
    return nearestMess;
  };
  