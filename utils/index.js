export const getRandomBG = () => {
  const colors = [
    "#1E88E5", "#8E24AA", "#43A047", "#F4511E",
    "#FDD835", "#00ACC1", "#D81B60", "#3949AB",
    "#00897B", "#6D4C41", "#C2185B", "#7CB342"
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex]; // ✅ Return hex directly
};

export const getAvatarName = (name) => {
  if (!name || !name.trim()) return null;  // return null so N/A works

  return name
    .trim()
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};



export const formatDate=(date)=>{
  const months= [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October','November', 'December'
  ];
  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2,'0')}, ${date.getFullYear()}`
}


export const formateDateAndTIme = (date) => {
  if (!date) return "Invalid Date";

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) return "Invalid Date";

  return dateObj.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
};
