import axios from "axios";
export default async function getData(handle) {
  const query = await axios.get(
    `https://codeforces.com/api/user.rating?handle=${handle}`
  );
  if (query.data.status != "OK") {
    return [-1];
  } else if (query.data.result.length == 0) {
    return [];
  }
  return query.data.result;
}
