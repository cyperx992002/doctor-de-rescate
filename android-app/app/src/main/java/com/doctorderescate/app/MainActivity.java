package com.doctorderescate.app;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.util.Base64;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public final class MainActivity extends Activity {
    private static final int REQUEST_IMAGE = 101;
    private static final int REQUEST_VOICE_GUIDE = 102;
    private static final int REQUEST_VOICE_CHAT = 103;
    private static final int RED = Color.rgb(215, 25, 45);
    private static final int RED_DARK = Color.rgb(168, 20, 36);
    private static final int INK = Color.rgb(32, 28, 32);
    private static final int SOFT_INK = Color.rgb(97, 88, 92);
    private static final int PAPER = Color.rgb(244, 241, 242);
    private static final int LINE = Color.rgb(227, 218, 221);
    private static final String[] GUIDE_IDS = {"bleeding", "burn", "choking", "fracture", "unresponsive"};
    private static final String[] GUIDE_ICONS = {"✚", "♨", "◉", "⌁", "♡"};
    private static final Map<String, String[]> COPY = new HashMap<>();

    static {
        addCopy("brand", "دكتور الإنقاذ", "Doctor de Rescate", "Doctor de Rescate");
        addCopy("subtitle", "إسعاف أولي واضح وقت الحاجة", "Clear first aid when it matters", "Primeros auxilios claros cuando importan");
        addCopy("account", "حسابي", "Account", "Cuenta");
        addCopy("urgentTitle", "اتصل بالإسعاف أولاً.", "Call emergency services first.", "Llama primero a emergencias.");
        addCopy("urgentCopy", "في مصر، اتصل على ١٢٣. شغّل مكبر الصوت واتبع تعليمات موظف الطوارئ.", "In Egypt, call 123 for an ambulance. Turn on speakerphone and follow the operator’s instructions.", "En Egipto, llama al 123. Activa el altavoz y sigue las instrucciones.");
        addCopy("call", "اتصل بالإسعاف ١٢٣", "Call ambulance 123", "Llamar a la ambulancia 123");
        addCopy("outside", "إذا لم تكن في مصر، استخدم رقم الطوارئ المحلي.", "Outside Egypt? Call your local emergency number.", "Fuera de Egipto, llama al número local de emergencias.");
        addCopy("voiceTitle", "مساعد صوتي", "Voice assistant", "Asistente de voz");
        addCopy("voiceIntro", "صِف الحالة بصوتك للعثور على دليل إسعاف مناسب.", "Describe what happened to find a built-in first-aid guide.", "Describe lo ocurrido para encontrar una guía de primeros auxilios.");
        addCopy("voiceStart", "ابدأ التحدث", "Speak now", "Hablar ahora");
        addCopy("voicePrivacy", "قد يعالج الجهاز الصوت للتعرّف على الكلام. لا تذكر معلومات شخصية. لا يحفظ التطبيق التسجيلات.", "Speech recognition may be processed by your device or its service. Avoid personal details; the app does not save recordings.", "El dispositivo o su servicio puede procesar el audio. No menciones datos personales; la app no guarda grabaciones.");
        addCopy("guideHeading", "ما الذي حدث؟", "What happened?", "¿Qué ocurrió?");
        addCopy("guideIntro", "اختر الحالة لعرض خطوات أولية بسيطة.", "Choose a situation for simple first steps.", "Elige una situación para ver los primeros pasos.");
        addCopy("offline", "متاح دون إنترنت", "Available offline", "Disponible sin conexión");
        addCopy("assistantTitle", "مساعد الطوارئ الذكي", "AI emergency assistant", "Asistente de emergencias con IA");
        addCopy("assistantIntro", "اسأل عن حالة غير موجودة في القائمة. لا يقدّم التطبيق تشخيصاً طبياً.", "Ask about a case that is not listed. The app does not provide a medical diagnosis.", "Pregunta sobre un caso no incluido. La app no ofrece diagnósticos médicos.");
        addCopy("inputHint", "اكتب الحالة أو الأعراض...", "Describe the case or symptoms...", "Describe el caso o los síntomas...");
        addCopy("send", "إرسال", "Send", "Enviar");
        addCopy("attach", "إرفاق صورة", "Add photo", "Añadir foto");
        addCopy("chatWelcome", "أنا مساعد الطوارئ. اذكر ما حدث والأعراض. إذا كان الشخص فاقداً للوعي أو لا يتنفس أو لديه نزيف شديد، اتصل بالإسعاف فوراً.", "I’m your emergency assistant. Tell me what happened and what symptoms you see. If the person is unconscious, not breathing, or bleeding severely, call emergency services immediately.", "Soy tu asistente de emergencias. Describe lo ocurrido y los síntomas. Si la persona está inconsciente, no respira o sangra mucho, llama a emergencias ahora.");
        addCopy("notice", "هذا الدليل لا يشخّص الإصابات ولا يستبدل الإسعاف أو الطبيب. لا ترسل معلومات أو صوراً حساسة. عند الشك أو تدهور الحالة، اتصل بالطوارئ.", "This guide does not diagnose injuries or replace emergency services or a clinician. Do not send sensitive information or photos. If unsure or the person gets worse, call emergency services.", "Esta guía no diagnostica ni sustituye a emergencias o a un profesional. No envíes información o fotos sensibles. Si hay dudas o empeora, llama a emergencias.");
        addCopy("back", "كل الحالات", "All situations", "Todas las situaciones");
        addCopy("login", "تسجيل الدخول", "Sign in", "Iniciar sesión");
        addCopy("register", "حساب جديد", "Create account", "Crear cuenta");
        addCopy("username", "اسم المستخدم", "Username", "Nombre de usuario");
        addCopy("password", "كلمة المرور", "Password", "Contraseña");
        addCopy("loginButton", "دخول", "Sign in", "Iniciar sesión");
        addCopy("createButton", "إنشاء الحساب", "Create account", "Crear cuenta");
        addCopy("google", "المتابعة باستخدام Google", "Continue with Google", "Continuar con Google");
        addCopy("facebook", "المتابعة باستخدام Facebook", "Continue with Facebook", "Continuar con Facebook");
        addCopy("social", "أو تابع باستخدام", "Or continue with", "O continúa con");
        addCopy("accountIntro", "يمكنك استخدام دليل الطوارئ دون حساب.", "You can use the emergency guide without an account.", "Puedes usar la guía de emergencias sin una cuenta.");
        addCopy("logout", "تسجيل الخروج", "Sign out", "Cerrar sesión");
        addCopy("welcome", "أهلاً", "Welcome", "Hola");
        addCopy("welcomeUser", "أهلاً %s", "Welcome, %s", "Hola, %s");
        addCopy("photoConsent", "ستُرسل الصورة إلى مساعد الذكاء الاصطناعي لتقديم إرشادات أولية. لا ترسل صوراً حساسة أو صور أشخاص دون موافقتهم. هل تريد المتابعة؟", "The photo will be sent to the AI assistant for first-aid guidance. Do not send sensitive images or another person’s photo without consent. Continue?", "La foto se enviará al asistente de IA para orientación inicial. No envíes imágenes sensibles ni fotos de otras personas sin su consentimiento. ¿Continuar?");
        addCopy("photo", "اختيار صورة", "Choose photo", "Elegir foto");
        addCopy("noPhoto", "لم يتم اختيار صورة.", "No photo was selected.", "No se seleccionó ninguna foto.");
        addCopy("voiceError", "تعذر استخدام التعرف على الصوت. تحقق من الإذن وحاول مجدداً.", "Speech recognition is unavailable. Check permission and try again.", "No se pudo usar el reconocimiento de voz. Comprueba el permiso e inténtalo de nuevo.");
        addCopy("voiceNoMatch", "لم أتعرف على الحالة. اختر دليلاً من القائمة أو اتصل بـ١٢٣.", "I couldn't match that to a guide. Choose one below or call 123.", "No encontré una guía adecuada. Elige una abajo o llama al 123.");
        addCopy("networkError", "تعذر الاتصال بالخادم. تحقق من اتصالك وحاول مجدداً.", "Could not reach the server. Check your connection and try again.", "No se pudo conectar con el servidor. Comprueba la conexión e inténtalo de nuevo.");
        addCopy("accountError", "تعذر تحميل بيانات الحساب. حاول مرة أخرى.", "Could not load your account. Please try again.", "No se pudo cargar la cuenta. Inténtalo de nuevo.");
        addCopy("invalidCredentials", "اسم المستخدم أو كلمة المرور غير صحيحة.", "Incorrect username or password.", "Nombre de usuario o contraseña incorrectos.");
        addCopy("genericError", "تعذر إكمال الطلب. حاول مرة أخرى.", "Could not complete the request. Please try again.", "No se pudo completar la solicitud. Inténtalo de nuevo.");
        addCopy("success", "تم", "Done", "Listo");
        addCopy("welcomeMessage", "اذكر الأعراض أو ما حدث، وسأساعدك بتحديد أول خطوة آمنة.", "Describe the symptoms or what happened, and I’ll help identify a safe first step.", "Describe los síntomas o lo ocurrido y te ayudaré a identificar un primer paso seguro.");
        addCopy("listen", "استمع", "Listen", "Escuchar");
        addCopy("stop", "إيقاف", "Stop", "Detener");
        addCopy("emptyChat", "اكتب وصفاً أو أرفق صورة أولاً.", "Type a description or attach a photo first.", "Escribe una descripción o adjunta una foto.");
        addCopy("offlineAi", "تحتاج ميزة المساعد الذكي إلى اتصال بالإنترنت.", "The AI assistant needs an internet connection.", "El asistente de IA necesita conexión a internet.");
    }

    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private SessionStore sessionStore;
    private ApiClient api;
    private JSONObject guides;
    private final List<ChatMessage> chatMessages = new ArrayList<>();
    private int languageIndex;
    private String selectedGuideId;
    private Uri selectedImage;
    private boolean changingLanguage;
    private TextToSpeech textToSpeech;
    private LinearLayout chatThread;
    private EditText chatInput;
    private TextView accountButton;
    private ScrollView pageScroll;

    private static void addCopy(String key, String arabic, String english, String spanish) {
        COPY.put(key, new String[]{arabic, english, spanish});
    }

    private String t(String key) {
        String[] values = COPY.get(key);
        return values == null ? key : values[languageIndex];
    }

    private String languageTag() {
        return languageIndex == 0 ? "ar-EG" : languageIndex == 2 ? "es-ES" : "en-US";
    }

    private boolean isRtl() {
        return languageIndex == 0;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(PAPER);
        getWindow().setNavigationBarColor(android.os.Build.VERSION.SDK_INT >= 27 ? PAPER : INK);
        sessionStore = new SessionStore(this);
        api = new ApiClient(BuildConfig.API_BASE_URL, sessionStore);
        languageIndex = getSharedPreferences("doctor_rescate", MODE_PRIVATE).getInt("language", 0);
        languageIndex = Math.max(0, Math.min(2, languageIndex));
        chatMessages.add(new ChatMessage(false, t("chatWelcome")));
        loadGuideData();
        textToSpeech = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                textToSpeech.setLanguage(Locale.forLanguageTag(languageTag()));
            }
        });
        renderHome();
        if (sessionStore.token() != null) verifyStoredSession();
        handleOAuthIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleOAuthIntent(intent);
    }

    @Override
    protected void onDestroy() {
        if (textToSpeech != null) textToSpeech.shutdown();
        executor.shutdown();
        super.onDestroy();
    }

    private void loadGuideData() {
        try (InputStream input = getAssets().open("guides.json");
             ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[8192];
            int count;
            while ((count = input.read(buffer)) != -1) output.write(buffer, 0, count);
            guides = new JSONObject(output.toString("UTF-8"));
        } catch (IOException | JSONException exception) {
            throw new IllegalStateException("Could not load the offline first-aid guides.", exception);
        }
    }

    private JSONObject currentGuides() throws JSONException {
        return guides.getJSONObject(languageIndex == 0 ? "ar" : languageIndex == 2 ? "es" : "en");
    }

    private void renderHome() {
        pageScroll = new ScrollView(this);
        pageScroll.setFillViewport(true);
        pageScroll.setBackgroundColor(PAPER);
        pageScroll.setOnApplyWindowInsetsListener((view, insets) -> {
            view.setPadding(0, insets.getSystemWindowInsetTop(), 0, insets.getSystemWindowInsetBottom());
            return insets.consumeSystemWindowInsets();
        });
        pageScroll.setLayoutDirection(isRtl() ? View.LAYOUT_DIRECTION_RTL : View.LAYOUT_DIRECTION_LTR);
        LinearLayout page = column();
        page.setPadding(dp(18), dp(14), dp(18), dp(26));
        pageScroll.addView(page);
        setContentView(pageScroll);
        addTopBar(page);
        addEmergencyCard(page);
        addVoiceCard(page);
        addGuides(page);
        if (selectedGuideId != null) addGuideDetail(page);
        addAssistant(page);
        addNotice(page);
    }

    private void addTopBar(LinearLayout page) {
        LinearLayout row = new LinearLayout(this);
        row.setGravity(Gravity.CENTER_VERTICAL);
        row.setOrientation(LinearLayout.HORIZONTAL);
        TextView brand = text(t("brand"), 18, INK, true);
        LinearLayout names = column();
        names.addView(brand);
        names.addView(text(t("subtitle"), 11, SOFT_INK, false));
        row.addView(names, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));

        Spinner language = new Spinner(this);
        String[] languageNames = {"العربية", "English", "Español"};
        language.setAdapter(new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, languageNames));
        changingLanguage = true;
        language.setSelection(languageIndex);
        changingLanguage = false;
        language.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(android.widget.AdapterView<?> parent, View view, int position, long id) {
                if (!changingLanguage && position != languageIndex) {
                    languageIndex = position;
                    getSharedPreferences("doctor_rescate", MODE_PRIVATE).edit().putInt("language", position).apply();
                    if (textToSpeech != null) textToSpeech.setLanguage(Locale.forLanguageTag(languageTag()));
                    renderHome();
                }
            }

            @Override
            public void onNothingSelected(android.widget.AdapterView<?> parent) {
            }
        });
        row.addView(language);
        accountButton = button(sessionStore.username() == null ? t("account") : sessionStore.username(), false);
        accountButton.setOnClickListener(view -> openAccount());
        row.addView(accountButton);
        page.addView(row, margin(0, 0, 0, 14));
    }

    private void addEmergencyCard(LinearLayout page) {
        LinearLayout card = column();
        card.setPadding(dp(18), dp(20), dp(18), dp(18));
        card.setBackground(background(INK, 20));
        card.addView(text(t("urgentTitle"), 25, Color.WHITE, true));
        card.addView(text(t("urgentCopy"), 14, Color.rgb(232, 223, 225), false), margin(0, 6, 0, 12));
        Button call = button(t("call"), true);
        call.setOnClickListener(view -> {
            Intent dial = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:123"));
            startActivity(dial);
        });
        card.addView(call, margin(0, 0, 0, 8));
        card.addView(text(t("outside"), 11, Color.rgb(232, 223, 225), false));
        page.addView(card, margin(0, 0, 0, 14));
    }

    private void addVoiceCard(LinearLayout page) {
        LinearLayout card = column();
        card.setPadding(dp(15), dp(15), dp(15), dp(15));
        card.setBackground(background(Color.rgb(247, 235, 237), 16));
        card.addView(text(t("voiceTitle"), 18, INK, true));
        card.addView(text(t("voiceIntro"), 12, SOFT_INK, false), margin(0, 3, 0, 10));
        Button speak = button(decorated("🎙", "voiceStart"), true);
        speak.setOnClickListener(view -> startVoiceRecognition(REQUEST_VOICE_GUIDE));
        card.addView(speak);
        card.addView(text(t("voicePrivacy"), 10, SOFT_INK, false), margin(0, 8, 0, 0));
        page.addView(card, margin(0, 0, 0, 16));
    }

    private void addGuides(LinearLayout page) {
        page.addView(text(t("guideHeading"), 22, INK, true));
        page.addView(text(t("guideIntro"), 12, SOFT_INK, false), margin(0, 2, 0, 8));
        page.addView(text(decorated("●", "offline"), 11, RED_DARK, true), margin(0, 0, 0, 7));
        try {
            JSONObject localizedGuides = currentGuides();
            for (int i = 0; i < GUIDE_IDS.length; i++) {
                String id = GUIDE_IDS[i];
                JSONObject guide = localizedGuides.getJSONObject(id);
                LinearLayout item = new LinearLayout(this);
                item.setGravity(Gravity.CENTER_VERTICAL);
                item.setPadding(dp(8), dp(10), dp(8), dp(10));
                item.setBackground(background(Color.WHITE, 10));
                TextView icon = text(GUIDE_ICONS[i], 20, RED, true);
                icon.setGravity(Gravity.CENTER);
                item.addView(icon, new LinearLayout.LayoutParams(dp(42), dp(42)));
                LinearLayout copy = column();
                copy.addView(text(guide.getString("title"), 15, INK, true));
                copy.addView(text(guide.getString("summary"), 11, SOFT_INK, false), margin(0, 2, 0, 0));
                item.addView(copy, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));
                item.setOnClickListener(view -> {
                    selectedGuideId = id;
                    renderHome();
                });
                page.addView(item, margin(0, 0, 0, 7));
            }
        } catch (JSONException exception) {
            throw new IllegalStateException("The offline first-aid guide data is invalid.", exception);
        }
    }

    private void addGuideDetail(LinearLayout page) {
        try {
            JSONObject guide = currentGuides().getJSONObject(selectedGuideId);
            LinearLayout card = column();
            card.setPadding(dp(15), dp(14), dp(15), dp(14));
            card.setBackground(background(Color.WHITE, 14));
            Button back = button(decorated("‹", "back"), false);
            back.setOnClickListener(view -> {
                selectedGuideId = null;
                renderHome();
            });
            card.addView(back, margin(0, 0, 0, 8));
            card.addView(text(guide.getString("title"), 21, INK, true));
            card.addView(text(guide.getString("lead"), 14, SOFT_INK, false), margin(0, 5, 0, 8));
            JSONArray steps = guide.getJSONArray("steps");
            for (int i = 0; i < steps.length(); i++) {
                card.addView(text((i + 1) + ". " + steps.getString(i), 14, INK, false), margin(0, 0, 0, 8));
            }
            card.addView(text(guide.getString("warning"), 12, RED_DARK, true), margin(0, 4, 0, 8));
            Button listen = button(decorated("🔊", "listen"), false);
            String speech = guide.getString("title") + ". " + guide.getString("lead") + " " + steps.join(". ") + " " + guide.getString("warning");
            listen.setOnClickListener(view -> speak(listen, speech));
            card.addView(listen);
            page.addView(card, margin(0, 12, 0, 16));
        } catch (JSONException exception) {
            throw new IllegalStateException("Could not render the selected first-aid guide.", exception);
        }
    }

    private void addAssistant(LinearLayout page) {
        LinearLayout card = column();
        card.setPadding(dp(15), dp(15), dp(15), dp(15));
        card.setBackground(background(Color.WHITE, 16));
        card.addView(text(t("assistantTitle"), 20, INK, true));
        card.addView(text(t("assistantIntro"), 12, SOFT_INK, false), margin(0, 3, 0, 10));
        chatThread = column();
        for (ChatMessage message : chatMessages) addChatBubble(chatThread, message);
        card.addView(chatThread, margin(0, 0, 0, 10));

        LinearLayout actions = new LinearLayout(this);
        actions.setGravity(Gravity.CENTER_VERTICAL);
        Button voice = button("🎙", false);
        voice.setContentDescription(isRtl() ? "تحدث" : "Speak");
        voice.setOnClickListener(view -> startVoiceRecognition(REQUEST_VOICE_CHAT));
        actions.addView(voice, margin(0, 0, 6, 0));
        Button photo = button("📷", false);
        photo.setContentDescription(t("attach"));
        photo.setOnClickListener(view -> choosePhoto());
        actions.addView(photo, margin(0, 0, 6, 0));
        if (selectedImage != null) {
            actions.addView(text("✓", 16, RED_DARK, true), margin(0, 0, 6, 0));
        }
        chatInput = new EditText(this);
        chatInput.setSingleLine(true);
        chatInput.setTextSize(13);
        chatInput.setHint(t("inputHint"));
        chatInput.setMaxLines(1);
        actions.addView(chatInput, new LinearLayout.LayoutParams(0, dp(48), 1));
        Button send = button(t("send"), true);
        send.setOnClickListener(view -> submitAssistantMessage());
        actions.addView(send, margin(6, 0, 0, 0));
        card.addView(actions);
        page.addView(card, margin(0, 0, 0, 14));
    }

    private void addChatBubble(LinearLayout thread, ChatMessage message) {
        LinearLayout bubble = column();
        bubble.setPadding(dp(11), dp(9), dp(11), dp(9));
        bubble.setBackground(background(message.user ? Color.rgb(250, 231, 233) : PAPER, 12));
        bubble.addView(text(message.text, 13, INK, false));
        if (!message.user && message.speakable) {
            Button listen = button(decorated("🔊", "listen"), false);
            listen.setOnClickListener(view -> speak(listen, message.text));
            bubble.addView(listen, margin(0, 6, 0, 0));
        }
        LinearLayout.LayoutParams params = margin(0, 0, 0, 7);
        params.width = ViewGroup.LayoutParams.MATCH_PARENT;
        thread.addView(bubble, params);
    }

    private void addNotice(LinearLayout page) {
        TextView notice = text(t("notice"), 11, SOFT_INK, false);
        notice.setPadding(dp(11), dp(11), dp(11), dp(11));
        notice.setBackground(background(PAPER, 10));
        page.addView(notice, margin(0, 0, 0, 8));
    }

    private void submitAssistantMessage() {
        String message = chatInput.getText().toString().trim();
        Uri image = selectedImage;
        if (message.isEmpty() && image == null) {
            Toast.makeText(this, t("emptyChat"), Toast.LENGTH_SHORT).show();
            return;
        }
        if (image != null) {
            new AlertDialog.Builder(this)
                    .setMessage(t("photoConsent"))
                    .setNegativeButton(isRtl() ? "إلغاء" : "Cancel", (dialog, which) -> { })
                    .setPositiveButton(isRtl() ? "متابعة" : "Continue", (dialog, which) -> sendAssistant(message, image))
                    .show();
            return;
        }
        sendAssistant(message, null);
    }

    private void sendAssistant(String message, Uri image) {
        String assistantLanguage = languageIndex == 0 ? "ar" : languageIndex == 2 ? "es" : "en";
        chatInput.setText("");
        selectedImage = null;
        if (!message.isEmpty()) chatMessages.add(new ChatMessage(true, message));
        else chatMessages.add(new ChatMessage(true, t("photo")));
        int answerIndex = chatMessages.size();
        chatMessages.add(new ChatMessage(false, "…"));
        renderHome();
        executor.execute(() -> {
            try {
                JSONObject payload = new JSONObject();
                payload.put("message", message);
                payload.put("language", assistantLanguage);
                if (image != null) {
                    payload.put("image_data", encodeImage(image));
                    payload.put("image_mime_type", "image/jpeg");
                }
                JSONObject response = api.request("/api/assistant/ask", "POST", payload);
                updateAssistantReply(answerIndex, response.getString("answer"), true);
            } catch (Exception exception) {
                String error = exception instanceof IOException && !(exception instanceof ApiClient.ApiException)
                        ? t("networkError")
                        : exception.getMessage() == null ? t("genericError") : exception.getMessage();
                updateAssistantReply(answerIndex, error, false);
            }
        });
    }

    private void updateAssistantReply(int index, String answer, boolean speakable) {
        runOnUiThread(() -> {
            if (index >= 0 && index < chatMessages.size()) {
                chatMessages.set(index, new ChatMessage(false, answer, speakable));
                renderHome();
                pageScroll.post(() -> pageScroll.fullScroll(View.FOCUS_DOWN));
            }
        });
    }

    private void choosePhoto() {
        Intent pick = new Intent(Intent.ACTION_GET_CONTENT);
        pick.setType("image/*");
        startActivityForResult(Intent.createChooser(pick, t("photo")), REQUEST_IMAGE);
    }

    private String encodeImage(Uri uri) throws IOException {
        BitmapFactory.Options bounds = new BitmapFactory.Options();
        bounds.inJustDecodeBounds = true;
        try (InputStream input = getContentResolver().openInputStream(uri)) {
            if (input == null) throw new IOException("Could not open the selected image.");
            BitmapFactory.decodeStream(input, null, bounds);
        }
        if (bounds.outWidth <= 0 || bounds.outHeight <= 0) {
            throw new IOException("The selected file is not a supported image.");
        }
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inSampleSize = 1;
        while (bounds.outWidth / options.inSampleSize > 1600 || bounds.outHeight / options.inSampleSize > 1600) {
            options.inSampleSize *= 2;
        }
        Bitmap bitmap;
        try (InputStream input = getContentResolver().openInputStream(uri)) {
            if (input == null) throw new IOException("Could not open the selected image.");
            bitmap = BitmapFactory.decodeStream(input, null, options);
        }
        if (bitmap == null) throw new IOException("The selected file is not a supported image.");
        try (ByteArrayOutputStream output = new ByteArrayOutputStream()) {
            if (!bitmap.compress(Bitmap.CompressFormat.JPEG, 80, output)) {
                throw new IOException("Could not prepare the selected image.");
            }
            return Base64.encodeToString(output.toByteArray(), Base64.NO_WRAP);
        } finally {
            bitmap.recycle();
        }
    }

    private void startVoiceRecognition(int requestCode) {
        if (!getPackageManager().hasSystemFeature("android.hardware.microphone")) {
            Toast.makeText(this, t("voiceError"), Toast.LENGTH_LONG).show();
            return;
        }
        Intent intent = new Intent("android.speech.action.RECOGNIZE_SPEECH");
        intent.putExtra("android.speech.extra.LANGUAGE_MODEL", "free_form");
        intent.putExtra("android.speech.extra.LANGUAGE", languageTag());
        intent.putExtra("android.speech.extra.MAX_RESULTS", 1);
        try {
            startActivityForResult(intent, requestCode);
        } catch (Exception exception) {
            Toast.makeText(this, t("voiceError"), Toast.LENGTH_LONG).show();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode != RESULT_OK || data == null) return;
        if (requestCode == REQUEST_IMAGE) {
            selectedImage = data.getData();
            renderHome();
        } else if (requestCode == REQUEST_VOICE_CHAT) {
            String transcript = firstSpeechResult(data);
            if (transcript != null && chatInput != null) chatInput.setText(transcript);
        } else if (requestCode == REQUEST_VOICE_GUIDE) {
            String transcript = firstSpeechResult(data);
            if (transcript != null) {
                String guideId = matchGuide(transcript);
                if (guideId == null) {
                    Toast.makeText(this, t("voiceNoMatch"), Toast.LENGTH_LONG).show();
                } else {
                    selectedGuideId = guideId;
                    renderHome();
                    pageScroll.post(() -> pageScroll.fullScroll(View.FOCUS_DOWN));
                }
            }
        }
    }

    private String firstSpeechResult(Intent data) {
        ArrayList<String> results = data.getStringArrayListExtra("android.speech.extra.RESULTS");
        return results == null || results.isEmpty() ? null : results.get(0);
    }

    private String matchGuide(String transcript) {
        String value = transcript.toLowerCase(Locale.ROOT);
        String[][] terms = {
                {"نزيف", "دم", "جرح", "bleeding", "blood", "wound", "cut", "hemorragia", "sangre", "herida"},
                {"حرق", "حروق", "نار", "ماء ساخن", "burn", "scald", "fire", "quemadura"},
                {"اختناق", "يختنق", "غصة", "choking", "cant breathe", "cannot breathe", "atragantamiento", "asfixia"},
                {"كسر", "مكسور", "عظم", "fracture", "broken bone", "broken arm", "fractura", "hueso roto"},
                {"فاقد الوعي", "مغمى عليه", "لا يتنفس", "لا يستجيب", "unconscious", "not breathing", "unresponsive", "inconsciente"}
        };
        for (int i = 0; i < terms.length; i++) {
            for (String term : terms[i]) if (value.contains(term)) return GUIDE_IDS[i];
        }
        return null;
    }

    private void speak(Button button, String content) {
        if (textToSpeech == null) return;
        if (textToSpeech.isSpeaking()) {
            textToSpeech.stop();
            button.setText(decorated("🔊", "listen"));
        } else {
            textToSpeech.setLanguage(Locale.forLanguageTag(languageTag()));
            button.setText(decorated("■", "stop"));
            textToSpeech.speak(content, TextToSpeech.QUEUE_FLUSH, null, "doctor-rescate-speech");
            button.postDelayed(() -> button.setText(decorated("🔊", "listen")), Math.max(2500, content.length() * 65L));
        }
    }

    private void verifyStoredSession() {
        executor.execute(() -> {
            try {
                JSONObject user = api.request("/api/auth/me", "GET", null);
                String username = user.optString("username", "");
                runOnUiThread(() -> {
                    if (!username.isEmpty() && accountButton != null) accountButton.setText(username);
                });
            } catch (ApiClient.ApiException exception) {
                if (exception.statusCode == 401) {
                    sessionStore.clear();
                    runOnUiThread(() -> {
                        if (accountButton != null) accountButton.setText(t("account"));
                    });
                }
            } catch (Exception exception) {
                runOnUiThread(() -> Toast.makeText(this, t("networkError"), Toast.LENGTH_LONG).show());
            }
        });
    }

    private void openAccount() {
        if (sessionStore.token() == null) {
            showAuthDialog(false);
            return;
        }
        executor.execute(() -> {
            try {
                JSONObject user = api.request("/api/auth/me", "GET", null);
                runOnUiThread(() -> showSignedInDialog(user.optString("username", sessionStore.username())));
            } catch (ApiClient.ApiException exception) {
                if (exception.statusCode == 401) {
                    sessionStore.clear();
                    runOnUiThread(() -> showAuthDialog(false));
                } else {
                    runOnUiThread(() -> Toast.makeText(this, exception.getMessage(), Toast.LENGTH_LONG).show());
                }
            } catch (Exception exception) {
                runOnUiThread(() -> Toast.makeText(this, t("accountError"), Toast.LENGTH_LONG).show());
            }
        });
    }

    private void showSignedInDialog(String username) {
        new AlertDialog.Builder(this)
                .setTitle(String.format(Locale.ROOT, t("welcomeUser"), username))
                .setMessage(t("accountIntro"))
                .setNegativeButton(t("logout"), (dialog, which) -> logout())
                .setPositiveButton(t("success"), (dialog, which) -> { })
                .show();
    }

    private void showAuthDialog(boolean registerInitially) {
        LinearLayout panel = column();
        panel.setPadding(dp(20), dp(16), dp(20), dp(8));
        boolean[] registerMode = {registerInitially};
        AlertDialog dialog = new AlertDialog.Builder(this).create();
        Runnable[] render = new Runnable[1];
        render[0] = () -> {
            panel.removeAllViews();
            panel.addView(text(t("account"), 21, INK, true));
            panel.addView(text(t("accountIntro"), 12, SOFT_INK, false), margin(0, 3, 0, 10));
            LinearLayout tabs = new LinearLayout(this);
            Button loginTab = button(t("login"), !registerMode[0]);
            Button registerTab = button(t("register"), registerMode[0]);
            loginTab.setOnClickListener(view -> {
                registerMode[0] = false;
                render[0].run();
            });
            registerTab.setOnClickListener(view -> {
                registerMode[0] = true;
                render[0].run();
            });
            tabs.addView(loginTab, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));
            tabs.addView(registerTab, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1));
            panel.addView(tabs, margin(0, 0, 0, 8));
            EditText username = new EditText(this);
            username.setSingleLine(true);
            username.setHint(t("username"));
            username.setInputType(0x00000001);
            panel.addView(username);
            EditText password = new EditText(this);
            password.setSingleLine(true);
            password.setHint(t("password") + " (10+)");
            password.setInputType(0x00000081);
            panel.addView(password, margin(0, 2, 0, 6));
            Button submit = button(registerMode[0] ? t("createButton") : t("loginButton"), true);
            panel.addView(submit);
            submit.setOnClickListener(view -> submitAuth(username, password, registerMode[0], submit, dialog));
            panel.addView(text(t("social"), 11, SOFT_INK, false), margin(0, 10, 0, 5));
            Button google = button(t("google"), false);
            google.setOnClickListener(view -> {
                dialog.dismiss();
                openSocialLogin("google");
            });
            panel.addView(google, margin(0, 0, 0, 5));
            Button facebook = button(t("facebook"), false);
            facebook.setOnClickListener(view -> {
                dialog.dismiss();
                openSocialLogin("facebook");
            });
            panel.addView(facebook);
        };
        render[0].run();
        dialog.setView(panel);
        dialog.show();
    }

    private void submitAuth(EditText username, EditText password, boolean register, Button submit, Dialog dialog) {
        String name = username.getText().toString().trim();
        String secret = password.getText().toString();
        if (name.length() < 3 || name.length() > 32 || secret.length() < 10 || secret.length() > 128) {
            Toast.makeText(this, t("genericError"), Toast.LENGTH_LONG).show();
            return;
        }
        submit.setEnabled(false);
        JSONObject payload = new JSONObject();
        try {
            payload.put("username", name);
            payload.put("password", secret);
        } catch (JSONException exception) {
            throw new IllegalStateException(exception);
        }
        String endpoint = register ? "/api/auth/mobile/register" : "/api/auth/mobile/login";
        executor.execute(() -> {
            try {
                JSONObject result = api.request(endpoint, "POST", payload);
                sessionStore.save(result.getString("access_token"), result.getString("username"));
                runOnUiThread(() -> {
                    if (accountButton != null) accountButton.setText(result.optString("username"));
                    dialog.dismiss();
                    Toast.makeText(this, t("success"), Toast.LENGTH_SHORT).show();
                });
            } catch (Exception exception) {
                String message;
                if (exception instanceof ApiClient.ApiException && ((ApiClient.ApiException) exception).statusCode == 401) {
                    message = t("invalidCredentials");
                } else if (exception instanceof ApiClient.ApiException) {
                    message = exception.getMessage();
                } else {
                    message = t("networkError");
                }
                String error = message;
                runOnUiThread(() -> {
                    submit.setEnabled(true);
                    Toast.makeText(this, error, Toast.LENGTH_LONG).show();
                });
            }
        });
    }

    private void openSocialLogin(String provider) {
        try {
            byte[] random = new byte[32];
            new SecureRandom().nextBytes(random);
            String verifier = Base64.encodeToString(random, Base64.URL_SAFE | Base64.NO_PADDING | Base64.NO_WRAP);
            String challenge = Base64.encodeToString(
                    MessageDigest.getInstance("SHA-256").digest(verifier.getBytes(java.nio.charset.StandardCharsets.US_ASCII)),
                    Base64.URL_SAFE | Base64.NO_PADDING | Base64.NO_WRAP
            );
            sessionStore.saveOAuthVerifier(verifier);
            Uri url = Uri.parse(BuildConfig.API_BASE_URL + "/api/auth/" + provider + "/start")
                    .buildUpon()
                    .appendQueryParameter("client", "android")
                    .appendQueryParameter("code_challenge", challenge)
                    .appendQueryParameter("code_challenge_method", "S256")
                    .build();
            startActivity(new Intent(Intent.ACTION_VIEW, url));
        } catch (Exception exception) {
            Toast.makeText(this, t("networkError"), Toast.LENGTH_LONG).show();
        }
    }

    private void handleOAuthIntent(Intent intent) {
        Uri uri = intent == null ? null : intent.getData();
        if (uri == null
                || !"doctorrescate".equals(uri.getScheme())
                || !"oauth".equals(uri.getHost())
                || !"/callback".equals(uri.getPath())) return;
        String error = uri.getQueryParameter("error");
        if (error != null) {
            sessionStore.clearOAuthVerifier();
            Toast.makeText(this, error, Toast.LENGTH_LONG).show();
            showAuthDialog(false);
            return;
        }
        String code = uri.getQueryParameter("code");
        String verifier = sessionStore.oauthVerifier();
        if (code == null || code.isEmpty() || verifier == null) {
            sessionStore.clearOAuthVerifier();
            Toast.makeText(this, t("genericError"), Toast.LENGTH_LONG).show();
            return;
        }
        executor.execute(() -> {
            try {
                JSONObject payload = new JSONObject();
                payload.put("code", code);
                payload.put("code_verifier", verifier);
                JSONObject result = api.request("/api/auth/mobile/oauth/exchange", "POST", payload);
                sessionStore.save(result.getString("access_token"), result.getString("username"));
                sessionStore.clearOAuthVerifier();
                runOnUiThread(() -> {
                    if (accountButton != null) accountButton.setText(result.optString("username"));
                    Toast.makeText(this, t("success"), Toast.LENGTH_SHORT).show();
                });
            } catch (Exception exception) {
                sessionStore.clearOAuthVerifier();
                String errorMessage = exception instanceof IOException && !(exception instanceof ApiClient.ApiException)
                        ? t("networkError")
                        : exception.getMessage() == null ? t("genericError") : exception.getMessage();
                runOnUiThread(() -> {
                    Toast.makeText(this, errorMessage, Toast.LENGTH_LONG).show();
                    showAuthDialog(false);
                });
            }
        });
    }

    private void logout() {
        executor.execute(() -> {
            try {
                api.request("/api/auth/logout", "POST", null);
                sessionStore.clear();
                runOnUiThread(() -> {
                    if (accountButton != null) accountButton.setText(t("account"));
                    showAuthDialog(false);
                });
            } catch (Exception exception) {
                runOnUiThread(() -> Toast.makeText(this, exception.getMessage(), Toast.LENGTH_LONG).show());
            }
        });
    }

    private LinearLayout column() {
        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);
        return layout;
    }

    private TextView text(String value, int size, int color, boolean bold) {
        TextView view = new TextView(this);
        view.setText(value);
        view.setTextSize(size);
        view.setTextColor(color);
        view.setLayoutDirection(isRtl() ? View.LAYOUT_DIRECTION_RTL : View.LAYOUT_DIRECTION_LTR);
        view.setGravity(Gravity.START);
        view.setTextDirection(View.TEXT_DIRECTION_FIRST_STRONG);
        if (bold) view.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
        return view;
    }

    private String decorated(String symbol, String key) {
        return String.format(Locale.ROOT, "%s  %s", symbol, t(key));
    }

    private Button button(String value, boolean primary) {
        Button button = new Button(this);
        button.setText(value);
        button.setTextSize(13);
        button.setAllCaps(false);
        button.setTextColor(primary ? Color.WHITE : INK);
        button.setBackground(background(primary ? RED : Color.WHITE, 10));
        button.setPadding(dp(10), dp(5), dp(10), dp(5));
        return button;
    }

    private GradientDrawable background(int color, int radius) {
        GradientDrawable drawable = new GradientDrawable();
        drawable.setColor(color);
        drawable.setCornerRadius(dp(radius));
        if (color == Color.WHITE) drawable.setStroke(dp(1), LINE);
        return drawable;
    }

    private LinearLayout.LayoutParams margin(int left, int top, int right, int bottom) {
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        );
        params.setMargins(dp(left), dp(top), dp(right), dp(bottom));
        return params;
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    private static final class ChatMessage {
        final boolean user;
        final String text;
        final boolean speakable;

        ChatMessage(boolean user, String text) {
            this(user, text, false);
        }

        ChatMessage(boolean user, String text, boolean speakable) {
            this.user = user;
            this.text = text;
            this.speakable = speakable;
        }
    }
}
