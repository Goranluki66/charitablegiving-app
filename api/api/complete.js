export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { paymentId } = req.body;
  const API_KEY = '1gmma4wv8faqbtqngsth6vkabvqchli6frfl54ddwzzprgsncg882pun17fbqgn7';
  
  try {
    // First get payment details
    const getRes = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}`,
      {
        headers: { 'Authorization': `Key ${API_KEY}` }
      }
    );
    const payment = await getRes.json();
    
    // If already has txid, complete it
    if (payment.transaction && payment.transaction.txid) {
      const completeRes = await fetch(
        `https://api.minepi.com/v2/payments/${paymentId}/complete`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Key ${API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ txid: payment.transaction.txid })
        }
      );
      return res.status(200).json(await completeRes.json());
    }
    
    // Otherwise approve
    const approveRes = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method: 'POST',
        headers: { 'Authorization': `Key ${API_KEY}` }
      }
    );
    return res.status(200).json(await approveRes.json());
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
