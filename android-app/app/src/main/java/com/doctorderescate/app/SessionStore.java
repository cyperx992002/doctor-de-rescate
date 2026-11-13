package com.doctorderescate.app;

import android.content.Context;
import android.content.SharedPreferences;
import android.security.keystore.KeyGenParameterSpec;
import android.security.keystore.KeyProperties;
import android.util.Base64;
import android.util.Log;

import java.nio.charset.StandardCharsets;
import java.security.KeyStore;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

final class SessionStore {
    private static final String PREFERENCES = "doctor_rescate_session";
    private static final String TOKEN_KEY = "encrypted_token";
    private static final String OAUTH_VERIFIER_KEY = "encrypted_oauth_verifier";
    private static final String USERNAME_KEY = "username";
    private static final String KEYSTORE_ALIAS = "doctor_rescate_session_key";
    private final SharedPreferences preferences;

    SessionStore(Context context) {
        preferences = context.getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE);
    }

    String token() {
        return decryptStored(TOKEN_KEY);
    }

    String oauthVerifier() {
        return decryptStored(OAUTH_VERIFIER_KEY);
    }

    private String decryptStored(String key) {
        String encoded = preferences.getString(key, null);
        if (encoded == null) return null;
        try {
            byte[] encrypted = Base64.decode(encoded, Base64.NO_WRAP);
            byte[] iv = new byte[12];
            System.arraycopy(encrypted, 0, iv, 0, iv.length);
            byte[] ciphertext = new byte[encrypted.length - iv.length];
            System.arraycopy(encrypted, iv.length, ciphertext, 0, ciphertext.length);
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.DECRYPT_MODE, secretKey(), new GCMParameterSpec(128, iv));
            return new String(cipher.doFinal(ciphertext), StandardCharsets.UTF_8);
        } catch (Exception exception) {
            Log.e("SessionStore", "Could not decrypt a stored session value.", exception);
            clear();
            return null;
        }
    }

    String username() {
        return preferences.getString(USERNAME_KEY, null);
    }

    void save(String token, String username) throws Exception {
        preferences.edit()
                .putString(TOKEN_KEY, encrypt(token))
                .putString(USERNAME_KEY, username)
                .apply();
    }

    void saveOAuthVerifier(String verifier) throws Exception {
        preferences.edit().putString(OAUTH_VERIFIER_KEY, encrypt(verifier)).apply();
    }

    void clearOAuthVerifier() {
        preferences.edit().remove(OAUTH_VERIFIER_KEY).apply();
    }

    private String encrypt(String value) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey());
        byte[] iv = cipher.getIV();
        byte[] ciphertext = cipher.doFinal(value.getBytes(StandardCharsets.UTF_8));
        byte[] encrypted = new byte[iv.length + ciphertext.length];
        System.arraycopy(iv, 0, encrypted, 0, iv.length);
        System.arraycopy(ciphertext, 0, encrypted, iv.length, ciphertext.length);
        return Base64.encodeToString(encrypted, Base64.NO_WRAP);
    }

    void clear() {
        preferences.edit().remove(TOKEN_KEY).remove(OAUTH_VERIFIER_KEY).remove(USERNAME_KEY).apply();
    }

    private SecretKey secretKey() throws Exception {
        KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
        keyStore.load(null);
        if (keyStore.containsAlias(KEYSTORE_ALIAS)) {
            return (SecretKey) keyStore.getKey(KEYSTORE_ALIAS, null);
        }
        KeyGenerator generator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore");
        generator.init(new KeyGenParameterSpec.Builder(
                KEYSTORE_ALIAS,
                KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT
        ).setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .setRandomizedEncryptionRequired(true)
                .build());
        return generator.generateKey();
    }
}
