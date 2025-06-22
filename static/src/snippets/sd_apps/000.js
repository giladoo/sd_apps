/** @odoo-module **/
import { session } from "@web/session";
import publicWidget from "@web/legacy/js/public/public_widget";
import { renderToElement } from "@web/core/utils/render";

import { rpc } from "@web/core/network/rpc";

publicWidget.registry.SdAppsSnippet = publicWidget.Widget.extend({
    selector: '.sd_apps_snippet',
    init: function () {
        this._super.apply(this, arguments);
    },

    start() {
        this.state = {nav: []}
        this.appBoxArea = this.el.querySelector('.sd_apps_box_area')
        this._getData()
            .then(data => {
                this.updateBoxes(data)
            })
        console.log('this:', this)

        return this._super(...arguments);
    },
    updateBoxes(data){
//        this.appBoxArea.innerHTML  = `Box Area`
          const boxes = document.createElement("div");
          boxes.classList.add('row', 'mx-2', 'mx-sm-5', 'my-3', 'justify-content-center')
          boxes.innerHTML = "";
        data.forEach(box => {
//            console.log('box:', box)
            boxes.append(renderToElement(
                "sd_apps.website_card",
                {
                    props: {
                        card: box,
                        onClick: this.onClick,
                        this: this,
                    },
                }
            ));
        })
        let appBoxArea = this.el.querySelector('.sd_apps_box_area')
        appBoxArea.innerHTML = ''
        appBoxArea.append(boxes)

//        TODO: renderToElement
//            const infoContent = renderToElement(
//                "sd_apps.app",
//                {
//                    infoKey: infoKey,
//                }
//            );
//            updateInfo.innerHTML = infoContent.innerHTML;
    },
   async updateData(domain=[['parent_id', '=', 1]], parent_id=1){
//        console.log('updateData')
        this._getData(parent_id)
            .then(data => {
                this.updateBoxes(data)
            })
        let self = this;
//        let domain = [['parent_id', '=', 1]]
//                await this.orm.call("sd_apps.settings", 'get_apps', domain, {'parent_id': parent_id})

//                .then( data_list =>{
//                    console.log('self.state.data', data_list)
//                    self.state.data = JSON.parse(data_list)
//                    let cookieData = this.state.data.map(rec=>{
//                        let rec_cp = {...rec}
//                        rec_cp.link = rec_cp.link ? encodeURIComponent(rec_cp.link) : rec_cp.link
//                        rec_cp.name = rec_cp.name ? encodeURIComponent(rec_cp.name) : rec_cp.name
//                        return rec_cp
//                    })
//                    let cookieNav = self.state.nav.map(rec=>{
//                        let rec_cp = {...rec}
//                        rec_cp.link = false
//                        rec_cp.name = rec_cp.name ? encodeURIComponent(rec_cp.name) : rec_cp.name
//                        return rec_cp
//                    })
//                    cookie.set('appsStateData', JSON.stringify(cookieData))
//                    cookie.set('appsStateNav', JSON.stringify(cookieNav))
//                    let cookie_display = document.querySelector('.cookie_display')
//                    if (cookie_display){
//                        cookie_display.innerHTML = 'this.cookie.current.appsStateData\n <br>'
//                        cookie_display.innerHTML += self.cookie.current.appsStateData
//                    }
//
//
//                })
    },

    async onClick(direction, card, self){
        console.log('onClickCard: A',  direction, card.id, this, self)

//        this.state = {nav: []}
//        let self = this;
        let data;
        let domain = []
        let parent_id = 1
        const fields = ['name', 'color','link','access_group', 'target']

//            let group_name = await this.orm.call("sd_apps.settings", 'get_apps_group', [[]], {'res_id': card.id})
//                .then(group =>{
//                console.log('Group:', JSON.parse(group))
////                console.log('Group:',  session.uid in group[0].users)
//                })
//            await this.orm.searchRead("sd_apps.settings", [['id', '=', card.id]], [])
//                .then(group =>{
//                console.log('Group:', group, group[0].access_group[0])
//                this.orm.searchRead("ir.model.data", [['res_id', '=', group[0].access_group[0]],['model', '=', 'res.groups']], ['complete_name'])
//                    .then(group =>{
//                    session.user_has_group(group[0].complete_name).then(d=>console.log('d:', d))
////                    console.log('group group',  )
//                    })
//                })


        if (card.access_group){
                console.log('card:', card.access_group[0])

//            console.log('card',card, card.access_group ? card.access_group[1].split('/').join('.') : 'No group')

        }
//         await session.user_has_group('sd_visualize.group_sd_visualize_users').then(group => console.log('group:', group))
//         await session.user_has_group('sd_visualize.43').then(group => console.log('group:', group))

        if (typeof card == 'object' && card.link){
//            this.router.redirect(decodeURIComponent(card.link))
//            window.open(decodeURIComponent(card.link), '_blank');
                console.log('target:', card.target, card.link)

            window.open(decodeURIComponent(card.link), card.target);
        }else{
            console.log('target 2:', card.target, card.link)

            if ( direction == 'home' ){
                domain =  [['parent_id', '=', 1]]
                parent_id = 1
                self.state.nav = []
            }else if ( direction ==  'down' ){
                domain =  [['parent_id', '=', card.id]]
                parent_id = card.id
                self.state.nav.push(card)
            }else if (direction == 'up'){
                domain =  [['parent_id', '=', card.id]]
                parent_id = card.id

                let i = 0
                while (i < 6) {
                    if(self.state.nav.slice(-1)[0].id != card.id){
                       self.state.nav.pop()
                    }
                    i++;
                }
            }
        self._getData(parent_id)
            .then(data => {
                console.log('then:', data)
                self.updateBoxes(data)
            })
//        self.updateData(domain, parent_id)

//            domain.push()
//            console.log('onClickCard data:', JSON.parse(data_list))
//            data = await this.orm.searchRead("sd_apps.settings", domain, fields)
//            this.state.data = data
//            await this.orm.call("sd_apps.settings", 'get_apps', domain, {'parent_id': parent_id})
//                .then( data_list =>{
//                    self.state.data = JSON.parse(data_list)
//                    let cookieData = this.state.data.map(rec=>{
//                        let rec_cp = {...rec}
//                        rec_cp.link = rec_cp.link ? encodeURIComponent(rec_cp.link) : rec_cp.link
//                        rec_cp.name = rec_cp.name ? encodeURIComponent(rec_cp.name) : rec_cp.name
//                        return rec_cp
//                    })
//                    let cookieNav = self.state.nav.map(rec=>{
//                        let rec_cp = {...rec}
//                        rec_cp.link = false
//                        rec_cp.name = rec_cp.name ? encodeURIComponent(rec_cp.name) : rec_cp.name
//                        return rec_cp
//                    })
//                    cookie.set('appsStateData', JSON.stringify(cookieData))
//                    cookie.set('appsStateNav', JSON.stringify(cookieNav))
//                    let cookie_display = document.querySelector('.cookie_display')
//                    if (cookie_display){
//                        cookie_display.innerHTML = 'this.cookie.current.appsStateData\n <br>'
//                        cookie_display.innerHTML += cookie.get('appsStateData')
//                    }
//
//
//                })



        }
    },

     async _getData(app_id=1){
        // todo: It can be replaced by route rpc. Check how to tack effect of conditional view on snippet options.
        let apps = await rpc('/sd_apps/snippet/apps', {app_id: app_id})
        apps = JSON.parse(apps)
//        console.log('apps:', apps)
        return apps
    },
});

export default publicWidget.registry.SdAppsSnippet;
