/** @odoo-module **/

import { useService } from "@web/core/utils/hooks";

const { Component, hooks } = owl;

export class AppsBar extends Component {}

AppsBar.template = 'sd_apps.AppsBar'
AppsBar.props = { apps: Array }

//Object.assign(AppsBar, {
//    template: 'sd_apps.AppsBar',
//    props: {
//    	apps: Array,
//    },
//});

