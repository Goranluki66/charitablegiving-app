export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { paymentId } = req.body;
  const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
    method: 'POST',
    headers: { 'Authorization': 'Key 1gmma4wv8faqbtqngsth6vkabvqchli6frfl54ddwzzprgsncg882pun17fbqgn7' }
  });
  const data = await response.json();
  return res.status(200).json(data);
}
