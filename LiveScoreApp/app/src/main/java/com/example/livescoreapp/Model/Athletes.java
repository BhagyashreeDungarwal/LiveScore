package com.example.livescoreapp.Model;

import java.util.Date;

public class Athletes {

    int id;
    String athleteName;

    public Athletes(int id, String athleteName) {
        this.id = id;
        this.athleteName = athleteName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAthleteName() {
        return athleteName;
    }

    public void setAthleteName(String athleteName) {
        this.athleteName = athleteName;
    }
}