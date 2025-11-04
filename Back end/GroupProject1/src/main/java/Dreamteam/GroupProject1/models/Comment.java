package Dreamteam.GroupProject1.models;

import jakarta.persistence.*;

@Entity
public class Comment {
    @GeneratedValue
    @Id
    private Long id;
    private String body;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;

    public Long getId() {
        return id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public AppUser getUser() { return user; }

    public void setUser(AppUser user) {
        this.user = user;
    }

    public Task getTask() { return task; }

    public void setTask(Task task) {
        this.task = task;
    }

}
