const copy = {
  ar: {
    pageTitle: "دكتور الإنقاذ | دليل إسعافات أولية",
    description: "دليل إسعافات أولية عربي واضح، يعمل حتى دون اتصال بالإنترنت.",
    language: "لغة التطبيق",
    home: "الصفحة الرئيسية",
    brand: "دكتور الإنقاذ",
    subtitle: "إسعاف أولي واضح وقت الحاجة",
    account: "حسابي",
    urgentKicker: "إذا كان الخطر فورياً، لا تنتظر",
    urgentTitle: "اتصل بالإسعاف أولاً.",
    urgentCopy: "في مصر، اتصل على ١٢٣. شغّل مكبر الصوت واتبع تعليمات موظف الطوارئ.",
    call: "اتصل بالإسعاف ١٢٣",
    urgentNote: "إذا لم تكن في مصر، استخدم رقم الطوارئ المحلي.",
    assistantTitle: "مساعد صوتي",
    assistantIntro: "صِف الحالة للعثور على إرشادات ثابتة؛ لا يشخّص التطبيق بالذكاء الاصطناعي.",
    voiceStart: "ابدأ التحدث",
    voiceListening: "أستمع إليك الآن…",
    voiceReady: "اضغط للتحدث عن الحالة.",
    voiceNotSupported: "الإدخال الصوتي غير متاح في هذا المتصفح. اختر الحالة من القائمة.",
    voiceNoMatch: "لم أتعرف على الحالة. اختر دليلاً من القائمة أو اتصل بـ١٢٣.",
    voiceMatched: (title) => `وجدت دليلاً محتملاً: ${title}`,
    voiceTranscript: (text) => `ما سمعته: ${text}`,
    voiceError: "تعذر استخدام الميكروفون. تحقق من الإذن وحاول مجدداً.",
    voicePrivacy: "قد يعالج المتصفح الصوت للتعرّف على الكلام. لا تذكر معلومات شخصية. لا يحفظ هذا التطبيق التسجيلات.",
    voiceShowGuide: "عرض خطوات الإسعاف",
    guideHeading: "ما الذي حدث؟",
    guideIntro: "اختر الحالة لعرض خطوات أولية بسيطة.",
    offline: "متاح دون إنترنت",
    noticeTitle: "مهم",
    notice: "هذا الدليل لا يشخّص الإصابات ولا يستبدل الإسعاف أو الطبيب. لا ترفع صوراً أو فيديوهات حساسة. عند الشك أو تدهور الحالة، اتصل بالطوارئ.",
    footer: "دكتور الإنقاذ · إرشاد أولي، وليس تشخيصاً طبياً",
    allGuides: "كل الحالات",
    chatTitle: "مساعد الطوارئ الذكي",
    chatIntro: "اسأل عن حالة غير موجودة في القائمة، وسأعطيك تعليمات سريعة وآمنة.",
    chatPlaceholder: "اكتب الحالة أو الأعراض...",
    chatSend: "إرسال",
    chatVoice: "تحدث",
    chatUpload: "إرفاق صورة",
    chatUploadStatus: "تم اختيار صورة",
    chatWelcome: "أنا مساعد الطوارئ الذكي. اذكر الأعراض أو ما حدث، وسأساعدك بتحديد أول خطوة آمنة. إذا كان الشخص فاقدًا للوعي أو لا يتنفس أو هناك نزيف شديد، اتصل بالإسعاف فوراً.",
    chatAsk: "أخبرني ما الذي يحدث، وما إذا كان هناك نزيف، ألم شديد، صعوبة في التنفس، أو فقدان الوعي.",
    speechUnavailable: "ميزة القراءة الصوتية غير متاحة في هذا المتصفح.",
    speak: "استمع إلى الخطوات",
    listenAnswer: "استمع إلى الإجابة",
    stopSpeaking: "إيقاف القراءة",
    speechStarted: "جارٍ القراءة بصوت عالٍ.",
    speechFinished: "انتهت القراءة.",
    speechStopped: "تم إيقاف القراءة.",
    speechError: "تعذرت القراءة. تحقق من مستوى صوت الجهاز ومن توفر صوت لهذه اللغة.",
    close: "إغلاق",
    accountTitle: "حسابك",
    accountIntro: "يمكنك استخدام دليل الطوارئ دون حساب.",
    login: "تسجيل الدخول",
    register: "حساب جديد",
    username: "اسم المستخدم",
    usernameHint: "3 إلى 32 حرفاً إنجليزياً أو رقماً أو _",
    password: "كلمة المرور",
    passwordHint: "10 أحرف على الأقل",
    submitLogin: "دخول",
    submitRegister: "إنشاء الحساب",
    socialDivider: "أو تابع باستخدام",
    googleSignIn: "Google",
    facebookSignIn: "Facebook",
    googleNotConfigured: "لم يتم إعداد Google بعد. أضف GOOGLE_CLIENT_ID وGOOGLE_CLIENT_SECRET إلى ملف .env ثم أعد تشغيل الخادم.",
    facebookNotConfigured: "لم يتم إعداد Facebook بعد. أضف FACEBOOK_APP_ID وFACEBOOK_APP_SECRET إلى ملف .env ثم أعد تشغيل الخادم.",
    socialLoginFailed: "تعذر تسجيل الدخول باستخدام الحساب الاجتماعي. حاول مرة أخرى.",
    signedIn: (name) => `أهلاً ${name}`,
    signedInCopy: "يمكنك استخدام دليل الطوارئ دون اتصال.",
    logout: "تسجيل الخروج",
    invalidUsername: "اسم المستخدم يجب أن يحتوي على 3 إلى 32 حرفاً إنجليزياً أو رقماً أو _.",
    duplicateUsername: "اسم المستخدم مستخدم بالفعل.",
    invalidCredentials: "اسم المستخدم أو كلمة المرور غير صحيحة.",
    sessionExpired: "انتهت الجلسة. سجّل الدخول مجدداً.",
    loginFirst: "سجّل الدخول أولاً.",
    genericError: "تعذر إكمال الطلب. حاول مرة أخرى.",
    accountLoadError: "تعذر تحميل بيانات الحساب. حاول مرة أخرى.",
    networkError: "تعذر الاتصال بالخادم. تحقق من اتصالك وحاول مجدداً.",
    logoutError: "تعذر تسجيل الخروج. حاول مرة أخرى.",
    voiceTerms: {
      bleeding: ["نزيف", "دم", "جرح"],
      burn: ["حرق", "حروق", "نار", "ماء ساخن"],
      choking: ["اختناق", "يختنق", "شرق", "غصة"],
      fracture: ["كسر", "مكسور", "عظم"],
      unresponsive: ["فاقد الوعي", "مغمى عليه", "لا يتنفس", "لا يستجيب", "بدون وعي"]
    },
    guides: {
      bleeding: {
        title: "نزيف شديد",
        summary: "جرح عميق أو نزيف لا يتوقف",
        lead: "النزيف الغزير يحتاج إلى مساعدة طبية عاجلة.",
        steps: [
          "اتصل بالإسعاف ١٢٣، وضع الهاتف على مكبر الصوت.",
          "إن أمكن، ارتدِ قفازات. اضغط بقوة وباستمرار على الجرح بقطعة قماش نظيفة.",
          "إذا تشبعت القطعة بالدم، ضع أخرى فوقها دون نزع الأولى. استمر بالضغط حتى تصل المساعدة."
        ],
        warning: "لا تنزع جسماً مغروساً في الجرح ولا تضغط عليه مباشرة؛ اضغط حوله. إذا كان النزيف خطيراً، لا تنتظر."
      },
      burn: {
        title: "حروق",
        summary: "حرق بسبب حرارة أو سائل ساخن",
        lead: "أبعد المصاب عن مصدر الحرارة بأمان، ثم برّد الحرق.",
        steps: [
          "برّد المنطقة بماء جارٍ بارد أو فاتر لمدة ٢٠ دقيقة. لا تستخدم الثلج.",
          "انزع الخواتم أو الملابس القريبة من الحرق إذا لم تكن ملتصقة بالجلد.",
          "غطِّ الحرق برفق بضمادة نظيفة غير وبرية، واطلب المساعدة الطبية."
        ],
        warning: "لا تضع معجون أسنان أو زيتاً أو كريمات، ولا تفقأ الفقاعات. اتصل بـ١٢٣ للحروق الكبيرة أو العميقة أو حروق الوجه أو صعوبة التنفس."
      },
      choking: {
        title: "اختناق بالغ",
        summary: "الشخص لا يستطيع الكلام أو السعال",
        lead: "إذا كان يستطيع السعال أو الكلام، شجّعه على السعال وراقبه.",
        steps: [
          "إذا لم يستطع التنفس أو الكلام أو السعال، اطلب من شخص الاتصال بـ١٢٣ فوراً.",
          "للبالغ الواعي: أعطه حتى ٥ ضربات بين لوحي الكتف، مع إمالته للأمام.",
          "إذا لم تنجح، أعطه حتى ٥ ضغطات بطنية إلى الداخل والأعلى. كرر بالتناوب حتى يخرج الجسم أو تصل المساعدة.",
          "إذا فقد الوعي، أنزله للأرض بأمان وابدأ الإنعاش القلبي الرئوي إن كنت تعرفه، واتبع تعليمات موظف الطوارئ."
        ],
        warning: "هذه الخطوات للبالغ الواعي فقط. لا تستخدم الضغطات البطنية على الرضّع أو الأطفال الصغار أو الحوامل؛ اتصل بالطوارئ واتبع توجيهاتهم."
      },
      fracture: {
        title: "اشتباه كسر",
        summary: "ألم شديد أو تورّم أو تشوّه",
        lead: "تعامل مع الإصابة ككسر محتمل ولا تحاول اختبارها.",
        steps: [
          "اتصل بـ١٢٣ إذا كان الكسر واضحاً أو مفتوحاً أو مؤلماً بشدة، أو إذا وُجد خدر أو نزيف.",
          "ساعد المصاب على البقاء ثابتاً، واسند الطرف في الوضع الذي وجدته عليه.",
          "ضع كمادة باردة ملفوفة بقماش على المنطقة، من دون ضغط مباشر على عظم بارز.",
          "راقب التنفس والوعي، ولا تترك المصاب وحده."
        ],
        warning: "لا تحاول إعادة العظم إلى مكانه أو تحريك المصاب إذا اشتبهت بإصابة في الرأس أو الرقبة أو الظهر. انتظر الإسعاف."
      },
      unresponsive: {
        title: "فاقد الوعي",
        summary: "لا يستجيب أو لا يتنفس بشكل طبيعي",
        lead: "تحقق من أمان المكان، ونادِ عليه وربّت على كتفه.",
        steps: [
          "اطلب من شخص الاتصال بـ١٢٣ وإحضار جهاز صدمات كهربائية إن توفر. استخدم مكبر الصوت.",
          "إذا كان لا يستجيب ولا يتنفس بشكل طبيعي، ابدأ ضغطات قوية وسريعة في منتصف الصدر بمعدل ١٠٠–١٢٠ ضغطة في الدقيقة.",
          "استخدم جهاز الصدمات فور توفره واتبع تعليماته. استمر حتى وصول الإسعاف أو عودة التنفس الطبيعي.",
          "إذا كان فاقد الوعي لكنه يتنفس طبيعياً، راقب تنفسه باستمرار واتبع تعليمات موظف الطوارئ."
        ],
        warning: "إذا لم تكن مدرّباً، اطلب من موظف الطوارئ إرشادك خطوة بخطوة. لا تؤخر الاتصال بالطوارئ."
      }
    }
  },
  en: {
    pageTitle: "Doctor de Rescate | First Aid Guide",
    description: "Clear first-aid guidance in English, available offline.",
    language: "App language",
    home: "Home",
    brand: "Doctor de Rescate",
    subtitle: "Clear first aid when it matters",
    account: "Account",
    urgentKicker: "If there is immediate danger, act now",
    urgentTitle: "Call emergency services first.",
    urgentCopy: "In Egypt, call 123 for an ambulance. Turn on speakerphone and follow the operator’s instructions.",
    call: "Call ambulance 123",
    urgentNote: "Outside Egypt? Call your local emergency number.",
    assistantTitle: "Voice assistant",
    assistantIntro: "Describe what happened to find a built-in guide. It does not use AI to diagnose.",
    voiceStart: "Speak now",
    voiceListening: "Listening…",
    voiceReady: "Tap to describe what happened.",
    voiceNotSupported: "Voice input is not supported in this browser. Choose a guide below.",
    voiceNoMatch: "I couldn't match that to a guide. Choose one below or call 123.",
    voiceMatched: (title) => `Possible guide: ${title}`,
    voiceTranscript: (text) => `I heard: ${text}`,
    voiceError: "Microphone unavailable. Check permission and try again.",
    voicePrivacy: "Your browser may process audio for speech recognition. Avoid personal details. This app does not save recordings.",
    voiceShowGuide: "Show first-aid steps",
    guideHeading: "What happened?",
    guideIntro: "Choose a situation for simple first steps.",
    offline: "Available offline",
    noticeTitle: "Important",
    notice: "This guide does not diagnose injuries or replace emergency services or a clinician. Do not upload sensitive photos or videos. If unsure or the person gets worse, call emergency services.",
    footer: "Doctor de Rescate · First-aid guidance, not a medical diagnosis",
    allGuides: "All situations",
    chatTitle: "AI emergency assistant",
    chatIntro: "Ask about a case that is not listed and I will give you a quick, safe next step.",
    chatPlaceholder: "Describe the case or symptoms...",
    chatSend: "Send",
    chatVoice: "Speak",
    chatUpload: "Add photo",
    chatUploadStatus: "Photo selected",
    chatWelcome: "I’m your emergency assistant. Tell me what happened and what symptoms you see. If the person is unconscious, not breathing, or bleeding severely, call emergency services immediately.",
    chatAsk: "Share the symptoms, like bleeding, breathing trouble, severe pain, or loss of consciousness, and I’ll guide you to the safest next step.",
    speak: "Read these steps aloud",
    listenAnswer: "Listen to answer",
    stopSpeaking: "Stop reading",
    speechStarted: "Reading aloud.",
    speechFinished: "Finished reading.",
    speechStopped: "Reading stopped.",
    speechUnavailable: "Speech playback is not available in this browser.",
    speechError: "Could not read this aloud. Check device volume and available voices for this language.",
    close: "Close",
    accountTitle: "Your account",
    accountIntro: "You can use the emergency guide without an account.",
    login: "Sign in",
    register: "Create account",
    username: "Username",
    usernameHint: "3–32 English letters, numbers, or _",
    password: "Password",
    passwordHint: "At least 10 characters",
    submitLogin: "Sign in",
    submitRegister: "Create account",
    socialDivider: "Or continue with",
    googleSignIn: "Continue with Google",
    facebookSignIn: "Continue with Facebook",
    googleNotConfigured: "Google sign-in is not set up. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env, then restart the server.",
    facebookNotConfigured: "Facebook sign-in is not set up. Add FACEBOOK_APP_ID and FACEBOOK_APP_SECRET to .env, then restart the server.",
    socialLoginFailed: "Social sign-in failed. Please try again.",
    signedIn: (name) => `Welcome, ${name}`,
    signedInCopy: "The emergency guide is available offline.",
    logout: "Sign out",
    invalidUsername: "Username must be 3–32 English letters, numbers, or underscores.",
    duplicateUsername: "That username is already taken.",
    invalidCredentials: "Incorrect username or password.",
    sessionExpired: "Your session expired. Please sign in again.",
    loginFirst: "Please sign in first.",
    genericError: "Could not complete the request. Please try again.",
    accountLoadError: "Could not load your account. Please try again.",
    networkError: "Could not reach the server. Check your connection and try again.",
    logoutError: "Could not sign out. Please try again.",
    voiceTerms: {
      bleeding: ["bleeding", "blood", "wound", "cut"],
      burn: ["burn", "scald", "hot water", "fire"],
      choking: ["choking", "can't breathe", "cannot breathe", "something stuck"],
      fracture: ["fracture", "broken bone", "broken arm", "broken leg"],
      unresponsive: ["unconscious", "not breathing", "not responding", "unresponsive"]
    },
    guides: {
      bleeding: {
        title: "Heavy bleeding",
        summary: "A deep wound or bleeding that will not stop",
        lead: "Heavy bleeding needs urgent medical help.",
        steps: [
          "Call 123 for an ambulance and put the phone on speaker.",
          "If possible, wear gloves. Press firmly and continuously on the wound with a clean cloth.",
          "If blood soaks through, add another cloth without removing the first. Keep pressing until help arrives."
        ],
        warning: "Do not remove an embedded object or press directly on it; press around it. Do not delay emergency help for severe bleeding."
      },
      burn: {
        title: "Burns",
        summary: "A heat or hot-liquid burn",
        lead: "Move away from the heat source safely, then cool the burn.",
        steps: [
          "Cool the area under cool or lukewarm running water for 20 minutes. Do not use ice.",
          "Remove nearby jewelry or clothing unless it is stuck to the skin.",
          "Loosely cover the burn with a clean, non-fluffy dressing and seek medical advice."
        ],
        warning: "Do not apply toothpaste, oil, or creams, and do not burst blisters. Call 123 for large or deep burns, burns to the face, or trouble breathing."
      },
      choking: {
        title: "Adult choking",
        summary: "The person cannot speak or cough",
        lead: "If they can cough or speak, encourage coughing and watch them closely.",
        steps: [
          "If they cannot breathe, speak, or cough, have someone call 123 immediately.",
          "For a conscious adult, give up to 5 firm back blows between the shoulder blades while leaning them forward.",
          "If that does not work, give up to 5 abdominal thrusts inward and upward. Alternate until the object comes out or help arrives.",
          "If they become unresponsive, lower them safely and start CPR if you know how. Follow the emergency operator’s instructions."
        ],
        warning: "These steps are for a conscious adult only. Do not use abdominal thrusts on infants, young children, or pregnant people; call emergency services and follow their instructions."
      },
      fracture: {
        title: "Possible fracture",
        summary: "Severe pain, swelling, or deformity",
        lead: "Treat it as a possible fracture; do not test the injury.",
        steps: [
          "Call 123 for an obvious or open fracture, severe pain, numbness, or bleeding.",
          "Help the person stay still and support the limb in the position you found it.",
          "Place a cloth-wrapped cold pack on the area without pressing on a protruding bone.",
          "Watch their breathing and alertness, and stay with them."
        ],
        warning: "Do not try to realign the bone. If a head, neck, or back injury is possible, do not move the person; wait for emergency help."
      },
      unresponsive: {
        title: "Unresponsive person",
        summary: "They do not respond or are not breathing normally",
        lead: "Check that the scene is safe. Call to them and tap their shoulder.",
        steps: [
          "Ask someone to call 123 and bring an AED if available. Put the phone on speaker.",
          "If they are unresponsive and not breathing normally, push hard and fast in the centre of the chest at 100–120 compressions per minute.",
          "Use an AED as soon as it is available and follow its prompts. Continue until help arrives or they breathe normally.",
          "If they are unresponsive but breathing normally, keep checking their breathing and follow the emergency operator’s instructions."
        ],
        warning: "If you are not trained, ask the emergency operator to guide you step by step. Do not delay the call."
      }
    }
  },
  es: {
    pageTitle: "Doctor de Rescate | Guía de primeros auxilios",
    description: "Primeros auxilios claros en español, disponibles sin conexión.",
    language: "Idioma de la aplicación",
    home: "Inicio",
    brand: "Doctor de Rescate",
    subtitle: "Primeros auxilios claros cuando importan",
    account: "Cuenta",
    urgentKicker: "Si hay peligro inmediato, actúa ya",
    urgentTitle: "Llama primero a emergencias.",
    urgentCopy: "En Egipto, llama al 123 para pedir una ambulancia. Activa el altavoz y sigue las indicaciones del operador.",
    call: "Llamar a la ambulancia 123",
    urgentNote: "¿Estás fuera de Egipto? Llama al número local de emergencias.",
    assistantTitle: "Asistente de voz",
    assistantIntro: "Describe lo ocurrido para encontrar una guía integrada. No usa IA para diagnosticar.",
    voiceStart: "Hablar ahora",
    voiceListening: "Escuchando…",
    voiceReady: "Pulsa para describir lo ocurrido.",
    voiceNotSupported: "Este navegador no permite la entrada por voz. Elige una guía abajo.",
    voiceNoMatch: "No he encontrado una guía adecuada. Elige una abajo o llama al 123.",
    voiceMatched: (title) => `Guía posible: ${title}`,
    voiceTranscript: (text) => `He entendido: ${text}`,
    voiceError: "No se puede usar el micrófono. Comprueba el permiso e inténtalo de nuevo.",
    voicePrivacy: "El navegador podría procesar el audio para reconocer el habla. No digas datos personales. La aplicación no guarda grabaciones.",
    voiceShowGuide: "Ver pasos de primeros auxilios",
    guideHeading: "¿Qué ha pasado?",
    guideIntro: "Elige una situación para ver los primeros pasos.",
    offline: "Disponible sin conexión",
    noticeTitle: "Importante",
    notice: "Esta guía no diagnostica lesiones ni sustituye a los servicios de emergencia o a un profesional sanitario. No subas fotos ni vídeos sensibles. Si tienes dudas o la persona empeora, llama a emergencias.",
    footer: "Doctor de Rescate · Orientación de primeros auxilios, no un diagnóstico",
    allGuides: "Todas las situaciones",
    chatTitle: "Asistente inteligente de emergencias",
    chatIntro: "Pregunta por una situación que no esté en la lista y te daré un paso siguiente rápido y seguro.",
    chatPlaceholder: "Describe la situación o los síntomas...",
    chatSend: "Enviar",
    chatVoice: "Hablar",
    chatUpload: "Añadir foto",
    chatUploadStatus: "Foto seleccionada",
    chatWelcome: "Soy tu asistente de emergencias. Cuéntame qué ha pasado y qué síntomas ves. Si la persona está inconsciente, no respira o tiene una hemorragia intensa, llama a emergencias de inmediato.",
    chatAsk: "Dime si hay sangrado, dificultad para respirar, dolor intenso o pérdida de conocimiento y te guiaré con el siguiente paso más seguro.",
    speak: "Escuchar estos pasos",
    listenAnswer: "Escuchar la respuesta",
    stopSpeaking: "Detener lectura",
    speechStarted: "Leyendo en voz alta.",
    speechFinished: "Lectura terminada.",
    speechStopped: "Lectura detenida.",
    speechUnavailable: "Este navegador no permite la lectura en voz alta.",
    speechError: "No se pudo leer en voz alta. Comprueba el volumen y las voces disponibles para este idioma.",
    close: "Cerrar",
    accountTitle: "Tu cuenta",
    accountIntro: "Puedes usar la guía de emergencias sin una cuenta.",
    login: "Iniciar sesión",
    register: "Crear cuenta",
    username: "Nombre de usuario",
    usernameHint: "De 3 a 32 letras inglesas, números o _",
    password: "Contraseña",
    passwordHint: "Al menos 10 caracteres",
    submitLogin: "Iniciar sesión",
    submitRegister: "Crear cuenta",
    socialDivider: "O continúa con",
    googleSignIn: "Continuar con Google",
    facebookSignIn: "Continuar con Facebook",
    googleNotConfigured: "Google aún no está configurado. Añade GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET a .env y reinicia el servidor.",
    facebookNotConfigured: "Facebook aún no está configurado. Añade FACEBOOK_APP_ID y FACEBOOK_APP_SECRET a .env y reinicia el servidor.",
    socialLoginFailed: "No se pudo iniciar sesión con la cuenta social. Inténtalo de nuevo.",
    signedIn: (name) => `Hola, ${name}`,
    signedInCopy: "La guía de emergencias está disponible sin conexión.",
    logout: "Cerrar sesión",
    invalidUsername: "El nombre debe tener de 3 a 32 letras inglesas, números o guiones bajos.",
    duplicateUsername: "Ese nombre de usuario ya está en uso.",
    invalidCredentials: "El nombre de usuario o la contraseña no son correctos.",
    sessionExpired: "La sesión ha caducado. Inicia sesión de nuevo.",
    loginFirst: "Inicia sesión primero.",
    genericError: "No se pudo completar la solicitud. Inténtalo de nuevo.",
    accountLoadError: "No se pudo cargar la cuenta. Inténtalo de nuevo.",
    networkError: "No se pudo conectar con el servidor. Comprueba la conexión e inténtalo de nuevo.",
    logoutError: "No se pudo cerrar la sesión. Inténtalo de nuevo.",
    voiceTerms: {
      bleeding: ["sangre", "hemorragia", "sangrado", "herida", "corte"],
      burn: ["quemadura", "quemado", "escaldadura", "agua caliente"],
      choking: ["atragantamiento", "atragantado", "asfixia", "no puede respirar"],
      fracture: ["fractura", "hueso roto", "brazo roto", "pierna rota"],
      unresponsive: ["inconsciente", "no respira", "no responde", "desmayado"]
    },
    guides: {
      bleeding: {
        title: "Hemorragia intensa",
        summary: "Herida profunda o sangrado que no cesa",
        lead: "Una hemorragia intensa requiere atención médica urgente.",
        steps: [
          "Llama al 123 para pedir una ambulancia y activa el altavoz.",
          "Si es posible, ponte guantes. Presiona la herida con firmeza y sin interrupción usando un paño limpio.",
          "Si el paño se empapa, coloca otro encima sin retirar el primero. Sigue presionando hasta que llegue ayuda."
        ],
        warning: "No retires objetos incrustados ni presiones sobre ellos; presiona alrededor. No retrases la atención ante una hemorragia grave."
      },
      burn: {
        title: "Quemaduras",
        summary: "Quemadura por calor o líquido caliente",
        lead: "Aléjate del calor de forma segura y enfría la quemadura.",
        steps: [
          "Enfría la zona con agua corriente fresca o tibia durante 20 minutos. No uses hielo.",
          "Retira las joyas o la ropa cercana, salvo que esté pegada a la piel.",
          "Cubre la quemadura sin apretar con un apósito limpio que no suelte pelusa y pide consejo médico."
        ],
        warning: "No pongas pasta de dientes, aceite ni cremas, y no revientes las ampollas. Llama al 123 si la quemadura es grande o profunda, afecta a la cara o dificulta la respiración."
      },
      choking: {
        title: "Atragantamiento en adultos",
        summary: "La persona no puede hablar ni toser",
        lead: "Si puede toser o hablar, anímala a toser y vigílala de cerca.",
        steps: [
          "Si no puede respirar, hablar ni toser, pide a alguien que llame al 123 de inmediato.",
          "En un adulto consciente, da hasta 5 golpes firmes entre los omóplatos mientras se inclina hacia delante.",
          "Si no funciona, da hasta 5 compresiones abdominales hacia dentro y arriba. Alterna hasta que salga el objeto o llegue ayuda.",
          "Si pierde el conocimiento, bájala al suelo con cuidado e inicia la RCP si sabes hacerla. Sigue las instrucciones del operador."
        ],
        warning: "Estos pasos son solo para adultos conscientes. No hagas compresiones abdominales a bebés, niños pequeños ni embarazadas; llama a emergencias y sigue sus indicaciones."
      },
      fracture: {
        title: "Posible fractura",
        summary: "Dolor intenso, hinchazón o deformidad",
        lead: "Trátala como una posible fractura y no pruebes la lesión.",
        steps: [
          "Llama al 123 si la fractura es evidente o abierta, hay dolor intenso, entumecimiento o sangrado.",
          "Ayuda a la persona a permanecer quieta y sujeta la extremidad tal como está.",
          "Coloca una compresa fría envuelta en tela, sin presionar sobre un hueso que sobresalga.",
          "Vigila su respiración y estado de alerta, y quédate con ella."
        ],
        warning: "No intentes recolocar el hueso. Si puede haber una lesión en la cabeza, el cuello o la espalda, no muevas a la persona y espera a emergencias."
      },
      unresponsive: {
        title: "Persona inconsciente",
        summary: "No responde o no respira con normalidad",
        lead: "Comprueba que el lugar sea seguro. Háblale y tócale el hombro.",
        steps: [
          "Pide a alguien que llame al 123 y traiga un desfibrilador si hay uno. Activa el altavoz.",
          "Si no responde y no respira con normalidad, comprime fuerte y rápido el centro del pecho, a un ritmo de 100–120 compresiones por minuto.",
          "Usa el desfibrilador en cuanto esté disponible y sigue sus indicaciones. Continúa hasta que llegue ayuda o respire con normalidad.",
          "Si está inconsciente pero respira con normalidad, vigila su respiración y sigue las instrucciones del operador."
        ],
        warning: "Si no tienes formación, pide al operador que te guíe paso a paso. No retrases la llamada."
      }
    }
  }
};

const icons = { bleeding: "✚", burn: "♨", choking: "◉", fracture: "⌁", unresponsive: "♡" };
const languageCodes = { ar: "ar-EG", en: "en-US", es: "es-ES" };
const speechPriority = ["unresponsive", "choking", "bleeding", "burn", "fracture"];
const list = document.querySelector("#guide-list");
const detail = document.querySelector("#guide-detail");
const content = document.querySelector("#guide-content");
const chatThread = document.querySelector("#chat-thread");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatImageInput = document.querySelector("#chat-image");
const chatVoiceButton = document.querySelector("#chat-voice");
const chatUploadButton = document.querySelector("#chat-upload");
const accountDialog = document.querySelector("#account-dialog");
const accountPanel = document.querySelector("#account-panel");
const languageSelect = document.querySelector("#language-select");
let language = localStorage.getItem("doctor-rescate-language") || "ar";
let authMode = "login";
let signedInUsername = null;
let selectedGuideId = null;
let voiceGuideId = null;
let activeSpeechButton = null;
let activeSpeechStatus = null;
let speechGeneration = 0;

if (!Object.prototype.hasOwnProperty.call(copy, language)) language = "ar";

function currentCopy() {
  return copy[language];
}

function applyLanguage() {
  const t = currentCopy();
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.title = t.pageTitle;
  document.querySelector('meta[name="description"]').content = t.description;
  languageSelect.value = language;
  languageSelect.setAttribute("aria-label", t.language);
  document.querySelector(".brand").setAttribute("aria-label", `${t.pageTitle.split("|")[0].trim()}, ${t.home}`);
  document.querySelector("#brand-name").textContent = t.brand;
  document.querySelector("#brand-subtitle").textContent = t.subtitle;
  document.querySelector("#urgent-kicker").textContent = t.urgentKicker;
  document.querySelector("#urgent-title").textContent = t.urgentTitle;
  document.querySelector("#urgent-copy").textContent = t.urgentCopy;
  document.querySelector("#call-label").textContent = t.call;
  document.querySelector("#urgent-note").textContent = t.urgentNote;
  document.querySelector("#voice-title").textContent = t.assistantTitle;
  document.querySelector("#voice-intro").textContent = t.assistantIntro;
  document.querySelector("#voice-button-label").textContent = t.voiceStart;
  document.querySelector("#voice-status").textContent = t.voiceReady;
  document.querySelector("#voice-privacy").textContent = t.voicePrivacy;
  document.querySelector("#voice-show-guide").textContent = t.voiceShowGuide;
  document.querySelector("#guides-title").textContent = t.guideHeading;
  document.querySelector("#guides-intro").textContent = t.guideIntro;
  document.querySelector("#offline-label").textContent = t.offline;
  document.querySelector("#assistant-chat-title").textContent = t.chatTitle;
  document.querySelector("#assistant-chat-intro").textContent = t.chatIntro;
  document.querySelector("#chat-input").placeholder = t.chatPlaceholder;
  document.querySelector("#chat-send").textContent = t.chatSend;
  document.querySelector("#chat-voice").setAttribute("aria-label", t.chatVoice);
  document.querySelector("#chat-upload").setAttribute("aria-label", t.chatUpload);
  document.querySelector("#guide-back span").textContent = t.allGuides;
  document.querySelector("#notice-title").textContent = t.noticeTitle;
  document.querySelector("#notice-copy").textContent = t.notice;
  document.querySelector("#footer-copy").textContent = t.footer;
  document.querySelector("#dialog-close").setAttribute("aria-label", t.close);
  document.querySelector("#account-open").textContent = signedInUsername || t.account;
  renderGuides();
  renderChatThread();
  if (selectedGuideId) showGuide(selectedGuideId);
  if (signedInUsername) renderSignedIn();
  else renderAccountForm();
}

function renderGuides() {
  const items = Object.entries(currentCopy().guides).map(([id, guide]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "guide-item";
    button.setAttribute("aria-label", `${guide.title}: ${guide.summary}`);
    button.innerHTML = `<span class="guide-icon" aria-hidden="true">${icons[id]}</span>
      <span><strong>${guide.title}</strong><small>${guide.summary}</small></span>
      <span class="guide-arrow" aria-hidden="true">‹</span>`;
    button.addEventListener("click", () => showGuide(id));
    return button;
  });
  list.replaceChildren(...items);
}

function normalizeText(value) {
  return value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function findGuideBySymptoms(text) {
  const normalized = normalizeText(text);
  const guideKeywords = {
    bleeding: ["bleeding", "blood", "hemorragia", "sangre", "sangrado", "wound", "herida", "cut", "جرح", "نزيف", "دم"],
    burn: ["burn", "scald", "quemadura", "heat", "hot water", "fire", "حرق", "حروق", "نار", "ماء ساخن", "حرارة"],
    choking: ["choking", "cant breathe", "cannot breathe", "atragantamiento", "asfixia", "اختناق", "يختنق", "غصة", "لا يتنفس", "صعوبة تنفس"],
    fracture: ["fracture", "broken bone", "broken arm", "fractura", "hueso roto", "brazo roto", "pierna rota", "كسر", "مكسور", "عظم", "ألم في اليد", "ألم في الساق"],
    unresponsive: ["unresponsive", "unconscious", "not breathing", "no response", "inconsciente", "no respira", "no responde", "فاقد الوعي", "مغمى عليه", "لا يتنفس", "لا يستجيب"]
  };

  for (const [guideId, keywords] of Object.entries(guideKeywords)) {
    if (keywords.some((term) => normalized.includes(normalizeText(term)))) return guideId;
  }

  return null;
}

function buildAssistantReply(message) {
  const t = currentCopy();
  const normalizedMessage = normalizeText(message);

  if (!normalizedMessage) {
    return t.chatAsk;
  }

  const emergencySignals = [
    "not breathing",
    "لا يتنفس",
    "no respira",
    "no responde",
    "فاقد الوعي",
    "unconscious",
    "inconsciente",
    "severe bleeding",
    "نزيف شديد",
    "hemorragia intensa",
    "dificultad para respirar",
    "صعوبة في التنفس",
    "cant breathe",
    "no puede respirar"
  ];

  if (emergencySignals.some((signal) => normalizedMessage.includes(normalizeText(signal)))) {
    return `${t.urgentTitle} ${t.urgentCopy}`;
  }

  const guideId = findGuideBySymptoms(normalizedMessage);
  if (guideId) {
    const guide = t.guides[guideId];
    return `${guide.title}: ${guide.lead}\n\n${guide.steps[0]}\n${guide.steps[1]}\n${guide.warning}`;
  }

  if (normalizedMessage.includes("thank") || normalizedMessage.includes("شكرا") || normalizedMessage.includes("gracias")) {
    return t.chatAsk;
  }

  return `${t.chatAsk}\n\n${t.urgentCopy}`;
}

function appendChatMessage(role, text, speakable = false) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  wrapper.appendChild(bubble);
  if (speakable) addSpeechPlayer(wrapper, text, currentCopy().listenAnswer);
  chatThread.appendChild(wrapper);
  chatThread.scrollTop = chatThread.scrollHeight;
}

function renderChatThread() {
  chatThread.innerHTML = "";
  appendChatMessage("bot", currentCopy().chatWelcome);
}

function splitSpeechText(text, maxLength = 220) {
  const words = text.match(/\S+/gu) || [];
  const chunks = [];
  let chunk = "";
  for (const word of words) {
    const next = chunk ? `${chunk} ${word}` : word;
    if (chunk && next.length > maxLength) {
      chunks.push(chunk);
      chunk = word;
    } else {
      chunk = next;
    }
  }
  if (chunk) chunks.push(chunk);
  return chunks;
}

function finishSpeech(generation, message) {
  if (generation !== speechGeneration) return;
  if (activeSpeechButton) {
    activeSpeechButton.textContent = activeSpeechButton.dataset.playLabel;
    activeSpeechButton.setAttribute("aria-pressed", "false");
  }
  if (activeSpeechStatus) activeSpeechStatus.textContent = message;
  activeSpeechButton = null;
  activeSpeechStatus = null;
}

function stopSpeech(message = currentCopy().speechStopped) {
  if (!("speechSynthesis" in window)) return;
  speechGeneration += 1;
  window.speechSynthesis.cancel();
  if (activeSpeechButton) {
    activeSpeechButton.textContent = activeSpeechButton.dataset.playLabel;
    activeSpeechButton.setAttribute("aria-pressed", "false");
  }
  if (activeSpeechStatus) activeSpeechStatus.textContent = message;
  activeSpeechButton = null;
  activeSpeechStatus = null;
}

function addSpeechPlayer(container, text, label) {
  const player = document.createElement("div");
  player.className = "speech-player";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "speak-button";
  button.textContent = label;
  button.dataset.playLabel = label;
  button.setAttribute("aria-pressed", "false");
  const status = document.createElement("span");
  status.className = "speech-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  button.addEventListener("click", () => {
    if (activeSpeechButton === button) {
      stopSpeech();
      return;
    }
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      status.textContent = currentCopy().speechUnavailable;
      return;
    }

    stopSpeech("");
    const chunks = splitSpeechText(text);
    if (!chunks.length) return;
    const generation = ++speechGeneration;
    activeSpeechButton = button;
    activeSpeechStatus = status;
    button.textContent = currentCopy().stopSpeaking;
    button.setAttribute("aria-pressed", "true");
    status.textContent = currentCopy().speechStarted;
    const voices = window.speechSynthesis.getVoices();
    const targetLanguage = languageCodes[language].toLowerCase();
    const voice = voices.find((candidate) => candidate.lang.toLowerCase() === targetLanguage)
      || voices.find((candidate) => candidate.lang.toLowerCase().startsWith(`${language}-`));
    let chunkIndex = 0;

    const speakNextChunk = () => {
      if (generation !== speechGeneration) return;
      if (chunkIndex >= chunks.length) {
        finishSpeech(generation, currentCopy().speechFinished);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex++]);
      utterance.lang = languageCodes[language];
      utterance.rate = 0.9;
      utterance.volume = 1;
      if (voice) utterance.voice = voice;
      utterance.onend = speakNextChunk;
      utterance.onerror = (event) => {
        if (generation !== speechGeneration) return;
        if (["canceled", "interrupted"].includes(event.error)) {
          finishSpeech(generation, currentCopy().speechStopped);
          return;
        }
        finishSpeech(generation, currentCopy().speechError);
      };
      window.speechSynthesis.speak(utterance);
    };

    speakNextChunk();
  });
  player.append(button, status);
  container.appendChild(player);
}

function startVoiceChat() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    appendChatMessage("bot", currentCopy().speechUnavailable);
    return;
  }

  const recognition = new Recognition();
  recognition.lang = languageCodes[language];
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim();
    if (transcript) chatInput.value = transcript;
  };
  recognition.onerror = () => {
    appendChatMessage("bot", currentCopy().voiceError);
  };
  recognition.start();
}

async function sendAssistantMessage(message, imageFile = null) {
  const t = currentCopy();
  const payload = { message, language, image_data: null, image_mime_type: null };

  if (imageFile) {
    const reader = new FileReader();
    const result = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Image read failed"));
      reader.readAsDataURL(imageFile);
    });
    payload.image_data = String(result).split(",")[1] || "";
    payload.image_mime_type = imageFile.type || "image/jpeg";
  }

  const response = await fetch("/api/assistant/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({ answer: t.genericError }));
  if (!response.ok) {
    throw new Error(result.detail || t.genericError);
  }

  return result.answer || t.genericError;
}

function handleChatSubmit(event) {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text && !chatImageInput.files[0]) return;

  const imageFile = chatImageInput.files[0] || null;
  appendChatMessage("user", text || (imageFile ? currentCopy().chatUploadStatus : ""));
  chatInput.value = "";
  chatImageInput.value = "";

  const pendingMessage = text || currentCopy().chatUploadStatus;
  if (text) {
    appendChatMessage("bot", "...");
  }

  sendAssistantMessage(text, imageFile)
    .then((answer) => {
      const lastBot = chatThread.querySelectorAll(".message.bot .bubble").length > 0 ? chatThread.querySelectorAll(".message.bot .bubble").item(chatThread.querySelectorAll(".message.bot .bubble").length - 1) : null;
      if (lastBot && lastBot.textContent === "...") {
        lastBot.textContent = answer;
        addSpeechPlayer(lastBot.parentElement, answer, currentCopy().listenAnswer);
      } else {
        appendChatMessage("bot", answer, true);
      }
    })
    .catch((error) => {
      const textError = error?.message || currentCopy().genericError;
      const lastBot = chatThread.querySelectorAll(".message.bot .bubble").length > 0 ? chatThread.querySelectorAll(".message.bot .bubble").item(chatThread.querySelectorAll(".message.bot .bubble").length - 1) : null;
      if (lastBot && lastBot.textContent === "...") {
        lastBot.textContent = textError;
      } else {
        appendChatMessage("bot", textError);
      }
    });
}

function showGuide(id) {
  selectedGuideId = id;
  const guide = currentCopy().guides[id];
  const steps = guide.steps.map((step) => `<li>${step}</li>`).join("");
  content.innerHTML = `<h2>${guide.title}</h2>
    <p class="guide-lead">${guide.lead}</p>
    <ol class="steps">${steps}</ol>
    <p class="danger-note">${guide.warning}</p>`;
  addSpeechPlayer(content, `${guide.title}. ${guide.lead} ${guide.steps.join(". ")} ${guide.warning}`, currentCopy().speak);
  detail.hidden = false;
  detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function matchVoiceToGuide(transcript) {
  const phrase = transcript.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const id of speechPriority) {
    const terms = currentCopy().voiceTerms[id];
    if (terms.some((term) => phrase.includes(term.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))) {
      return id;
    }
  }
  return null;
}

function startVoiceAssistant() {
  const t = currentCopy();
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const button = document.querySelector("#voice-start");
  const status = document.querySelector("#voice-status");
  const result = document.querySelector("#voice-result");
  if (!Recognition) {
    status.textContent = t.voiceNotSupported;
    return;
  }

  const recognition = new Recognition();
  recognition.lang = languageCodes[language];
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  button.disabled = true;
  document.querySelector("#voice-button-label").textContent = t.voiceListening;
  status.textContent = t.voiceListening;
  result.hidden = true;
  voiceGuideId = null;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim();
    voiceGuideId = matchVoiceToGuide(transcript);
    document.querySelector("#voice-transcript").textContent = t.voiceTranscript(transcript);
    document.querySelector("#voice-show-guide").hidden = !voiceGuideId;
    if (voiceGuideId) {
      status.textContent = t.voiceMatched(t.guides[voiceGuideId].title);
    } else {
      status.textContent = t.voiceNoMatch;
    }
    result.hidden = false;
  };
  recognition.onerror = () => {
    status.textContent = t.voiceError;
  };
  recognition.onend = () => {
    button.disabled = false;
    document.querySelector("#voice-button-label").textContent = currentCopy().voiceStart;
  };

  try {
    recognition.start();
  } catch {
    button.disabled = false;
    document.querySelector("#voice-button-label").textContent = t.voiceStart;
    status.textContent = t.voiceError;
  }
}

document.querySelector("#guide-back").addEventListener("click", () => {
  selectedGuideId = null;
  detail.hidden = true;
  stopSpeech("");
  document.querySelector("#guides-title").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#voice-start").addEventListener("click", startVoiceAssistant);
document.querySelector("#voice-show-guide").addEventListener("click", () => {
  if (!voiceGuideId) return;
  showGuide(voiceGuideId);
  content.querySelector(".speak-button")?.click();
});
chatForm.addEventListener("submit", handleChatSubmit);
chatVoiceButton.addEventListener("click", startVoiceChat);
chatUploadButton.addEventListener("click", () => chatImageInput.click());
chatImageInput.addEventListener("change", () => {
  if (chatImageInput.files && chatImageInput.files[0]) {
    appendChatMessage("bot", currentCopy().chatUploadStatus);
  }
});

function renderAccountForm() {
  const t = currentCopy();
  accountPanel.innerHTML = `<h2 id="account-title">${t.accountTitle}</h2>
    <p class="account-intro">${t.accountIntro}</p>
    <div class="auth-tabs" role="tablist" aria-label="${t.accountTitle}">
      <button class="auth-tab ${authMode === "login" ? "is-active" : ""}" id="login-tab" type="button" role="tab" aria-selected="${authMode === "login"}">${t.login}</button>
      <button class="auth-tab ${authMode === "register" ? "is-active" : ""}" id="register-tab" type="button" role="tab" aria-selected="${authMode === "register"}">${t.register}</button>
    </div>
    <form id="auth-form">
      <label for="username">${t.username}</label>
      <input id="username" name="username" autocomplete="username" minlength="3" maxlength="32" required>
      <p class="field-hint">${t.usernameHint}</p>
      <label for="password">${t.password}</label>
      <input id="password" name="password" type="password" autocomplete="${authMode === "login" ? "current-password" : "new-password"}" minlength="10" maxlength="128" required>
      <p class="field-hint">${t.passwordHint}</p>
      <p class="form-error" id="auth-error" role="alert" hidden></p>
      <button class="submit-button" id="auth-submit" type="submit">${authMode === "login" ? t.submitLogin : t.submitRegister}</button>
    </form>
    <div class="social-auth">
      <p class="social-divider">${t.socialDivider}</p>
      <a class="social-button google-button" href="/api/auth/google/start">
        <span class="social-mark" aria-hidden="true">G</span>${t.googleSignIn}
      </a>
      <a class="social-button facebook-button" href="/api/auth/facebook/start">
        <span class="social-mark" aria-hidden="true">f</span>${t.facebookSignIn}
      </a>
    </div>`;
  document.querySelector("#login-tab").addEventListener("click", () => setAuthMode("login"));
  document.querySelector("#register-tab").addEventListener("click", () => setAuthMode("register"));
  document.querySelector("#auth-form").addEventListener("submit", handleAuthSubmit);
}

function setAuthMode(mode) {
  authMode = mode;
  renderAccountForm();
}

function renderSignedIn() {
  const t = currentCopy();
  accountPanel.innerHTML = `<h2 id="account-title">${t.signedIn(escapeHtml(signedInUsername))}</h2>
    <div class="signed-in"><p>${t.signedInCopy}</p>
    <p class="form-error" id="account-feedback" role="status" hidden></p>
    <button class="logout-button" id="logout-button" type="button">${t.logout}</button></div>`;
  document.querySelector("#logout-button").addEventListener("click", logout);
}

function escapeHtml(value) {
  const element = document.createElement("span");
  element.textContent = value;
  return element.innerHTML;
}

function showAuthError(message) {
  const error = document.querySelector("#auth-error, #account-feedback");
  if (!error) return;
  error.textContent = message;
  error.hidden = false;
}

async function loadAccount() {
  const response = await fetch("/api/auth/me");
  if (response.status === 401) {
    signedInUsername = null;
    document.querySelector("#account-open").textContent = currentCopy().account;
    renderAccountForm();
    return;
  }
  if (!response.ok) {
    showAuthError(currentCopy().accountLoadError);
    return;
  }
  const user = await response.json();
  signedInUsername = user.username;
  document.querySelector("#account-open").textContent = user.username;
  renderSignedIn();
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const t = currentCopy();
  const error = document.querySelector("#auth-error");
  error.hidden = true;
  const submit = document.querySelector("#auth-submit");
  submit.disabled = true;
  try {
    const response = await fetch(`/api/auth/${authMode === "login" ? "login" : "register"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
      })
    });
    const result = await response.json();
    if (!response.ok) {
      error.textContent = response.status === 401
        ? t.invalidCredentials
        : response.status === 409
          ? t.duplicateUsername
          : response.status === 422
            ? t.invalidUsername
            : t.genericError;
      error.hidden = false;
      return;
    }
    signedInUsername = result.username;
    document.querySelector("#account-open").textContent = result.username;
    accountDialog.close();
  } catch {
    error.textContent = t.networkError;
    error.hidden = false;
  } finally {
    submit.disabled = false;
  }
}

async function logout() {
  const t = currentCopy();
  try {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) {
      showAuthError(t.logoutError);
      return;
    }
    signedInUsername = null;
    authMode = "login";
    document.querySelector("#account-open").textContent = t.account;
    renderAccountForm();
  } catch {
    showAuthError(t.networkError);
  }
}

languageSelect.addEventListener("change", () => {
  stopSpeech("");
  language = languageSelect.value;
  localStorage.setItem("doctor-rescate-language", language);
  applyLanguage();
});

document.querySelector("#account-open").addEventListener("click", async () => {
  try {
    await loadAccount();
  } catch (error) {
    console.error("Could not load account:", error);
    renderAccountForm();
    showAuthError(currentCopy().networkError);
  }
  accountDialog.showModal();
});

applyLanguage();
const authQuery = new URLSearchParams(window.location.search);
const authErrorCode = authQuery.get("auth_error");
if (authErrorCode) {
  accountDialog.showModal();
  showAuthError(authErrorCode === "provider_not_configured"
    ? authQuery.get("auth_provider") === "facebook"
      ? currentCopy().facebookNotConfigured
      : currentCopy().googleNotConfigured
    : currentCopy().socialLoginFailed);
  window.history.replaceState(null, "", window.location.pathname);
} else if (authQuery.get("social_login") === "success") {
  loadAccount().catch((error) => {
    console.error("Could not load social account:", error);
  });
  window.history.replaceState(null, "", window.location.pathname);
}

navigator.serviceWorker?.register("/service-worker.js").catch((error) => {
  console.error("Service worker registration failed:", error);
});
