/** @odoo-module **/

import { session } from "@web/session";
import { url } from "@web/core/utils/urls";
import { useService } from "@web/core/utils/hooks";
import { Dropdown } from "@web/core/dropdown/dropdown";

const { Component, hooks,  } = owl;
const {useState, useContext, useBus,  } = hooks;

//export class AppsMenu extends Dropdown {
//    setup() {
//    	super.setup();
//    	console.log('AppsMenu')
//    	if (session.theme_has_background_image) {
//            this.backgroundImageUrl = url('/web/image', {
//                model: 'res.company',
//                field: 'background_image',
//                id: this.env.services.company.currentCompany.id,
//            });
//    	} else {
//    		this.backgroundImageUrl = '/sd_apps/static/img/background.png';
//    	}
//    	this.env.bus.on("ACTION_MANAGER:UI-UPDATED", this, ev => this.close());
//    }
//}

//Object.assign(AppsMenu, {
//    template: 'sd_apps.navbar_appsmenu',
//});

export class AppsHome extends Component {
    setup(){
    let action = this.env.services.router.current.hash.action
    let menu_id = this.env.services.router.current.hash.menu_id
    let pushState = this.env.services.router.current.hash.pushState
//    console.log('pushState', pushState, 'action', action,  'menu_id', menu_id, this.env.services.router)
//    console.log('bus', this.env.bus, 'ROUTE_CHANGE', this.env.bus.ROUTE_CHANGE)


//    this.env.bus.on("ROUTE_CHANGE", this, this.pageUpdated);
//    this.env.bus.on("MENUS:APP-CHANGED", this, this.renderAndAdapt);

    this.state = useState({
        apps: 'arash',
        current: Array()
    })

    this.router = useService('router')
//    this.bus = useBus()
//             this.state.current.push(JSON.parse(JSON.stringify(this.router.current[0])))
             this.state.current.push({hash: {menu_id: 0}})
             this.state.current.push({hash: {menu_id: 0}})
//    console.log( this.router.current)
//    console.log( this.state.current[0])


    }
    renderAndAdapt(){
        console.log(this)
    }
    pageUpdated(){
        if (this.state.current.length > 1){
            let lastRoute = this.state.current.slice(-1)[0].hash
            let currentRoute = this.router.current.hash
            console.log(lastRoute, currentRoute)
            if (lastRoute.menu_id != currentRoute.menu_id){
                this.state.current.push(this.router.current)
            }else if (currentRoute.action && lastRoute.action != currentRoute.action){
                this.state.current.push(this.router.current)
            }
        }else {
            this.state.current.push(this.router.current)
        }
    }
    onBackBtn(e){
        console.log('onBackBtn, router.current',)
        window.history.back()
        return
        let lastPage, menu_id, action, url = ''
        if (this.router.current.hash.id){
            this.state.current.pop()
            lastPage = this.router.current
            menu_id =  lastPage.hash.menu_id ? `menu_id=${lastPage.hash.menu_id}` : ''
            action =   lastPage.hash.action  ?  `action=${lastPage.hash.action}`  : ''
            url = `/web#${menu_id}`
            console.log('onBackBtn2:this ', url)
            this.router.redirect(url)
        }
        else if (this.state.current.length > 1){
            this.state.current.pop()
            lastPage = this.state.current.pop()
            menu_id =  lastPage.hash.menu_id ? `menu_id=${lastPage.hash.menu_id}` : ''
            action =   lastPage.hash.action  ?  `action=${lastPage.hash.action}`  : ''
            url = `/web#${menu_id}&${action}`
            console.log('onBackBtn2:that ', url)
            this.router.redirect(url)
        }

    }
}

AppsHome.template = 'sd_apps.navbar_appsmenu'
AppsHome.props = { apps: Array,  }
