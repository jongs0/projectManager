package Dreamteam.GroupProject1.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Comment {
    @GeneratedValue
    @Id
    private Long id;
    private String body;
    @OneToOne
    private AppUser user;
    @OneToOne
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
