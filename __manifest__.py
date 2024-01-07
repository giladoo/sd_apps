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
    'version': '2.0.0',

    # any module necessary for this one to work correctly
    'depends': ['base', 'web', 'mail'],

    # always loaded
    'data': [
        'security/security.xml',
        'security/ir.model.access.csv',
        # 'views/control_panel.xml',
        'views/views.xml',
        # 'views/templates.xml',
        # 'views/hr_employee_views.xml',
        'data/home_data.xml'
    ],
    'assets': {
        # 'website.assets_editor': [
        #     'static/src/**/*',
        # ],

        'web.assets_frontend': [

             'sd_apps/static/src/css/my-style.scss',
            # 'sd_apps/static/src/js/website_form_sd_apps.js'
        ],
        'web.assets_common': [
            'sd_apps/static/src/xml/control_panel.xml',

        ],
        'web.assets_qweb': [
            'sd_apps/static/src/components/**/*.xml',
            'sd_apps/static/src/web/**/*.xml',
            # 'sd_apps/static/src/xml/control_panel.xml',
            'sd_apps/static/src/xml/**/*.xml',
        ],
        'web.assets_backend': [

            'sd_apps/static/src/components/**/*.js',
            'sd_apps/static/src/components/**/*.scss',
            'sd_apps/static/src/css/my-style.scss',
            'sd_apps/static/src/web/**/*.scss',
            'sd_apps/static/src/web/**/*.js',

            # 'sd_apps/static/src/js/website_form_sd_apps.js'
        ],
    },
    'images': [
        'static/description/banner.png',
        'static/description/theme_screenshot.png'
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'license': 'LGPL-3',

}
