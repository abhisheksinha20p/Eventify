const axios = require('axios');

const GATEWAY_URL = 'http://localhost:8080';
const ORGANIZER_EMAIL = 'organizer@test.com';
const ORGANIZER_PASSWORD = 'password123';

async function testBackend() {
  try {
    console.log('--- Starting Backend Verification ---');

    // 1. Login/Register Organizer
    let token;
    try {
        console.log('Attempting login...');
        const loginRes = await axios.post(`${GATEWAY_URL}/auth/login`, {
            email: ORGANIZER_EMAIL,
            password: ORGANIZER_PASSWORD
        });
        token = loginRes.data.token;
        console.log('Login successful.');
    } catch (e) {
        if (e.response && e.response.status === 401 || e.response.status === 404) {
             console.log('User not found, registering...');
             const registerRes = await axios.post(`${GATEWAY_URL}/auth/register`, {
                 email: ORGANIZER_EMAIL,
                 password: ORGANIZER_PASSWORD,
                 role: 'ORGANIZER',
                 name: 'Test Organizer'
             });
             token = registerRes.data.token;
             console.log('Registration successful.');
        } else {
            throw e;
        }
    }

    // 2. Create Event (With Image and Location)
    console.log('Creating event...');
    const eventPayload = {
        title: 'Test Event with Image',
        description: 'Testing the new fields',
        imageUrl: 'https://example.com/test.jpg',
        city: 'New York',
        location: {
            address: '123 Test St',
            lat: 40.7,
            lng: -74.0
        },
        type: 'UNPAID',
        slots: [{
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + 3600000).toISOString(),
            capacity: 50,
            price: 0
        }]
    };

    const createRes = await axios.post(`${GATEWAY_URL}/events`, eventPayload, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const eventId = createRes.data._id;
    console.log(`Event created. ID: ${eventId}`);

    // 3. Verify Public Feed (Gateway Rewrite)
    console.log('Fetching public feed...');
    const feedRes = await axios.get(`${GATEWAY_URL}/events/public?city=New York`);
    const foundInFeed = feedRes.data.find(e => e._id === eventId);
    if (foundInFeed) {
        console.log('Event found in public feed.');
    } else {
        console.error('Event NOT found in public feed.');
    }

    // 4. Verify Event Details (Gateway Rewrite + Image Field)
    console.log('Fetching event details...');
    const detailsRes = await axios.get(`${GATEWAY_URL}/events/${eventId}`, {
         headers: { Authorization: `Bearer ${token}` }
    });

    if (detailsRes.data.imageUrl === eventPayload.imageUrl) {
        console.log('Image URL verified.');
    } else {
        console.error('Image URL mismatch.');
    }

    if (detailsRes.data.location && detailsRes.data.location.address === eventPayload.location.address) {
        console.log('Location address verified.');
    } else {
        console.error('Location address mismatch.');
    }

    console.log('--- Verification Complete ---');

  } catch (error) {
    console.error('Test failed:', error.message);
    if (error.response) {
        console.error('Response data:', error.response.data);
    }
  }
}

testBackend();
