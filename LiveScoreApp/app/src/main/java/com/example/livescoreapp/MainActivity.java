package com.example.livescoreapp;

import android.annotation.SuppressLint;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.example.livescoreapp.databinding.ActivityMainBinding;
import com.example.livescoreapp.fragments.AboutFragment;
import com.example.livescoreapp.fragments.HomeFragment;
import com.example.livescoreapp.fragments.ListFragment;
import com.example.livescoreapp.fragments.SearchFragment;

public class MainActivity extends AppCompatActivity {

    private ActivityMainBinding binding;

    @SuppressLint("NonConstantResourceId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        replaceFragment(new HomeFragment());

        binding.bottomNavigationView.setOnItemSelectedListener(item -> {

            int itemId = item.getItemId();

            if (itemId == R.id.home) {
                replaceFragment(new HomeFragment());
            } else if (itemId == R.id.search) {
                replaceFragment(new SearchFragment());
            } else if (itemId == R.id.match) {
                replaceFragment(new ListFragment());
            } else if (itemId == R.id.about) {
                replaceFragment(new AboutFragment());
            }
            return true;
        });
    }

    private void replaceFragment(Fragment fragment) {
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction ft = fragmentManager.beginTransaction();
        ft.replace(R.id.frame_layout, fragment);
        ft.commit();
    }
}
