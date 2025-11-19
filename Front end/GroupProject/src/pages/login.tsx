import { currentUser, updateUser } from "../stores/userStore.ts"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../api/config.ts";
import { useMutation } from "@tanstack/react-query";
import type { AppUserLoginDTO } from "../types/models.js";
import RegisterComponent from "../components/RegisterComponent.tsx";

const Login = () => {
    
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });
    
    const [isRegistering, setIsRegistering] = useState(false);
    
    const navigate = useNavigate();
    
    
    const handleLogin = useMutation({
        mutationFn: async (dto: AppUserLoginDTO) => {
            const res = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto),
            });
            if (!res.ok) throw new Error("Login failed");
            return res.json();
        },
        onSuccess: (user) => {
            updateUser({
                email: user.email,
                password: "",
                id: user.id
            });
            navigate("/projects");
        },
        onError: () => {
            console.log("Login failed: user not found");
        },
    });
    
    
    return (
        
        
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh"}}>
        
        {!isRegistering && (
            <>
            <input
            type="text"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            placeholder="Enter email"
            />
            
            <input   
            type="text"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value})}
            placeholder="Enter password"
            />
            
            
            <button onClick={() => handleLogin.mutate(login)} disabled={handleLogin.isPending}>
            {handleLogin.isPending ? "Logging in..." : "Login"} 
            </button>
            
            
            
            <button onClick={() => setIsRegistering(true)}>
            Go to Register
            </button>
            </>
        )}
        
        {isRegistering && (
            <>
            <RegisterComponent/>
            <button onClick={() => setIsRegistering(false)}>Go back</button>

            </>
        )}
        
        </div>
    )
}


export default Login
