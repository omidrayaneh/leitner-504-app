const lessons = [
  // Lesson 1
  [
    { word: "abandon", pronunciation: "/əˈbændən/", meaning: "ترک کردن، رها کردن", example: "They had to abandon the car." },
    { word: "keen", pronunciation: "/kiːn/", meaning: "مشتاق، تیز", example: "He is keen on playing football." },
    { word: "jealous", pronunciation: "/ˈdʒeləs/", meaning: "حسود", example: "She got jealous when she saw him with another girl." },
    { word: "tact", pronunciation: "/tækt/", meaning: "تدبیر، ملاحظه", example: "He showed great tact in dealing with the angry customer." },
    { word: "oath", pronunciation: "/oʊθ/", meaning: "سوگند", example: "He took an oath to tell the truth." },
    { word: "vacant", pronunciation: "/ˈveɪkənt/", meaning: "خالی", example: "The seat next to him was vacant." },
    { word: "hardship", pronunciation: "/ˈhɑːrdʃɪp/", meaning: "سختی، مشقت", example: "They faced many hardships during the war." },
    { word: "gallant", pronunciation: "/ˈɡælənt/", meaning: "شجاع، دلیر، باوقار", example: "The gallant knight saved the princess." },
    { word: "data", pronunciation: "/ˈdeɪtə/", meaning: "داده ها، اطلاعات", example: "We need more data to make a decision." },
    { word: "unaccustomed", pronunciation: "/ˌʌnəˈkʌstəmd/", meaning: "عادت نکرده، ناآشنا", example: "He was unaccustomed to the heat." },
    { word: "bachelor", pronunciation: "/ˈbætʃələr/", meaning: "مرد مجرد", example: "He remained a bachelor all his life." },
    { word: "qualify", pronunciation: "/ˈkwɒlɪfaɪ/", meaning: "واجد شرایط بودن", example: "She qualified for the job." }
  ],
  // Lesson 2
  [
    { word: "corpse", pronunciation: "/kɔːrps/", meaning: "جسد", example: "The police found a corpse in the river." },
    { word: "conceal", pronunciation: "/kənˈsiːl/", meaning: "پنهان کردن", example: "He tried to conceal the truth." },
    { word: "dismal", pronunciation: "/ˈdɪzməl/", meaning: "دلگیر، غم انگیز", example: "The weather was dismal." },
    { word: "frigid", pronunciation: "/ˈfrɪdʒɪd/", meaning: "خیلی سرد", example: "The frigid air chilled them to the bone." },
    { word: "inhabit", pronunciation: "/ɪnˈhæbɪt/", meaning: "ساکن بودن در", example: "Few people inhabit this remote island." },
    { word: "numb", pronunciation: "/nʌm/", meaning: "بی حس", example: "My fingers were numb with cold." },
    { word: "peril", pronunciation: "/ˈperəl/", meaning: "خطر", example: "They faced great peril on their journey." },
    { word: "recline", pronunciation: "/rɪˈklaɪn/", meaning: "لم دادن، تکیه دادن", example: "He reclined on the sofa." },
    { word: "shriek", pronunciation: "/ʃriːk/", meaning: "جیغ زدن", example: "She shrieked in terror." },
    { word: "sinister", pronunciation: "/ˈsɪnɪstər/", meaning: "شوم، شیطانی", example: "There was something sinister about his smile." },
    { word: "tempt", pronunciation: "/tempt/", meaning: "وسوسه کردن", example: "The delicious cake tempted her." },
    { word: "wager", pronunciation: "/ˈweɪdʒər/", meaning: "شرط بندی کردن", example: "He made a wager on the horse race." }
  ],
  // Lesson 3
  [
    { word: "typical", pronunciation: "/ˈtɪpɪkl/", meaning: "معمولی، عادی", example: "It was a typical Monday morning." },
    { word: "minimum", pronunciation: "/ˈmɪnɪməm/", meaning: "حداقل", example: "The minimum age for driving is 18." },
    { word: "scarce", pronunciation: "/skers/", meaning: "کمیاب", example: "Food was scarce during the drought." },
    { word: "annual", pronunciation: "/ˈænjuəl/", meaning: "سالانه", example: "The company holds an annual meeting." },
    { word: "persuade", pronunciation: "/pərˈsweɪd/", meaning: "متقاعد کردن", example: "He persuaded her to go with him." },
    { word: "essential", pronunciation: "/ɪˈsenʃl/", meaning: "ضروری", example: "Water is essential for life." },
    { word: "blend", pronunciation: "/blend/", meaning: "مخلوط کردن", example: "Blend the ingredients together." },
    { word: "visible", pronunciation: "/ˈvɪzəbl/", meaning: "قابل مشاهده", example: "The mountains were visible in the distance." },
    { word: "expensive", pronunciation: "/ɪkˈspensɪv/", meaning: "گران", example: "This car is too expensive." },
    { word: "talent", pronunciation: "/ˈtælənt/", meaning: "استعداد", example: "She has a talent for music." },
    { word: "devise", pronunciation: "/dɪˈvaɪz/", meaning: "ابداع کردن، طراحی کردن", example: "They devised a plan to escape." },
    { word: "wholesale", pronunciation: "/ˈhoʊlseɪl/", meaning: "عمده فروشی", example: "They buy goods wholesale." }
  ],
  // Lesson 4
  [
    { word: "vapor", pronunciation: "/ˈveɪpər/", meaning: "بخار", example: "Water vapor rose from the hot spring." },
    { word: "eliminate", pronunciation: "/ɪˈlɪmɪneɪt/", meaning: "حذف کردن", example: "We need to eliminate the errors." },
    { word: "villain", pronunciation: "/ˈvɪlən/", meaning: "آدم شرور", example: "He played the villain in the movie." },
    { word: "dense", pronunciation: "/dens/", meaning: "متراکم، غلیظ", example: "The forest was dense and dark." },
    { word: "utilize", pronunciation: "/ˈjuːtəlaɪz/", meaning: "استفاده کردن", example: "We must utilize our resources wisely." },
    { word: "humid", pronunciation: "/ˈhjuːmɪd/", meaning: "مرطوب", example: "The weather was hot and humid." },
    { word: "theory", pronunciation: "/ˈθiːəri/", meaning: "نظریه", example: "He proposed a new theory." },
    { word: "descend", pronunciation: "/dɪˈsend/", meaning: "پایین آمدن", example: "The plane began to descend." },
    { word: "circulate", pronunciation: "/ˈsɜːrkjəleɪt/", meaning: "گردش کردن", example: "Blood circulates through the body." },
    { word: "enormous", pronunciation: "/ɪˈnɔːrməs/", meaning: "بسیار بزرگ", example: "They live in an enormous house." },
    { word: "predict", pronunciation: "/prɪˈdɪkt/", meaning: "پیش بینی کردن", example: "It's hard to predict the future." },
    { word: "vanish", pronunciation: "/ˈvænɪʃ/", meaning: "ناپدید شدن", example: "The magician made the rabbit vanish." }
  ],
  // Lesson 5
  [
    { word: "tradition", pronunciation: "/trəˈdɪʃn/", meaning: "سنت، رسم", example: "It's a family tradition to eat together on Sundays." },
    { word: "rural", pronunciation: "/ˈrʊrəl/", meaning: "روستایی", example: "He grew up in a rural area." },
    { word: "burden", pronunciation: "/ˈbɜːrdn/", meaning: "بار، مسئولیت سنگین", example: "He carried a heavy burden." },
    { word: "campus", pronunciation: "/ˈkæmpəs/", meaning: "محوطه دانشگاه", example: "The university campus is beautiful." },
    { word: "majority", pronunciation: "/məˈdʒɔːrəti/", meaning: "اکثریت", example: "The majority of people voted yes." },
    { word: "assemble", pronunciation: "/əˈsembl/", meaning: "جمع شدن، مونتاژ کردن", example: "The students assembled in the hall." },
    { word: "explore", pronunciation: "/ɪkˈsplɔːr/", meaning: "کاوش کردن", example: "They went to explore the cave." },
    { word: "topic", pronunciation: "/ˈtɒpɪk/", meaning: "موضوع", example: "Let's change the topic." },
    { word: "debate", pronunciation: "/dɪˈbeɪt/", meaning: "بحث، مناظره", example: "There was a lively debate about the issue." },
    { word: "evade", pronunciation: "/ɪˈveɪd/", meaning: "طفره رفتن، فرار کردن", example: "He tried to evade the question." },
    { word: "probe", pronunciation: "/proʊb/", meaning: "کاوش کردن، تحقیق کردن", example: "The police probed into the matter." },
    { word: "reform", pronunciation: "/rɪˈfɔːrm/", meaning: "اصلاح کردن", example: "They called for political reform." }
  ],
  // Lesson 6
  [
    { word: "approach", pronunciation: "/əˈproʊtʃ/", meaning: "نزدیک شدن، رویکرد", example: "Winter is approaching." },
    { word: "detect", pronunciation: "/dɪˈtekt/", meaning: "تشخیص دادن، کشف کردن", example: "The machine can detect faults." },
    { word: "defect", pronunciation: "/ˈdiːfekt/", meaning: "نقص، عیب", example: "There is a defect in the product." },
    { word: "employee", pronunciation: "/ɪmˈplɔɪiː/", meaning: "کارمند", example: "He is a loyal employee." },
    { word: "neglect", pronunciation: "/nɪˈɡlekt/", meaning: "غفلت کردن، نادیده گرفتن", example: "He neglected his duties." },
    { word: "deceive", pronunciation: "/dɪˈsiːv/", meaning: "فریب دادن", example: "He deceived her into giving him money." },
    { word: "undoubtedly", pronunciation: "/ʌnˈdaʊtɪdli/", meaning: "بدون شک", example: "She is undoubtedly the best candidate." },
    { word: "popular", pronunciation: "/ˈpɒpjələr/", meaning: "محبوب", example: "This song is very popular." },
    { word: "thorough", pronunciation: "/ˈθɜːroʊ/", meaning: "کامل، جامع", example: "They did a thorough search." },
    { word: "client", pronunciation: "/ˈklaɪənt/", meaning: "مشتری، موکل", example: "The lawyer met with his client." },
    { word: "comprehensive", pronunciation: "/ˌkɒmprɪˈhensɪv/", meaning: "جامع، کامل", example: "The report provides a comprehensive overview." },
    { word: "defraud", pronunciation: "/dɪˈfrɔːd/", meaning: "کلاهبرداری کردن", example: "He was accused of defrauding investors." }
  ],
  // Lesson 7
  [
    { word: "postpone", pronunciation: "/poʊstˈpoʊn/", meaning: "به تعویق انداختن", example: "They decided to postpone the meeting." },
    { word: "consent", pronunciation: "/kənˈsent/", meaning: "رضایت دادن", example: "She gave her consent to the marriage." },
    { word: "massive", pronunciation: "/ˈmæsɪv/", meaning: "بسیار بزرگ، عظیم", example: "They found a massive dinosaur bone." },
    { word: "capsule", pronunciation: "/ˈkæpsjuːl/", meaning: "کپسول", example: "He took a pain relief capsule." },
    { word: "preserve", pronunciation: "/prɪˈzɜːrv/", meaning: "حفظ کردن، نگه داشتن", example: "We need to preserve our natural resources." },
    { word: "denounce", pronunciation: "/dɪˈnaʊns/", meaning: "محکوم کردن", example: "They denounced the attack." },
    { word: "unique", pronunciation: "/juːˈniːk/", meaning: "منحصر به فرد", example: "Everyone's fingerprints are unique." },
    { word: "torrent", pronunciation: "/ˈtɔːrənt/", meaning: "سیلاب، جریان شدید", example: "A torrent of rain fell." },
    { word: "resent", pronunciation: "/rɪˈzent/", meaning: "رنجیدن از", example: "She resented his interference." },
    { word: "molest", pronunciation: "/məˈlest/", meaning: "آزار رساندن", example: "It is illegal to molest wildlife." },
    { word: "gloomy", pronunciation: "/ˈɡluːmi/", meaning: "تاریک، دلگیر", example: "The room was gloomy and cold." },
    { word: "unforeseen", pronunciation: "/ˌʌnfɔːrˈsiːn/", meaning: "پیش بینی نشده", example: "They faced unforeseen problems." }
  ],
  // Lesson 8
  [
    { word: "exaggerate", pronunciation: "/ɪɡˈzædʒəreɪt/", meaning: "اغراق کردن", example: "He tends to exaggerate his achievements." },
    { word: "amateur", pronunciation: "/ˈæmətʃər/", meaning: "آماتور، غیر حرفه ای", example: "He is an amateur photographer." },
    { word: "mediocre", pronunciation: "/ˌmiːdiˈoʊkər/", meaning: "متوسط، معمولی", example: "The food was mediocre." },
    { word: "variety", pronunciation: "/vəˈraɪəti/", meaning: "تنوع", example: "The store offers a wide variety of goods." },
    { word: "valid", pronunciation: "/ˈvælɪd/", meaning: "معتبر", example: "Your passport is no longer valid." },
    { word: "survive", pronunciation: "/sərˈvaɪv/", meaning: "زنده ماندن", example: "Few survived the crash." },
    { word: "weird", pronunciation: "/wɪrd/", meaning: "عجیب و غریب", example: "That's a weird coincidence." },
    { word: "prominent", pronunciation: "/ˈprɒmɪnənt/", meaning: "برجسته، مشهور", example: "He is a prominent figure in politics." },
    { word: "security", pronunciation: "/sɪˈkjʊərəti/", meaning: "امنیت", example: "Security measures were increased." },
    { word: "bulky", pronunciation: "/ˈbʌlki/", meaning: "حجیم", example: "The package was bulky and heavy." },
    { word: "reluctant", pronunciation: "/rɪˈlʌktənt/", meaning: "بی میل", example: "She was reluctant to leave." },
    { word: "obvious", pronunciation: "/ˈɒbviəs/", meaning: "واضح، آشکار", example: "The answer is obvious." }
  ],
  // Lesson 9
  [
    { word: "vicinity", pronunciation: "/vəˈsɪnəti/", meaning: "مجاورت، نزدیکی", example: "There are no shops in the immediate vicinity." },
    { word: "century", pronunciation: "/ˈsentʃəri/", meaning: "قرن", example: "This building dates back to the 18th century." },
    { word: "rage", pronunciation: "/reɪdʒ/", meaning: "خشم شدید", example: "He flew into a rage." },
    { word: "document", pronunciation: "/ˈdɒkjəmənt/", meaning: "سند، مدرک", example: "Please sign the document." },
    { word: "conclude", pronunciation: "/kənˈkluːd/", meaning: "نتیجه گیری کردن، به پایان رساندن", example: "The report concluded that the plan was flawed." },
    { word: "undeniable", pronunciation: "/ˌʌndɪˈnaɪəbl/", meaning: "غیر قابل انکار", example: "Her talent is undeniable." },
    { word: "resist", pronunciation: "/rɪˈzɪst/", meaning: "مقاومت کردن", example: "He couldn't resist eating the cake." },
    { word: "lack", pronunciation: "/læk/", meaning: "فقدان، نداشتن", example: "The project failed due to lack of funding." },
    { word: "ignore", pronunciation: "/ɪɡˈnɔːr/", meaning: "نادیده گرفتن", example: "He ignored her advice." },
    { word: "challenge", pronunciation: "/ˈtʃælɪndʒ/", meaning: "چالش", example: "The job presents a new challenge." },
    { word: "miniature", pronunciation: "/ˈmɪnətʃər/", meaning: "مینیاتوری، کوچک", example: "He collects miniature cars." },
    { word: "source", pronunciation: "/sɔːrs/", meaning: "منبع", example: "What is the source of this information?" }
  ],
  // Lesson 10
  [
    { word: "excel", pronunciation: "/ɪkˈsel/", meaning: "برتری داشتن", example: "She excels at mathematics." },
    { word: "feminine", pronunciation: "/ˈfemənɪn/", meaning: "زنانه", example: "She has a very feminine voice." },
    { word: "mount", pronunciation: "/maʊnt/", meaning: "بالا رفتن از، سوار شدن", example: "He mounted his horse." },
    { word: "compete", pronunciation: "/kəmˈpiːt/", meaning: "رقابت کردن", example: "Several companies compete for the contract." },
    { word: "dread", pronunciation: "/dred/", meaning: "ترسیدن از، وحشت داشتن", example: "He dreads going to the dentist." },
    { word: "masculine", pronunciation: "/ˈmæskjəlɪn/", meaning: "مردانه", example: "He has a strong, masculine jawline." },
    { word: "menace", pronunciation: "/ˈmenəs/", meaning: "تهدید", example: "Pollution is a menace to the environment." },
    { word: "tendency", pronunciation: "/ˈtendənsi/", meaning: "تمایل، گرایش", example: "He has a tendency to talk too much." },
    { word: "underestimate", pronunciation: "/ˌʌndərˈestɪmeɪt/", meaning: "دست کم گرفتن", example: "Don't underestimate your opponent." },
    { word: "victorious", pronunciation: "/vɪkˈtɔːriəs/", meaning: "پیروز", example: "The victorious team celebrated." },
    { word: "numerous", pronunciation: "/ˈnuːmərəs/", meaning: "متعدد، زیاد", example: "He has numerous friends." },
    { word: "flexible", pronunciation: "/ˈfleksəbl/", meaning: "انعطاف پذیر", example: "You need to be flexible in this job." }
  ]
];
