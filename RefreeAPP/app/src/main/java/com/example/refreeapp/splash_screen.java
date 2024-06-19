package com.example.refreeapp;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import androidx.appcompat.app.AppCompatActivity;

public class splash_screen extends AppCompatActivity {

    private static final long SPLASH_DELAY_MS = 2000; // 2 seconds

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);

        // Delayed execution for splash screen
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                // Start MainActivity after delay
                Intent intent = new Intent(splash_screen.this, MainActivity.class);
                startActivity(intent);
                finish(); // Close splash activity to prevent back navigation
            }
        }, SPLASH_DELAY_MS);
    }
}
