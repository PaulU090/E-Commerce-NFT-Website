import React from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Login from "./Login"

import '../Styles/SingleProductPage.css'
import '../Styles/loginStyles.css'


export default function LoginPage(){


    return(
        <div>
            <SiteHeader/>
            <div className="twoColumns" style = {{minHeight: 'max-content'}}>
                <Login/>
                <div className="login-divider-bar"></div>
                <div 
                    className="login-form-container"
                    style = {{alignItems: 'start', display: 'flex', justifyContent: 'start'}}
                >
                    <div 
                        className="title-text"
                        style = {{
                            marginTop: "20px",
                            marginLeft: "0",
                            fontSize: "1.5em"
                        }}
                    >{"Guest Checkout"}</div>
                    <div 
                        className="basic-text"
                        style = {{
                            minWidth: '100%',
                            marginLeft: '0px',
                            fontSize: '0.8em'
                        }}
                    >
                        {"You can check out without creating an account. You'll have a chance to create an account later."}
                    </div>
                    <form 
                        onSubmit={(event)=> {
                            event.preventDefault()
                        }}
                        className = "login-input-form"
                    >
                
                        <input 
                            style = {{width: 'min-content'}}
                            type = "submit"
                            value={"Continue As Guest"}
                        ></input>
                    </form>
                </div>
            </div>
            <SiteFooter/>
            
        </div>
    )
}