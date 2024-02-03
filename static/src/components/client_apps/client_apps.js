/** @odoo-module */
import { registry } from "@web/core/registry"
//import { ORM } from "../../core/orm_service";
import { ClientCard } from "./client_card"
import { ClientNav } from "./client_nav"
import { useService } from "@web/core/utils/hooks"
//import { session } from "@web/session";
import session from 'web.session';

const { Component,  } = owl
const { xml } = owl.tags
const { useState, onMounted, onWillStart,  onWillUnmount } = owl.hooks;

export class ClientApps extends Component{
    setup(){
        let self = this;
        this.orm = useService("orm")
        this.router = useService("router")
        this.cookie = useService("cookie")
        this.rpc = useService("rpc")

        this.state = useState({
            data: [],
            nav: []
        })
        onMounted(()=>{
            self.el.parentElement.style.overflowY = 'scroll'
        })
        onWillStart(async ()=>{

//            console.log('on will start: A', )
//            this.rpc('/web/session/get_session_info').then(function (session) {
//            console.log('on will start: A1', session)
//            })
            if (this.cookie.current.appsStateData ){
                try{
                    this.state.data = JSON.parse(this.cookie.current.appsStateData)
                    this.state.nav = JSON.parse(this.cookie.current.appsStateNav)
//                                console.log('on will start: AA', this.state.data)

                    this.state.data.map(rec=>{
                        rec.link = rec.link ? decodeURIComponent(rec.link) : rec.link
                        rec.name = rec.name ? decodeURIComponent(rec.name) : rec.name
                        return decodeURIComponent(rec)
                    })
                    this.state.nav.map(rec=>{
                        rec.link = rec.link ? decodeURIComponent(rec.link) : rec.link
                        rec.name = rec.name ? decodeURIComponent(rec.name) : rec.name
                        return decodeURIComponent(rec)
                    })
                }catch (error) {
//                    console.log('on will start B: error:', error)
                    await this.onClickCard('home', {id: 1})
                }
            }else{
                await this.onClickCard('home', {id: 1})
            }

        })
        this.onClick = this.onClickCard.bind(this);
    }
    async onClickCard(direction, card,){
//        console.log('onClickCard: A',  direction, card.id)


        let self = this;
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
//                console.log('target:', card.target, card.link)

            window.open(decodeURIComponent(card.link), card.target);
        }else{
            if ( direction == 'home' ){
                domain =  [['parent_id', '=', 1]]
                parent_id = 1
                this.state.nav = []
            }else if ( direction ==  'down' ){
                domain =  [['parent_id', '=', card.id]]
                parent_id = card.id
                this.state.nav.push(card)
            }else if (direction == 'up'){
                domain =  [['parent_id', '=', card.id]]
                parent_id = card.id

                let i = 0
                while (i < 6) {
                    if(this.state.nav.slice(-1)[0].id != card.id){
                       this.state.nav.pop()
                    }
                    i++;
                }
            }
//            domain.push()
//            console.log('onClickCard data:', JSON.parse(data_list))
//            data = await this.orm.searchRead("sd_apps.settings", domain, fields)
//            this.state.data = data
            await this.orm.call("sd_apps.settings", 'get_apps', domain, {'parent_id': parent_id})
                .then( data_list =>{
                    self.state.data = JSON.parse(data_list)
                    let cookieData = this.state.data.map(rec=>{
                        let rec_cp = {...rec}
                        rec_cp.link = rec_cp.link ? encodeURIComponent(rec_cp.link) : rec_cp.link
                        rec_cp.name = rec_cp.name ? encodeURIComponent(rec_cp.name) : rec_cp.name
                        return rec_cp
                    })
                    let cookieNav = self.state.nav.map(rec=>{
                        let rec_cp = {...rec}
                        rec_cp.link = false
                        rec_cp.name = rec_cp.name ? encodeURIComponent(rec_cp.name) : rec_cp.name
                        return rec_cp
                    })
                    self.cookie.setCookie('appsStateData', JSON.stringify(cookieData))
                    self.cookie.setCookie('appsStateNav', JSON.stringify(cookieNav))
                    let cookie_display = document.querySelector('.cookie_display')
                    if (cookie_display){
                        cookie_display.innerHTML = 'this.cookie.current.appsStateData\n <br>'
                        cookie_display.innerHTML += self.cookie.current.appsStateData
                    }


                })



        }
    }
}

//ClientApps.template = xml`<div class="h1 text-center">ClientApps</div>`
ClientApps.template = "sd_apps.client_apps"
ClientApps.components = { ClientCard, ClientNav }

registry.category('actions').add('sd_apps.client_apps', ClientApps)
