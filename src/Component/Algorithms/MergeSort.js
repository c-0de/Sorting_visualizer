function merge(arr,s,mi,e,res){
    
    //console.log("-->",s,mi,e);
    res.push([s,mi,e]);

    let a = [],b=[];
    for(let i=s;i<=mi;i++) a.push(arr[i]);
    for(let i=mi+1;i<=e;i++) b.push(arr[i]);

    let i=0,j=0;
    let temp = [];
    while(i<a.length && j<b.length){
        if(a[i] < b[j]) temp.push(a[i++]);
        else temp.push(b[j++]);
    }

    while(i<a.length) temp.push(a[i++]);
    while(j<b.length) temp.push(b[j++]);

    let k=0;
    for(let it=s;it<=e;it++) arr[it] = temp[k++];
}

function recur(arr,l,h,res){
    
    if(l>=h) return;

    var m = parseInt(l+(h-l)/2);
    recur(arr,l,m,res);
    recur(arr,m+1,h,res);
    merge(arr,l,m,h,res);
}

export function mergeSort(arr){
    let res=[];
    recur(arr,0,arr.length-1,res);
    return res;
}