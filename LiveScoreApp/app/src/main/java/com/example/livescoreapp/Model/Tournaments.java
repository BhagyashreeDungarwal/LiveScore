package com.example.livescoreapp.Model;

import java.util.Date;

public class Tournaments {

    int tId;
    String tournamentName;
    String location;
    Date tournamentDate;
    int categoryId;

    public Tournaments(int tId, String tournamentName, String location, Date tournamentDate, int categoryId) {
        this.tId = tId;
        this.tournamentName = tournamentName;
        this.location = location;
        this.tournamentDate = tournamentDate;
        this.categoryId = categoryId;
    }

    public int gettId() {
        return tId;
    }

    public void settId(int tId) {
        this.tId = tId;
    }

    public String getTournamentName() {
        return tournamentName;
    }

    public void setTournamentName(String tournamentName) {
        this.tournamentName = tournamentName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getTournamentDate() {
        return tournamentDate;
    }

    public void setTournamentDate(Date tournamentDate) {
        this.tournamentDate = tournamentDate;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
}