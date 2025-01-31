import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button, Box, CssBaseline, Table, Sheet } from '@mui/joy';

const App = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [visitorStats, setVisitorStats] = useState([]);
  const [userIp, setUserIp] = useState('');

  // Fetch visitor count and visitor stats on load
  useEffect(() => {
    fetchVisitorCount();
    fetchVisitorsByCountry();
    fetchUserIP();
  }, []);

  const fetchUserIP = async () => {
    try {
      const response = await axios.get('https://api64.ipify.org?format=json');
      setUserIp(response.data.ip);
    } catch (error) {
      console.error('Error fetching user IP:', error);
    }
  };

  const fetchVisitorCount = async () => {
    try {
      const response = await axios.get('http://localhost:3000/visitors/count');
      setVisitorCount(response.data.count);
    } catch (error) {
      console.error('Error fetching visitor count:', error);
    }
  };

  const fetchVisitorsByCountry = async () => {
    try {
      const response = await axios.get('http://localhost:3000/visitors/locations');
      setVisitorStats(response.data);
      console.log(visitorStats);
    } catch (error) {
      console.error('Error fetching visitors by country:', error);
    }
  };

  const addVisitor = async () => {
    try {
      await axios.post('http://localhost:3000/visitors', { ip: userIp });
      fetchVisitorCount(); // Refresh count after adding visitor
      fetchVisitorsByCountry(); // Refresh country stats
    } catch (error) {
      console.error('Error adding visitor:', error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography level="h1">Visitor Counter</Typography>
        <Typography level="h2">Total Visitors: {visitorCount}</Typography>
        <Button onClick={addVisitor} color="primary" size="lg" disabled={!userIp}>
          Add Visitor
        </Button>

        {/* Display Visitor Stats by Country */}
        <Sheet sx={{ width: '50%', mt: 3, p: 2 }}>
          <Typography level="h3" textAlign="center">Visitors by Country</Typography>
          <Table borderAxis="both">
            <thead>
              <tr>
                <th>Country</th>
                <th>Visitors</th>
              </tr>
            </thead>
            <tbody>
              {visitorStats.locations.map((countryData, index) => (
                <tr key={index}>
                  <td>{countryData.country}</td>
                  <td>{countryData.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </Box>
    </>
  );
};

export default App;
