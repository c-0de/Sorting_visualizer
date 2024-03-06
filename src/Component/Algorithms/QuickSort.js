function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function part(arr,s,e,temp_arr,temp_arr2){
    const p = arr[e];
    /*let i=s;
    let j=e;*/
    let j=s;

    for(let i=s;i<e;i++){
        if(arr[i]<p){
            swap(arr,i,j);
            temp_arr.push(i);
            temp_arr.push(j);
            j++;
        }
    }
    temp_arr2.push(e);
    temp_arr2.push(j);
    temp_arr2.push(s);
    temp_arr2.push(e);
    swap(arr,e,j);
    return j;

    /*while(i<j){
        
        do{
            i++;
        }while(arr[i]<arr[p]);
        do{
            j--;
        }while(arr[j]>arr[p]);
        if(i<j){
            temp_arr.push(i);
            temp_arr.push(j);
            let temp = arr[i];
            arr[i]=arr[j];
            arr[j] = temp;
        }
    }

    temp_arr.push(p);
    temp_arr.push(j);
    temp_arr.push(s);
    temp_arr.push(e);
    let temp = arr[j];
    arr[j]=arr[p];
    arr[p]=temp;*/


    //return j;
}

function qSort(arr,l,h,fin_arr,fin_arr2){
    if(l>=h) return;
    let temp_arr=[];
    let temp_arr2=[];
    let p = part(arr,l,h,temp_arr,temp_arr2);
    fin_arr.push(temp_arr);
    fin_arr2.push(temp_arr2);
    qSort(arr,l,p-1,fin_arr,fin_arr2);
    qSort(arr,p+1,h,fin_arr,fin_arr2);
}

export function quickSort(arr){
    let fin_arr=[];
    let fin_arr2=[];
    qSort(arr,0,arr.length-1,fin_arr,fin_arr2);
    return [fin_arr,fin_arr2];
}