// Simple test to check API response
fetch('http://localhost:3001/api/data?key=testimonials-data')
  .then(res => res.json())
  .then(data => {
    console.log('API Response:', JSON.stringify(data, null, 2))
  })
  .catch(err => {
    console.error('Error:', err)
  })