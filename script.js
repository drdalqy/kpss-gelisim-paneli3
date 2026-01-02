const firebaseConfig = {
    apiKey: "AIzaSyC_6DVVFVSD9zWX5lhOQpSSXpFdf08gvMY",
    authDomain: "ayse-gelisim-paneli.firebaseapp.com",
    projectId: "ayse-gelisim-paneli",
    storageBucket: "ayse-gelisim-paneli.firebasestorage.app",
    messagingSenderId: "864770228196",
    appId: "1:864770228196:web:7b1861368fa01ecfb491f1",
    measurementId: "G-LYSQYBZVFG"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let icilenSu = 0;
let currentDers = 'tarih';
let completedVideos = {};

// --- 320 VİDEOLUK TAM LİSTE ---
const kpssData = {
    tarih: [
        { no: 1, ad: "İslamiyet Öncesi Türk Tarihi (I)", sure: "3:07:47" }, { no: 2, ad: "İslamiyet Öncesi Türk Tarihi (II)", sure: "2:04:38" }, { no: 3, ad: "İsl. Öncesi Türk Devletleri Kültür (I)", sure: "1:36:20" }, { no: 4, ad: "İsl. Öncesi Türk Tarihi Kültür ve Medeniyet (II)", sure: "2:20:51" }, { no: 5, ad: "İlk Türk İslam Devletleri (I) - Ramazan YETGİN", sure: "2:30:11" }, { no: 6, ad: "İlk Türk İslam Devletleri (II) - Ramazan YETGİN", sure: "1:29:11" }, { no: 7, ad: "İlk Türk İslam Devletleri Kültür ve Medeniyet (I)", sure: "2:23:20" }, { no: 8, ad: "İlk Türk İslam Devletleri Kültür ve Medeniyet (II)", sure: "1:54:23" }, { no: 9, ad: "Anadolu Selçuklu Devleti (1075 - 1308)", sure: "2:41:28" }, { no: 10, ad: "99 Soruda Genel Tekrar - Gökhan ÖZKAL", sure: "1:52:51" }, { no: 11, ad: "Osmanlı Devleti Kültür ve Medeniyeti 1", sure: "1:58:32" }, { no: 12, ad: "Osmanlı Devleti Kültür ve Medeniyeti 2", sure: "2:13:43" }, { no: 13, ad: "Osmanlı Devleti Kültür ve Medeniyeti 3", sure: "1:53:31" }, { no: 14, ad: "Osmanlı Devleti Kültür ve Medeniyeti IV", sure: "2:13:04" }, { no: 15, ad: "Osmanlı Devleti Kültür ve Medeniyeti V", sure: "2:17:02" }, { no: 16, ad: "59 Soruda Genel Tekrar - Gökhan ÖZKAL", sure: "1:20:50" }, { no: 17, ad: "Osmanlı Devleti Kuruluş Dönemi (1299) 1", sure: "2:21:47" }, { no: 18, ad: "Osmanlı Devleti Kuruluş Dönemi (1299) 2", sure: "1:57:22" }, { no: 19, ad: "Osmanlı Devleti Yükselme Dönemi 1", sure: "1:35:46" }, { no: 20, ad: "Osmanlı Devleti Yükselme Dönemi 2", sure: "1:40:40" }, { no: 21, ad: "XVII. Yüzyılda Osmanlı Devleti 1", sure: "1:29:35" }, { no: 22, ad: "XVII. Yüzyılda Osmanlı Devleti 2", sure: "2:24:03" }, { no: 23, ad: "XVIII. Yüzyılda Osmanlı Devleti 1", sure: "1:09:31" }, { no: 24, ad: "XVIII. Yüzyılda Osmanlı Devleti 2", sure: "1:40:56" }, { no: 25, ad: "XIX. Yüzyılda Osmanlı Devleti 1", sure: "1:52:14" }, { no: 26, ad: "XIX. Yüzyılda Osmanlı Devleti 2", sure: "1:12:49" }, { no: 27, ad: "XIX. Yüzyıl Islahatları I", sure: "1:47:06" }, { no: 28, ad: "XIX. Yüzyıl Islahatları II", sure: "57:20" }, { no: 29, ad: "XIX. Yüzyıl Islahatları III", sure: "2:45:05" }, { no: 30, ad: "59 Soruda Osmanlı Devleti Tarihi - Gökhan ÖZKAL", sure: "1:28:03" }, { no: 31, ad: "XX. Yüzyıl Başlarında Osmanlı 1", sure: "1:42:29" }, { no: 32, ad: "XX. Yüzyıl Başlarında Osmanlı 2", sure: "2:00:31" }, { no: 33, ad: "XX. Yüzyıl Başlarında Osmanlı 3", sure: "2:39:31" }, { no: 34, ad: "Mondros Ateşkes Antlaşması", sure: "2:50:28" }, { no: 35, ad: "Milli Mücadele Hazırlık Dönemi I", sure: "2:27:32" }, { no: 36, ad: "Milli Mücadele Hazırlık Dönemi II", sure: "2:22:48" }, { no: 37, ad: "I. TBMM Dönemi ve Gelişmeleri I", sure: "2:01:51" }, { no: 38, ad: "I. TBMM Dönemi ve Gelişmeleri II", sure: "1:45:43" }, { no: 39, ad: "Milli Mücadele Muharebeler Dönemi 1", sure: "2:03:42" }, { no: 40, ad: "Milli Mücadele Muharebeler Dönemi 2", sure: "2:18:32" }, { no: 41, ad: "Milli Mücadele Muharebeler Dönemi 3", sure: "2:13:34" }, { no: 42, ad: "Milli Mücadele Muharebeler Dönemi 4", sure: "3:01:30" }, { no: 43, ad: "Atatürk'ün Hayatı (1881 - 1938)", sure: "1:30:02" }, { no: 44, ad: "Atatürk Dönemi İç Politika Gelişmeleri", sure: "2:12:33" }, { no: 45, ad: "Atatürk İlkeleri - Ramazan YETGİN", sure: "2:17:30" }, { no: 46, ad: "Atatürk İnkılapları I - Ramazan YETGİN", sure: "1:47:07" }, { no: 47, ad: "Atatürk İnkılapları II (Hukuk ve...)", sure: "2:03:47" }
    ],
    matematik: [

        { no: 1, ad: "Hangi Konudan Kaç Soru Çıkıyor...", sure: "32:17" }, { no: 2, ad: "İşlem Yeteneği", sure: "37:56" }, { no: 3, ad: "Denklem Çözme 1. Bölüm", sure: "26:22" }, { no: 4, ad: "Denklem Çözme 2. Bölüm", sure: "31:16" }, { no: 5, ad: "Değer Verme 1. Bölüm", sure: "27:32" }, { no: 6, ad: "Değer Verme 2. Bölüm", sure: "27:51" }, { no: 7, ad: "Değer Verme 3. Bölüm", sure: "17:46" }, { no: 8, ad: "En Büyük En Küçük Sayılar", sure: "22:12" }, { no: 9, ad: "Tek Çift Sayılar 1. Bölüm", sure: "27:40" }, { no: 10, ad: "Tek Çift Sayılar 2. Bölüm", sure: "31:53" }, { no: 11, ad: "Tek - Çift Sayılar 3. Bölüm", sure: "24:50" }, { no: 12, ad: "Sayı Basamakları 1. Bölüm", sure: "32:26" }, { no: 13, ad: "Sayı Basamakları 2. Bölüm", sure: "25:47" }, { no: 14, ad: "Sayı Basamakları 3. Bölüm", sure: "29:14" }, { no: 15, ad: "Sayı Basamakları 4. Bölüm", sure: "30:51" }, { no: 16, ad: "Asal Sayılar", sure: "39:31" }, { no: 17, ad: "Pozitif Bölen Sayısı", sure: "32:07" }, { no: 18, ad: "Faktöriyel 1. Bölüm", sure: "30:30" }, { no: 19, ad: "Faktöriyel 2. Bölüm", sure: "28:54" }, { no: 20, ad: "Faktöriyel 3. Bölüm", sure: "22:38" }, { no: 21, ad: "Pozitif Negatif Sayılar", sure: "22:29" }, { no: 22, ad: "Ardışık Sayılar 1. Bölüm", sure: "21:17" }, { no: 23, ad: "Ardışık Sayılar 2. Bölüm", sure: "21:45" }, { no: 24, ad: "Ardışık Sayıların Toplamı 1. Bölüm", sure: "25:55" }, { no: 25, ad: "Ardışık Sayıların Toplamı 2. Bölüm", sure: "21:13" }, { no: 26, ad: "Numaralandırma Problemleri", sure: "34:32" }, { no: 27, ad: "Bölme 1. Bölüm", sure: "21:14" }, { no: 28, ad: "Bölme 2. Bölüm", sure: "24:30" }, { no: 29, ad: "Bölünebilme 1. Bölüm", sure: "25:57" }, { no: 30, ad: "Bölünebilme 2. Bölüm", sure: "36:32" }, { no: 31, ad: "OBEB - OKEK 1. Bölüm", sure: "28:52" }, { no: 32, ad: "OBEB - OKEK 2. Bölüm", sure: "19:38" }, { no: 33, ad: "OBEB - OKEK 3. Bölüm", sure: "36:08" }, { no: 34, ad: "Rasyonel ve Ondalık Sayılar 1. Bölüm", sure: "24:43" }, { no: 35, ad: "Rasyonel ve Ondalık Sayılar 2. Bölüm", sure: "27:11" }, { no: 36, ad: "Rasyonel ve Ondalık Sayılar 3. Bölüm", sure: "23:10" }, { no: 37, ad: "Rasyonel ve Ondalık Sayılar 4. Bölüm", sure: "34:54" }, { no: 38, ad: "Üslü Sayılar 1. Bölüm", sure: "30:46" }, { no: 39, ad: "Üslü Sayılar 2. Bölüm", sure: "35:58" }, { no: 40, ad: "Üslü Sayılar 3. Bölüm", sure: "34:33" }, { no: 41, ad: "Köklü Sayılar 1. Bölüm", sure: "29:14" }, { no: 42, ad: "Köklü Sayılar 2. Bölüm", sure: "41:26" }, { no: 43, ad: "Köklü Sayılar 3. Bölüm", sure: "35:04" }, { no: 44, ad: "Basit Eşitsizlik 1. Bölüm", sure: "34:03" }, { no: 45, ad: "Basit Eşitsizlik 2. Bölüm", sure: "24:49" }, { no: 46, ad: "Basit Eşitsizlik 3. Bölüm", sure: "23:37" }, { no: 47, ad: "Mutlak Değer 1. Bölüm", sure: "22:15" }, { no: 48, ad: "Mutlak Değer 2. Bölüm", sure: "35:36" }, { no: 49, ad: "Mutlak Değer 3. Bölüm", sure: "27:47" }, { no: 50, ad: "Çarpanlara Ayırma 1. Bölüm", sure: "31:08" }, { no: 51, ad: "Çarpanlara Ayırma 2. Bölüm", sure: "32:29" }, { no: 52, ad: "Çarpanlara Ayırma 3. Bölüm", sure: "28:14" }, { no: 53, ad: "Birinci Dereceden Denklemler", sure: "27:39" }, { no: 54, ad: "Oran - Orantı 1. Bölüm", sure: "33:12" }, { no: 55, ad: "Oran - Orantı 2. Bölüm", sure: "36:21" }, { no: 56, ad: "Problemlere Nasıl Çalışmalıyız?", sure: "16:58" }, { no: 57, ad: "Sayı Problemleri 1. Bölüm", sure: "30:49" }, { no: 58, ad: "Sayı Problemleri 2. Bölüm", sure: "31:06" }, { no: 59, ad: "Sayı Problemleri 3. Bölüm", sure: "18:55" }, { no: 60, ad: "Sayı Problemleri 4. Bölüm", sure: "20:00" }, { no: 61, ad: "Sayı Problemleri 5. Bölüm", sure: "25:04" }, { no: 62, ad: "Sayı Problemleri 6. Bölüm", sure: "16:39" }, { no: 63, ad: "Sayı Problemleri 7. Bölüm", sure: "19:20" }, { no: 64, ad: "Sayı Problemleri 8. Bölüm", sure: "31:44" }, { no: 65, ad: "Kesir Problemleri 1. Bölüm", sure: "14:58" }, { no: 66, ad: "Kesir Problemleri 2. Bölüm", sure: "19:33" }, { no: 67, ad: "Kesir Problemleri 3. Bölüm", sure: "18:01" }, { no: 68, ad: "Kesir Problemleri 4. Bölüm", sure: "28:32" }, { no: 69, ad: "Sayısal Mantık 1. Bölüm", sure: "35:32" }, { no: 70, ad: "Sayısal Mantık 2. Bölüm", sure: "17:24" }, { no: 71, ad: "Sayısal Mantık 3. Bölüm", sure: "23:19" }, { no: 72, ad: "Sayısal Mantık 4. Bölüm", sure: "25:13" }, { no: 73, ad: "Sayısal Mantık 5. Bölüm", sure: "33:12" }, { no: 74, ad: "Sayısal Mantık 6. Bölüm", sure: "18:09" }, { no: 75, ad: "Sayısal Mantık 7. Bölüm", sure: "18:46" }, { no: 76, ad: "Grafik Problemleri 1. Bölüm", sure: "23:49" }, { no: 77, ad: "Grafik Problemleri 2. Bölüm", sure: "34:15" }, { no: 78, ad: "Grafik Problemleri 3. Bölüm", sure: "27:07" }, { no: 79, ad: "Grafik Problemleri 4. Bölüm", sure: "21:40" }, { no: 80, ad: "Yaş Problemleri 1. Bölüm", sure: "27:57" }, { no: 81, ad: "Yaş Problemleri 2. Bölüm", sure: "31:13" }, { no: 82, ad: "Yüzde Problemleri 1. Bölüm", sure: "25:02" }, { no: 83, ad: "Yüzde Problemleri 2. Bölüm", sure: "20:45" }, { no: 84, ad: "Yüzde Problemleri 3. Bölüm", sure: "23:52" }, { no: 85, ad: "Yüzde Problemleri 4. Bölüm", sure: "22:00" }, { no: 86, ad: "Karışım Problemleri", sure: "25:47" }, { no: 87, ad: "Faiz Problemleri", sure: "17:39" }, { no: 88, ad: "Hareket Problemleri 1. Bölüm", sure: "23:48" }, { no: 89, ad: "Hareket Problemleri 2. Bölüm", sure: "24:01" }, { no: 90, ad: "Hareket Problemleri 3. Bölüm", sure: "29:35" }, { no: 91, ad: "İşçi - Havuz Problemleri 1. Bölüm", sure: "22:49" }, { no: 92, ad: "İşçi - Havuz Problemleri 2. Bölüm", sure: "22:56" }, { no: 93, ad: "İşçi - Havuz Problemleri 3. Bölüm", sure: "20:19" }, { no: 94, ad: "İşlem 1. Bölüm", sure: "24:08" }, { no: 95, ad: "İşlem 2. Bölüm", sure: "33:38" }, { no: 96, ad: "Fonksiyonlar 1. Bölüm", sure: "30:33" }, { no: 97, ad: "Fonksiyonlar 2. Bölüm", sure: "27:41" }, { no: 98, ad: "Modüler Aritmetik 1. Bölüm", sure: "22:02" }, { no: 99, ad: "Modüler Aritmetik 2. Bölüm", sure: "16:34" }, { no: 100, ad: "Kümeler 1. Bölüm", sure: "26:30" }, { no: 101, ad: "Kümeler 2. Bölüm", sure: "23:45" }, { no: 102, ad: "Kümeler 3. Bölüm", sure: "33:10" }, { no: 103, ad: "Permütasyon 1. Bölüm", sure: "27:47" }, { no: 104, ad: "Permütasyon 2. Bölüm", sure: "26:39" }, { no: 105, ad: "Kombinasyon 1. Bölüm", sure: "25:28" }, { no: 106, ad: "Kombinasyon 2. Bölüm", sure: "19:48" }, { no: 107, ad: "Olasılık 1. Bölüm", sure: "26:18" }, { no: 108, ad: "Olasılık 2. Bölüm", sure: "41:47" }

    ],
    turkce: [

        { no: 0, ad: "Türkçe Derse Giriş", sure: "11:44" }, { no: 1, ad: "Ses Bilgisi 1. Bölüm", sure: "19:14" }, { no: 2, ad: "Ses Bilgisi 2. Bölüm", sure: "31:49" }, { no: 3, ad: "Ses Bilgisi 3. Bölüm", sure: "16:21" }, { no: 4, ad: "Ses Bilgisi 4. Bölüm", sure: "27:44" }, { no: 5, ad: "Ses Bilgisi Analiz", sure: "12:38" }, { no: 6, ad: "Ses Bilgisi Soru Çözümü", sure: "33:14" }, { no: 7, ad: "Ses Bilgisi Sözün Özü", sure: "12:35" }, { no: 8, ad: "Yazım Kuralları 1. Bölüm", sure: "33:13" }, { no: 9, ad: "Yazım Kuralları 2. Bölüm", sure: "37:28" }, { no: 10, ad: "Yazım Kuralları 3. Bölüm", sure: "38:52" }, { no: 11, ad: "Yazım Kuralları 4. Bölüm", sure: "33:04" }, { no: 12, ad: "Yazım Kuralları 5. Bölüm", sure: "45:15" }, { no: 13, ad: "Yazım Kuralları Analiz", sure: "16:32" }, { no: 14, ad: "Yazım Kuralları Soru Çözümü", sure: "24:39" }, { no: 15, ad: "Yazım Kuralları Sözün Özü", sure: "18:24" }, { no: 16, ad: "Noktalama İşaretleri 1. Bölüm", sure: "25:31" }, { no: 17, ad: "Noktalama İşaretleri 2. Bölüm", sure: "21:05" }, { no: 18, ad: "Noktalama İşaretleri 3. Bölüm", sure: "19:40" }, { no: 19, ad: "Noktalama İşaretleri Analiz", sure: "09:21" }, { no: 20, ad: "Noktalama İşaretleri Soru Çözümü", sure: "23:23" }, { no: 21, ad: "Noktalama İşaretleri Sözün Özü", sure: "12:54" }, { no: 22, ad: "Sözcükte Yapı (Kök Bilgisi) 1. Bölüm", sure: "27:43" }, { no: 23, ad: "Sözcükte Yapı (Ekler Bilgisi) 2. Bölüm", sure: "35:05" }, { no: 24, ad: "Sözcükte Yapı (Ekler Bilgisi) 3. Bölüm", sure: "25:05" }, { no: 25, ad: "Sözcükte Yapı (Ekler Bilgisi) 4. Bölüm", sure: "34:11" }, { no: 26, ad: "Sözcükte Yapı (Ekler Bilgisi) 5. Bölüm", sure: "27:07" }, { no: 27, ad: "Sözcükte Yapı (Yapı Bilgisi) 6. Bölüm", sure: "31:21" }, { no: 28, ad: "Sözcükte Yapı (Yapı Bilgisi) 7. Bölüm", sure: "30:52" }, { no: 29, ad: "Sözcükte Yapı Analiz", sure: "10:14" }, { no: 30, ad: "Sözcükte Yapı Soru Çözümü", sure: "17:34" }, { no: 31, ad: "Sözcükte Yapı Sözün Özü", sure: "08:35" }, { no: 32, ad: "Sözcükte Yapı (Karma)", sure: "18:52" }, { no: 33, ad: "Sözcük Türleri (İsimler) 1. Bölüm", sure: "18:14" }, { no: 34, ad: "Sözcük Türleri (Zamirler) 2. Bölüm", sure: "35:25" }, { no: 35, ad: "Sözcük Türleri (Sıfatlar) 3. Bölüm", sure: "26:11" }, { no: 36, ad: "Sözcük Türleri (Sıfatlar) 4. Bölüm", sure: "25:12" }, { no: 37, ad: "Sözcük Türleri (Zarflar) 5. Bölüm", sure: "33:14" }, { no: 38, ad: "Sözcük Türleri (Edat - Bağlaç - Ünlem) 6. Bölüm", sure: "39:52" }, { no: 39, ad: "Sözcük Türleri Analiz", sure: "11:21" }, { no: 40, ad: "Sözcük Türleri Soru Çözümü", sure: "25:14" }, { no: 41, ad: "Sözcük Türleri Sözün Özü", sure: "08:44" }, { no: 42, ad: "Fiiller (Ek Eylem - Birleşik Fiil) 1. Bölüm", sure: "31:12" }, { no: 43, ad: "Fiiller (Fiilimsiler) 2. Bölüm", sure: "38:25" }, { no: 44, ad: "Fiiller (Fiilde Çatı) 3. Bölüm", sure: "35:12" }, { no: 45, ad: "Fiiller Analiz", sure: "12:44" }, { no: 46, ad: "Fiiller Soru Çözümü", sure: "23:54" }, { no: 47, ad: "Fiiller Sözün Özü", sure: "08:14" }, { no: 48, ad: "Cümlenin Ögeleri 1. Bölüm", sure: "34:11" }, { no: 49, ad: "Cümlenin Ögeleri Analiz", sure: "10:24" }, { no: 50, ad: "Cümlenin Ögeleri Soru Çözümü", sure: "23:14" }, { no: 51, ad: "Cümlenin Ögeleri Sözün Özü", sure: "08:44" }, { no: 52, ad: "Anlatım Bozukluğu", sure: "17:20" }, { no: 53, ad: "Dil Bilgisi Karma Soru Çözümü", sure: "18:50" }, { no: 54, ad: "Sözcükte Anlam 1. Bölüm", sure: "22:14" }, { no: 55, ad: "Sözcükte Anlam 2. Bölüm", sure: "18:35" }, { no: 56, ad: "Sözcükte Anlam 3. Bölüm", sure: "12:44" }, { no: 57, ad: "Cümlede Anlam 1. Bölüm", sure: "30:14" }, { no: 58, ad: "Cümlede Anlam 2. Bölüm", sure: "15:12" }, { no: 59, ad: "Cümlede Anlam (Kesin Yargı) 3. Bölüm", sure: "18:44" }, { no: 60, ad: "Cümlede Anlam Analiz", sure: "11:32" }, { no: 61, ad: "Paragrafta Anlam (Anlatım Biçimleri) 1. Bölüm", sure: "25:32" }, { no: 62, ad: "Paragrafta Anlam (Akışı Bozan Cümle) 2. Bölüm", sure: "30:12" }, { no: 63, ad: "Paragrafta Anlam (Paragraf Tamamlama) 3. Bölüm", sure: "28:14" }, { no: 64, ad: "Paragrafta Anlam (Paragraf Bölme) 4. Bölüm", sure: "19:54" }, { no: 65, ad: "Paragrafta Anlam (Ana Düşünce) 5. Bölüm", sure: "33:14" }, { no: 66, ad: "Paragrafta Anlam (Paragraf Yapı) 6. Bölüm", sure: "27:12" }, { no: 67, ad: "Paragrafta Anlam Analiz", sure: "10:21" }, { no: 68, ad: "Anlam Bilgisi Karma Test", sure: "18:54" }, { no: 69, ad: "Anlam Bilgisi Sözün Özü", sure: "08:12" }, { no: 70, ad: "Anlam Bilgisi (Karma Çözüm)", sure: "15:33" }, { no: 71, ad: "Sözel Mantık (Giriş) 1. Bölüm", sure: "22:14" }, { no: 72, ad: "Sözel Mantık (Sıralama) 2. Bölüm", sure: "28:12" }, { no: 73, ad: "Sözel Mantık (Sıralama) 3. Bölüm", sure: "25:54" }, { no: 74, ad: "Sözel Mantık (Gruplandırma) 4. Bölüm", sure: "30:12" }, { no: 75, ad: "Sözel Mantık (Gruplandırma) 5. Bölüm", sure: "26:14" }, { no: 76, ad: "Sözel Mantık (Tablo Oluşturma) 6. Bölüm", sure: "33:12" }, { no: 77, ad: "Sözel Mantık (Tablo Oluşturma) 7. Bölüm", sure: "28:54" }, { no: 78, ad: "Sözel Mantık (Karma Soru Çözümü) 8. Bölüm", sure: "22:14" }, { no: 79, ad: "Sözel Mantık (Karma Soru Çözümü) 9. Bölüm", sure: "20:12" }, { no: 80, ad: "Sözel Mantık (Karma Soru Çözümü) 10. Bölüm", sure: "19:44" }, { no: 81, ad: "Sözel Mantık (Karma Soru Çözümü) 11. Bölüm", sure: "21:12" }, { no: 82, ad: "Sözel Mantık (Karma Soru Çözümü) 12. Bölüm", sure: "18:54" }, { no: 83, ad: "Sözel Mantık (Karma Soru Çözümü) 13. Bölüm", sure: "20:33" }, { no: 84, ad: "Sözel Mantık (Sözün Özü)", sure: "10:12" }, { no: 85, ad: "Sözel Mantık (ÖSYM Ne Sordu?) 1. Bölüm", sure: "15:14" }, { no: 86, ad: "Sözel Mantık (ÖSYM Ne Sordu?) 2. Bölüm", sure: "18:32" }, { no: 87, ad: "Sözel Mantık (ÖSYM Ne Sordu?) 3. Bölüm", sure: "16:54" }, { no: 88, ad: "Sözel Mantık (Genel Tekrar)", sure: "30:12" }, { no: 89, ad: "Türkçeye Elveda (Kapanış)", sure: "08:14" }, { no: 90, ad: "2026'da Neler Yapacağız?", sure: "15:00" }

    ],
    cografya: [

        { no: 1, ad: "Coğrafya Konu Anlatımı 2026", sure: "27:27" }, { no: 2, ad: "Türkiye'de Jeolojik Zamanlar", sure: "38:39" }, { no: 3, ad: "Jeolojik Zamanlar Soru Çözümü", sure: "24:44" }, { no: 4, ad: "Türkiye'de İç Kuvvetler - 1", sure: "38:34" }, { no: 5, ad: "Türkiye'de İç Kuvvetler - 1 Soru Çözümü", sure: "13:29" }, { no: 6, ad: "Türkiye'de İç Kuvvetler - 2", sure: "55:00" }, { no: 7, ad: "Türkiye'de İç Kuvvetler - 2 Soru Çözümü", sure: "20:15" }, { no: 8, ad: "Zincir Genel Tekrar - 1 (İç Kuvvetler)", sure: "34:17" }, { no: 9, ad: "Türkiye'de Dış Kuvvetler - 1", sure: "59:28" }, { no: 10, ad: "Türkiye'de Dış Kuvvetler - 1 Soru Çözümü", sure: "24:33" }, { no: 11, ad: "Türkiye'de Dış Kuvvetler - 2", sure: "58:12" }, { no: 12, ad: "Türkiye'de Dış Kuvvetler - 2 Soru Çözümü", sure: "23:29" }, { no: 13, ad: "Türkiye'de Dış Kuvvetler - 3", sure: "48:39" }, { no: 14, ad: "Türkiye'de Dış Kuvvetler - 3 Soru Çözümü", sure: "19:26" }, { no: 15, ad: "Zincir Genel Tekrar - 2 (Dış Kuvvetler)", sure: "56:08" }, { no: 16, ad: "Türkiye'nin Dağları", sure: "38:17" }, { no: 17, ad: "Türkiye'nin Platoları", sure: "30:56" }, { no: 18, ad: "Türkiye'nin Ovaları", sure: "47:54" }, { no: 19, ad: "Zincir Genel Tekrar - 3 (Yer Şekilleri)", sure: "44:01" }, { no: 20, ad: "Sıcaklık Türkiye'nin İklimi", sure: "56:11" }, { no: 21, ad: "Sıcaklık Soru Çözümü", sure: "42:11" }, { no: 22, ad: "Basınç ve Rüzgarlar", sure: "56:53" }, { no: 23, ad: "Nem ve Yağış", sure: "59:16" }, { no: 24, ad: "Türkiye'nin İklim Tipleri", sure: "46:05" }, { no: 25, ad: "Türkiye'nin İklimi Soru Çözümü", sure: "29:31" }, { no: 26, ad: "Zincir Genel Tekrar - 4 (İklim)", sure: "1:09:17" }, { no: 27, ad: "Türkiye'nin Akarsuları", sure: "57:06" }, { no: 28, ad: "Türkiye'nin Akarsuları Soru Çözümü", sure: "23:55" }, { no: 29, ad: "Türkiye'nin Gölleri", sure: "1:06:17" }, { no: 30, ad: "Türkiye'nin Gölleri Soru Çözümü", sure: "19:36" }, { no: 31, ad: "Türkiye'nin Denizleri ve Körfezleri", sure: "50:55" }, { no: 32, dry: "Zincir Genel Tekrar - 5 (Sular)", sure: "54:54" }, { no: 33, ad: "Türkiye'nin Toprak Tipleri", sure: "59:35" }, { no: 34, ad: "Türkiye'nin Toprak Tipleri Soru Çözümü", sure: "36:03" }, { no: 35, ad: "Türkiye'de Bitki Örtüsü", sure: "50:58" }, { no: 36, ad: "Türkiye'nin Bitki Örtüsü Soru Çözümü", sure: "29:59" }, { no: 37, ad: "Zincir Genel Tekrar - 6 (Su, Toprak, Bitki)", sure: "19:02" }

    ],
    vatandaslik: [

        { no: 0, ad: "KPSS Vatandaşlık 2026 Giriş", sure: "28:15" }, { no: 1, ad: "Sosyal Düzen Kuralları", sure: "43:42" }, { no: 2, ad: "Hukuk Kurallarının Yaptırımı", sure: "59:37" }, { no: 3, ad: "Hukukun Kaynakları", sure: "1:10:52" }, { no: 4, ad: "Medeni Hukuk Giriş", sure: "52:16" }, { no: 5, ad: "Ehliyetler ve Kişilik", sure: "45:33" }, { no: 6, ad: "Hısımlık - Yerleşim Yeri", sure: "55:52" }, { no: 7, ad: "Borçlar Hukuku", sure: "46:54" }, { no: 8, ad: "Ticaret - İcra İflas Hukuku", sure: "26:07" }, { no: 9, ad: "Hak Kavramı", sure: "40:14" }, { no: 10, ad: "Hakların Kazanılması ve Korunması", sure: "46:14" }, { no: 11, ad: "Devlet Biçimleri ve Hükümet Sistemleri", sure: "1:12:19" }, { no: 12, ad: "Hukukun Temel Kavramları - Soru Çözümü", sure: "1:32:30" }, { no: 13, ad: "Anayasa Hukukuna Giriş - Türk Anayasa Tarihi 1", sure: "1:13:11" }, { no: 14, ad: "Anayasa Hukukuna Giriş - Türk Anayasa Tarihi 2", sure: "1:06:42" }, { no: 15, ad: "Anayasa Tarihi Soru Çözümü", sure: "42:10" }, { no: 16, ad: "1982 Anayasası Genel Esaslar", sure: "1:05:35" }, { no: 17, ad: "1982 Anayasası - Seçim İlkeleri ve Partiler", sure: "38:28" }, { no: 18, ad: "1982 Anayasası Genel Esaslar - Soru Çözümü", sure: "25:32" }, { no: 19, ad: "Temel Hak ve Ödevler", sure: "58:50" }, { no: 20, ad: "Temel Hak ve Ödevler - Soru Çözümü", sure: "1:48:01" }, { no: 21, ad: "Yasama - TBMM Seçimleri", sure: "51:46" }, { no: 22, ad: "Yasama - Milletvekilliği", sure: "44:52" }, { no: 23, ad: "Yasama - TBMM İç Yapısı ve Çalışma Düzeni", sure: "54:53" }, { no: 24, ad: "Yasama - TBMM Görev ve Yetkileri", sure: "1:17:47" }, { no: 25, ad: "Yasama - Soru Çözümü", sure: "46:00" }, { no: 26, ad: "Yürütme - Cumhurbaşkanlığı", sure: "52:57" }, { no: 27, ad: "Yürütme - Bakanlıklar - OHAL - Milli Güvenlik", sure: "59:27" }, { no: 28, ad: "Yürütme - Soru Çözümü", sure: "43:35" }, { no: 29, ad: "Yargı - Yargı Sistemi", sure: "1:01:40" }, { no: 30, ad: "Yargı - Anayasa Mahkemesi", sure: "1:13:09" }, { no: 31, ad: "Diğer Yüksek Mahkemeler - HSK - Sayıştay", sure: "28:44" }, { no: 32, ad: "Yargı - Soru Çözümü", sure: "39:28" }, { no: 33, ad: "İnsan Hakları Hukuku I", sure: "41:18" }, { no: 34, ad: "İnsan Hakları Hukuku II - Soru Çözümü", sure: "59:07" }, { no: 35, ad: "İdare Hukuku - İdare Hukukuna Giriş", sure: "1:39:07" }, { no: 36, ad: "İdare Hukuku - İdare Teşkilat Yapısı", sure: "1:07:04" }, { no: 37, ad: "Kamu Görevlileri - Mahalli İdareler", sure: "1:31:52" }, { no: 38, ad: "İdare Hukuku - Soru Çözümü", sure: "50:13" }

    ]

};

// --- EKRAN YÖNETİMİ ---
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
    if (tabId === 'gecmis') updateDataGridView();
    if (tabId === 'kpss') renderTable();
}

// --- KPSS TABLO MANTIĞI ---
function renderTable() {
    const tbody = document.getElementById('kpss-list-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    const videos = kpssData[currentDers] || [];
    videos.forEach(video => {
        const isDone = completedVideos[currentDers]?.includes(video.no);
        const tr = document.createElement('tr');
        tr.className = `video-row ${isDone ? 'completed' : ''}`;
        tr.innerHTML = `
            <td>${video.no}</td>
            <td><input type="checkbox" class="list-check" ${isDone ? 'checked' : ''} onchange="toggleVideo(${video.no})"></td>
            <td class="video-name">${video.ad}</td>
            <td>${video.sure}</td>
        `;
        tbody.appendChild(tr);
    });
    updateProgressBar();
}

async function toggleVideo(videoNo) {
    if (!completedVideos[currentDers]) completedVideos[currentDers] = [];
    const index = completedVideos[currentDers].indexOf(videoNo);
    if (index > -1) completedVideos[currentDers].splice(index, 1);
    else completedVideos[currentDers].push(videoNo);

    renderTable();
    await db.collection("kullanici_verileri").doc("ilerleme").set({ videolar: completedVideos }, { merge: true });
}

function showTable(ders, btn) {
    currentDers = ders;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTable();
}

function updateProgressBar() {
    const videos = kpssData[currentDers] || [];
    const doneVideos = completedVideos[currentDers]?.length || 0;
    const percentage = videos.length > 0 ? Math.round((doneVideos / videos.length) * 100) : 0;
    document.getElementById('progress-ders-adi').innerText = `${currentDers.toUpperCase()} İlerlemesi`;
    document.getElementById('progress-yuzde').innerText = `%${percentage}`;
    document.getElementById('progress-bar-fill').style.width = `${percentage}%`;
    document.getElementById('progress-stat').innerText = `Tamamlanan: ${doneVideos} / ${videos.length} Video`;
}

// --- VERİ ÇEKME (LOAD) VE LOGLAMA ---
async function loadData() {
    const t = document.getElementById('nav-date').value;
    try {
        const doc = await db.collection("gunluk_kayitlar").doc(t).get();
        resetDailyInputs();
        if (doc.exists) {
            const data = doc.data();
            icilenSu = data.su || 0;
            document.getElementById('daily-notes').value = data.borsaNotu || "";
            document.getElementById('check-spor').checked = data.spor || false;
            if (data.paragraf) {
                document.getElementById('p-soru').value = data.paragraf.p_soru || "";
                document.getElementById('p-dogru').value = data.paragraf.p_dogru || "";
                document.getElementById('p-yanlis').value = data.paragraf.p_yanlis || "";
                document.getElementById('p-sure').value = data.paragraf.p_sure || "";
                document.getElementById('p-not').value = data.paragraf.p_not || "";
            }
            if (data.denemeAnalizi) {
                document.getElementById('d-dogru').value = data.denemeAnalizi.dogru || "";
                document.getElementById('d-yanlis').value = data.denemeAnalizi.yanlis || "";
                document.getElementById('d-not').value = data.denemeAnalizi.not || "";
            }
            if (data.bakim?.foto) {
                const img = document.getElementById('bakim-img-preview');
                img.src = data.bakim.foto; img.style.display = 'block';
                document.getElementById('bakim-not').value = data.bakim.not || "";
            }
        }
        renderCups();
        updateDataGridView();
    } catch (e) { console.error(e); }
}

function openImage(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    modal.style.display = "block";
    modalImg.src = src;
}

// DataGridView Güncelleme (Yeni Su/Spor Sütunlu)
async function updateDataGridView() {
    const logBody = document.getElementById('log-body');
    if (!logBody) return;
    logBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:30px;">Yükleniyor...</td></tr>';

    try {
        const snapshot = await db.collection("gunluk_kayitlar").limit(30).get();
        logBody.innerHTML = '';

        let docs = [];
        snapshot.forEach(doc => docs.push({ id: doc.id, ...doc.data() }));
        docs.sort((a, b) => b.id.localeCompare(a.id));

        docs.forEach(d => {
            const tr = document.createElement('tr');

            const suSpor = `💧${d.su || 0} / ${d.spor ? '✅' : '❌'}`;
            const paragraf = d.paragraf ? `${d.paragraf.p_soru}S | ${d.paragraf.p_dogru}D | ${d.paragraf.p_yanlis}Y` : '-';
            const deneme = d.denemeAnalizi ? `${d.denemeAnalizi.dogru}D | ${d.denemeAnalizi.yanlis}Y` : '-';
            const notlar = d.borsaNotu || d.bakim?.not || '-';

            tr.innerHTML = `
                <td style="color:var(--accent-blue); font-weight:bold;">${d.id}</td>
                <td><span class="badge" style="font-size:0.9rem">${suSpor}</span></td>
                <td>${paragraf}</td>
                <td>${deneme}</td>
                <td style="font-size:0.85rem; max-width:200px; color:#94a3b8;">${notlar}</td>
                <td>
                    ${d.bakim?.foto ?
                    `<img src="${d.bakim.foto}" class="grid-img" onclick="openImage(this.src)">` :
                    '<span style="opacity:0.3">Yok</span>'}
                </td>
            `;
            logBody.appendChild(tr);
        });
    } catch (e) { console.error(e); }
}

// --- KAYDETME FONKSİYONLARI ---
async function saveToFirebase(f, v) {
    const t = document.getElementById('nav-date').value;
    await db.collection("gunluk_kayitlar").doc(t).set({ [f]: v }, { merge: true });
    updateDataGridView();
}

async function saveKpss() {
    const d = { p_soru: document.getElementById('p-soru').value, p_dogru: document.getElementById('p-dogru').value, p_yanlis: document.getElementById('p-yanlis').value, p_sure: document.getElementById('p-sure').value, p_not: document.getElementById('p-not').value };
    await saveToFirebase('paragraf', d); alert("Paragraf Kaydedildi! 📚");
    updateDataGridView();
}

async function saveDeneme() {
    const d = { dogru: document.getElementById('d-dogru').value, yanlis: document.getElementById('d-yanlis').value, not: document.getElementById('d-not').value };
    await saveToFirebase('denemeAnalizi', d); alert("Deneme Kaydedildi! 📊");
    updateDataGridView();
}

async function saveHabits() { await saveToFirebase('spor', document.getElementById('check-spor').checked); alert("Spor Kaydedildi!"); updateDataGridView(); }
async function saveBorsa() { await saveToFirebase('borsaNotu', document.getElementById('daily-notes').value); alert("Borsa Kaydedildi!"); updateDataGridView(); }
async function saveBakim() {
    const n = document.getElementById('bakim-not').value; const t = document.getElementById('nav-date').value;
    const f = document.getElementById('bakim-foto-input').files[0];
    if (f) {
        const r = new FileReader(); r.onloadend = async () => { await db.collection("gunluk_kayitlar").doc(t).set({ bakim: { foto: r.result, not: n } }, { merge: true }); alert("Bakım Kaydedildi!"); }; r.readAsDataURL(f);
    } else { await db.collection("gunluk_kayitlar").doc(t).set({ bakim: { not: n } }, { merge: true }); alert("Not Kaydedildi!"); }
}

// --- YARDIMCI FONKSİYONLAR ---
function renderCups() {
    const c = document.getElementById('water-cups'); if (!c) return; c.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const s = document.createElement('span'); s.innerHTML = '💧'; s.className = 'cup' + (i <= icilenSu ? ' full' : '');
        s.onclick = () => { icilenSu = i; renderCups(); saveToFirebase('su', i); }; c.appendChild(s);
    }
    document.getElementById('water-status').innerText = `İçilen: ${icilenSu} / 10`;
}

function resetDailyInputs() {
    icilenSu = 0;
    document.getElementById('daily-notes').value = "";
    document.getElementById('check-spor').checked = false;
    document.getElementById('p-soru').value = ""; document.getElementById('p-dogru').value = "";
    document.getElementById('p-yanlis').value = ""; document.getElementById('p-sure').value = ""; document.getElementById('p-not').value = "";
    document.getElementById('d-dogru').value = ""; document.getElementById('d-yanlis').value = ""; document.getElementById('d-not').value = "";
    document.getElementById('bakim-not').value = ""; document.getElementById('bakim-img-preview').style.display = 'none';
}

function onImageSelect(e) {
    const f = e.target.files[0]; if (f) {
        const r = new FileReader(); r.onload = (x) => { document.getElementById('bakim-img-preview').src = x.target.result; document.getElementById('bakim-img-preview').style.display = 'block'; }; r.readAsDataURL(f);
    }
}

// --- BAŞLATICI ---
window.onload = async () => {
    document.getElementById('nav-date').value = new Date().toISOString().split('T')[0];
    const doc = await db.collection("kullanici_verileri").doc("ilerleme").get();
    if (doc.exists) completedVideos = doc.data().videolar || {};
    loadData();
    renderTable();
    updateDataGridView();
};