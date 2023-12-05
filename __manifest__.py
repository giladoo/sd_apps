# -*- coding: utf-8 -*-
{
    'name': "sd_apps",

    'summary': """
        """,

    'description': """
        
    """,

    'author': "Arash Homayounfar",
    'website': "https://gilaneh.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Service Desk/Service Desk',
    'application': True,
    'version': '1.0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'web', 'mail'],

    # always loaded
    'data': [
        'security/security.xml',
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
        # 'views/hr_employee_views.xml',
        # 'data/website_form_sd_apps_data.xml'
    ],
    'assets': {
        # 'website.assets_editor': [
        #     'static/src/**/*',
        # ],

        'web.assets_frontend': [

            # 'sd_apps/static/src/css/my-style.scss',
            # 'sd_apps/static/src/js/website_form_sd_apps.js'
        ],
        'web.assets_backend': [

            'sd_apps/static/src/css/my-style.scss',
            # 'sd_apps/static/src/js/website_form_sd_apps.js'
        ],
    },

    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'license': 'LGPL-3',

}
