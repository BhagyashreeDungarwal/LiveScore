package com.example.livescoreapp.Model;

import java.util.Date;

public class Matchs {

    int mId;
    String matchStatus;
    String matchType;
    int numberOfRound;
    Date matchDate;
    Date matchTime;
    int athleteRed;
    int athleteBlue;
    int categoryId;
    int tournamentId;

    public Matchs(int mId, String matchStatus, String matchType, int numberOfRound, Date matchDate, Date matchTime, int athleteRed, int athleteBlue, int categoryId, int tournamentId) {
        this.mId = mId;
        this.matchStatus = matchStatus;
        this.matchType = matchType;
        this.numberOfRound = numberOfRound;
        this.matchDate = matchDate;
        this.matchTime = matchTime;
        this.athleteRed = athleteRed;
        this.athleteBlue = athleteBlue;
        this.categoryId = categoryId;
        this.tournamentId = tournamentId;
    }

    public int getmId() {
        return mId;
    }

    public void setmId(int mId) {
        this.mId = mId;
    }

    public String getMatchStatus() {
        return matchStatus;
    }

    public void setMatchStatus(String matchStatus) {
        this.matchStatus = matchStatus;
    }

    public String getMatchType() {
        return matchType;
    }

    public void setMatchType(String matchType) {
        this.matchType = matchType;
    }

    public int getNumberOfRound() {
        return numberOfRound;
    }

    public void setNumberOfRound(int numberOfRound) {
        this.numberOfRound = numberOfRound;
    }

    public Date getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(Date matchDate) {
        this.matchDate = matchDate;
    }

    public Date getMatchTime() {
        return matchTime;
    }

    public void setMatchTime(Date matchTime) {
        this.matchTime = matchTime;
    }

    public int getAthleteRed() {
        return athleteRed;
    }

    public void setAthleteRed(int athleteRed) {
        this.athleteRed = athleteRed;
    }

    public int getAthleteBlue() {
        return athleteBlue;
    }

    public void setAthleteBlue(int athleteBlue) {
        this.athleteBlue = athleteBlue;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public int getTournamentId() {
        return tournamentId;
    }

    public void setTournamentId(int tournamentId) {
        this.tournamentId = tournamentId;
    }
}