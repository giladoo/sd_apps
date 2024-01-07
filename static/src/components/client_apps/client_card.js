/** @odoo-module */
const { Component } = owl
import { useService } from "@web/core/utils/hooks"

export class ClientCard extends Component{
    setup(){
        this.orm = useService("orm")
    }
}
ClientCard.template = "sd_apps.client_card"