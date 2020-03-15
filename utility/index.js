// Sort desc
const sortDesc = (a, b) => b.length - a.length;

// Format date
const formatDate = date => {
  return date
    .toLocaleString('hr-HR', {
      dateStyle: 'short',
      timeStyle: 'short',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })
    .replace(/\./g, '')
    .replace(/ |:/g, '-');
};

module.exports = {
  sortDesc,
  formatDate
};
