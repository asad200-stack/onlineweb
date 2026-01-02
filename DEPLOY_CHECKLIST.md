# ✅ Railway Deployment Checklist

## قبل النشر - تحقق من:

### الملفات المطلوبة:
- [x] `railway.json` موجود في الجذر
- [x] `package.json` موجود في الجذر  
- [x] `client/package.json` موجود
- [x] `server/index.js` موجود
- [x] لا يوجد `Dockerfile` في المشروع

### الإعدادات:
- [x] `railway.json` يحتوي على `"builder": "NIXPACKS"`
- [x] `package.json` يحتوي على `install-all` script
- [x] `package.json` يحتوي على `build` script
- [x] `package.json` يحتوي على `start` script

### GitHub:
- [ ] المشروع موجود على GitHub
- [ ] جميع الملفات مرفوعة
- [ ] `railway.json` موجود في GitHub

---

## خطوات النشر:

### 1. ارفع على GitHub
```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### 2. أنشئ مشروع على Railway
- اذهب إلى [railway.app](https://railway.app)
- New Project → Deploy from GitHub repo
- اختر repository

### 3. إعدادات Railway

#### في Settings:
- **Builder:** `NIXPACKS` (مهم جداً!)
- **Build Command:** اتركه فارغاً
- **Start Command:** اتركه فارغاً

#### في Variables:
- `NODE_ENV = production`

### 4. انتظر البناء
- Railway سيبني تلقائياً
- تحقق من Logs إذا فشل

### 5. احصل على الرابط
- Settings → Domains → Generate Domain

---

## 🔍 التحقق من النجاح:

- [ ] البناء اكتمل بنجاح
- [ ] الموقع يعمل على الرابط
- [ ] الصفحة الرئيسية تظهر
- [ ] Admin login يعمل
- [ ] API يعمل

---

## 🚨 إذا فشل البناء:

1. تحقق من Logs في Railway
2. تأكد من Builder = NIXPACKS
3. تأكد من NODE_ENV=production
4. تأكد من عدم وجود Dockerfile
5. تأكد من أن railway.json موجود

---

## ✅ بعد النشر الناجح:

1. اختبر الموقع
2. سجل دخول كـ admin
3. أضف منتجات
4. حدّث الإعدادات
5. شارك الرابط!

---

## 🎉 جاهز!

الموقع الآن يعمل على Railway! 🚀

