// 获取一个图像的某个区域的“横向压缩成一列”的profile
function profileOfImageDataInHorizontal(imageData, ImageWidth, ImageHeight,
                                        startWidth, width, startHeight, height) {
    var data = imageData;
    startWidth = startWidth || 0;
    startHeight = startHeight || 0;
    width = width || ImageWidth;
    height = height || ImageHeight;
    var result = [];
    var r, g, b, a, pixelIndex;
    for (var h = startHeight; h < startHeight + height; h++){
        r = 0, g = 0, b = 0, a = 0;
        for (var w = startWidth; w < startWidth+width; w++) {
            pixelIndex = 4 * (h * ImageWidth + w);
            r += data[pixelIndex];
            g += data[pixelIndex + 1];
            b += data[pixelIndex + 2];
            a += data[pixelIndex + 3];
        }
        result[h] = ['r', r, 'g', g, 'b', b, 'a', a].join(''); // 姑且粗劣的认为，一行之和相同就是相同
    }
    return result;
}

// 获取一个图像的某个区域的“竖向压缩成一行”的profile
function profileOfImageDataInVertical(imageData, ImageWidth, ImageHeight,
                                      startWidth, width, startHeight, height) {
    var data = imageData;
    startWidth = startWidth || 0;
    startHeight = startHeight || 0;
    width = width || ImageWidth;
    height = height || ImageHeight;
    var result = [];
    var r, g, b, a, pixelIndex;
    for (var w = startWidth; w < startWidth+width; w++) {
        r = 0, g = 0, b = 0, a = 0;
        for (var h = startHeight; h < startHeight + height; h++){
            pixelIndex = 4 * (h * ImageWidth + w);
            r += data[pixelIndex];
            g += data[pixelIndex + 1];
            b += data[pixelIndex + 2];
            a += data[pixelIndex + 3];
        }
        result[h] = ['r', r, 'g', g, 'b', b, 'a', a].join(''); // 姑且粗劣的认为，一行之和相同就是相同
    }
    return result;
}

// 将整个图像的数据压缩成多行一列
function profileOfImageInHorizontal(imageData) {
    var width = imageData.width;
    var height = imageData.height;
    var data = imageData.data;
    var result = profileOfImageDataInHorizontal(data, width, height, 0, width, 0, height);
    return result;
}

//根据一个特殊的比较数组，创建一个图像数据
function createDiffImageDataFromCompareData(arr,width,height,which) {
    which = which==1?1:2;
    for(var i=0,len=arr.length;i<len;i++){
        var frag = arr[i];
        if(frag.isCommon){
            break; // 相同的图像，不涂色
        }else{
            var startWidth = frag['startWidth'+which];
            var width = frag['width'+which];
            var startHeight = frag['startHeight'+which];
            var height = frag['height'+which];
            for(;;){ // todo 填充
                for(;;)
            }
        }
    }
    return data;
}


/*
 * 对比两个图片，得出其中相似与不相似的区域。模糊计算
 * 以getCommonSubstringSets为基础，进行图像对比。先得以行为维度，再以列为维度。
 *
 * */
function imageCompare(imageData1, imageData2) {
    var width1 = imageData1.width,
        height1 = imageData1.height,
        data1 = imageData1;

    var width2 = imageData2.width,
        height2 = imageData2.height,
        data2 = imageData2;

    var result = [];
    var profile1 = profileOfImageInHorizontal(imageData1);
    var profile2 = profileOfImageInHorizontal(imageData2);
    var resultArrayInHorizontal = getCommonSubstringSets(profile1, profile2);
    for(var i=0,len=resultArrayInHorizontal.length;i<len;i++){
       var frag = resultArrayInHorizontal[i];
        //将frag中的数据，转换成图像相关的数据
       if(typeof frag.start1 !=='undefined'){
           frag.startHeight1 = frag.start1;
           frag.height1 = frag.end1-frag.start1;
       }
       if(typeof frag.start2 !=='undefined'){
            frag.startHeight2 = frag.start2;
            frag.height2 = frag.end2-frag.start2;
        }
       switch(true){
           case frag.isCommon:
           case typeof frag.start1 ==='undefined':
           case typeof frag.start2 ==='undefined':
               result.push(frag);
               break;
           default:{
               var start1 = frag.start1;
               var end1 = frag.end1;
               var start2 = frag.start2;
               var end2 = frag.end2;
               profile1 = profileOfImageDataInVertical(data1, width1, height1,
                   0, width1, start1, end1-start1);
               profile2 = profileOfImageDataInVertical(data2, width2, height2,
                   0, width1, start2, end2-start2);
               var resultArrayInHorizontal = getCommonSubstringSets(profile1, profile2);
               // 改造一下
               for(var i=0,len=resultArrayInHorizontal.length;i<len;i++){
                   var frag = resultArrayInHorizontal[i];
                   if(typeof frag.start1 !=='undefined'){
                       frag.startWidth1 = frag.start1;
                       frag.width1 = frag.end1-frag.start1;
                   }
                   if(typeof frag.start2 !=='undefined'){
                       frag.startWidth2 = frag.start2;
                       frag.width2 = frag.end2-frag.start2;
                   }
               }
               result = result.concat(resultArrayInHorizontal);
           }
       }
    }

    return result;
}