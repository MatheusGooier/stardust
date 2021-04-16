export default function returnStrDateFromObj(date) {
  let dateObj = new Date(date);
  let month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  let day = dateObj.getUTCDate().toString().padStart(2, "0");
  let year = dateObj.getUTCFullYear();

  if (date) {
    dateObj = new Date(date);
  } else {
    dateObj = new Date();
  }

  month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  day = dateObj.getUTCDate().toString().padStart(2, "0");
  year = dateObj.getUTCFullYear();
  return day + "/" + month + "/" + year;
}
