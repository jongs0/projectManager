package Dreamteam.GroupProject1.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Task {
    @GeneratedValue
    @Id
    private Long id;
    private String name;
    private String body;

    @ManyToMany
    @JoinTable(name = "task_watchers",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<AppUser> watchingUsers = new ArrayList<>();

    @OneToMany(mappedBy = "task")
    private List<Comment> comments = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public List<AppUser> getUsers() {
        return watchingUsers;
    }

    public List<Comment> getComments() {
        return comments;
    }


}
