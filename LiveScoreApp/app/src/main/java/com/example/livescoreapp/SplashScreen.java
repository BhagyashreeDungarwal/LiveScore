package com.example.livescoreapp;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class SplashScreen extends AppCompatActivity {
    TextView title;
    ImageView logo;
    Animation Splash_top,Splash_bottom;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_splash_screen);

        title = findViewById(R.id.title);
        logo = findViewById(R.id.logo);

        Splash_top = AnimationUtils.loadAnimation(this, R.anim.bottom_anim);
        Splash_bottom = AnimationUtils.loadAnimation(this, R.anim.top_anim);

        logo.setAnimation(Splash_top);
        title.setAnimation(Splash_bottom);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(SplashScreen.this, Athletes.class);
                startActivity(intent);
                finish();
            }
        }, 3000);
    }
}