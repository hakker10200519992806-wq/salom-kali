package __PACKAGE__;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;

/** 4x1 tezkor tugmalar: Terminal, Test, Mashq, Takrorlash. */
public class QuickWidget extends AppWidgetProvider {

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) {
            RemoteViews rv = new RemoteViews(ctx.getPackageName(), R.layout.kw_quick);
            rv.setOnClickPendingIntent(R.id.kw_q_term, KaliWidgets.open(ctx, 201, "terminal", null));
            rv.setOnClickPendingIntent(R.id.kw_q_test, KaliWidgets.open(ctx, 202, "test", null));
            rv.setOnClickPendingIntent(R.id.kw_q_chal, KaliWidgets.open(ctx, 203, "chal", null));
            rv.setOnClickPendingIntent(R.id.kw_q_rev, KaliWidgets.open(ctx, 204, "review", null));
            mgr.updateAppWidget(id, rv);
        }
    }
}
