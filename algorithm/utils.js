//特殊打印，仅适用于此案例中的array
function ConventArrayToStr(arr){
  var temp = ['['];
  arr.forEach(function(item){
    temp = temp.concat(['{',item.content?item.content:(item.content1+','+item.content2),'}'])
  });
  temp.push(']');
  var result = temp.join('');
  // console.info(result);
  return result;
}
//断言
function assert(expect, result) {
  if(result === expect) {
    console.info('ok: ',result);
  }else{
    console.error('expect: ',expect, '\r but get: ', result);
  }
}
// 特殊断言. 仅适用于当前案例
function specialAssert(expect, resultArr){
  assert(expect, ConventArrayToStr(resultArr));
}

function description(str, fn){
  console.info('---------- Suite: '+str+' ----------');
  fn();
}