package __PACKAGE__;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;

import org.json.JSONArray;
import org.json.JSONObject;

/** Shpargalka ro'yxatini (ListView) to'ldiradi. */
public class CheatService extends RemoteViewsService {

    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new Factory(getApplicationContext());
    }

    static class Factory implements RemoteViewsService.RemoteViewsFactory {
        private final Context ctx;
        private JSONArray items = new JSONArray();

        Factory(Context ctx) {
            this.ctx = ctx;
        }

        @Override public void onCreate() { items = KaliWidgets.loadArray(ctx, "cheatsheet.json"); }
        @Override public void onDataSetChanged() { items = KaliWidgets.loadArray(ctx, "cheatsheet.json"); }
        @Override public void onDestroy() { items = new JSONArray(); }
        @Override public int getCount() { return items.length(); }

        @Override
        public RemoteViews getViewAt(int pos) {
            RemoteViews rv = new RemoteViews(ctx.getPackageName(), R.layout.kw_cheat_item);
            JSONObject o = items.optJSONObject(pos);
            if (o == null) return rv;
            String cmd = o.optString("c", "");
            rv.setTextViewText(R.id.kw_i_cmd, cmd);
            rv.setTextViewText(R.id.kw_i_desc, o.optString("d", ""));
            Intent fill = new Intent();
            Bundle b = new Bundle();
            b.putString(KaliWidgets.EXTRA_ACTION, "run");
            b.putString(KaliWidgets.EXTRA_CMD, cmd);
            fill.putExtras(b);
            rv.setOnClickFillInIntent(R.id.kw_i_root, fill);
            return rv;
        }

        @Override public RemoteViews getLoadingView() { return null; }
        @Override public int getViewTypeCount() { return 1; }
        @Override public long getItemId(int pos) { return pos; }
        @Override public boolean hasStableIds() { return true; }
    }
}
