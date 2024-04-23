package com.example.livescoreapp.Model;

import java.time.LocalDateTime;

public class Matchscore {

    int scoreId;
    int redPoints;
    int bluePoints;
    String scoreType;
    String penaltyPlayer;
    String penalty;
    LocalDateTime scoreTime;
    LocalDateTime penaltyTime;
    int rounds;
    int athleteRed;
    int athleteBlue;

    public Matchscore(int scoreId, int redPoints, int bluePoints, String scoreType, String penaltyPlayer, String penalty, LocalDateTime scoreTime, LocalDateTime penaltyTime, int rounds, int athleteRed, int athleteBlue) {
        this.scoreId = scoreId;
        this.redPoints = redPoints;
        this.bluePoints = bluePoints;
        this.scoreType = scoreType;
        this.penaltyPlayer = penaltyPlayer;
        this.penalty = penalty;
        this.scoreTime = scoreTime;
        this.penaltyTime = penaltyTime;
        this.rounds = rounds;
        this.athleteRed = athleteRed;
        this.athleteBlue = athleteBlue;
    }

    public int getScoreId() {
        return scoreId;
    }

    public void setScoreId(int scoreId) {
        this.scoreId = scoreId;
    }

    public int getRedPoints() {
        return redPoints;
    }

    public void setRedPoints(int redPoints) {
        this.redPoints = redPoints;
    }

    public int getBluePoints() {
        return bluePoints;
    }

    public void setBluePoints(int bluePoints) {
        this.bluePoints = bluePoints;
    }

    public String getScoreType() {
        return scoreType;
    }

    public void setScoreType(String scoreType) {
        this.scoreType = scoreType;
    }

    public String getPenaltyPlayer() {
        return penaltyPlayer;
    }

    public void setPenaltyPlayer(String penaltyPlayer) {
        this.penaltyPlayer = penaltyPlayer;
    }

    public String getPenalty() {
        return penalty;
    }

    public void setPenalty(String penalty) {
        this.penalty = penalty;
    }

    public LocalDateTime getScoreTime() {
        return scoreTime;
    }

    public void setScoreTime(LocalDateTime scoreTime) {
        this.scoreTime = scoreTime;
    }

    public LocalDateTime getPenaltyTime() {
        return penaltyTime;
    }

    public void setPenaltyTime(LocalDateTime penaltyTime) {
        this.penaltyTime = penaltyTime;
    }

    public int getRounds() {
        return rounds;
    }

    public void setRounds(int rounds) {
        this.rounds = rounds;
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
}