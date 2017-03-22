/*
* 对比两个图片，得出其中相似与不相似的区域。模糊计算
* 以getCommonSubstringSets为基础，进行图像对比。先得以行为维度，再以列为维度。
*
* */
function imageCompare(imageData1,imageData2){
    //将图像的数据压缩成多行一列
    function profileOfImageInHorizontal(imageData){
        var width = imageData.width;
        var height = imageData.height;
        var data = imageData.data;
        var result = [];
        var r,g,b,a,pixelIndex;
        for(var h=0;h<height;h++){
            r=0,g=0,b=0,a=0;
            for(var w=0;w<width;w++){
                pixelIndex = 4*(h*width+w);
                r+=data[pixelIndex];
                g+=data[pixelIndex+1];
                b+=data[pixelIndex+2];
                a+=data[pixelIndex+3];
            }
            result[h] = ['r',r,'g',g,'b',b,'a',a].join(''); // 姑且粗劣的认为，一行之和相同就是相同
        }
        return result;
    }

    function createImageDataFromCompareData(arr){

        return data;
    }

    var width1 = imageData1.width,
        height1 = imageData1.height,
        data1 = imageData1,
        width2 = imageData2.width,
        height2 = imageData2.height,
        data2 = imageData2;

    var profile1 = profileOfImageInHorizontal(imageData1);
    var profile2 = profileOfImageInHorizontal(imageData2);
    var resultArray = getCommonSubstringSets(profile1,profile2);
    var resultImage = createImageDataFromCompareData(resultArray);
    return resultImage;
}
