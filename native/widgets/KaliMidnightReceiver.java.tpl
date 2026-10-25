package __PACKAGE__;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** Yarim tundan keyin kunlik buyruq va sanoq widgetlarini yangilaydi. */
public class KaliMidnightReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context ctx, Intent intent) {
        KaliWidgets.updateAll(ctx);
        if (KaliWidgets.hasAny(ctx)) KaliWidgets.scheduleMidnight(ctx);
    }
}
