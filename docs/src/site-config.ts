// configurable
const serverUrlLocalhost = 'http://localhost/_package__cleek/docs/';
const serverUrlProduction = 'https://cleek.cc/';

// computed
const isLocalhost = window.location.href.includes('http://localhost') || window.location.href.includes('https://localhost');
const serverUrl = isLocalhost ? serverUrlLocalhost : serverUrlProduction;

// exports
export {
  isLocalhost,
  serverUrl,
};
