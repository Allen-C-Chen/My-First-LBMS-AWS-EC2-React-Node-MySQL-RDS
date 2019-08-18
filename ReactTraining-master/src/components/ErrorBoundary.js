import React from "react";

export class ErrorBoundary extends React.Component {
   constructor(props) {
     super(props);
     this.state = { hasError: false };
   }
   
   static getDerivedStateFromError(error) {
     // Update state so the next render will show the fallback UI.
     console.log("ERROR GET DRIVED")
     this.setState({ hasError: true });
      console.log(hasError);
     return { hasError: true };
   }
   static errorHasHappened(){
      this.setState({ hasError: true });

   }
   componentDidCatch(error, errorInfo) {
      console.log("ERROR COMPONENT ")
      this.setState({ hasError: true });

     // You can also log the error to an error reporting service
     //logErrorToMyService(error, errorInfo);
   }
 
   render() {
      console.log("DID THIS RUN 1");
     if (this.state.hasError) {
      console.log("DID THIS RUN 2");

       // You can render any custom fallback UI
       //s
       return <h1>Something went wrong.</h1>;
     }
     console.log("DID THIS RUN 3");

     return this.props.children; 
   }
 }
 