import { Component } from 'react';

export default class ErrorBoundary extends Component{
    constructor(){
        super();

        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(err){
        console.log('getDerivedStateFromError');
        return {
            hasError: true,
        }
    }

    //life
    componentDidCatch(error, errorInfo){
        console.log('componentDidCatch');
        //TO DO - mojem da zapishem greshkata
    }

    render(){
        if(this.state.hasError){
            return <h1>404</h1>
        }
        return this.props.children;
    }
}