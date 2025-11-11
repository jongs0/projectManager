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

    @Enumerated
    private Role role;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "team_members",
            joinColumns = @JoinColumn(name = "app_user_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id"))
    private List<Team> teams = new ArrayList<>();

    @ManyToMany(mappedBy = "watchingUsers")
    private List<Task> watchedTasks = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();

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

    public List<Comment> getComments() {
        return comments;
    }

    public List<Task> getWatchedTasks() {
        return watchedTasks;
    }

    public void setWatchedTasks(List<Task> watchedTasks) {
        this.watchedTasks = watchedTasks;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public boolean hasRole(Role role) {
        return this.role == role;
    }
}

