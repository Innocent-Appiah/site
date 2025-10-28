// netlify/functions/wechat-verify.js
const crypto = require('crypto');

exports.handler = async (event) => {
  // Only handle GET requests for verification
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  const query = event.queryStringParameters;
  const token = 'nq0JvcNVtKs6CGoJ'; // Your WeChat token
  
  // Get parameters
  const signature = query.signature;
  const timestamp = query.timestamp;
  const nonce = query.nonce;
  const echostr = query.echostr;

  // Verify signature
  const sorted = [token, timestamp, nonce].sort().join('');
  const calculatedSignature = crypto.createHash('sha1').update(sorted).digest('hex');

  if (calculatedSignature === signature) {
    // Return echostr directly for verification
    return {
      statusCode: 200,
      body: echostr
    };
  } else {
    return {
      statusCode: 403,
      body: 'Invalid signature'
    };
  }
};