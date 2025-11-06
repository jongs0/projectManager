package Dreamteam.GroupProject1.dto.task;

import Dreamteam.GroupProject1.models.Task;

public record TaskUpdateDTO(

        String name,
        String body

) {
    public void updateTask(Task task) {

        if (name != null) task.setName(name);
        if (body != null) task.setBody(body);
    }
}
