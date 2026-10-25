package __PACKAGE__;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.widget.RemoteViews;

/** 4x2 buyruqlar shpargalkasi: aylantiriladigan ro'yxat (assets/cheatsheet.json). Qatorni bosish buyruqni terminalda ishga tushiradi. */
public class CheatWidget extends AppWidgetProvider {

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) {
            Intent svc = new Intent(ctx, CheatService.class);
            svc.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, id);
            svc.setData(Uri.parse(svc.toUri(Intent.URI_INTENT_SCHEME)));

            RemoteViews rv = new RemoteViews(ctx.getPackageName(), R.layout.kw_cheat);
            rv.setRemoteAdapter(R.id.kw_list, svc);
            rv.setEmptyView(R.id.kw_list, R.id.kw_empty);
            rv.setPendingIntentTemplate(R.id.kw_list, KaliWidgets.template(ctx, 301));
            rv.setOnClickPendingIntent(R.id.kw_h_title, KaliWidgets.open(ctx, 302, "lessons", null));
            mgr.updateAppWidget(id, rv);
            mgr.notifyAppWidgetViewDataChanged(id, R.id.kw_list);
        }
    }
}
