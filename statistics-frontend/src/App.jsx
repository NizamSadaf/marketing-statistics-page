import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button, Box, CssBaseline } from '@mui/joy';

const App = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  // Fetch visitor count on load
  useEffect(() => {
    fetchVisitorCount();
  }, []);

  const fetchVisitorCount = async () => {
    try {
      const response = await axios.get('http://localhost:3000/visitors/count');
      setVisitorCount(response.data.count);
    } catch (error) {
      console.error('Error fetching visitor count:', error);
    }
  };

  const addVisitor = async () => {
    try {
      await axios.post('http://localhost:3000/visitors');
      fetchVisitorCount(); // Refresh count after adding visitor
    } catch (error) {
      console.error('Error adding visitor:', error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh"
      >
        <Typography level="h1">Visitor Counter</Typography>
        <Typography level="h2">Total Visitors: {visitorCount}</Typography>
        <Button onClick={addVisitor} color="primary" size="lg">
          Add Visitor
        </Button>
      </Box>
    </>
  );
};

export default App;
