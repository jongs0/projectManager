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
        <div style={{ display:"flex", flexDirection:"column", }}>
        
        Email:
        <input 
        type="text"
        value={register.email}
        onChange={(e) => setRegister({ ...register, email: e.target.value})}
        placeholder="Enter email"
        style={{
                        width: "300px",
                        height: "40px",
                        padding: "8px",
                        borderRadius: "8px",
                        color: "white",
                        border: "2px solid white"
                    }}
        />

        Enter your password:
        <input 
        type="password"
        value={register.tempPassword}
        onChange={(e) => setRegister({ ...register, tempPassword: e.target.value})}
        placeholder="Enter password"
        style={{
                        width: "300px",
                        height: "40px",
                        padding: "8px",
                        borderRadius: "8px",
                        color: "white",
                        border: "2px solid white"
                    }}
        />
        
        
        Verify your password:
        <input 
        type="password"
        value={register.verifiedPassword}
        onChange={(e) => setRegister({ ...register, verifiedPassword: e.target.value})}
        placeholder="Verify password"
          style={{
                        width: "300px",
                        height: "40px",
                        padding: "8px",
                        borderRadius: "8px",
                        color: "white",
                        border: "2px solid white"
                    }}
        />
        
        Select your role:
        <Form.Select aria-label="Select your role"
        value={register.role}
        onChange={(e) => setRegister({ ...register, role: e.target.value as Role })}
        style={{
                        width: "300px",
                        height: "45px",
                        padding: "6px",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        border: "2px solid white"
                    }}
        >
        
        <option value="">Choose your role</option>
        <option value="CLIENT">Client</option>
        <option value="DEVELOPER">Developer</option>
        <option value="PROJECTMANAGER">Project Manager</option>
        
        
        
        </Form.Select>
        
        {!passwordsMatch && register.verifiedPassword.length > 0 && (
            <p style={{color: "red" }}> Passwords do not match </p>
        )}
        
        <div style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "10px",
                    justifyContent: "center"
                }}>

        </div>
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

        style={{
                            width: "140px",
                height: "40px",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                        }}

        >
        {handleRegistration.isPending ? "Registering..." : "Register"}
        </button>

        </div>
        </div>
    );
};

export default RegisterComponent