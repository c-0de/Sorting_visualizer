import react, { Component, Fragment } from 'react';
import Node from './Node'
import './sortingvisual.css'
import {selectionSort,MinElebyidx} from './Algorithms/SelectionSort';
import {bubbleSort} from './Algorithms/BubbleSort';
import {insertionSort} from './Algorithms/InsertionSort';
import {mergeSort} from './Algorithms/MergeSort';
import {quickSort} from './Algorithms/QuickSort';


class SortingVisualizer extends Component{
    constructor(props){
        super(props);
        this.state={
            Grid: [],
            Arr: [],
            Speed: 7,
            Size: 25,
            Space: 32
        }
    }

    componentDidMount(){
        let size = this.state.Size;
        const grid = getInitialGrid(size);
        const arr = GenerateArr(size);

        this.setState({
            Grid: grid,
            Arr: arr
        })
    }

    select_sort(){
        const arr = [...this.state.Arr];
        let sortedEleinOrder = selectionSort(arr);
        let minElebyidx = MinElebyidx();
        this.selectionSortAnime(sortedEleinOrder,minElebyidx);
    }

    bubb_sort(){
        const arr = [...this.state.Arr];
        let sortedEleinOrder = bubbleSort(arr);
        this.bubbleSortAime(sortedEleinOrder);
    }

    ins_sort(){
        const arr=[...this.state.Arr];
        let sortedEleinOrder = insertionSort(arr);
        this.insertionSortAnime(sortedEleinOrder);
    }

    mer_sort(){
        const arr=[...this.state.Arr];
        let part = mergeSort(arr);
        this.mergesortAnime(part);
    }

    quic_sort(){
        const arr=[...this.state.Arr];
        let tot = quickSort(arr);
        this.quicksortAnime(tot);
    }

    Sort=()=>{
        let speed_mi = parseInt(document.getElementById("Speed").min);
        let speed_ma = parseInt(document.getElementById("Speed").max);
        let algo = document.getElementById("algo").value;

        const speed = document.getElementById("Speed").value;

        if(speed >= speed_mi && speed <= speed_ma && algo!=="none")
        {
            if(algo === "Selection Sort")
                this.select_sort();
            else if(algo === "Bubble Sort")
                this.bubb_sort();
            else if(algo === "Insertion Sort")
                this.ins_sort();
            else if(algo === "Merge Sort")
                this.mer_sort();
            else if(algo === "Quick Sort")
                this.quic_sort();
        }
        else
        {
            if(speed < speed_mi || speed > speed_ma)
                alert("The speed value should be between 2(inclusive) and 40(inclusive).");
            if(algo === "none")
                alert("Please select an algorithm");
        }
    }

    selectionSortAnime = (sortedEleinOrder,minElebyidx) =>{
        const grid = [...this.state.Grid];
        const arr = [...this.state.Arr];
        const size = this.state.Size;

        for(let i=0;i<grid.length;i++)
        {
            let temp_arr = [...minElebyidx[i]];
            let node = CreateNode(i);
            node.idx=i;
            node.ele = arr[i];
            node.curr=true;
            let prevcandi = 0;
            let prevcurr = 0;
            let c=0;

            setTimeout(()=>{
                for(let j=i+1;j<grid.length;j++)
                {
                    let innode = CreateNode(j);
                    innode.idx = j;
                    innode.candi=true;

                    setTimeout(()=>{
                        if(prevcandi)
                        {
                            let prevNode = CreateNode(prevcandi);
                            prevNode.ele = arr[prevNode];
                            prevNode.candi=false;
                            grid[prevcandi] = prevNode;
                        }
                        if(temp_arr.length>0 && temp_arr[0] === j)
                        {
                            if(prevcurr)
                                grid[prevcurr].currmin=false;
                            innode.candi=false;
                            innode.currmin=true;
                            prevcurr = temp_arr.shift();
                        }
                        grid[j]=innode;
                        this.setState({Grid:grid});
                        if(!innode.currmin)
                            prevcandi = j;
                        
                    },1000*j/this.state.Speed);
                    this.setState({Arr:arr});
                }
                grid[i] = node;
                this.setState({Grid:grid});
            },1000*(size-c)*i/this.state.Speed);
            c++;

            if(i>0)
            {
                setTimeout(() => {
                    grid[grid.length-1].candi=false;
                    const temp = arr[i-1];
                    arr[i-1] = arr[sortedEleinOrder[i-1]];
                    arr[sortedEleinOrder[i-1]] = temp;
                    
                    grid[sortedEleinOrder[i-1]].currmin=false;
                    grid[i-1].sorted=true;
                    grid[i-1].curr=false;

                    if(i===grid.length-1){
                        grid[i].curr=false
                        grid[i].sorted=true;
                    }

                    this.setState({Arr:arr,Grid:grid});
                }, 1070*i*(size-c)/this.state.Speed);
            }
        }
    }

    bubbleSortAime = (sortedEleinOrder) =>{
        const grid = [...this.state.Grid];
        const arr = [...this.state.Arr];
        const size = this.state.Size;

        for(let i=0;i<arr.length+1;i++)
        {
            let t_arr=sortedEleinOrder[i];
            let f=false;
            setTimeout(()=>{
                if(i===arr.length || t_arr===undefined){
                    for(let it=0;grid[it].sorted===false;it++)
                    {
                        /*grid[grid.length-i].candi=false;
                        grid[grid.length-i].currmin=false;
                        grid[grid.length-i].sorted=true;
                        this.setState({Grid:grid});*/
                        grid[it].candi=false;
                        grid[it].currmin=false;
                        grid[it].sorted=true;
                        this.setState({Grid:grid});
                    }
                    return;
                }
                if(i>0){
                    grid[(grid.length)-i].candi=false;
                    grid[(grid.length-1)-i].candi=false;
                    grid[(grid.length)-i].currmin=false;
                    grid[(grid.length-1)-i].currmin=false;
                    grid[(grid.length)-i].sorted=true;
                    this.setState({Grid: grid});
                }
                let p=-1;
                let k=0;
                for(let j=0;j<(arr.length-1)-i;j++)
                {
                    const node1 = CreateNode(j);
                    const node2 = CreateNode(j+1);

                    node1.candi=true;
                    node2.candi=true;
                    node1.ele=arr[j];
                    node2.ele=arr[j+1];
                    setTimeout(()=>{
                        if(p>=0){
                            grid[p].candi=false;
                            grid[p].currmin=false;
                        }

                        if(k < t_arr.length && t_arr[k][0] === j && t_arr[k][1]===j+1)
                        {
                            f=true;
                            node1.candi=false;
                            node2.candi=false;
                            node1.currmin=true;
                            node2.currmin=true;
                            const temp=arr[j];
                            arr[j]=arr[j+1];
                            arr[j+1]=temp;
                            k++;
                        }
                        grid[j]=node1;
                        grid[j+1]=node2;
                        p=j;
                        this.setState({Arr:arr,Grid:grid});
                    },1000*j/this.state.Speed);
                }
            },1000*i*size/this.state.Speed);
        }

    }

    insertionSortAnime(sortedEleinOrder){
        const grid = [...this.state.Grid];
        const arr = [...this.state.Arr];
        const size = this.state.Size;

        let prev=0;
        let t_j=1;
        let key=0;
        for(let i=1;i<arr.length+1;i++){
            setTimeout(()=>{
                if(key)
                    arr[t_j] = key;
                grid[t_j].candi=false;
                grid[t_j+1].candi=false;
                grid[grid.length-1].curr=false;

                if(i>=arr.length){
                    if(key)
                        arr[t_j] = key;
                    grid[grid.length-1].curr=false;
                    grid[t_j].candi=false;
                    grid[t_j].candi=false;
                    this.setState({Arr:arr,Grid:grid});

                    return;
                }
                const node = CreateNode(i);
                node.curr=true;
                node.ele=arr[i];

                if(prev){
                    const p = CreateNode(prev);
                    p.curr=false;
                    p.ele = arr[prev];
                    grid[prev]=p;
                }
                
                grid[i] = node;
                key = arr[i];
                let prev2 = -1;
                let tj=i-1;
                for(let j=i-1,k=0;j>=0 && arr[j]>key;j--,tj--,k++)
                {
                    setTimeout(()=>{

                        if(prev2!==-1){
                            const p2 = CreateNode(prev2);
                            p2.candi=false;
                            p2.ele=arr[prev2];
                            grid[prev2] = p2;
                        }
                        grid[j].candi=true;
                        grid[j+1].candi=true;
                        arr[j+1]=arr[j];
                        this.setState({Arr:arr,Grid:grid});
                        prev2 = j+1;
                    },k*1000/this.state.Speed);
                }
                t_j=tj+1;
                this.setState({Arr:arr,Grid:grid});
                prev = i;

            },1000*i*(i-t_j)/this.state.Speed);
        }
    }

    mergesortAnime(part){
        
        const arr = [...this.state.Arr];
        const grid = [...this.state.Grid];
        let p=-1;
        for(let i=0;i<=part.length;i++){
            setTimeout(()=>{
                if(i<=part.length){
                    if(p!==-1){
                        for(let j=p[0];j<=p[1];j++){
                            let t = CreateNode(j);
                            t.curr=false;
                            t.sorted=true;
                            grid[j]=t;
                            this.setState({Arr:arr,Grid:grid});
                        }
                    }
                    if(i<part.length){
                        for(let j=part[i][0];j<=part[i][2];j++){
                            let t = CreateNode(j);
                            t.curr=true;
                            grid[j]=t;
                            this.setState({Arr:arr,Grid:grid});
                        }
                        p = [part[i][0],part[i][2]];

                        let fin=[];
                        let s=part[i][0];
                        let e=part[i][1]+1;
                        while(s<=part[i][1] && e<=part[i][2]){
                            if(arr[s] < arr[e]){
                                fin.push(arr[s++]);
                            }
                            else{
                                fin.push(arr[e++]);
                            }
                        }
                        while(s<=part[i][1]) fin.push(arr[s++]);
                        while(e<=part[i][2]) fin.push(arr[e++]);

                        let k=0;
                        for(let j=part[i][0];j<=part[i][2];j++){
                            arr[j] = fin[k++];
                        }

                        this.setState({Arr:arr,Grid:grid});
                    }
                }
            },i*1000/this.state.Speed);
        }
    }

    quicksortAnime(tot){
        const grid = [...this.state.Grid];
        const arr = [...this.state.Arr];
        const size = this.state.Size;
        const speed = this.state.Speed;
        let fin_arr = tot[0];
        let fin_arr2 = tot[1];
        
        for(let k=0;k<fin_arr.length;k++){
            let diff = fin_arr2[k][fin_arr2[k].length-1] - fin_arr2[k][fin_arr2[k].length-2];
            setTimeout(()=>{
                for(let i=fin_arr2[k][fin_arr2[k].length-2];i<fin_arr2[k][fin_arr2[k].length-1];i++){
                    setTimeout(()=>{
                        if(i>fin_arr2[k][fin_arr2[k].length-2]){
                            let t = CreateNode(i-1);
                            grid[i-1]=t;
                        }
                        let t = CreateNode(i);
                        t.curr = true;
                        grid[i]=t;

                        this.setState({Grid:grid});
                    },i*800);
                }
            },k*1000*diff*3);
        }
    }

    gen_newarr(){
        let size = this.state.Size;
        const grid = getInitialGrid(size);
        const arr = GenerateArr(size);

        this.setState({
            Grid: grid,
            Arr: arr
        })
    }

    set_speed(){
        let speed = document.getElementById("Speed").value;
        this.setState({Speed:speed});
    }

    set_size(){

        let arr = this.state.Arr;
        let grid = this.state.Grid;
        let space = this.state.Space;
        //console.log(space);
        let temps=parseInt(this.state.Size);
        if(isNaN(this.state.Size)){
            temps=0;
        }
        let p_size = Math.max(0,temps);
        let size = parseInt(document.getElementById("Size").value);
        //console.log("prev ",p_size);
        //console.log("curr ",size);
        if(size<60){
            let diff = size-p_size;
            if(isNaN(size)){
                arr=[];
                grid=[];
                space = 55.5;
                for(let i=0;i<diff;i++){
                    let n = Math.ceil((Math.random()*60));
                    arr.push(n);
                    grid.push(CreateNode(p_size+i));
                    space-=0.93;
                    document.getElementById('cont').style.left = space+'%';
                } 
            }
            else if(diff>0){
                for(let i=0;i<diff;i++){
                    let n = Math.ceil((Math.random()*60));
                    arr.push(n);
                    grid.push(CreateNode(p_size+i));
                    space-=0.93;
                    document.getElementById('cont').style.left = space+'%';
                }
            }
            else{
                for(let i=0;i<diff*-1;i++){
                    arr.pop();
                    grid.pop();
                    space+=0.93;
                    document.getElementById('cont').style.left = space+"%";
                }
            }
            this.setState({Arr:arr,Size:size,Grid:grid,Space:space});
        }
    }

    render(){
        const grid = this.state.Grid;
        const arr = this.state.Arr;

        return(
            <Fragment>
                <div className="menu">
                    <h1>Sorting Visualizer</h1>
                    <button onClick={this.Sort}>Sort</button>

                    <label htmlFor="speed">Set Speed :</label>
                        <input
                            type="number"
                            name="speed"
                            id="Speed"
                            min="2"
                            max="40"
                            onChange={()=>{this.set_speed()}}
                            defaultValue="7"
                            placeholder="Min 2, Max 40"
                        ></input>
                    <label htmlFor="size">Set Array Size :</label>
                        <input
                            type = "number"
                            name = "size"
                            id = "Size"
                            min = "1"
                            max = "59"
                            onChange={()=>{this.set_size()}}
                            defaultValue = "25"
                            placeholder="min 1, max 59"
                        ></input>
                    
                    <select name="algo" id="algo">
                        <option value="none">--Choose an Algorithm--</option>
                        <option value="Selection Sort">Selection Sort</option>
                        <option value="Bubble Sort">Bubble Sort</option>
                        <option value="Insertion Sort">Insertion Sort</option>
                        <option value="Merge Sort">Merge Sort</option>
                        <option value="Quick Sort">Quick Sort</option>
                    </select>

                    <button className="new_arr" onClick={()=>{this.gen_newarr()}}>Generate new array</button>
                </div>
                <div className = "contain" id="cont">
                    {grid.map((ele,eleidx)=>{
                        const {idx,curr,candi,currmin,sorted} = ele;
                        return(
                            <Node
                                key={eleidx}
                                idx={idx}
                                ele = {arr[idx]}
                                curr = {curr}
                                candi={candi}
                                currmin={currmin}
                                sorted={sorted}
                            />
                        )
                    })}
                    <div className = "val">
                        {arr.map((val,validx)=>{
                            return(
                                <div key={validx} className="innerval">
                                    {val}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Fragment>
        )
    }
}

const getInitialGrid = (size) =>{
    const grid = [];
    for(let i=0;i<size;i++)
    {
        grid.push(CreateNode(i));
    }

    return grid;
}

export const CreateNode = (idx) =>{
    return{
        idx,
        curr:false,
        candi:false,
        currmin:false,
        sorted:false
    }
}

const GenerateArr = (size) =>{
    const arr = [];
    for(let i=0;i<size;i++)
    {
        let n = Math.ceil((Math.random()*60));
        arr.push(n);
    }

    return arr;
}

export default SortingVisualizer;