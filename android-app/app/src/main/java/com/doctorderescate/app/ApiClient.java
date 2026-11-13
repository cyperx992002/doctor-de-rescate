package com.doctorderescate.app;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

final class ApiClient {
    private static final int CONNECT_TIMEOUT_MS = 15000;
    private static final int READ_TIMEOUT_MS = 45000;
    private final String baseUrl;
    private final SessionStore sessionStore;

    ApiClient(String baseUrl, SessionStore sessionStore) {
        this.baseUrl = baseUrl.replaceAll("/+$", "");
        this.sessionStore = sessionStore;
    }

    JSONObject request(String path, String method, JSONObject payload) throws IOException, JSONException {
        HttpURLConnection connection = (HttpURLConnection) new URL(baseUrl + path).openConnection();
        connection.setRequestMethod(method);
        connection.setConnectTimeout(CONNECT_TIMEOUT_MS);
        connection.setReadTimeout(READ_TIMEOUT_MS);
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
        String token = sessionStore.token();
        if (token != null && !token.isEmpty()) {
            connection.setRequestProperty("Authorization", "Bearer " + token);
        }
        if (payload != null) {
            connection.setDoOutput(true);
            byte[] body = payload.toString().getBytes(StandardCharsets.UTF_8);
            try (OutputStream output = connection.getOutputStream()) {
                output.write(body);
            }
        }

        int status;
        String responseBody;
        try {
            status = connection.getResponseCode();
            InputStream stream = status >= 200 && status < 300
                    ? connection.getInputStream()
                    : connection.getErrorStream();
            responseBody = stream == null ? "" : readFully(stream);
        } finally {
            connection.disconnect();
        }
        JSONObject result = responseBody.isEmpty() ? new JSONObject() : new JSONObject(responseBody);
        if (status < 200 || status >= 300) {
            String detail = result.optString("detail", "Request failed (" + status + ").");
            throw new ApiException(status, detail);
        }
        return result;
    }

    private static String readFully(InputStream input) throws IOException {
        try (InputStream source = input; ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[8192];
            int count;
            while ((count = source.read(buffer)) != -1) {
                output.write(buffer, 0, count);
            }
            return output.toString(StandardCharsets.UTF_8.name());
        }
    }

    static final class ApiException extends IOException {
        final int statusCode;

        ApiException(int statusCode, String message) {
            super(message);
            this.statusCode = statusCode;
        }
    }
}
