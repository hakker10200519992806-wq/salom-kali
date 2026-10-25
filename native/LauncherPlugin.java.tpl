package __PACKAGE__;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ShortcutInfo;
import android.content.pm.ShortcutManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.drawable.Icon;
import android.os.Build;
import android.util.Base64;
import android.content.SharedPreferences;
import android.webkit.JavascriptInterface;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Ilovaning bosh ekrandagi nomi va ikonkasini almashtirish.
 *  - setPreset: manifestdagi activity-alias lardan birini yoqadi (tayyor nom + ikonka)
 *  - pinShortcut: ixtiyoriy nom va rasm bilan bosh ekranga yorliq qo'yadi
 */
@CapacitorPlugin(name = "Launcher")
public class LauncherPlugin extends Plugin {

    private static final String[] IDS = { __IDS__ };

    /** Widgetdan kelgan amal (bo'lim ochish). Veb qismi getPending bilan bir marta o'qib oladi. */
    private static String pendingAction = null;
    private static String pendingCmd = null;

    private static void readIntent(Intent in) {
        if (in == null || !in.hasExtra(KaliWidgets.EXTRA_ACTION)) return;
        pendingAction = in.getStringExtra(KaliWidgets.EXTRA_ACTION);
        pendingCmd = in.getStringExtra(KaliWidgets.EXTRA_CMD);
        // qayta ishga tushganda (masalan ekran aylanganda) amal takrorlanmasin
        in.removeExtra(KaliWidgets.EXTRA_ACTION);
        in.removeExtra(KaliWidgets.EXTRA_CMD);
    }

    /** Doimiy xotira: veb qismining localStorage nusxasi SharedPreferences da saqlanadi. */
    private static final String KV_FILE = "km_store";
    private static final String KV_KEY = "ls";

    private static String kvRead(Context c) {
        return c.getSharedPreferences(KV_FILE, Context.MODE_PRIVATE).getString(KV_KEY, "");
    }

    private static void kvWrite(Context c, String d) {
        if (d == null) return;
        c.getSharedPreferences(KV_FILE, Context.MODE_PRIVATE).edit().putString(KV_KEY, d).commit();
    }

    /** Sahifa ochilishidan OLDIN sinxron o'qish uchun (window.KMNative). */
    public static class KV {
        private final Context ctx;
        KV(Context c) { ctx = c.getApplicationContext(); }
        @JavascriptInterface
        public String get() { return kvRead(ctx); }
        @JavascriptInterface
        public void set(String d) { kvWrite(ctx, d); }
    }

    @Override
    public void load() {
        readIntent(getActivity().getIntent());
        try {
            getBridge().getWebView().addJavascriptInterface(new KV(getContext()), "KMNative");
        } catch (Throwable ignored) { }
    }

    @PluginMethod
    public void kvGet(PluginCall call) {
        JSObject r = new JSObject();
        r.put("data", kvRead(getContext()));
        call.resolve(r);
    }

    @PluginMethod
    public void kvSet(PluginCall call) {
        kvWrite(getContext(), call.getString("data"));
        call.resolve();
    }

    @Override
    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);
        readIntent(intent);
    }

    @PluginMethod
    public void getPending(PluginCall call) {
        JSObject r = new JSObject();
        if (pendingAction != null) {
            r.put("action", pendingAction);
            if (pendingCmd != null) r.put("cmd", pendingCmd);
        }
        pendingAction = null;
        pendingCmd = null;
        call.resolve(r);
    }

    /** Sanoq widgeti uchun imtihon/CTF nomi va sanasi (yyyy-MM-dd). Bo'sh sana = o'chirish. */
    @PluginMethod
    public void setCountdown(PluginCall call) {
        try {
            String title = call.getString("title", "");
            String date = call.getString("date", "");
            SharedPreferences.Editor e = KaliWidgets.prefs(getContext()).edit();
            e.putString("cd_title", title == null ? "" : title.trim());
            e.putString("cd_date", date == null ? "" : date.trim());
            e.apply();
            KaliWidgets.updateAll(getContext());
            call.resolve();
        } catch (Exception ex) {
            call.reject("Sanani saqlab bo'lmadi: " + ex.getMessage());
        }
    }

    /** Widgetlar o'rnatilganmi (ixtiyoriy ma'lumot uchun). */
    @PluginMethod
    public void refreshWidgets(PluginCall call) {
        try {
            KaliWidgets.updateAll(getContext());
            call.resolve();
        } catch (Exception ex) {
            call.reject("Widgetni yangilab bo'lmadi: " + ex.getMessage());
        }
    }

    private ComponentName alias(String id) {
        return new ComponentName(getContext().getPackageName(), "__PACKAGE__.Alias_" + id);
    }

    private boolean isEnabled(PackageManager pm, String id) {
        int s = pm.getComponentEnabledSetting(alias(id));
        if (s == PackageManager.COMPONENT_ENABLED_STATE_ENABLED) return true;
        if (s == PackageManager.COMPONENT_ENABLED_STATE_DEFAULT) return "default".equals(id);
        return false;
    }

    @PluginMethod
    public void getState(PluginCall call) {
        try {
            PackageManager pm = getContext().getPackageManager();
            String cur = "default";
            for (String id : IDS) {
                if (isEnabled(pm, id)) { cur = id; break; }
            }
            boolean canPin = false;
            if (Build.VERSION.SDK_INT >= 26) {
                ShortcutManager sm = getContext().getSystemService(ShortcutManager.class);
                canPin = sm != null && sm.isRequestPinShortcutSupported();
            }
            boolean any = false;
            for (String id : IDS) {
                if (isEnabled(pm, id)) { any = true; break; }
            }
            JSObject r = new JSObject();
            r.put("hidden", !any);
            r.put("current", cur);
            r.put("canPin", canPin);
            r.put("pending", KaliWidgets.prefs(getContext()).getString(PK, ""));
            call.resolve(r);
        } catch (Exception e) {
            call.reject("Holatni o'qib bo'lmadi: " + e.getMessage());
        }
    }

    private static final String PK = "pending_launcher";

    private boolean known(String id) {
        if (id == null) return false;
        for (String x : IDS) {
            if (x.equals(id)) return true;
        }
        return false;
    }

    private String labelOf(String id) {
        try {
            int rid = getContext().getResources().getIdentifier(
                    "alias_label_" + id, "string", getContext().getPackageName());
            if (rid != 0) return getContext().getString(rid);
        } catch (Exception ignored) {
            // nom ixtiyoriy
        }
        return null;
    }

    /** v = "hide" (hammasini yashirish) yoki ikonka id si. Avval yangisi yoqiladi: launcherda doim kirish nuqtasi bo'ladi. */
    private void applyNow(String v) {
        PackageManager pm = getContext().getPackageManager();
        if ("hide".equals(v)) {
            for (String x : IDS) {
                pm.setComponentEnabledSetting(alias(x),
                        PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);
            }
            return;
        }
        pm.setComponentEnabledSetting(alias(v),
                PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP);
        for (String x : IDS) {
            if (!x.equals(v)) {
                pm.setComponentEnabledSetting(alias(x),
                        PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);
            }
        }
    }

    /**
     * Ilova ochiq paytida alias almashtirilsa, ba'zi telefonlar ilovani yopib yuboradi va
     * saqlanmagan sozlamalar (masalan robot mavzusi) yo'qoladi. Shuning uchun almashtirish
     * kutib turadi va ilova fonga o'tganda (Bosh ekran/orqaga) qo'llanadi.
     */
    private void applyPending() {
        try {
            SharedPreferences sp = KaliWidgets.prefs(getContext());
            String v = sp.getString(PK, null);
            if (v == null || v.isEmpty()) return;
            sp.edit().remove(PK).commit();
            applyNow(v);
        } catch (Exception ignored) {
            // keyingi safar urinib ko'riladi
        }
    }

    @Override
    protected void handleOnStop() {
        super.handleOnStop();
        applyPending();
    }

    @Override
    protected void handleOnDestroy() {
        super.handleOnDestroy();
        try {
            if (getActivity() != null && getActivity().isChangingConfigurations()) return;
        } catch (Exception ignored) {
            // e'tiborsiz
        }
        applyPending();
    }

    @PluginMethod
    public void setPreset(PluginCall call) {
        String id = call.getString("id");
        if (!known(id)) {
            call.reject("Noma'lum ikonka: " + id);
            return;
        }
        try {
            KaliWidgets.prefs(getContext()).edit().putString(PK, id).commit();
            JSObject r = new JSObject();
            r.put("id", id);
            r.put("pending", true);
            String l = labelOf(id);
            if (l != null) r.put("label", l);
            call.resolve(r);
        } catch (Exception e) {
            call.reject("Almashtirib bo'lmadi: " + e.getMessage());
        }
    }

    /**
     * Ilovaning asl ikonkasini bosh ekran/ilovalar ro'yxatidan yashiradi (hide=true) yoki qaytaradi (hide=false).
     * Yashirilganda ilovani faqat «yorliq» orqali ochish mumkin. O'zgarish ilova fonga o'tganda qo'llanadi.
     */
    @PluginMethod
    public void hideLauncher(PluginCall call) {
        boolean hide = Boolean.TRUE.equals(call.getBoolean("hide", true));
        String id = call.getString("id", "default");
        if (!hide && !known(id)) id = "default";
        try {
            KaliWidgets.prefs(getContext()).edit().putString(PK, hide ? "hide" : id).commit();
            JSObject r = new JSObject();
            r.put("hidden", hide);
            r.put("pending", true);
            call.resolve(r);
        } catch (Exception e) {
            call.reject("Ikonkani almashtirib bo'lmadi: " + e.getMessage());
        }
    }

    @PluginMethod
    public void pinShortcut(PluginCall call) {
        if (Build.VERSION.SDK_INT < 26) {
            JSObject r = new JSObject();
            r.put("supported", false);
            call.resolve(r);
            return;
        }
        String name = call.getString("name", "Kali Maktab");
        if (name == null || name.trim().isEmpty()) name = "Kali Maktab";
        name = name.trim();
        String b64 = call.getString("icon");
        if (b64 == null || b64.isEmpty()) {
            call.reject("Rasm berilmagan");
            return;
        }
        try {
            Context ctx = getContext();
            ShortcutManager sm = ctx.getSystemService(ShortcutManager.class);
            if (sm == null || !sm.isRequestPinShortcutSupported()) {
                JSObject r = new JSObject();
                r.put("supported", false);
                call.resolve(r);
                return;
            }
            byte[] raw = Base64.decode(b64, Base64.DEFAULT);
            Bitmap src = BitmapFactory.decodeByteArray(raw, 0, raw.length);
            if (src == null) {
                call.reject("Rasm o'qilmadi");
                return;
            }
            Intent open = new Intent(ctx, getActivity().getClass());
            open.setAction(Intent.ACTION_MAIN);
            open.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            ShortcutInfo info = new ShortcutInfo.Builder(ctx, "custom_" + System.currentTimeMillis())
                    .setShortLabel(name)
                    .setLongLabel(name)
                    .setIcon(Icon.createWithAdaptiveBitmap(adaptive(src)))
                    .setIntent(open)
                    .build();
            boolean requested = sm.requestPinShortcut(info, null);
            JSObject r = new JSObject();
            r.put("supported", true);
            r.put("requested", requested);
            call.resolve(r);
        } catch (Exception e) {
            call.reject("Yorliq qo'shilmadi: " + e.getMessage());
        }
    }

    /** Rasmni adaptive ikonka (108dp) markaziga, ko'rinadigan 72dp joyga joylaydi. */
    private Bitmap adaptive(Bitmap src) {
        final int size = 432;
        int inner = Math.round(size * 72f / 108f);
        Bitmap out = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888);
        Canvas cv = new Canvas(out);
        int edge = src.getPixel(0, 0);
        if (Color.alpha(edge) < 255) edge = Color.WHITE;
        cv.drawColor(edge);
        Bitmap scaled = Bitmap.createScaledBitmap(src, inner, inner, true);
        cv.drawBitmap(scaled, (size - inner) / 2f, (size - inner) / 2f, null);
        return out;
    }
}
