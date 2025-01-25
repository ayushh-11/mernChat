nums1 = [1,2,3,4,5]
nums2 = [6,7,8,9,10,11,12,13,14,15,16,17]
var num3 = [...nums1, ...nums2];
console.log(num3);
var sortedArray = num3.sort();
console.log(sortedArray);
var len = sortedArray.length;
var mid = parseInt(len / 2);
console.log(mid)
var number = 0;
if (len % 2 == 0) {
    number = (sortedArray[mid] + sortedArray[mid - 1]) / 2
    console.log(number)
}
else {
    number = sortedArray[mid]
    console.log(number)
}


numm = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(numm.sort())


// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler


height =[1,6,6,2,5,4,8,3,7]
var temp = [...height]
var sorted = height.sort((a,b)=>a-b)
len = height.length
var n1 = sorted[len-1]
var n2 = sorted[len-2]
console.log(n1,n2)
var number
if(n1 === n2){
    number = n2
    console.log(number)
}else{
    console.log(temp.indexOf(n1) , temp.indexOf(n2))
    number = n2 * (temp.indexOf(n1) > temp.indexOf(n2) ? (temp.indexOf(n1) - temp.indexOf(n2)) : (temp.indexOf(n2) > temp.indexOf(n1)))
    console.log(number)
}

