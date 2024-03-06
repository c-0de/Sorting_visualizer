var minElebyidx=[];
export function selectionSort(arr){
    var sortedEleinOrder=[];
    
    for(let i=0;i<arr.length;i++)
    {
        var mi = i;
        var idx=[];
        for(let j=i+1;j<arr.length;j++)
        {
            if(arr[mi] > arr[j])
            {
                idx.push(j);
                mi=j;
            }
        }
        let temp = arr[i];
        arr[i] = arr[mi];
        arr[mi] = temp;

        sortedEleinOrder.push([mi]);
        minElebyidx.push(idx);
        MinElebyidx(minElebyidx);
    }
    return sortedEleinOrder;
}

export function MinElebyidx(){
    return minElebyidx;
}