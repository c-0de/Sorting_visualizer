import React,{Component} from 'react';
import syles from './node.modules.css'

class Node extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {idx,ele,curr,candi,currmin,sorted} = this.props;
        const mystyle={
            height:ele+"rem"
        }
        const extractClass = curr?'curr':candi?'candi': currmin?'currmin': sorted?'sorted':'';
        return(
            <div className="o_bar" style={mystyle}>
                <div id = {`elem-${idx}-${ele}`} className={`${extractClass} bar`} style={mystyle}>
                </div>
            </div>
        )
    }
}

export default Node;