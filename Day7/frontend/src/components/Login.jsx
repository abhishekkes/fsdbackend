import {Link, Navigate} from "react-router-dom"
const Login = () => {
    const handlelogin =async (e) => {
        try{
            e.preventDefault();
            const email = e.target.emailid.value;
            const password = e.target.password.value;
            const response=await fetch("http://localhost:8000/api/login",{
                method:"POST",
                credentials: "include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,password})
            });
            const data=await response.json();
            alert(JSON.stringify(data));
            
        }
        catch(error){
            alert("Error in Login:", error);
        }
       
        
        
    }

  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={handlelogin}>
            <label>Username:</label>
            <input type="email" name="emailid" required />
            <br />
            <label>Password:</label>
            <input type="password" name="password" required />
            <br />
            <button type='submit'>Login</button>
        </form>
        <Link to="/signup" >Sign Up</Link>
      
    </div>
  )
}

export default Login
