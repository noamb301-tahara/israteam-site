/* Content taken from Avi Bachar's LinkedIn posts (screenshots supplied by the site owner, 2026-09-28).
   Dates are approximate, worked out from LinkedIn's "1mo / 1yr" labels on the screenshots. */
(function(){
const S = window.SITE;

/* ---------- LinkedIn posts for the activity gallery (newest first) ---------- */
S.posts = [
  {
    id: "hybrid-one-pager", date: { en: "Aug 2026", he: "אוג׳ 2026" },
    images: ["images/one-pager-hybrid.jpg"],
    en: { title: "Building Resilience for the Era of Hybrid Threats",
      text: "In the era of hybrid threats, true national resilience begins long before the crisis. It is built by transforming strategic architecture, operational experience and advanced technology into one integrated, tested capability. IsraTeam's new one-page overview sets out our three-stage methodology, from strategic architecture and policy to integrated capability and operational readiness." },
    he: { title: "בניית חוסן לעידן האיומים ההיברידיים",
      text: "בעידן האיומים ההיברידיים, חוסן לאומי אמיתי מתחיל הרבה לפני המשבר. הוא נבנה כשהופכים ארכיטקטורה אסטרטגית, ניסיון מבצעי וטכנולוגיה מתקדמת ליכולת אחת, משולבת ומתורגלת. המסמך החדש של ישראטים מציג את המתודולוגיה שלנו בשלושה שלבים: מארכיטקטורה אסטרטגית ומדיניות ועד יכולת משולבת ומוכנות מבצעית." }
  },
  {
    id: "cipre-2026", date: { en: "Aug 2026", he: "אוג׳ 2026" }, event: "cipre-2026",
    images: ["images/cipre-2026.jpg"],
    en: { title: "Speaking at Critical Infrastructure Protection and Resilience Europe 2026",
      text: "Avi Bachar will speak at CIPRE 2026, 20–22 October 2026, Sheraton Hotel Brussels Airport, Belgium. Join industry leaders and experts in Brussels to network and share experience in strengthening Europe's critical infrastructure and building a more resilient future." },
    he: { title: "הרצאה בכנס CIPRE 2026 להגנה על תשתיות קריטיות באירופה",
      text: "אבי בכר ירצה בכנס CIPRE 2026, 20–22 באוקטובר 2026, במלון שרתון בנמל התעופה של בריסל, בלגיה. הכנס מפגיש מובילי תעשייה ומומחים לשיתוף ניסיון בחיזוק התשתיות הקריטיות של אירופה ובבניית עתיד חסין יותר." }
  },
  {
    id: "grid-under-attack", date: { en: "Aug 2026", he: "אוג׳ 2026" },
    video: "post-grid-attack",
    images: [],
    en: { title: "When the Grid Is Under Attack: Resilience Must Be Built in Advance",
      text: "The recent sabotage incidents targeting Germany's power grid show why the resilience of critical infrastructure must be planned and built before an attack, not after it." },
    he: { title: "כשרשת החשמל מותקפת: את החוסן צריך לבנות מראש",
      text: "אירועי החבלה האחרונים ברשת החשמל של גרמניה ממחישים מדוע את החוסן של תשתיות קריטיות יש לתכנן ולבנות לפני מתקפה, ולא אחריה." }
  },
  {
    id: "riga-ecr", date: { en: "Jun 2026", he: "יוני 2026" }, event: "riga-ecr",
    images: ["images/riga-ecr-panel.jpg"],
    en: { title: "Speaking at the ECR Group conference in Riga",
      text: "Avi Bachar spoke at the ECR Group conference in Riga, on a panel on civil protection and societal resilience in Europe, alongside Reinis Pozņaks, Māris Tūtins and senior representatives from many European Union countries." },
    he: { title: "הרצאה בכנס קבוצת ECR בריגה",
      text: "אבי בכר הרצה בכנס קבוצת ECR בריגה, בפאנל על הגנה אזרחית וחוסן חברתי באירופה, לצד ריינס פוזנאקס, מאריס טוטינס ונציגים בכירים ממדינות רבות באיחוד האירופי." }
  },
  {
    id: "hybrid-civilian-front", date: { en: "Feb 2026", he: "פבר׳ 2026" }, event: "hybrid-warfare-study",
    images: ["images/hybrid-study-cover.jpg"],
    en: { title: "Hybrid Warfare and the Civilian Front: Why National Resilience Has Become a Strategic Imperative",
      text: "A summary of IsraTeam's broader study \"Hybrid Warfare and its Impact on Member States' Homeland Security\" (86 pages, December 2025), by Brig. Gen. Avi Bachar, Eng. Yoram Sofrin and Dr. Eyal Pinko, prepared for the ECR group in the European Parliament." },
    he: { title: "לוחמה היברידית והחזית האזרחית: מדוע חוסן לאומי הפך להכרח אסטרטגי",
      text: "תקציר המחקר הרחב של ישראטים, ״לוחמה היברידית והשפעתה על ביטחון הפנים של המדינות החברות״ (86 עמודים, דצמבר 2025), מאת תא״ל אבי בכר, המהנדס יורם סופרין וד״ר אייל פינקו, שהוכן עבור קבוצת ECR בפרלמנט האירופי." }
  },
  {
    id: "iran-energy", date: { en: "Feb 2026", he: "פבר׳ 2026" },
    images: ["images/post-iran-energy.jpg"],
    en: { title: "Iran, energy and the global balance of power",
      text: "What if the confrontation with Iran is not only about nuclear weapons, but about global energy and the balance of power between the United States and China?" },
    he: { title: "איראן, אנרגיה ומאזן הכוחות העולמי",
      text: "ומה אם העימות עם איראן אינו נוגע רק לנשק גרעיני, אלא גם לאנרגיה העולמית ולמאזן הכוחות בין ארצות הברית לסין?" }
  },
  {
    id: "uzbekistan", date: { en: "Dec 2025", he: "דצמ׳ 2025" },
    images: ["images/uzbekistan-visit.jpg", "images/uzbekistan-fic.jpg"],
    en: { title: "A successful visit to Uzbekistan",
      text: "A highly successful visit to Uzbekistan, marked by productive meetings and clear opportunities for future cooperation. IsraTeam took part in the week of 15–21 December 2025 at the Secretariat of the Foreign Investors Council under the President of the Republic of Uzbekistan." },
    he: { title: "ביקור מוצלח באוזבקיסטן",
      text: "ביקור מוצלח במיוחד באוזבקיסטן, עם פגישות פוריות והזדמנויות ברורות לשיתוף פעולה בעתיד. ישראטים השתתפה בשבוע של 15–21 בדצמבר 2025 במזכירות מועצת המשקיעים הזרים שליד נשיא הרפובליקה של אוזבקיסטן." }
  },
  {
    id: "eu-sede-delegation", date: { en: "2025", he: "2025" }, event: "eu-sede-delegation",
    images: ["images/eu-sede-ict.jpg", "images/eu-sede-bynet.jpg", "images/eu-sede-esc-baz.jpg"],
    en: { title: "Hosting the European Parliament's Security and Defence Committee",
      text: "As part of IsraTeam's hospitality of the delegation from the European Union's Committee on Security and Defence (SEDE), we visited the ICT – International Institute for Counter-Terrorism at Reichman University, the BYNET Data Centers and the ESC-BAZ company, where the delegation heard lectures on counter-terrorism, essential infrastructure and protection." },
    he: { title: "אירוח ועדת הביטחון וההגנה של הפרלמנט האירופי",
      text: "במסגרת אירוח המשלחת של ועדת הביטחון וההגנה של האיחוד האירופי (SEDE) על ידי ישראטים, ביקרנו במכון הבינלאומי למדיניות נגד טרור (ICT) באוניברסיטת רייכמן, במרכזי הנתונים של בינת ובחברת ESC-BAZ, ושמענו הרצאות בנושאי מאבק בטרור, תשתיות חיוניות ומיגון." }
  },
  {
    id: "kanto-earthquake", date: { en: "Sep 2025", he: "ספט׳ 2025" },
    images: ["images/post-kanto-1923.jpg"],
    en: { title: "1 September: the lessons of the Great Kantō Earthquake",
      text: "September 1st marks one of the most tragic days in Japan's history, and one of its greatest lessons. On this day in 1923, the Great Kantō Earthquake struck the Tokyo–Yokohama region with a magnitude of 7.9–8.2. The disaster claimed more than 100,000 lives, devastated infrastructure, and reshaped Japan's approach to urban planning and resilience. Since then, Japan has transformed this painful memory into strength. Every year, September 1 is observed as Disaster Prevention Day." },
    he: { title: "1 בספטמבר: הלקחים של רעידת האדמה הגדולה בקאנטו",
      text: "1 בספטמבר הוא אחד הימים הטרגיים בתולדות יפן, ואחד הלקחים הגדולים שלה. ביום זה ב־1923 פגעה רעידת האדמה הגדולה בקאנטו באזור טוקיו–יוקוהמה, בעוצמה של 7.9–8.2. האסון גבה יותר מ־100,000 חיים, הרס תשתיות ושינה את גישתה של יפן לתכנון עירוני ולחוסן. מאז הפכה יפן את הזיכרון הכואב הזה לכוח: מדי שנה מצוין 1 בספטמבר כיום היערכות לאסונות." }
  },
  {
    id: "kobe", date: { en: "2025", he: "2025" },
    images: ["images/post-kobe-museum.jpg"],
    en: { title: "Visiting the Disaster Reduction and Human Renovation Institution in Kobe",
      text: "Today I visited the Disaster Reduction and Human Renovation Institution in Kobe, Japan. It brought back memories of my 2009 visit, when I led an official delegation." },
    he: { title: "ביקור במכון להפחתת אסונות ולשיקום האדם בקובה",
      text: "היום ביקרתי במכון להפחתת אסונות ולשיקום האדם בקובה, יפן. הביקור החזיר אותי לביקורי ב־2009, כשעמדתי בראש משלחת רשמית." }
  },
  {
    id: "ready-new-challenges", date: { en: "2024", he: "2024" },
    images: ["images/deck-cover.jpg", "images/deck-european-parliament.jpg", "images/deck-architects.jpg", "images/deck-objective.jpg", "images/deck-tactics.jpg"],
    en: { title: "IsraTeam is ready for the new challenges",
      text: "A seven-page presentation of IsraTeam, the Israeli Homeland Security Team: our objective, vision and mission, our strategy, key tactics (C4I and national emergency management centers) and future developments. The full text appears on our About page." },
    he: { title: "ישראטים מוכנה לאתגרים החדשים",
      text: "מצגת בת שבעה עמודים על ישראטים, צוות ביטחון הפנים הישראלי: היעד, החזון והשליחות שלנו, האסטרטגיה, דרכי הפעולה המרכזיות (שו״ב C4I ומרכזי ניהול חירום לאומיים) ותחומי הפיתוח העתידיים. הטקסט המלא מופיע בעמוד ״אודות״." }
  },
  {
    id: "civil-defense-preparedness", date: { en: "2024", he: "2024" }, article: "civil-defense-preparedness",
    images: ["images/article-civil-defense.jpg"],
    en: { title: "Increasing the National Civil Defense's Preparedness",
      text: "An article by Brig. Gen. Avi Bachar: why civil defense has been neglected since the Cold War, what has changed since the war in Ukraine and 7 October 2023, and ten steps countries should take now." },
    he: { title: "הגברת המוכנות של ההגנה האזרחית הלאומית",
      text: "מאמר מאת תא״ל אבי בכר: מדוע ההגנה האזרחית הוזנחה מאז סוף המלחמה הקרה, מה השתנה מאז המלחמה באוקראינה ו־7 באוקטובר 2023, ועשרה צעדים שמדינות צריכות לנקוט כבר עכשיו." }
  },
  {
    id: "shelter-proposal", date: { en: "2024", he: "2024" },
    images: ["images/shelter-proposal.jpg"],
    en: { title: "Protect yourself from future risks: IsraTeam proposal",
      text: "IsraTeam is launching a consultancy initiative to help firms, organizations and governments prepare for severe security threats, with a focus on nuclear threats: comprehensive contingency plans and the optimized design and construction of physical shelters." },
    he: { title: "להתגונן מפני סיכוני העתיד: הצעה של ישראטים",
      text: "ישראטים משיקה יוזמת ייעוץ לסיוע לחברות, לארגונים ולממשלות להיערך לאיומים ביטחוניים חמורים, בדגש על איומים גרעיניים: תוכניות מגירה מקיפות ותכנון מיטבי של בניית מקלטים פיזיים." }
  }
];

/* ---------- New events from LinkedIn ---------- */
S.updates.events.unshift(
  { id: "cipre-2026", date: "20–22.10.2026", image: "images/cipre-2026.jpg",
    en: { title: "Critical Infrastructure Protection and Resilience Europe (CIPRE 2026)", place: "Brussels, Belgium",
      body: "Avi Bachar, CEO of IsraTeam 98 Ltd., will speak at CIPRE 2026 at the Sheraton Hotel Brussels Airport. The conference brings together industry leaders and experts to network and share experience in strengthening Europe's critical infrastructure and building a more resilient future. Details: www.cipre-expo.com" },
    he: { title: "הכנס האירופי להגנה על תשתיות קריטיות ולחוסן (CIPRE 2026)", place: "בריסל, בלגיה",
      body: "אבי בכר, מנכ״ל ישראטים 98 בע״מ, ירצה בכנס CIPRE 2026 במלון שרתון בנמל התעופה של בריסל. הכנס מפגיש מובילי תעשייה ומומחים לשיתוף ניסיון בחיזוק התשתיות הקריטיות של אירופה ובבניית עתיד חסין יותר. פרטים: www.cipre-expo.com" } },
  { id: "riga-ecr", date: "06.2026", image: "images/riga-ecr-panel.jpg",
    en: { title: "ECR Group conference: Civil Protection and Societal Resilience in Europe", place: "Riga, Latvia",
      body: "Avi Bachar spoke on a panel on civil protection and societal resilience in Europe at the ECR Group conference in Riga, alongside Reinis Pozņaks, Māris Tūtins and senior representatives from many European Union countries." },
    he: { title: "כנס קבוצת ECR: הגנה אזרחית וחוסן חברתי באירופה", place: "ריגה, לטביה",
      body: "אבי בכר השתתף בפאנל על הגנה אזרחית וחוסן חברתי באירופה בכנס קבוצת ECR בריגה, לצד ריינס פוזנאקס, מאריס טוטינס ונציגים בכירים ממדינות רבות באיחוד האירופי." } }
);
S.updates.events.push(
  { id: "eu-sede-delegation", date: "2025", image: "images/eu-sede-ict.jpg",
    en: { title: "Hosting the European Parliament's Security and Defence Committee (SEDE)", place: "Israel",
      body: "In 2025 IsraTeam hosted a delegation from the European Parliament's Security and Defence Committee (SEDE) and presented its integrated methodology for civil defense and resilience in the hybrid-threat era. The delegation visited the ICT – International Institute for Counter-Terrorism at Reichman University, the BYNET Data Centers and the ESC-BAZ company." },
    he: { title: "אירוח ועדת הביטחון וההגנה של הפרלמנט האירופי (SEDE)", place: "ישראל",
      body: "ב־2025 אירחה ישראטים משלחת של ועדת הביטחון וההגנה של הפרלמנט האירופי (SEDE) והציגה בפניה את המתודולוגיה המשולבת שלה להגנה אזרחית ולחוסן בעידן האיומים ההיברידיים. המשלחת ביקרה במכון הבינלאומי למדיניות נגד טרור (ICT) באוניברסיטת רייכמן, במרכזי הנתונים של בינת ובחברת ESC-BAZ." } }
);

/* Enrich the hybrid-warfare study event with its summary */
const hw = S.updates.events.find(e => e.id === "hybrid-warfare-study");
if (hw) {
  hw.image = "images/hybrid-study-cover.jpg";
  hw.en.body = `A Research Study: Hybrid Warfare and its Impact on Member States' Homeland Security. IsraTeam – Brig. Gen. Avi Bachar, Eng. Yoram Sofrin, Dr. Eyal Pinko. December 2025.

## Summary: context of the research and relevance to the ECR group's work

Lessons drawn from the wars in Ukraine and the Middle East demonstrate the vulnerabilities of Europe's critical infrastructure, public and private institutions, and civil society.

All of which require a comprehensive methodology and action plan to address the increasing hybrid threats facing Member States, as well as a step-by-step process to enhance national resilience, ensuring that countries can withstand and recover quickly from any attack.

This study will be helpful for the ECR group and its Members working on SEDE matters, especially to MEP Reinis Pozņaks, who has been appointed Coordinator for the SEDE Committee, as this study will address key issues such as creating the process required for assessing threat scenarios and implementing protection means to ensure operational continuity and functional resilience policies. Of particular note are Latvia and other frontline states' concerns about the need for protective spaces, shelters, and other key infrastructure to ensure the protection of their civilian populations and their capacity to effectively plan for threat scenarios and the levels of protection needed. This report will be used to address the critical needs of public preparedness and community response to war and homeland security instability.`;
  hw.he.body = `מחקר: לוחמה היברידית והשפעתה על ביטחון הפנים של המדינות החברות. ישראטים – תא״ל אבי בכר, המהנדס יורם סופרין, ד״ר אייל פינקו. דצמבר 2025.

## תקציר: הקשר המחקר והרלוונטיות שלו לעבודת קבוצת ECR

הלקחים מהמלחמות באוקראינה ובמזרח התיכון ממחישים את הפגיעות של התשתיות הקריטיות של אירופה, של מוסדות ציבוריים ופרטיים ושל החברה האזרחית.

כל אלה מחייבים מתודולוגיה ותוכנית פעולה מקיפות להתמודדות עם האיומים ההיברידיים הגוברים על המדינות החברות, וכן תהליך מדורג לחיזוק החוסן הלאומי, כדי שמדינות יוכלו לעמוד בכל מתקפה ולהתאושש ממנה במהירות.

המחקר יסייע לקבוצת ECR ולחבריה העוסקים בנושאי ועדת SEDE, ובמיוחד לחבר הפרלמנט האירופי ריינס פוזנאקס, שמונה לרכז ועדת SEDE. המחקר עוסק בסוגיות מפתח כמו בניית התהליך הנדרש להערכת תרחישי איום והטמעת אמצעי מיגון, כדי להבטיח רציפות תפקודית ומדיניות של חוסן תפקודי. ראויים לציון במיוחד חששותיהן של לטביה ושל מדינות קו החזית האחרות מהצורך במרחבים מוגנים, במקלטים ובתשתיות מפתח נוספות להגנה על האוכלוסייה האזרחית, וביכולת לתכנן ביעילות לתרחישי איום ולרמות המיגון הנדרשות. הדוח ישמש מענה לצרכים הקריטיים של מוכנות הציבור ותגובת הקהילה למלחמה ולחוסר יציבות ביטחונית.`;
}

/* ---------- Full article ---------- */
S.articlesFull = [
  {
    id: "civil-defense-preparedness", date: "2024",
    en: { title: "Increasing the National Civil Defense's Preparedness", author: "By Brig. Gen. (Res.) Avi Bachar",
      body: `## General

Since the end of the Cold War, the issue of civil defense has been largely neglected in most countries. Systems built during World War II (WWII), including Civil Defence Units and shelters, have been abandoned, closed, and have disappeared in many regions, particularly in European countries.

However, following the Russian invasion of Ukraine and the severe damage inflicted on urban areas and the population, a far-reaching change is occurring worldwide, especially in Europe, affecting the stability of numerous countries. The possibility of a multi-regional war breaking out is increasingly likely, making it a situation that must be assessed **urgently** before it is too late.

On Saturday, October 7th, 2023, thousands of fighters from the terrorist organization Hamas breached the border fence of the Gaza Strip in over thirty locations. This breach occurred in the early hours of the morning, coinciding with the firing of thousands of rockets at the State of Israel, targeting not only towns near the Gaza Strip but also as far as Tel Aviv. Immediately after the Hamas attack on Israel, Hezbollah from Lebanon joined the conflict, launching hundreds of missiles and UAVs into northern Israel.

These events demonstrate that wars can break out suddenly, even in seemingly stable regions. The attacks from Gaza and Lebanon on Israel illustrate that even seemingly weaker countries or organizations can initiate conflict against nations with advanced military and economic capabilities, often with the support of powerful allies such as the USA.

## These changes are driven by several global dynamics

1. The significant increase in China's military power, alongside the trade war between China and the USA, including tensions over the future of Taiwan, heightens military tension between the two world powers.
1. The withdrawal of the USA from Iraq, Afghanistan, and Pakistan, leaving chaos in its wake, portrays the USA as a power in decline, lacking the will to engage deeply in global affairs, particularly in the Middle East and the Far East. This perceived weakness is being exploited by many countries, prompting them to pursue nuclear capabilities and invade neighboring nations without fear of U.S. intervention.
1. The war in Ukraine has shown the world that a nation like Russia can invade a neighboring country, adjacent to NATO member states, without fearing significant intervention from NATO or the USA. This underscores the perceived weakness of the USA, NATO, and the United Nations.
1. Recently, in Israel, following the brutal attack by Hamas on cities and settlements near the Gaza Strip, we have seen how quickly a situation can escalate from routine peacetime to a war, not only along the border but across an entire country.

**Given these realities**, it is imperative for countries, particularly in Europe, to increase their defense budgets to ensure the capability to defend themselves **independently** and rapidly, without relying heavily on the USA or NATO.

It is noteworthy that, despite the clear and imminent threats, there is minimal attention being given to the issue of Civil Defense.

**Furthermore**, history shows us that the true strength of a nation lies not only in its military power but, perhaps more critically, in the resilience and preparedness of its civilian population and the readiness to fight for freedom. This was evident in London's stance during WWII, in the resilience of Ukraine's population during the ongoing war, and now, regrettably, in Israel.

## What steps should countries take to bolster civil defense against the accumulating threats, including the use of non-conventional and cyber weapons?

To enhance preparedness for civil defense, particularly against wars, CBRNE (Chemical, Biological, Radiological, Nuclear, and Explosive) incidents and cyber threats, countries should consider the following steps and measures:

1. **Strengthen intelligence and surveillance capabilities:** Enhance intelligence gathering and surveillance systems to detect and monitor potential war, CBRNE, and cyber threats. This includes investing in advanced technologies, such as sensors, detectors, and monitoring networks, to identify and track hazardous substances and potential enemy activities.
1. **Conduct risk assessments and vulnerability analyses:** Regularly assess risks and vulnerabilities related to CBRNE threats, identify critical infrastructure and high-risk areas, **evaluate potential scenarios, including the level of damage that the policy makers are agreed to deal with!** Accordingly develop mitigation strategies. These assessments can help prioritize resource allocation and guide preparedness efforts.
1. A clear policy decision regarding the chain of command and control and the organization leading the preparedness and management of the event if and when it occurs.
1. Determining the concept of operation at the national level and in the various organizations, backing up the command and control system with an advanced technological system (C4I) suitable for the established concept of operation.
1. **Improve coordination and communication:** Enhance coordination and communication among various agencies involved in civil defense and response to CBRNE threats. This includes fostering collaboration between law enforcement, first responders, emergency management, public health, and military organizations. Establishing clear protocols and communication channels will facilitate a swift and effective response.
1. **Define protection levels (shelters):** Determine the necessary protection levels for critical systems and infrastructures, as well as the population, based on a concrete threat assessment. These efforts should align with the state's economic capacity and available resources to establish such shelters.
1. **Enhance protective measures and equipment:** Provide appropriate personal protective equipment (PPE) to responders and ensure they are trained in its proper use. Additionally, stockpile and maintain an adequate supply of medical countermeasures, such as antidotes, vaccines, and antibiotics, to treat potential CBRNE-related illnesses or injuries.
1. **Strengthen border controls and customs procedures:** Improve border controls and customs procedures to prevent the illicit trafficking of CBRNE materials. This includes enhancing screening capabilities, training border personnel, and cooperating with international partners to share information and intelligence.
1. **Engage in international cooperation and information sharing:** Collaborate with other countries, international organizations, and scientific communities to exchange information, share best practices, and develop joint response strategies. International cooperation is crucial in addressing threats, as they often require a coordinated global response.
1. **Conduct public awareness campaigns:** Educate the public about the threats, including their signs, symptoms, and protective measures. Public awareness campaigns can help citizens recognize potential risks, report suspicious activities, and take appropriate actions to protect themselves and their communities.

By implementing these steps and measures, countries can enhance their preparedness for civil defense, specifically in dealing with war and CBRNE threats. **It is essential that these steps be tailored to each country's specific context, considering unique risks, resources, and capabilities.**

Avi Bachar, CEO IsraTeam. Former Chief of Staff, Home Front Command (HFC), the organization responsible for coordination of all first responders, medical response, and humanitarian aid. Former Chairman of the Israeli National Emergency Management Authority (NEMA), responsible for government and infrastructure resilience and civil defence.` },
    he: { title: "הגברת המוכנות של ההגנה האזרחית הלאומית", author: "מאת תא״ל (במיל׳) אבי בכר",
      body: `## כללי

מאז סוף המלחמה הקרה הוזנח נושא ההגנה האזרחית ברוב המדינות. מערכות שנבנו במלחמת העולם השנייה, ובהן יחידות הגנה אזרחית ומקלטים, ננטשו, נסגרו ונעלמו באזורים רבים, ובמיוחד במדינות אירופה.

אולם בעקבות הפלישה הרוסית לאוקראינה והנזק הכבד שנגרם לאזורים עירוניים ולאוכלוסייה, מתחולל שינוי מרחיק לכת ברחבי העולם, ובמיוחד באירופה, המשפיע על יציבותן של מדינות רבות. האפשרות שתפרוץ מלחמה רב־אזורית הולכת ונעשית סבירה, ולכן יש להעריך את המצב **בדחיפות**, לפני שיהיה מאוחר מדי.

בשבת, 7 באוקטובר 2023, פרצו אלפי מחבלים מארגון הטרור חמאס את גדר הגבול של רצועת עזה ביותר משלושים מקומות. הפריצה התרחשה בשעות הבוקר המוקדמות, במקביל לירי של אלפי רקטות לעבר מדינת ישראל, לא רק על יישובים סמוכים לרצועה אלא עד תל אביב. מיד לאחר מתקפת חמאס הצטרף חזבאללה מלבנון ללחימה ושיגר מאות טילים וכלי טיס בלתי מאוישים לצפון ישראל.

אירועים אלה מוכיחים שמלחמות יכולות לפרוץ לפתע, גם באזורים שנראים יציבים. המתקפות מעזה ומלבנון על ישראל ממחישות שגם מדינות או ארגונים חלשים לכאורה יכולים לפתוח במלחמה נגד מדינות בעלות יכולות צבאיות וכלכליות מתקדמות, שלעיתים קרובות נהנות מתמיכת בעלות ברית חזקות כמו ארצות הברית.

## מאחורי השינויים האלה עומדות כמה מגמות עולמיות

1. העלייה המשמעותית בעוצמה הצבאית של סין, לצד מלחמת הסחר בין סין לארצות הברית והמתיחות סביב עתידה של טייוואן, מגבירות את המתח הצבאי בין שתי המעצמות.
1. נסיגת ארצות הברית מעיראק, מאפגניסטן ומפקיסטן, שהותירה אחריה כאוס, מציגה אותה כמעצמה בדעיכה, חסרת רצון להתערב לעומק בענייני העולם, ובמיוחד במזרח התיכון ובמזרח הרחוק. מדינות רבות מנצלות חולשה נתפסת זו, שואפות ליכולות גרעיניות ופולשות לשכנותיהן בלי לחשוש מהתערבות אמריקנית.
1. המלחמה באוקראינה הראתה לעולם שמדינה כמו רוסיה יכולה לפלוש למדינה שכנה, הגובלת במדינות החברות בנאט״ו, בלי לחשוש מהתערבות משמעותית של נאט״ו או של ארצות הברית. הדבר מדגיש את החולשה הנתפסת של ארצות הברית, של נאט״ו ושל האומות המאוחדות.
1. לאחרונה, בישראל, בעקבות המתקפה האכזרית של חמאס על ערים ויישובים סמוכים לרצועת עזה, ראינו כמה מהר מצב יכול להסלים משגרה למלחמה, לא רק לאורך הגבול אלא ברחבי המדינה כולה.

**לנוכח המציאות הזו**, על המדינות, ובמיוחד מדינות אירופה, להגדיל את תקציבי הביטחון שלהן כדי להבטיח יכולת להגן על עצמן **באופן עצמאי** ובמהירות, בלי להסתמך במידה רבה על ארצות הברית או על נאט״ו.

ראוי לציין שלמרות האיומים הברורים והמיידיים, ניתנת תשומת לב מועטה לנושא ההגנה האזרחית.

**יתרה מזו**, ההיסטוריה מלמדת אותנו שכוחה האמיתי של אומה אינו טמון רק בעוצמתה הצבאית, אלא, ואולי בעיקר, בחוסן ובמוכנות של האוכלוסייה האזרחית ובנכונותה להיאבק על חירותה. כך היה בעמידתה של לונדון במלחמת העולם השנייה, בחוסן של אוכלוסיית אוקראינה במלחמה הנמשכת, וכעת, לצערנו, בישראל.

## אילו צעדים צריכות מדינות לנקוט כדי לחזק את ההגנה האזרחית מול האיומים המצטברים, לרבות שימוש בנשק בלתי קונבנציונלי ובנשק סייבר?

כדי לשפר את המוכנות של ההגנה האזרחית, במיוחד מול מלחמות, אירועי CBRNE (כימי, ביולוגי, רדיולוגי, גרעיני ונפץ) ואיומי סייבר, על המדינות לשקול את הצעדים והאמצעים הבאים:

1. **חיזוק יכולות המודיעין והמעקב:** שיפור מערכות איסוף המודיעין והמעקב כדי לזהות ולנטר איומים אפשריים של מלחמה, CBRNE וסייבר. הדבר כולל השקעה בטכנולוגיות מתקדמות, כמו חיישנים, גלאים ורשתות ניטור, לזיהוי ומעקב אחר חומרים מסוכנים ופעילות אויב אפשרית.
1. **ביצוע הערכות סיכונים וניתוחי פגיעוּת:** הערכה שוטפת של סיכונים ונקודות תורפה הקשורים לאיומי CBRNE, זיהוי תשתיות קריטיות ואזורים בסיכון גבוה, ו**הערכת תרחישים אפשריים, לרבות היקף הנזק שמקבלי ההחלטות מסכימים להתמודד איתו!** בהתאם לכך יש לפתח אסטרטגיות מיתון. הערכות אלה מסייעות לתעדף את הקצאת המשאבים ולהכווין את מאמצי ההיערכות.
1. החלטת מדיניות ברורה לגבי שרשרת הפיקוד והשליטה ולגבי הגוף שמוביל את ההיערכות ואת ניהול האירוע, אם וכאשר יתרחש.
1. קביעת תפיסת ההפעלה ברמה הלאומית ובארגונים השונים, וגיבוי מערך הפיקוד והשליטה במערכת טכנולוגית מתקדמת (שו״ב C4I) המתאימה לתפיסת ההפעלה שנקבעה.
1. **שיפור התיאום והתקשורת:** חיזוק התיאום והתקשורת בין הגופים השונים העוסקים בהגנה אזרחית ובמענה לאיומי CBRNE, לרבות שיתוף פעולה בין גופי אכיפת החוק, כוחות ההצלה, ניהול החירום, בריאות הציבור והצבא. קביעת נהלים וערוצי תקשורת ברורים תאפשר תגובה מהירה ויעילה.
1. **הגדרת רמות מיגון (מקלטים):** קביעת רמות המיגון הנדרשות למערכות ולתשתיות קריטיות ולאוכלוסייה, על בסיס הערכת איום קונקרטית. על מאמצים אלה להתאים ליכולת הכלכלית של המדינה ולמשאבים הזמינים להקמת מקלטים כאלה.
1. **שיפור אמצעי המיגון והציוד:** אספקת ציוד מגן אישי מתאים לכוחות ההצלה והבטחת הכשרתם לשימוש נכון בו. בנוסף, יש לאגור ולתחזק מלאי מספק של אמצעי נגד רפואיים, כמו נוגדנים, חיסונים ואנטיביוטיקה, לטיפול במחלות או בפציעות הקשורות ל־CBRNE.
1. **הידוק הפיקוח על הגבולות ונהלי המכס:** שיפור הפיקוח בגבולות ונהלי המכס כדי למנוע הברחה של חומרי CBRNE, לרבות שיפור יכולות הסריקה, הכשרת אנשי הגבולות ושיתוף פעולה עם שותפים בינלאומיים בהעברת מידע ומודיעין.
1. **שיתוף פעולה בינלאומי ושיתוף מידע:** שיתוף פעולה עם מדינות אחרות, ארגונים בינלאומיים וקהילות מדעיות להחלפת מידע, לשיתוף שיטות עבודה מיטביות ולפיתוח אסטרטגיות מענה משותפות. שיתוף פעולה בינלאומי חיוני בהתמודדות עם איומים, שכן לעיתים קרובות הם מחייבים מענה עולמי מתואם.
1. **קמפיינים להגברת המודעות הציבורית:** הסברה לציבור על האיומים, לרבות סימניהם, תסמיניהם ואמצעי ההגנה מפניהם. קמפיינים כאלה מסייעים לאזרחים לזהות סיכונים, לדווח על פעילות חשודה ולפעול נכון כדי להגן על עצמם ועל הקהילה.

באמצעות יישום הצעדים והאמצעים האלה, מדינות יכולות לשפר את מוכנות ההגנה האזרחית שלהן, ובמיוחד בהתמודדות עם מלחמה ועם איומי CBRNE. **חיוני שהצעדים יותאמו להקשר הייחודי של כל מדינה, בהתחשב בסיכונים, במשאבים וביכולות שלה.**

אבי בכר, מנכ״ל ישראטים. לשעבר ראש מטה פיקוד העורף, הגוף האחראי על תיאום כל כוחות ההצלה, המענה הרפואי והסיוע ההומניטרי. לשעבר יו״ר רשות החירום הלאומית (רח״ל), האחראית על חוסן הממשלה והתשתיות ועל ההגנה האזרחית.` }
  }
];

/* ---------- Methodology (from the 2026 one-page overview) ---------- */
S.method = {
  en: {
    eyebrow: "Our methodology",
    title: "From strategic architecture to operational readiness",
    intro: "Established in 1998, IsraTeam is an Israeli knowledge-based strategic consultancy led by former senior commanders, government officials, engineers and multidisciplinary specialists. We support governments, municipalities, critical-infrastructure operators and essential organizations in designing and building integrated capabilities for civil defense, emergency management and functional continuity.",
    stages: [
      { tag: "Stage A", title: "Assessment & Architecture", sub: "A clear national architecture and blueprint",
        items: ["Threat-based planning", "National capability assessment", "Stakeholder alignment", "Architecture definition & CONOPS"] },
      { tag: "Stage B", title: "System Design & Integration", sub: "A coherent and fully integrated system design",
        items: ["System integration design", "C4I & decision support", "Early warning & public alert systems", "Public guidance & behavioral management", "Protection systems architecture", "Critical infrastructure & functional continuity", "Technology integration"] },
      { tag: "Stage C", title: "Implementation & Readiness", sub: "A tested, operational and sustainable capability",
        items: ["Operational coordination & inter-agency interfaces", "Integrated C4I, common operating picture & decision support", "Early warning, public instructions & cognitive resilience", "Multi-level protection for population, government, hospitals & critical infrastructure", "Critical infrastructure & functional continuity", "Health system & hospital MCI preparedness", "Population management, evacuation, special needs & volunteers", "CBRNE preparedness & operational training", "Emergency logistics, resources & resilient supply chains", "Force-building, training, certification & exercises", "Legislation, budgets, technology, pilots & readiness indicators"] }
    ],
    loop: "Continuous integration & adaptation: threats, geopolitics, lessons learned, technology",
    note: "National capability is achieved through continuous strategic architecture design, system integration and technology implementation within a unified operational framework.",
    intl: "For more than 25 years, IsraTeam has advised governments, national authorities, municipalities, hospitals, emergency organizations and critical-infrastructure operators in Israel and internationally. In 2025, IsraTeam hosted a delegation from the European Parliament's Security and Defence Committee (SEDE), presenting its integrated methodology for civil defense and resilience in the hybrid-threat era.",
    why: ["Strategic architecture linked directly to implementation", "Senior multidisciplinary experts across all required domains", "Tailored, integrated and locally adaptable solutions"],
    support: "Supported by specialists in doctrine, C4I, cyber, strategic influence, CBRNE, hospitals, communities, logistics, training and technology integration.",
    motto: "Integrated. Tailored. Implementable."
  },
  he: {
    eyebrow: "המתודולוגיה שלנו",
    title: "מארכיטקטורה אסטרטגית למוכנות מבצעית",
    intro: "ישראטים, שנוסדה ב־1998, היא חברת ייעוץ אסטרטגי ישראלית מבוססת ידע, בהובלת מפקדים בכירים לשעבר, בכירים ממשלתיים לשעבר, מהנדסים ומומחים רב־תחומיים. אנו מסייעים לממשלות, לרשויות מקומיות, למפעילי תשתיות קריטיות ולארגונים חיוניים לתכנן ולבנות יכולות משולבות להגנה אזרחית, לניהול מצבי חירום ולרציפות תפקודית.",
    stages: [
      { tag: "שלב א׳", title: "הערכה וארכיטקטורה", sub: "ארכיטקטורה ותוכנית אב לאומית ברורות",
        items: ["תכנון מבוסס איום", "הערכת יכולות לאומית", "תיאום בין בעלי העניין", "הגדרת ארכיטקטורה ותפיסת הפעלה (CONOPS)"] },
      { tag: "שלב ב׳", title: "תכנון מערכת ואינטגרציה", sub: "תכנון מערכת קוהרנטי ומשולב במלואו",
        items: ["תכנון האינטגרציה המערכתית", "שו״ב (C4I) ותמיכה בקבלת החלטות", "מערכות התרעה מוקדמת והתרעה לציבור", "הנחיות לציבור וניהול התנהגותי", "ארכיטקטורת מערכות מיגון", "תשתיות קריטיות ורציפות תפקודית", "שילוב טכנולוגיות"] },
      { tag: "שלב ג׳", title: "יישום ומוכנות", sub: "יכולת מתורגלת, מבצעית ובת קיימא",
        items: ["תיאום מבצעי וממשקים בין־ארגוניים", "שו״ב משולב, תמונת מצב משותפת ותמיכה בקבלת החלטות", "התרעה מוקדמת, הנחיות לציבור וחוסן תודעתי", "מיגון רב־שכבתי לאוכלוסייה, לממשלה, לבתי חולים ולתשתיות קריטיות", "תשתיות קריטיות ורציפות תפקודית", "מוכנות מערכת הבריאות ובתי החולים לאירוע רב נפגעים", "ניהול אוכלוסייה, פינוי, אוכלוסיות עם צרכים מיוחדים ומתנדבים", "מוכנות לאירועי CBRNE והדרכה מבצעית", "לוגיסטיקת חירום, משאבים ושרשראות אספקה חסינות", "בניין כוח, הדרכה, הסמכה ותרגילים", "חקיקה, תקציבים, טכנולוגיה, פיילוטים ומדדי מוכנות"] }
    ],
    loop: "אינטגרציה והתאמה מתמשכות: איומים, גאופוליטיקה, לקחים וטכנולוגיה",
    note: "יכולת לאומית מושגת באמצעות תכנון מתמשך של ארכיטקטורה אסטרטגית, אינטגרציה מערכתית והטמעת טכנולוגיה במסגרת מבצעית אחת.",
    intl: "כבר יותר מ־25 שנה ישראטים מייעצת לממשלות, לרשויות לאומיות, לרשויות מקומיות, לבתי חולים, לארגוני חירום ולמפעילי תשתיות קריטיות בישראל ובעולם. ב־2025 אירחה ישראטים משלחת של ועדת הביטחון וההגנה של הפרלמנט האירופי (SEDE) והציגה בפניה את המתודולוגיה המשולבת שלה להגנה אזרחית ולחוסן בעידן האיומים ההיברידיים.",
    why: ["ארכיטקטורה אסטרטגית המחוברת ישירות ליישום", "מומחים בכירים רב־תחומיים בכל התחומים הנדרשים", "פתרונות מותאמים, משולבים וגמישים לתנאים המקומיים"],
    support: "בגיבוי מומחים בתורת הפעלה, שו״ב, סייבר, השפעה אסטרטגית, CBRNE, בתי חולים, קהילות, לוגיסטיקה, הדרכה ושילוב טכנולוגיות.",
    motto: "משולב. מותאם. בר־יישום."
  }
};

/* ---------- About: objective, vision, mission, strategy (from the 2024 presentation) ---------- */
S.aboutMore = {
  en: {
    tagline: "The Israeli Homeland Security Team",
    architects: "We are architects of policy, strategy and implementation of Civil Defense, Emergency Management, Homeland Security, Operational Continuity and National Resilience. We will assign to the project the most experienced experts to deal with the key points of resilience.",
    objectiveT: "Our objective",
    objective: "Establishment and/or improvement of a comprehensive plan for better civil defense system and management that shall be capable of adequate preparedness and mitigation of any emergency, incorporating national, regional and municipal levels as well as community and family protection.",
    visionT: "Our vision",
    vision: "With a proper Crises and Consequence Management system, planning and preparedness (community, organization, equipment and training), the impact of any threat can be prevented or mitigated.",
    missionT: "Our mission",
    mission: "Disaster events can be modelled, analyzed, and displayed in a properly designed program in order to best mitigate the threat's effects.",
    strategyT: "Our strategy",
    strategy: [
      ["Key activities", "Emergency Management, Homeland Security, Operational Continuity, National Resilience, Civil Defense"],
      ["Civil defence", "Systems and population training; organisation of various professional units: military, first-responder organisations, search and rescue units and emergency units within the communities"],
      ["Area of operation", "Worldwide"]
    ],
    tacticsT: "Key tactics",
    tactics: [
      ["C4I", "Use of big data and Command, Control, Communication, Computerization and Intelligence technologies in order to assess any threats."],
      ["NEMC", "Organisation of a National Emergency Management Center, professionally fully staffed, equipped, exercised and ready to respond to any emergency situation, measured at world-class standards."]
    ],
    futureT: "Future developments",
    future: ["Civil defense and population protection", "Business and operational continuity", "Mitigating cyber threats on infrastructure", "Functional Resilience for First Responders/Soldiers/Communities Project, including mental assistance"]
  },
  he: {
    tagline: "צוות ביטחון הפנים הישראלי",
    architects: "אנחנו אדריכלי המדיניות, האסטרטגיה והיישום בתחומי ההגנה האזרחית, ניהול מצבי החירום, ביטחון הפנים, הרציפות התפקודית והחוסן הלאומי. לכל פרויקט אנו מקצים את המומחים המנוסים ביותר לטיפול בנקודות המפתח של החוסן.",
    objectiveT: "היעד שלנו",
    objective: "הקמה ו/או שיפור של תוכנית מקיפה למערך הגנה אזרחית וניהול טובים יותר, שיאפשרו היערכות ומיתון נאותים לכל מצב חירום, ברמה הלאומית, האזורית והמוניציפלית, וכן הגנה על הקהילה ועל המשפחה.",
    visionT: "החזון שלנו",
    vision: "באמצעות מערך נכון לניהול משברים ותוצאותיהם, תכנון והיערכות (קהילה, ארגון, ציוד והדרכה), אפשר למנוע או למתן את השפעתו של כל איום.",
    missionT: "השליחות שלנו",
    mission: "אפשר למדל, לנתח ולהציג אירועי אסון בתוכנית מתוכננת כהלכה, כדי למתן בצורה הטובה ביותר את השפעות האיום.",
    strategyT: "האסטרטגיה שלנו",
    strategy: [
      ["תחומי פעילות מרכזיים", "ניהול מצבי חירום, ביטחון פנים, רציפות תפקודית, חוסן לאומי, הגנה אזרחית"],
      ["הגנה אזרחית", "הדרכת מערכות ואוכלוסייה; ארגון יחידות מקצועיות שונות: צבא, ארגוני הצלה, יחידות חיפוש והצלה ויחידות חירום בקהילות"],
      ["אזור פעילות", "כל העולם"]
    ],
    tacticsT: "דרכי פעולה מרכזיות",
    tactics: [
      ["C4I", "שימוש בביג דאטה ובטכנולוגיות פיקוד, שליטה, תקשורת, מחשוב ומודיעין להערכת כל איום."],
      ["NEMC", "הקמת מרכז לאומי לניהול מצבי חירום, מאויש במלואו באנשי מקצוע, מצויד, מתורגל ומוכן להגיב לכל מצב חירום, לפי סטנדרטים עולמיים."]
    ],
    futureT: "תחומי פיתוח עתידיים",
    future: ["הגנה אזרחית ומיגון האוכלוסייה", "המשכיות עסקית ורציפות תפקודית", "מיתון איומי סייבר על תשתיות", "פרויקט חוסן תפקודי לכוחות הצלה, חיילים וקהילות, כולל סיוע נפשי"]
  },
  images: ["images/deck-cover.jpg", "images/deck-european-parliament.jpg", "images/deck-architects.jpg", "images/deck-objective.jpg", "images/deck-tactics.jpg"]
};

/* ---------- New expertise area: shelters (from the "Protect yourself" proposal) ---------- */
S.expertise.topics.push({
  id: "shelters", icon: "shield", image: "images/shelter-proposal.jpg",
  en: { title: "Shelter design and protective engineering", short: "Shelters and protective engineering",
    body: `- Shelter design and reinforcement of existing buildings
- Threat analysis, program definition and the operation of shelters
- Shelters with CBRNE requirements
- M&E, filtering and HVAC systems, protective doors, and protection against EMP, shock, blast overpressure and vibration

IsraTeam is a world leader in Civil Defense and National Resilience. We are launching a consultancy initiative to assist firms, organizations, and governments to prepare for severe security threats, with a focus on nuclear threats. This includes developing comprehensive contingency plans and optimizing the design of physical shelters to ensure preparedness.

Since the end of the Cold War, international conflicts have persisted, escalating the risk of a new world war. Contrary to popular belief, the threats extend beyond nuclear weapons to include a range of risks that we meticulously address when constructing new shelters or reinforcing existing structures.

IsraTeam, incorporated and registered in Israel, has expertise in shelter design and/or reinforcing of existing buildings, with extensive experience in consulting to best define the program and consult on the design of atomic shelters for families, organizations, corporations, and critical infrastructure. Our services include threat analysis, program definition, and the operation of shelters. We adopt technology to meet specific operational needs, providing architectural and engineering solutions for various types of shelters, including those with CBRNE requirements. Our expertise extends to continuous operational needs, such as M&E systems, filtering systems, HVAC systems, protective doors, and installations that mitigate EMP risks, shock, overpressure blast and vibrations.

## Who we work with

- If you are a construction company looking to market the construction of shelters or reinforce existing buildings for protection within your country, we invite you to partner with us.
- If you are a private citizen seeking to create a safe place for your family against future threats, we are here to assist.
- For infrastructure companies and command and control centers aiming to ensure functional continuity, or government authorities preparing regulations on sheltering and national resilience, we offer our expertise and consultancy.` },
  he: { title: "תכנון מקלטים והנדסת מיגון", short: "מקלטים והנדסת מיגון",
    body: `- תכנון מקלטים וחיזוק מבנים קיימים
- ניתוח איומים, הגדרת פרוגרמה והפעלת מקלטים
- מקלטים העומדים בדרישות CBRNE
- מערכות אלקטרו־מכניות, סינון ומיזוג אוויר, דלתות הדף, והגנה מפני EMP, זעזועים, לחץ הדף ורעידות

ישראטים היא מובילה עולמית בהגנה אזרחית ובחוסן לאומי. אנו משיקים יוזמת ייעוץ לסיוע לחברות, לארגונים ולממשלות להיערך לאיומים ביטחוניים חמורים, בדגש על איומים גרעיניים. היוזמה כוללת פיתוח תוכניות מגירה מקיפות ותכנון מיטבי של מקלטים פיזיים להבטחת המוכנות.

מאז סוף המלחמה הקרה נמשכים סכסוכים בינלאומיים, והסיכון למלחמת עולם חדשה הולך וגובר. בניגוד לדעה הרווחת, האיומים אינם מסתכמים בנשק גרעיני, וכוללים מגוון סיכונים שאנו מטפלים בהם בקפידה בבניית מקלטים חדשים או בחיזוק מבנים קיימים.

לישראטים, הרשומה בישראל, מומחיות בתכנון מקלטים ו/או בחיזוק מבנים קיימים, וניסיון רב בייעוץ להגדרת הפרוגרמה ולתכנון מקלטים אטומיים למשפחות, לארגונים, לתאגידים ולתשתיות קריטיות. שירותינו כוללים ניתוח איומים, הגדרת פרוגרמה והפעלת מקלטים. אנו מתאימים את הטכנולוגיה לצרכים המבצעיים הספציפיים ומספקים פתרונות אדריכליים והנדסיים למגוון סוגי מקלטים, לרבות מקלטים בדרישות CBRNE. המומחיות שלנו כוללת גם את הצרכים המבצעיים השוטפים, כמו מערכות אלקטרו־מכניות, מערכות סינון, מיזוג ואוורור, דלתות הדף ומתקנים למיתון סיכוני EMP, זעזועים, לחץ הדף ורעידות.

## עם מי אנחנו עובדים

- חברות בנייה המעוניינות לשווק בניית מקלטים או חיזוק מבנים קיימים במדינתן מוזמנות להיות שותפות שלנו.
- אזרחים פרטיים המבקשים ליצור מקום בטוח למשפחתם מפני איומים עתידיים: אנחנו כאן כדי לעזור.
- חברות תשתית ומרכזי פיקוד ושליטה השואפים להבטיח רציפות תפקודית, ורשויות ממשלתיות המכינות תקנות בנושאי מיגון וחוסן לאומי: אנו מציעים מומחיות וייעוץ.` }
});

/* Leadership notes from the 2026 overview */
S.team[0].en.note = "Former Chief of Staff, Israel Home Front Command, and former head of Israel's National Emergency Management Authority (NEMA). Approximately 30 years in national resilience, civil defense and emergency management.";
S.team[0].he.note = "לשעבר ראש מטה פיקוד העורף וראש רשות החירום הלאומית (רח״ל). כ־30 שנות ניסיון בחוסן לאומי, בהגנה אזרחית ובניהול מצבי חירום.";
S.team[1].en.note = "Co-CEO and Head of Protection Systems. Former Head of the Home Front Command Protection Department. Expert in protective engineering, shelters, critical infrastructure, blast/CBRNE and underground facilities. M.Sc. Civil Engineering, Northwestern University.";
S.team[1].he.note = "מנכ״ל משותף וראש תחום מערכות המיגון. לשעבר ראש מחלקת המיגון בפיקוד העורף. מומחה להנדסת מיגון, מקלטים, תשתיות קריטיות, הדף ו־CBRNE ומתקנים תת־קרקעיים. תואר שני בהנדסה אזרחית מאוניברסיטת נורת׳ווסטרן.";
})();

/* Short cover lines for gallery cards that have no picture */
(function(){
const S = window.SITE;
S.covers = {
  "grid-under-attack": { en: "Power grids under attack", he: "רשת החשמל תחת מתקפה" },
  "iran-energy": { en: "Iran and the global energy balance", he: "איראן ומאזן האנרגיה העולמי" },
  "kanto-earthquake": { en: "Lessons of the 1923 Kantō earthquake", he: "הלקחים מרעידת האדמה בקנטו, 1923" },
  "kobe": { en: "Kobe: learning from disaster", he: "קובה: ללמוד מאסון" },
  "civil-defense-preparedness": { en: "Article: civil defense readiness", he: "מאמר: מוכנות ההגנה האזרחית" },
  "cannes-resilience-forum": { en: "Cannes Resilience Forum", he: "פורום החוסן הבינלאומי בקאן" },
  "eu-letter": { en: "EU letter of appreciation", he: "מכתב הוקרה מהאיחוד האירופי" },
  "auggmed": { en: "AUGGMED serious-game training", he: "AUGGMED: אימון במשחק סימולציה" },
  "mci-hospital": { en: "Hospital mass-casualty readiness", he: "מוכנות בתי חולים לאירוע רב נפגעים" },
  "pdf-0": { en: "Research study: hybrid warfare", he: "מחקר: לוחמה היברידית" }
};
})();

/* Videos present in images/ (name.mp4 + name.jpg poster). A slot only renders when its name is listed here. */
window.SITE.videos = ["hero-situation-room", "stage-a-assessment", "stage-b-integration", "stage-c-readiness", "post-grid-attack", "clients-world-map", "project-mci", "bg-contact", "bg-updates", "bg-projects", "bg-about", "threat-earthquake", "threat-tsunami", "threat-air", "threat-cyber", "threat-hazmat", "threat-wildfire", "threat-flood", "threat-collapse", "topic-shelters", "topic-training", "topic-infrastructure", "topic-drp", "topic-mci", "topic-population", "topic-civil-defense"];
