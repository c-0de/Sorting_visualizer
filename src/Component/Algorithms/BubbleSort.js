export function bubbleSort(arr){
    let sortedElementInOrder=[];
    for(let i=0;i<arr.length;i++){
        let swap=false;
        let innarr=[];
        for(let j=0;j<arr.length-1;j++)
        {
            if(arr[j]>arr[j+1])
            {
                innarr.push([j,j+1]);
                const temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1]=temp;
                swap=true;
            }
        }
        sortedElementInOrder.push(innarr);
        if(!swap) break;
    }
    return sortedElementInOrder;
}