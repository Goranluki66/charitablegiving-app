export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { paymentId } = req.body;
  
  try {
    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Key 1gmma4wv8faqbtqngsth6vkabvqchli6frfl54ddwzzprgsncg882pun17fbqgn7',
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

