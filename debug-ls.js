
console.log('Checking global localStorage...');
try {
  console.log('Type of localStorage:', typeof localStorage);
  console.log('Value of localStorage:', localStorage);
} catch (e) {
  console.log('Accessing localStorage threw error:', e.message);
}

if (typeof global.localStorage !== 'undefined') {
    console.log('Found on global object');
} else {
    console.log('Not on global object');
}
