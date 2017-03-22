function getCommonSubstringSets(word1, word2) {
  console.log('call getCommonSubstringSet: ', word1, word2);
  var FragSets = [];
  var lcsarr = new Array(word1.length);

  function Frag(obj) {
      var instance = null;
      if (obj.isCommon) {
          instance = {
              start1: obj.start1,
              start2: obj.start2,
              length: obj.length,
              content: getSubStrContentByLength(obj.start1, obj.length, word1),
              // for debug only
              isCommon: true,
              isMax: obj.isMax,
              leftFrag: obj.leftFrag,
              rightFrag: obj.rightFrag
          }
      } else {
          instance = {
              start1: obj.start1,
              start2: obj.start2,
              end1: obj.end1,
              end2: obj.end2,
              isCommon: false,
              content1: getSubStrContentByIndex(obj.start1, obj.end1, word1),
              // for debug only,
              content2: getSubStrContentByIndex(obj.start2, obj.end2, word2),
              // for debug only
          };
      }
      return instance;
  }

  function getLeftTop(i, j) {
      return (lcsarr[i - 1] && lcsarr[i - 1][j - 1]) ? lcsarr[i - 1][j - 1] : 0;
  }

  function getSubStrContentByIndex(startIndex, endIndex, str) {
      //起始字符，结束字符
      return str.substring(startIndex, endIndex + 1);
  }

  function getSubStrContentByLength(startIndex, length, str) {
      //起始字符，结束字符
      return str.substr(startIndex, length);
  }

  //进行初步计算，得出结果数组，和最大根节点
  function makeArrayAndFindRootMax() {
      var max = 0;
      let char1 = null;
      let char2 = null;
      var indexInWord1 = 0;
      var indexInWord2 = 0;

      for (var i = 0; i < word1.length; i++) {
          lcsarr[i] = new Array(word2.length);
          for (var j = 0; j < word2.length; j++) {
              lcsarr[i][j] = 0;
          }
      }
      console.log('init');
      console.table(lcsarr);

      for (var i = 0; i < word1.length; ++i) {
          for (var j = 0; j < word2.length; ++j) {
              char1 = word1[i];
              char2 = word2[j];
              if (char1 == char2) {
                  lcsarr[i][j] = getLeftTop(i, j) + 1;
              } else {
                  lcsarr[i][j] = 0;
              }

              console.log('i,j:', i, j);
              console.table(lcsarr);
              if (max < lcsarr[i][j]) {
                  max = lcsarr[i][j];
                  indexInWord1 = i;
                  indexInWord2 = j;
              }
          }
      }
      var str = "";
      if (max > 0) {
          for (var start = indexInWord1 - max + 1, i = 0; i < max; ++i) {
              str += word1[start + i];
          }
      }
      //console.log(str);
      var root = Frag({
          start1: indexInWord1 - max + 1,
          start2: indexInWord2 - max + 1,
          length: max,
          isCommon: true,
          isMax: true
      });

      //      root.left = Frag({
      //        start1: 0,
      //        end1: indexInWord1-max,
      //        content1: word1.substring(start1,indexInWord1-max) ,
      //        start2: 0,
      //        end2:indexInWord2-max+1,
      //        content2: word2.substring(start2,indexInWord2-max) ,
      //        length: max,
      //        isCommon:true,
      //        isMax:true
      //      });
      //      root.right = Frag({
      //
      //      });
      return root;
  }

  //将比较结果的数组，转换成节点（包含两个字符串对比结果）的树. 递归
  var hasFindMax = false;
  function makeMaxFragTree(StartIndex_word1, endIndex_word1, startIndex_word2, endIndex_word2) {
      var max = -1;
      var FragIns = null;
      var fragEndIndexInWord1 = null;
      var fragEndIndexInWord2 = null;
      let char1 = null;
      let char2 = null;

      for (var i = StartIndex_word1; i <= endIndex_word1; i++) {
          for (var j = startIndex_word2; j <= endIndex_word2; j++) {
              var value = lcsarr[i][j];
              char1 = word1[i];
              char2 = word2[j];
              if (value > max) {
                  max = lcsarr[i][j];
                  fragEndIndexInWord1 = i;
                  fragEndIndexInWord2 = j;
              }
          }
      }

      if (max === -1) {
          return null;
      } else if (max === 0) {
          //没有相似之处
          FragIns = Frag({
              start1: StartIndex_word1,
              end1: endIndex_word1,
              start2: startIndex_word2,
              end2: endIndex_word2,
              isMax: hasFindMax ? true : (hasFindMax = true,
              false)
          });
          return FragIns;
      }

      var start1 = fragEndIndexInWord1 - max + 1
        , start2 = fragEndIndexInWord2 - max + 1;
      FragIns = Frag({
          start1: start1,
          end1: fragEndIndexInWord1,
          start2: start2,
          end2: fragEndIndexInWord2,
          length: max,
          isMax: hasFindMax ? true : (hasFindMax = true,
          false),
          isCommon: true
      });

      if (start1 > StartIndex_word1 && start2 > startIndex_word2) {
          //两个字符串的左边均还有字符串
          FragIns.leftFrag = makeMaxFragTree(StartIndex_word1, start1 - 1, startIndex_word2, start2 - 1);
      } else if (start1 <= StartIndex_word1 && start2 <= startIndex_word2) {
          // 两个字符串左边均无字符串
          null;
      } else {
          //两个字符串的左边还有一个有
          FragIns.leftFrag = Frag({
              start1: StartIndex_word1,
              end1: start1 - 1,
              start2: startIndex_word2,
              end2: start2 - 1
          });
      }
      if (fragEndIndexInWord1 < endIndex_word1 && fragEndIndexInWord2 < endIndex_word2) {
          // 此处有问题
          FragIns.rightFrag = makeMaxFragTree(fragEndIndexInWord1 + 1, endIndex_word1, fragEndIndexInWord2 + 1, endIndex_word2);
      } else if (fragEndIndexInWord1 >= endIndex_word1 && fragEndIndexInWord2 >= endIndex_word2) {
          null;
      } else {
          FragIns.rightFrag = Frag({
              start1: fragEndIndexInWord1 + 1,
              end1: endIndex_word1,
              start2: fragEndIndexInWord2 + 1,
              end2: endIndex_word2
          });
      }

      return FragIns;

  }

  //将一棵树变成一个扁平的数组。中序遍历
  function flattenTree2Array(treeRootNode) {
      var arr = [];
      function step(node) {
          if (!node)
              return;
          if (node.leftFrag) {
              step(node.leftFrag)
          }
          arr.push(node);
          if (node.rightFrag) {
              step(node.rightFrag)
          }
      }
      step(treeRootNode);
      return arr;
  }
  //start
  makeArrayAndFindRootMax();
  var tree = makeMaxFragTree(0, word1.length - 1, 0, word2.length - 1);
  var arr = flattenTree2Array(tree);
  return arr;
}
