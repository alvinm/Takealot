import { Geolocation } from "@capacitor/geolocation";
import * as XLSX from "xlsx";
export const getLocation = async () =>{
    var position = await Geolocation.getCurrentPosition();
    var setLocation:any = []
    setLocation.push({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });;
    return setLocation[0]
}
export const addCommas = (number: any) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/,(\d{2})$/, '.$1');
};
export const HighchartsDate = (date:any)=> {
  const parsedDate:any = date instanceof Date ? date : new Date(date);

  if (isNaN(parsedDate)) {
    console.log('Invalid date provided');
  }
    // Return timestamp (milliseconds since epoch)
    return parsedDate.getTime();
}
export const formatDate = (dated:any)=> {
  const dateString = dated;
  const date = new Date(dateString);
  const year = date.getFullYear(); // Get the full year
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, pad with leading zero
  const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero
  let final_date:any = (`${year}-${month}-${day}`).substring(0,10)
  return final_date
  //return `${year}-${month}-${day}`; // Combine into yyyy-MM-dd
}
export const formatDateFromMillis = (ms:any) => {
  const date = new Date(ms);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export const formatDateTime = (isoString:any) => {
const date = new Date(isoString);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
const day = String(date.getDate()).padStart(2, "0");
const hours = String(date.getHours()).padStart(2, "0");
const minutes = String(date.getMinutes()).padStart(2, "0");

// Combine into desired format
return `${year}-${month}-${day} ${hours}:${minutes}`;
};
export function isNumeric(str:any){
//console.log("test:"+isNaN(str/1))
if(!isNaN(str/1) && str != ' ' && str != ''){
    return true
}else{
    return false
}
}
export const exportToExcel = (data:any) => {
// Step 1: Convert the array to a worksheet
const worksheet = XLSX.utils.json_to_sheet(data);

// Step 2: Create a new workbook and append the worksheet
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// Step 3: Write the workbook and trigger the download
XLSX.writeFile(workbook, "ExportedData.xlsx");
};
export function isDate(s:any){
var bits = s.split('-');
console.log(bits[0] + '/' + bits[1] + '/' + bits[2])
var d = new Date(bits[0] + '/' + bits[1] + '/' + bits[2]);
return !!(d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[2]));
}

export const callProductImage = async (props:any) =>{
  let stream:any = ''
  stream = await fetch(props.state.secondary_host+'getImage?dbo=select_product_image'+
      "&barcode_id="+props.barcode
  )
  
  const blob  = await stream.blob();
  const url:string = URL.createObjectURL(blob);
  console.log(url)
  return url
}

export function ArrayHasValue(arr:any, key:any, value:any) {
  // Ensure input is valid
  if (!Array.isArray(arr) || !key) return false;

  // Check each object in the array
  return arr.some(item => item[key] === value);
}