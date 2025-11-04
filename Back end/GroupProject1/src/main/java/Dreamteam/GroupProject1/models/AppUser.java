package Dreamteam.GroupProject1.models;

import Dreamteam.GroupProject1.models.enums.Role;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class AppUser {

    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private Role role;

    @ManyToMany(mappedBy = "appUser")
    List<Team> teams = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Team> getTeams() {
        return teams;
    }
}

