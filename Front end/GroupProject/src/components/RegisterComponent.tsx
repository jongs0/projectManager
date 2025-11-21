import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../api/config.ts";
import { useMutation } from "@tanstack/react-query";
import type { AppUserCreateDTO } from "../types/models.js";
import { currentUser, updateUser } from "../stores/userStore.ts"
import { Form, FormSelect } from "react-bootstrap";
import type { Role } from "../types/models.js";



const RegisterComponent = () => {
    
    const [register, setRegister] = useState({
        email: "",
        tempPassword: "",
        verifiedPassword: "",
        role: "" as Role
    });
    
    const passwordsMatch =
    register.tempPassword.length > 0 &&
    register.verifiedPassword.length > 0 &&
    register.tempPassword === register.verifiedPassword;
    
    const navigate = useNavigate();
    
    const handleRegistration = useMutation({
        mutationFn: async (dto: AppUserCreateDTO) => {
            const res = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dto),
            });
            if (!res.ok) throw new Error("Registration failed");
            return res.json();    
        },
        
        onSuccess: (user) => {
            updateUser(user)
            navigate("/projects")
        },
        onError: () => {
            console.log("Registration failed: try again");
        }
        
    })
    
    return (
        
        <div>
    


        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
        
        <p>Email:</p>
        <input 
        type="text"
        value={register.email}
        onChange={(e) => setRegister({ ...register, email: e.target.value})}
        placeholder="Enter email"
        />
        <p>Password</p>
        <input 
        type="password"
        value={register.tempPassword}
        onChange={(e) => setRegister({ ...register, tempPassword: e.target.value})}
        placeholder="Enter password"
        />
        
        <p>Verify password</p>
        <input 
        type="password"
        value={register.verifiedPassword}
        onChange={(e) => setRegister({ ...register, verifiedPassword: e.target.value})}
        placeholder="Verify password"
        />
        
        <p>Select your role</p>
        <Form.Select aria-label="Select your role"
        value={register.role}
        onChange={(e) => setRegister({ ...register, role: e.target.value as Role })}
        >
        
        <option value="">Choose your role</option>
        <option value="CLIENT">Client</option>
        <option value="DEVELOPER">Developer</option>
        <option value="PROJECTMANAGER">Project Manager</option>
        
        
        
        </Form.Select>
        
        {!passwordsMatch && register.verifiedPassword.length > 0 && (
            <p style={{color: "red" }}> Passwords do not match </p>
        )}
        
        <button 
        disabled={handleRegistration.isPending || !passwordsMatch || !register.role || register.email === ""} 
        onClick={() => {
            const registerDto: AppUserCreateDTO = {
                email: register.email,
                password: register.verifiedPassword,
                role: register.role
            };
            console.log(registerDto);

            handleRegistration.mutate(registerDto);
        }}
        >
        {handleRegistration.isPending ? "Registering..." : "Register"}
        </button>

        </div>
        </div>
    );
};

export default RegisterComponent