
const axios = require('axios');

async function testAxios() {
    try {
        console.log("Testing Axios 6000:");
        const res = await axios.get('http://127.0.0.1:6000');
        console.log("Status:", res.status);
    } catch (e) {
        console.log("Error:", e.message);
        if (e.response) console.log("Response:", e.response.status);
    }
}
testAxios();
