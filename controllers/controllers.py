# -*- coding: utf-8 -*-

import odoo

from odoo import http, models, fields, _
from odoo.http import request, SessionExpiredException


from odoo.addons.portal.controllers.web import Home



class SdAppsWebsite(Home):
    @http.route('/sd_apps/snippet/apps', type='json', auth='public', website=True, methods=["POST"])
    def get_apps(self, app_id=None):
        print(f"\n apps\n {app_id}")
        apps = request.env['sd_apps.settings'].sudo().get_apps(app_id)
        return apps



