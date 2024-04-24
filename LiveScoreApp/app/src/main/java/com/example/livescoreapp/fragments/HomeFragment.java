package com.example.livescoreapp.fragments;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.example.livescoreapp.LSinterface.LSapi;
import com.example.livescoreapp.Model.Athletes;
import com.example.livescoreapp.Model.Matchscore;
import com.example.livescoreapp.R;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class HomeFragment extends Fragment {

    TextView list;
    String URL = "http://192.168.233.1:5032/api/";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_home, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        list = view.findViewById(R.id.list);

        list.setText("");

        Retrofit retrofit = new Retrofit.Builder().baseUrl(URL).addConverterFactory(GsonConverterFactory.create()).build();

        LSapi api = retrofit.create(LSapi.class);

        Call<List<Athletes>> call = api.getAthletes();
        call.enqueue(new Callback<List<Athletes>>() {
            @Override
            public void onResponse(Call<List<Athletes>> call, Response<List<Athletes>> response) {

                List<Athletes> mdata = response.body();
                for (int i = 0; i < mdata.size(); i++) {
                    list.append("scoreId : " + mdata.get(i).getAthleteName());
                    Toast.makeText(getActivity(),"Data Is Empty", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<List<Athletes>> call, Throwable t) {
                Toast.makeText(getActivity(), t.toString(), Toast.LENGTH_LONG).show();
            }
        });
    }
}