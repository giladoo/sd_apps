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
    # for the full list
    'category': 'Service Desk/Service Desk',
    'application': True,
    'version': '18.0.1.0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'web', 'mail'],

    # always loaded
    'data': [
        'security/security.xml',
        'security/ir.model.access.csv',
        'views/views.xml',
        'data/home_data.xml'
    ],
    'assets': {
        'web.assets_backend': [
            'sd_apps/static/src/components/**/*.xml',
            'sd_apps/static/src/web/**/*.xml',
            'sd_apps/static/src/xml/**/*.xml',
            'sd_apps/static/src/components/**/*.js',
            'sd_apps/static/src/components/**/*.scss',
            'sd_apps/static/src/css/my-style.scss',
            'sd_apps/static/src/web/**/*.scss',
            'sd_apps/static/src/web/**/*.js',
        ],
    },
    'images': [
        'static/description/banner.png',
        'static/description/theme_screenshot.png'
    ],
    # only loaded in demonstration mode
    'demo': [
        # 'demo/demo.xml',
    ],
    'license': 'LGPL-3',

}
