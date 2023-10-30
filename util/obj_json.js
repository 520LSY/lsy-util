function obj_json(data) {
  let newData = [];
  // 获取所有
  let reg = /^[A-Z1-9]+$/;
  let reg2 = /^[A]{1}[1-9]+$/;
  let letter = "";
  //  获取合并项
  let merge = data["!merges"];
  // 处理后的数据
  let filterArr = {};
  // 字母集合
  let letterArr = [];

  // 循环一次源数据，提取出列数据
  for (let key in data) {
    let row = key.replace(/[^A-Z]/g, "");
    let clo = key.replace(/[^\d]/g, "");
    if (!row || !clo) continue;
    // 如果第一次记录则直接设置
    if (letter == "") {
      letter = row;
      // 保存当前的列名
      letterArr[0] = row;
      // 设置第一项空数组
      filterArr[data[row + "1"].v] = [];
    } else {
      // 进行判断，如果当前列没有被记录过了，并且有值（因为可能会有undefined情况），则保存下来
      // 这里保存的是Excel的列，例：[A,B,C,D]
      if (letterArr.indexOf(row) < 0 && row) {
        letterArr.push(row);
      }
    }
    /**
     * data[row + "1"].v:获取列表标头，即Excel第一行都值
     * 如果没有则在对象中以标头名称新增一个属性，并赋值空数组
     */
    if (!filterArr[data[row + "1"].v]) {
      filterArr[data[row + "1"].v] = [];
    }
    // 判断，如果存在当前标头的属性，则根据表格的行数值
    if (filterArr[data[row + "1"].v] && clo > 1) {
      filterArr[data[row + "1"].v][clo - 2] = data[key];
      if (letter == row) {
      }
    }
  }
  merge.forEach((item) => {
    let arr = [item.s.r, item.e.r];
    let key = letterArr[item.s.c] + "1";
    let value = data[key].v;
    for (let i = arr[0]; i < arr[1]; i++) {
      filterArr[value][i] = filterArr[value][arr[0] - 1];
    }
  });
  //  获取第一列列表用于循环
  let firstClo = filterArr[data[letterArr[0] + "1"].v];
  let returnData = [];
  firstClo.forEach((item, index) => {
    let obj = {};
    for (let key in filterArr) {
      obj[key] = filterArr[key][index].v;
    }
    returnData.push(obj);
  });

  return returnData;
}
export { obj_json };
