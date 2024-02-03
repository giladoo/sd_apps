# -*- coding: utf-8 -*-
import datetime
import json
from datetime import  timedelta
# import random

from odoo import models, fields, api, tools

from colorama import Fore

class sd_apps(models.Model):
    _name = 'sd_apps.sd_apps'
    _description = 'sd_apps.sd_apps'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    state = fields.Selection(
            [('draft', 'Draft'), ('ongoing', 'Ongoing'), ('approved', 'Approved'), ],
            string='Status', index=True, readonly=True, tracking=True, copy=False, default='draft', required=True,
            group_expand='_expand_groups', )

    name = fields.Char(required=True, translate=True)
    description = fields.Html('Notes...', )



class sd_apps_settings(models.Model):
    _name = 'sd_apps.settings'
    _description = 'sd_apps.settings'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'sequence,id asc'

    name = fields.Char(required=True, translate=True)
    active_link = fields.Boolean(default=False)
    app_or_link = fields.Boolean(default=True)
    link = fields.Char()
    target = fields.Selection([('_blank', 'New Tab'), ('_self', 'Same Tab')], default='_self')
    priority = fields.Integer(default=10)
    sequence = fields.Integer('Sequence', default=10)
    access_group = fields.Many2one('res.groups')
    has_access_group = fields.Integer(compute='_has_access_group', default=0)

    image = fields.Image(string='Logo')
    color = fields.Integer()
    parent_id = fields.Many2one('sd_apps.settings')

    def _has_access_group(self):

        for rec in self:
            rec.has_access_group = 0
            if not rec.access_group:
                # print(f'\n rec.has_access_group : {rec.access_group}')
                # print(f'\n rec.env.user.id : {rec.env.user.id}')
                # print(f'\n rec.access_group.users.ids : {rec.access_group.users.ids}')
                rec.has_access_group = 1
            else:
                rec.has_access_group = 1 if rec.env.user.id in rec.access_group.users.ids else 0
    def get_apps_group(self, res_id):
        print(f'>>>>>>>>>>>>> res_id: {res_id}')

        return json.dumps({'res_id': res_id})


    def get_apps(self, parent_id):
        print(f'>>>>>>>>>>>>> parent_id: {parent_id}')
        records = self.search([('parent_id', '=', parent_id)])
        records_access = [rec for rec in records if self.has_access(rec.access_group)]


        records_data = list([{'id': rec.id,
                              'name': rec.name,
                              'color': rec.color,
                              'link': rec.link,
                              'target': rec.target,
                              } for rec in records_access])

        return json.dumps(records_data)

    def has_access(self, group):
        # if there is no access group, it permits access
        complete_name = self.env['ir.model.data'].sudo().search([('res_id', '=', group.id),('model', '=', 'res.groups')]).complete_name
        has_group = self.env.user.has_group(complete_name) if complete_name else True
        return has_group