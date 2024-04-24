package com.example.livescoreapp;

import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.livescoreapp.LSinterface.LSapi;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class Athletes extends AppCompatActivity {

    TextView tv1;
    String URL = "http://192.168.0.101:5032/api/";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_athletes);

        tv1  = findViewById(R.id.tv1);

        Retrofit retrofit = new Retrofit.Builder().baseUrl(URL).addConverterFactory(GsonConverterFactory.create()).build();

        LSapi api = retrofit.create(LSapi.class);

        Call<List<com.example.livescoreapp.Model.Athletes>> call = api.getAthletes();
        call.enqueue(new Callback<List<com.example.livescoreapp.Model.Athletes>>() {
            @Override
            public void onResponse(Call<List<com.example.livescoreapp.Model.Athletes>> call, Response<List<com.example.livescoreapp.Model.Athletes>> response) {

                List<com.example.livescoreapp.Model.Athletes> mdata = response.body();
                for (int i = 0; i < mdata.size(); i++) {
                    tv1.append("Athletes Name : " + mdata.get(i).getAthleteName());
                    Toast.makeText(Athletes.this,"Data Is Empty", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<List<com.example.livescoreapp.Model.Athletes>> call, Throwable t) {
                Toast.makeText(Athletes.this, t.toString(), Toast.LENGTH_LONG).show();
            }
        });

    }
}