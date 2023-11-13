import { useState , useEffect } from "react"

export default function useLocalstorage(initialValue , list) {
  const [value, setValue] = useState(function () {
    let storeData = localStorage.getItem("List");
    return storeData ? JSON.parse(storeData) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(list, JSON.stringify(value));
  }, [value , list]);


  return [value , setValue];

}
