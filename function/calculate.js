// 处理解析出来的数据表
function getitem(obj, calOption) {
  const numList = [];
  // console.log(obj);
  obj.forEach((row, i) => {
    if (row.data.length == 0) {  //跳过无数据的sheet
      return
    } else {
      // 求体积
      if (calOption.id == 1) {
        row.data.forEach((d, i) => {
          if (!i) return;
          numList.push({
            Tablename: row.name,
            order:d[0],
            canLength: d[1],
            canRadius: d[2],
            solutionHeight: d[3],
            solutionVolume: null
          });
        });
      }
      // 求罐长
      else if (calOption.id == 2) {
        row.data.forEach((d, i) => {
          if (!i) return;
          numList.push({
            Tablename: row.name,
            canLength: null,
            order:d[0],
            canRadius: d[1],
            solutionHeight: d[2],
            solutionVolume: d[3]
          });
        });
      }
      //  求半径
      else if (calOption.id == 3) {
        row.data.forEach((d, i) => {
          if (!i) return;
          numList.push({
            Tablename: row.name,
            order:d[0],
            canLength: d[1],
            canRadius: null,
            solutionHeight: d[2],
            solutionVolume: d[3]
          });
        });
      }
      // 求液位高度
      else if (calOption.id == 4) {
        row.data.forEach((d, i) => {
          if (!i) return;
          numList.push({
            Tablename: row.name,
            order:d[0],
            canLength: d[1],
            canRadius: d[2],
            solutionHeight: null,
            solutionVolume: d[3]
          });
        });
      }

    }

  })
  return numList;
}

// 计算液体容积

function calculateVolume(obj, calOption) {
  // console.log(obj);
  const newObjList = []; //结果信息
  if (calOption.id == 1) {
    // 计算体积
    obj.forEach((item, index) => {
      var L = item.canLength,
        R = item.canRadius,
        H = item.solutionHeight,
        V = getVolume(L, R, H);
      newObjList.push({
        tablename: item.Tablename,
        order:item.order,
        canLength: L,
        canRadius: R,
        solutionHeight: H,
        solutionVolume: V
      });
    })
    return newObjList;
  } else if (calOption.id == 2) {
    // 计算体积
    obj.forEach((item, index) => {
      var V = item.solutionVolume,
        R = item.canRadius,
        H = item.solutionHeight,
        L = getCanlength(R, H, V)
      newObjList.push({
        tablename: item.Tablename,
        order:item.order,
        canLength: L,
        canRadius: R,
        solutionHeight: H,
        solutionVolume: V
      });
    })
    return newObjList;
  } else if (calOption.id == 3) {
    obj.forEach((item, index) => {
      var V = item.solutionVolume,
        H = item.solutionHeight,
        L = item.canLength,
        R = getCanRadius(L, H, V);
      newObjList.push({
        tablename: item.Tablename,
        order:item.order,
        canLength: L,
        canRadius: R,
        solutionHeight: H,
        solutionVolume: V
      });
    })
    return newObjList;
  } else if (calOption.id == 4) {
    obj.forEach((item, index) => {
      var V = item.solutionVolume,
        L = item.canLength,
        R = item.canRadius,
        H = getsolutionHeight(L, R, V);
      newObjList.push({
        tablename: item.Tablename,
        order:item.order,
        canLength: L,
        canRadius: R,
        solutionHeight: H,
        solutionVolume: V
      });
    })
    return newObjList;
  }
}

function getVolume(L, R, H) {
  var V = L * ((H - R) * Math.sqrt(Math.pow(R, 2) - Math.pow((H - R), 2)) + Math.pow(R, 2) * Math.asin((H - R) / R) + Math.PI * Math.pow(R, 2) / 2);
  return V ? V.toFixed(4) : 0;
}

function getCanlength(R, H, V) {
  var L = V / ((H - R) * Math.sqrt(Math.pow(R, 2) - Math.pow((H - R), 2)) + Math.pow(R, 2) * Math.asin((H - R) / R) + Math.PI * Math.pow(R, 2) / 2);
  return L.toFixed(4);
}

function getCanRadius(L, H, V) {
  return 222;
}

function getsolutionHeight(L, R, V) {
  return 333;
}

module.exports = {
  "getitem": getitem,
  "calculateVolume": calculateVolume
};