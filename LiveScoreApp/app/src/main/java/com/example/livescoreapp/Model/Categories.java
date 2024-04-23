package com.example.livescoreapp.Model;

public class Categories {

    int id;
    String categoryName;
    int categoryTime;

    public Categories(int id, String categoryName, int categoryTime) {
        this.id = id;
        this.categoryName = categoryName;
        this.categoryTime = categoryTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public int getCategoryTime() {
        return categoryTime;
    }

    public void setCategoryTime(int categoryTime) {
        this.categoryTime = categoryTime;
    }
}