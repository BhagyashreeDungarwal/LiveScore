package com.example.livescoreapp.LSinterface;

import com.example.livescoreapp.Model.Athletes;
import com.example.livescoreapp.Model.Categories;
import com.example.livescoreapp.Model.Coaches;
import com.example.livescoreapp.Model.Matchscore;
import com.example.livescoreapp.Model.Tournaments;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface LSapi {

    @GET("Athletes/getAthelete")
    Call<List<Athletes>> getAthletes();

    @GET("Scores/GetScores")
    Call<List<Matchscore>> getmatchscore();

    @GET("Categories/GetCategories")
    Call<List<Categories>> getCategories();

    @GET("Coaches/GetCoaches")
    Call<List<Coaches>> getCoaches();

    @GET("Tournaments/GetTournaments")
    Call<List<Tournaments>> getTournaments();

}
