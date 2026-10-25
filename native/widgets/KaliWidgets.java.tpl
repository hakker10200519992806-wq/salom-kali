package __PACKAGE__;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.TimeZone;

/** Barcha widgetlar uchun umumiy yordamchi: ma'lumot, sana, bosish amallari, yangilash. */
public final class KaliWidgets {
    private KaliWidgets() {}

    static final String PREFS = "kali_widgets";
    static final String EXTRA_ACTION = "kw_action";
    static final String EXTRA_CMD = "kw_cmd";
    static final String ACTION_MIDNIGHT = "__PACKAGE__.WIDGET_MIDNIGHT";

    /** assets/ ichidagi JSON massivni o'qiydi (internet kerak emas). */
    static JSONArray loadArray(Context ctx, String asset) {
        try (InputStream in = ctx.getAssets().open(asset)) {
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            byte[] buf = new byte[8192];
            int n;
            while ((n = in.read(buf)) > 0) bo.write(buf, 0, n);
            return new JSONArray(bo.toString("UTF-8"));
        } catch (Exception e) {
            return new JSONArray();
        }
    }

    private static long floorDay(long ms) {
        return (long) Math.floor(ms / 86400000.0);
    }

    /** Mahalliy vaqt bo'yicha kun raqami (veb ilovadagi "Bugungi buyruq" bilan bir xil). */
    static long localDay() {
        long now = System.currentTimeMillis();
        return floorDay(now + TimeZone.getDefault().getOffset(now));
    }

    /** Bugungi buyruq: {c, n, d, x:[[cmd, izoh], ...]} */
    static JSONObject today(Context ctx) {
        JSONArray a = loadArray(ctx, "commands.json");
        if (a.length() == 0) return null;
        return a.optJSONObject((int) (localDay() % a.length()));
    }

    /** Bosish bilan ilovaning kerakli bo'limini ochadigan PendingIntent. */
    static PendingIntent open(Context ctx, int req, String action, String cmd) {
        Intent i = baseIntent(ctx);
        i.putExtra(EXTRA_ACTION, action);
        if (cmd != null) i.putExtra(EXTRA_CMD, cmd);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= 23) flags |= PendingIntent.FLAG_IMMUTABLE;
        return PendingIntent.getActivity(ctx, req, i, flags);
    }

    /** Ro'yxat (ListView) uchun shablon: har bir qator o'z ma'lumotini fill-in bilan qo'shadi. */
    static PendingIntent template(Context ctx, int req) {
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= 31) flags |= PendingIntent.FLAG_MUTABLE;
        return PendingIntent.getActivity(ctx, req, baseIntent(ctx), flags);
    }

    private static Intent baseIntent(Context ctx) {
        Intent i = new Intent("__PACKAGE__.WIDGET");
        i.setComponent(new ComponentName(ctx.getPackageName(), "__PACKAGE__.MainActivity"));
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        return i;
    }

    static SharedPreferences prefs(Context ctx) {
        return ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    private static long epochDayOf(int y, int m, int d) {
        Calendar c = new GregorianCalendar(TimeZone.getTimeZone("UTC"));
        c.clear();
        c.set(y, m - 1, d);
        return floorDay(c.getTimeInMillis());
    }

    /** "yyyy-MM-dd" sanagacha necha kun qolgan (o'tgan bo'lsa manfiy). Sana noto'g'ri bo'lsa null. */
    static Integer daysUntil(String date) {
        try {
            String[] p = date.trim().split("-");
            if (p.length != 3) return null;
            Calendar now = Calendar.getInstance();
            long today = epochDayOf(now.get(Calendar.YEAR), now.get(Calendar.MONTH) + 1, now.get(Calendar.DAY_OF_MONTH));
            long target = epochDayOf(Integer.parseInt(p[0]), Integer.parseInt(p[1]), Integer.parseInt(p[2]));
            return (int) (target - today);
        } catch (Exception e) {
            return null;
        }
    }

    /** Kechasi 00:00 dan keyin widgetlarni qayta chizish uchun signal qo'yadi. */
    static void scheduleMidnight(Context ctx) {
        try {
            AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
            if (am == null) return;
            Calendar c = Calendar.getInstance();
            c.add(Calendar.DAY_OF_YEAR, 1);
            c.set(Calendar.HOUR_OF_DAY, 0);
            c.set(Calendar.MINUTE, 0);
            c.set(Calendar.SECOND, 5);
            c.set(Calendar.MILLISECOND, 0);
            Intent i = new Intent(ctx, KaliMidnightReceiver.class);
            i.setAction(ACTION_MIDNIGHT);
            int flags = PendingIntent.FLAG_UPDATE_CURRENT;
            if (Build.VERSION.SDK_INT >= 23) flags |= PendingIntent.FLAG_IMMUTABLE;
            PendingIntent pi = PendingIntent.getBroadcast(ctx, 7, i, flags);
            am.set(AlarmManager.RTC, c.getTimeInMillis(), pi);
        } catch (Exception ignored) {
            // alarm ixtiyoriy: updatePeriodMillis zaxira sifatida ishlaydi
        }
    }

    /** Sanoq va "Bugungi buyruq" widgetlarini darhol yangilaydi. */
    static void updateAll(Context ctx) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
        int[] daily = mgr.getAppWidgetIds(new ComponentName(ctx, DailyWidget.class));
        for (int id : daily) DailyWidget.update(ctx, mgr, id);
        int[] cd = mgr.getAppWidgetIds(new ComponentName(ctx, CountdownWidget.class));
        for (int id : cd) CountdownWidget.update(ctx, mgr, id);
    }

    static boolean hasAny(Context ctx) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
        return mgr.getAppWidgetIds(new ComponentName(ctx, DailyWidget.class)).length
                + mgr.getAppWidgetIds(new ComponentName(ctx, CountdownWidget.class)).length > 0;
    }

    /** Widgetning hozirgi kengligi (dp). */
    static int widthDp(AppWidgetManager mgr, int id) {
        return mgr.getAppWidgetOptions(id).getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH, 0);
    }
}
