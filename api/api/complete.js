export default async function handler(req, res) {
  const { paymentId } = req.body;
  
  const response = await fetch(
    `https://api.minepi.com/v2/payments/${paymentId}/approve`,
    {
      method: 'POST',
      headers: {
        'Authorization': 'Key 1gmma4wv8faqbtqngsth6vkabvqchli6frfl54ddwzzprgsncg882pun17fbqgn7
        'Content-Type': 'application/json'
      }
    }
  );
  
  const data = await response.json();
  res.status(200).json(data);
}
