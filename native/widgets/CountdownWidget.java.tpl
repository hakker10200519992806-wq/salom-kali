package __PACKAGE__;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

/** Imtihon yoki CTF kunigacha qolgan kunlar. Sana ilova ichida (Sozlamalar) tanlanadi. */
public class CountdownWidget extends AppWidgetProvider {

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) update(ctx, mgr, id);
        KaliWidgets.scheduleMidnight(ctx);
    }

    @Override
    public void onEnabled(Context ctx) {
        KaliWidgets.scheduleMidnight(ctx);
    }

    static void update(Context ctx, AppWidgetManager mgr, int id) {
        SharedPreferences p = KaliWidgets.prefs(ctx);
        String title = p.getString("cd_title", "");
        String date = p.getString("cd_date", "");
        if (title == null || title.trim().isEmpty()) title = "Imtihon / CTF";
        Integer left = (date == null || date.isEmpty()) ? null : KaliWidgets.daysUntil(date);

        String big, small, foot;
        if (left == null) {
            big = "⏳";
            small = "Sana qo'yilmagan";
            foot = "Sozlash uchun bosing";
        } else if (left > 1) {
            big = String.valueOf(left);
            small = "kun qoldi";
            foot = date;
        } else if (left == 1) {
            big = "1";
            small = "kun qoldi — ertaga!";
            foot = date;
        } else if (left == 0) {
            big = "🎯";
            small = "Bugun!";
            foot = date;
        } else {
            big = String.valueOf(-left);
            small = "kun oldin tugagan";
            foot = "Yangi sana qo'yish uchun bosing";
        }
        RemoteViews rv = new RemoteViews(ctx.getPackageName(), R.layout.kw_countdown);
        rv.setTextViewText(R.id.kw_c_title, title.trim().toUpperCase());
        rv.setTextViewText(R.id.kw_c_big, big);
        rv.setTextViewText(R.id.kw_c_small, small);
        rv.setTextViewText(R.id.kw_c_foot, foot);
        rv.setOnClickPendingIntent(R.id.kw_c_root, KaliWidgets.open(ctx, 104, "countdown", null));
        mgr.updateAppWidget(id, rv);
    }
}
