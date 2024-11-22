/** @odoo-module */

import { session } from "@web/session";
import { url } from "@web/core/utils/urls";
import { patch } from "@web/core/utils/patch";
import { registry } from "@web/core/registry";

import { NavBar } from "@web/webclient/navbar/navbar";
import { AppsHome } from "@sd_apps/web/webclient/appsmenu/appsmenu";
//import { AppsBar } from "@sd_apps/web/webclient/appsbar/appsbar";
import { SwitchCompanyMenu } from "@web/webclient/switch_company_menu/switch_company_menu";
import { UserMenu } from "@web/webclient/user_menu/user_menu";

patch(NavBar, {
    components: {
        ...NavBar.components,
//        AppsBar,
        AppsHome,
    },
});
