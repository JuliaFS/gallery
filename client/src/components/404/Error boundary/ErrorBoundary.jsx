import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

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
        console.error('An error occurred:', error, errorInfo);
        return <h1>alert({errorInfo})!</h1>;
    }

    render(){
        if(this.state.hasError){
            return <div className={styles["classError"]}><h1>Something went wrong...</h1></div>;
        }
        return this.props.children;
    }
}