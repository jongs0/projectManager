package Dreamteam.GroupProject1.models;

import jakarta.persistence.*;

@Entity
public class Project {
    @GeneratedValue
    @Id
    Long id;

    String name;

    @OneToMany
    Task task;
    

}
