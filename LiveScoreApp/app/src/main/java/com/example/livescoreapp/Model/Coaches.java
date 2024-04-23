package com.example.livescoreapp.Model;

public class Coaches {

    int coachId;
    String coachName;
    String gender;
    String imageUrl;
    String coachEmail;
    String contactNo;
    String experience;
    String achievements;

    public Coaches(int coachId, String coachName, String gender, String imageUrl, String coachEmail, String contactNo, String experience, String achievements) {
        this.coachId = coachId;
        this.coachName = coachName;
        this.gender = gender;
        this.imageUrl = imageUrl;
        this.coachEmail = coachEmail;
        this.contactNo = contactNo;
        this.experience = experience;
        this.achievements = achievements;
    }

    public int getCoachId() {
        return coachId;
    }

    public void setCoachId(int coachId) {
        this.coachId = coachId;
    }

    public String getCoachName() {
        return coachName;
    }

    public void setCoachName(String coachName) {
        this.coachName = coachName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCoachEmail() {
        return coachEmail;
    }

    public void setCoachEmail(String coachEmail) {
        this.coachEmail = coachEmail;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getAchievements() {
        return achievements;
    }

    public void setAchievements(String achievements) {
        this.achievements = achievements;
    }
}