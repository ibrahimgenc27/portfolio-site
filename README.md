# Kişisel Portfolyo Sitesi (SPA)

Bu proje, Web Teknolojileri dersi kapsamında geliştirilmiş bir **Single Page Application (SPA)** portfolyo sitesidir.

## Proje Hakkında
Bu uygulama, herhangi bir sunucu tabanlı dil (PHP, Node.js vb.) kullanılmadan, tamamen **HTML5**, **CSS3** ve **Modern JavaScript (ES6+)** teknolojileri ile geliştirilmiştir. Sayfa geçişleri, sayfa yenilenmeden (refresh olmadan) JavaScript ile yönetilmektedir.

## Özellikler
- **SPA Mimarisi:** Sayfa yenilenmeden hızlı geçişler.
- **Dinamik İçerik:** Tüm veriler (profil, projeler, iletişim) `data/content.json` dosyasından `fetch` API ile çekilir.
- **Responsive Tasarım:** Mobil, tablet ve masaüstü uyumlu (Hamburger menü desteği).
- **Karanlık Mod (Dark Mode):** Kullanıcı tercihi `localStorage` ile kaydedilir.
- **İletişim Formu:** HTML5 ve JS validasyonlu form simülasyonu.

## Kurulum ve Çalıştırma
Bu proje dışarıdan veri (`json`) çektiği için tarayıcı güvenlik kuralları (CORS) gereği doğrudan dosya sistemi üzerinden (`file://`) çalışmayabilir.

### Yöntem 1: VS Code Live Server (Önerilen)
1. VS Code'da projeyi açın.
2. "Live Server" eklentisini kurun.
3. `index.html` dosyasına sağ tıklayıp "Open with Live Server" seçeneğini seçin.

### Yöntem 2: GitHub Pages
Proje GitHub Pages üzerinde barındırıldığında sorunsuz çalışacaktır.

## Kullanılan Teknolojiler
- HTML5 (Semantik Yapı)
- CSS3 (Flexbox, Grid, CSS Variables)
- JavaScript (ES6+, Fetch API, Async/Await)

## Geliştirici
**Ad Soyad:** Faik Çelik
**Ders:** Web Teknolojileri
