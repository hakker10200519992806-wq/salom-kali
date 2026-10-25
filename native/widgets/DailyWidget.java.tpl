package __PACKAGE__;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.os.Bundle;
import android.widget.RemoteViews;

import org.json.JSONArray;
import org.json.JSONObject;

/** Kunlik buyruq (2x2 dan 4x2 gacha o'lchami o'zgaradi). Ro'yxat ilovaning o'zida (assets/commands.json). */
public class DailyWidget extends AppWidgetProvider {

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) update(ctx, mgr, id);
        KaliWidgets.scheduleMidnight(ctx);
    }

    @Override
    public void onEnabled(Context ctx) {
        KaliWidgets.scheduleMidnight(ctx);
    }

    @Override
    public void onAppWidgetOptionsChanged(Context ctx, AppWidgetManager mgr, int id, Bundle newOptions) {
        update(ctx, mgr, id);
    }

    static void update(Context ctx, AppWidgetManager mgr, int id) {
        boolean wide = KaliWidgets.widthDp(mgr, id) >= 200;
        RemoteViews rv = new RemoteViews(ctx.getPackageName(), wide ? R.layout.kw_daily_wide : R.layout.kw_daily_small);
        JSONObject c = KaliWidgets.today(ctx);
        String name = "—", desc = "", example = null, note = "";
        if (c != null) {
            name = c.optString("n", "—");
            desc = c.optString("d", "");
            JSONArray x = c.optJSONArray("x");
            if (x != null && x.length() > 0) {
                JSONArray e = x.optJSONArray(0);
                if (e != null) {
                    example = e.optString(0, null);
                    note = e.optString(1, "");
                }
            }
        }
        rv.setTextViewText(R.id.kw_d_name, name);
        rv.setTextViewText(R.id.kw_d_desc, desc);
        if (wide) {
            rv.setTextViewText(R.id.kw_d_ex, example == null ? "" : "$ " + example);
            rv.setTextViewText(R.id.kw_d_note, note);
        }
        // bosilsa: namunaviy buyruq terminalda ishga tushadi
        rv.setOnClickPendingIntent(R.id.kw_d_root,
                KaliWidgets.open(ctx, 101, example != null ? "run" : "lessons", example));
        mgr.updateAppWidget(id, rv);
    }
}
