odoo.define('sd_apps.form', function (require) {
'use strict';

var core = require('web.core');
var FormEditorRegistry = require('website.form_editor_registry');

var _t = core._t;

FormEditorRegistry.add('create_sd_apps', {
    formFields: [{
        type: 'char',
        modelRequired: true,
        name: 'sd_apps',
        string: 'sd_apps',
    }, {
        type: 'char',
        name: 'description',
        string: 'Description',
    }],
    fields: [{
        name: 'name',
        type: 'many2one',
        relation: 'sd_apps.sd_apps',
        string: _t('sd_apps'),
        createAction: 'sd_apps.open_view_sd_apps_all',
    }],

});

});
