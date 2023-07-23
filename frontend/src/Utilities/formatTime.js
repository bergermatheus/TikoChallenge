const formatTime = (timeString) => {
  const date = new Date(timeString);
  const hours = String(date.getUTCHours()).padStart(2, '0'); // Use getUTCHours() instead of getHours()
  const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Use getUTCMinutes() instead of getMinutes()
  const day = String(date.getUTCDate()).padStart(2, '0'); // Use getUTCDate() instead of getDate()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Use getUTCMonth() instead of getMonth()
  const year = String(date.getUTCFullYear()).substr(-2); // Use getUTCFullYear() instead of getFullYear()

  return `${hours}:${minutes} ${day}-${month}-${year}`;
};

export default formatTime;