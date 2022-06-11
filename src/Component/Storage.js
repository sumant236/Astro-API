const getData = () => {
  try{
      let data = localStorage.getItem("data")
      data = JSON.parse(data);
      return data;
  }
  catch(err){
    return undefined;
  }
}

const setData = (data) => {
    localStorage.setItem("data", JSON.stringify(data))
}

export {getData, setData};