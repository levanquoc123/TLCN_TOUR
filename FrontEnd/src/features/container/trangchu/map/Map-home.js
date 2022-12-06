import React, { Component } from 'react'
import { connect } from 'react-redux'
import './map.css'
export class Map_home extends Component {
    render() {
        return (
            <div id="map_home">
                <div id="map-container-google-1" className="z-depth-1-half map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1003449.685214484!2d106.13467939516357!3d10.755639046757906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zSOG7kyBDaMOtIE1pbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1670324180545!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Map_home)

