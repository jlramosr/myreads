function shelfKeyToTitle(name) {
  if (!name) return '';
  let title = name.replace(/([A-Z])/g, ' $1').trim(); //space before capital letter
  title = title.charAt(0).toUpperCase() + title.slice(1); //capitalize first letter
  return title;
}

export { shelfKeyToTitle };