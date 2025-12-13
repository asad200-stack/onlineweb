# إعداد تخزين البيانات على Railway

## المشكلة
البيانات (قاعدة البيانات والصور) تُحفظ محلياً وتضيع عند إعادة البناء على Railway.

## الحل: استخدام Volume في Railway

### الخطوات:

1. **في Railway Dashboard:**
   - افتح مشروعك
   - اضغط "New" → "Volume"
   - اختر اسم (مثال: `ecommerce-data`)
   - اختر الحجم (1GB مجاني)
   - اضغط "Create"

2. **اربط Volume بالخدمة:**
   - اضغط على الخدمة (Service)
   - اضغط "Variables"
   - أضف متغير جديد:
     ```
     RAILWAY_VOLUME_MOUNT_PATH=/data
     ```
   - أو في Settings → Mount Volume:
     - اختر Volume الذي أنشأته
     - Mount Path: `/data`

3. **تحديث الكود:**
   - قاعدة البيانات: `/data/database.sqlite`
   - الصور: `/data/uploads`

---

## بديل: استخدام Railway Persistent Disk

Railway يدعم Persistent Disks تلقائياً. فقط تأكد من:

1. البيانات تُحفظ في مجلد `/data` أو `./data`
2. Railway يحفظ الملفات تلقائياً

---

## الحل الأفضل: Cloud Storage

للمشاريع الكبيرة، استخدم:
- **Cloudinary** للصور (مجاني)
- **Supabase** أو **PlanetScale** لقاعدة البيانات
- **Railway Volume** للتخزين المحلي

---

## الإعداد السريع

في Railway:
1. Volume → Create Volume
2. Mount to Service → `/data`
3. Update code to use `/data` path

