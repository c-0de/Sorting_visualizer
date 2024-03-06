export function insertionSort(arr){
    let sortedEleinOrder=[];
    for(let i=1;i<arr.length;i++)
    {
        let key = arr[i];
        let j=i-1;
        while(j>=0 && key<arr[j])
            arr[j+1]=arr[j--];
        arr[j+1]=key;
        sortedEleinOrder.push(j+1);
    }
    
    return sortedEleinOrder;
}