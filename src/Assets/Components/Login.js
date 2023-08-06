import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import '../Styles/loginStyles.css'
import '../Styles/textStyles.css'

export default function Login()
{
    const navigate = useNavigate();

    const [usernameInput, setUsernameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('')

    const [inputErrorMessage, setInputErrorMessage] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [register, setRegister] = React.useState(false);

    const [registrationRequest, setRegistrationRequest] = React.useState({
        userName: '',
        email: '',
        password: '',
        initialized: false
    })
    const [loginRequest, setLoginRequest] = React.useState({
        email: '',
        password: '',
        initialized: false
    })


    React.useEffect(()=>{
        if(registrationRequest.initialized === true && registrationRequest.password !== '' && registrationRequest.userName !== '' && registrationRequest.email !== '')
        {
            fetch('../api/v1/auth/register', {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName: registrationRequest.userName,
                    email: registrationRequest.email,
                    password: registrationRequest.password
                })
            })
                .then(res => {
                    if(res.status !== 201) { 
                    
                    throw new Error(res.status)
                } 
                return res.json()})
                .then(res => {
                    const token = res.token;
                    if(token)
                    {
                        localStorage.setItem('token', res.token)
                    }                   
                })
                .then(res=> {
                    if(localStorage.getItem('token'))
                    {
                        navigate(0)
                    }          
                })
                .catch(err => {
                    setInputErrorMessage('\nInvalid Credentials');
                })
            

            setRegistrationRequest({
                userName: '',
                email: '',
                password: '',
                initialized: false
            })
        }
        
    }, [registrationRequest])

    React.useEffect(()=>{
        if(loginRequest.initialized === true && loginRequest.password !== '' && loginRequest.email !== '')
        {
            fetch('../api/v1/auth/login', {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: loginRequest.email,
                    password: loginRequest.password
                })
            })
            .then(res => {
                if(res.status !== 200) { 
                    throw new Error(res.status)
                } 
                return res.json()})
            .then(res => {
                const token = res.token;
                if(token)
                {
                    localStorage.setItem('token', res.token)
                }            
            })
            .then(res=> {
                if(localStorage.getItem('token'))
                {
                    navigate(0)
                }          
            })
            .catch(err => {
                setInputErrorMessage('\nInvalid Credentials');
                setLoginRequest({
                    password: '',
                    email: '',
                    initialized: false
                })
            })
        }

    }, [loginRequest])


    function GetErrorDivs()
    {
        let errorLines = inputErrorMessage.split('\n')
        let errorDivs = errorLines.map((item, index) => <div className="error-text" key = {index} style = {{marginBottom : index === errorLines.length - 1 ? '10px' : '5px'}}>{item}</div>)
        
        return(
            <div
                style = {{
                  width: "100%",
                  height: "40px",
                  marginTop: "-20px",
                  marginBottom: "10px"
                }}
            >
                {errorDivs}
            </div>
        )
    }

    function LoginForm()
    {
        return (
            <div className="login-form-container">
                <div 
                    className="title-text"
                    style = {{
                        marginTop: "20px",
                        marginLeft: "0",
                        fontSize: "1.5em"
                    }}
                >{"Login"}</div>
                <form 
                    onSubmit={(event)=> {
                        event.preventDefault()

                        if(!inputErrorMessage.includes('Invalid Crendentials'))
                        {
                            setInputErrorMessage('');
                        }
                             
                        let canSend = true;
                        if(emailInput === '')
                        {
                            setInputErrorMessage(prev=> prev+'\nPlease provide a valid email.')
                            canSend = false;
                        }
                        if(passwordInput === '')
                        {
                            setInputErrorMessage(prev=> prev+'\nPlease provide a valid password.')
                            canSend = false;
                        }

                        if(canSend)
                        {
                            setLoginRequest({
                                email: emailInput,
                                password: passwordInput,
                                initialized: true
                            })
                        }
                    }}
                    className = "login-input-form"
                >
                <div className="field">
                    <input 
                    className= {emailInput === '' ? 'empty': 'not-empty'}
                    
                    autoComplete = "new-password"
                    autoFocus = {false}
                    id = "email-text-input"
                    type="text" 
                
                    value={emailInput}
                    onChange={(e)=> { 
                        setEmailInput( e.target.value)
                    }}
                    />
                    <label 
                        htmlFor = "email-text-input"
                        className= {emailInput === '' ? 'empty' : 'not-empty'}
                    >{"Email"}</label>
                    </div>
                    <div className="field">
                    {passwordInput !== '' && 
                    <div 
                        className="login-show-password-button"
                        onClick={() => {setShowPassword(prev => !prev)}  }  
                    >{showPassword ? "Hide" : "Show"}</div>}
                    <input 
                        className= {passwordInput === '' ? 'empty': 'not-empty'}
                        style = {{
                            marginBottom : inputErrorMessage === '' ? '20px' : '0'
                        }}
                        autoComplete = "new-password"
                        autoFocus = {false}
                        id = "password-text-input"
                        type= {showPassword ? "text" : "password"} 
                       
                        value={passwordInput}
                        onChange={(e)=> { 
                            setPasswordInput( e.target.value)
                        }}
                    />
                     <label 
                        htmlFor = "password-text-input"
                        className= {passwordInput === '' ? 'empty' : 'not-empty'}    
                    >{"Password"}</label>
                     </div>
                     {inputErrorMessage !== '' && GetErrorDivs()} 

                     <div 
                    className="row-flex"
                    style={{
                        width: "100%",
                        padding: "0",
                        marginTop: "5px",
                        marginBottom: "50px",
                        flexDirection: "row-reverse"
                    }}
                >
                    <input 
                        type = "submit"
                        value={"Login"}
                    ></input>
                    </div>
                </form>
                
                <div 
                    className="row-flex"
                    style={{
                        padding: "0",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <div className="title-text">{"Don't have an account?"}</div>
                    <div 
                        style={{cursor: "pointer"}}
                        className="title-text"
                        onClick={()=>{
                            setRegister(true);
                            setEmailInput('');
                            setUsernameInput('');
                            setPasswordInput('');
                            setInputErrorMessage('');
                        }}
                    >{"Register"}
                    </div>
                </div>

            </div>
        )
    }

    function RegisterForm()
    {

        return (
            <div className="login-form-container"> 
                <div 
                    className="title-text"
                    style = {{
                        marginTop: "20px",
                        marginLeft: "0",
                        fontSize: "1.5em"
                    }}
                >{"Register"}</div>
                <form 
                    onSubmit={(event)=> {
                        event.preventDefault()
                    
                        if(!inputErrorMessage.includes('Invalid Crendentials'))
                        {
                            setInputErrorMessage('');
                        }
                        
                        let canSend = true;
                        if(emailInput === '')
                        {
                            setInputErrorMessage(prev=> prev+'\nPlease provide a valid email.')
                            canSend = false;
                        }
                        if(usernameInput === '')
                        {
                            setInputErrorMessage(prev=> prev+'\nPlease provide a valid username.')
                            canSend = false;
                        }
                        if(passwordInput === '')
                        {
                            setInputErrorMessage(prev=> prev+'\nPlease provide a valid password.')
                            canSend = false;
                        }

                        if(canSend)
                        {
                            setRegistrationRequest({
                                userName: usernameInput,
                                email: emailInput,
                                password: passwordInput,
                                initialized: true
                            })
                        }
                    }}
                    className = "login-input-form"
                >
                    <div className="field">
                        <input 
                            className= {emailInput === '' ? 'empty': 'not-empty'}
                 
                            autoComplete = "new-password"
                            autoFocus = {false}
                            id = "email-text-input"
                            type="text" 
                            
                            value={emailInput}
                            onChange={(e)=> { 
                                setEmailInput( e.target.value)
                            }}
                        />
                        <label 
                            htmlFor = "email-text-input"
                            className= {emailInput === '' ? 'empty' : 'not-empty'}
                        >{"Email"}</label>
                    </div>
                    <div className="field">
                        <input 
                            className= {usernameInput === '' ? 'empty': 'not-empty'}
                            autoComplete = "new-password"
                            autoFocus = {false}
                            id = "username-text-input"
                            type="text" 
                        
                            value={usernameInput}
                            onChange={(e)=> { 
                                setUsernameInput( e.target.value)
                            }}
                        />
                        <label 
                            htmlFor = "username-text-input"
                            className= {usernameInput === '' ? 'empty' : 'not-empty'}
                        >{"Username"}</label>
                        </div>
                    <div className="field">
                    {passwordInput !== '' && 
                    <div 
                        className="login-show-password-button"
                        onClick={() => {setShowPassword(prev => !prev)}  }  
                    >{showPassword ? "Hide" : "Show"}</div>}
                    <input 
                        className= {passwordInput === '' ? 'empty': 'not-empty'}
                        style = {{
                            marginBottom : (inputErrorMessage === '' ? '20px' : '0px')
                        }}
                        autoComplete = "new-password"
                        autoFocus = {false}
                        id = "password-text-input"
                        type= {showPassword ? "text" : "password"} 
                       
                        value={passwordInput}
                        onChange={(e)=> { 
                            setPasswordInput( e.target.value)
                        }}
                    />
                     <label 
                        htmlFor = "password-text-input"
                        className= {passwordInput === '' ? 'empty' : 'not-empty'}    
                    >{"Password"}</label>
                     </div>
                     
                     {inputErrorMessage !== '' && GetErrorDivs()} 

                    <div 
                        className="row-flex"
                        style={{
                            width: "100%",
                            padding: "0",
                            marginTop: "5px",
                            marginBottom: "50px",
                            flexDirection: "row-reverse"
                        }}
                    >
                        <input 
                            style = {{
                                width: "35%",
                                marginBottom: inputErrorMessage === '' ? '0' : '-25px'
                            }}
                            type = "submit"
                            value={"Register"}
                        ></input>
                    </div>

                </form>


                <div 
                    className="row-flex"
                    style={{
                        padding: "0",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <div className="title-text">{"Already have an account?"}</div>
                    <div
                        style={{cursor: "pointer"}}
                        className="title-text"
                        onClick={()=>{
                            setRegister(false);
                            setEmailInput('');
                            setUsernameInput('');
                            setPasswordInput('');
                            setInputErrorMessage('');
                        }}
                    >{"Sign In"}
                    </div>
                </div>


            </div>
        )
    }

    return (
        register ? RegisterForm() : LoginForm()
    )
}