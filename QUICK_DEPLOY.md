# ⚡ نشر سريع على Railway

## خطوات سريعة (5 دقائق)

### 1️⃣ ارفع على GitHub
```bash
git add .
git commit -m "Ready for Railway"
git push
```

### 2️⃣ أنشئ مشروع على Railway
- [railway.app](https://railway.app) → New Project
- اختر "Deploy from GitHub repo"
- اختر repository

### 3️⃣ إعدادات مهمة

**Settings → Builder:** `NIXPACKS` (ليس Docker!)

**Variables → New Variable:**
```
NODE_ENV = production
```

### 4️⃣ انتظر البناء
- Railway سيبني تلقائياً
- انتظر "Deployed successfully" ✅

### 5️⃣ احصل على الرابط
- Settings → Domains → Generate Domain

---

## ✅ تأكد من:

- [ ] `railway.json` موجود
- [ ] لا يوجد `Dockerfile`
- [ ] Builder = NIXPACKS
- [ ] `NODE_ENV=production` في Variables

---

## 🔑 معلومات الدخول

- **Admin:** `/admin/login`
- **Username:** `web`
- **Password:** `web12345`

---

## 🎉 جاهز!

الموقع الآن يعمل على Railway! 🚀

