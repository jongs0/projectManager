package Dreamteam.GroupProject1.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Task {
    @GeneratedValue
    @Id
    private Long id;
    private String name;
    private String description;
    private boolean done;

    @ManyToMany
    @JoinTable(name = "task_watchers",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<AppUser> watchingUsers = new ArrayList<>();

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<AppUser> getWatchingUsers() {
        return watchingUsers;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setWatchingUsers(List<AppUser> watchingUsers) {
        this.watchingUsers = watchingUsers;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public void addWatchingUser(AppUser user) {
        watchingUsers.add(user);
    }

    public void removeWatchingUser(AppUser user) {
        watchingUsers.remove(user);
    }
}
