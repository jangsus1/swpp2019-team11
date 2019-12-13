

const CSVconverter = (func, data) => {
  console.log(data)
  let return_data = {};
  const col_num = data.item.length;
  const row_num = data.item[0].response.length + 1;
  const return_array = Array(row_num);
  for (let i = 0; i < row_num; i++) return_array[i] = Array(col_num);
  data.item.map((item, index) => {
    return_array[0][index] = item.title;
    item.response.map((response, res_index) => {
      console.log(response.respondant_number)
      console.log(return_array)
      if(response.respondant_number){
        return_array[response.respondant_number][index] = response.content;
      }
      else{
        return_array[res_index+1][index] = response.content;
      }
      return response;
    });
    return item;
  });
  return_data = return_array.map((e) => e.join(',')).join('\n');
  func(return_data);
};

export default CSVconverter;
