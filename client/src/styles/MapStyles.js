// styling for <GoogleMap />
export default {
    THE_MAP_STYLES :
    [
        // removes google maps default markers and info windows
        { elementType: "labels", featureType: "poi", stylers: [{ visibility: "off", }] },

        // adds purple customized styling to the map
        { featureType: "all", elementType: "geometry", stylers: [{ color: "#636ce5" }] },
        { featureType: "all", elementType: "labels.text.fill", stylers: [{ gamma: 0.01 }, { lightness: 20 }] },
        { featureType: "all", elementType: "labels.text.stroke", stylers: [{ saturation: -31 }, { lightness: -33 }, { weight: 2 }, { gamma: 0.8 }] },
        { featureType: "all", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        { featureType: "landscape", elementType: "geometry", stylers: [{ lightness: 30 }, { saturation: 30 }] },
        { featureType: "landscape.natural.landcover", elementType: "geometry.fill", stylers: [{ visibility: "on" }, { hue: "#0700ff" }, { saturation: "100" }, { lightness: "37" }] },
        { featureType: "poi", elementType: "geometry", stylers: [{ saturation: 20 }] },
        { featureType: "poi.park", elementType: "geometry", stylers: [{ lightness: 20 }, { saturation: -20 }] },
        { featureType: "road", elementType: "geometry", stylers: [{ lightness: 10 }, { saturation: -30 }] },
        { featureType: "road", elementType: "geometry.stroke", stylers: [{ saturation: 25 }, { lightness: 25 }] },
        { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ hue: "#3600ff" }, { saturation: "71" }, { lightness: "17" }] },
        { featureType: "road.arterial", elementType: "geometry.fill", stylers: [{ hue: "#006dff" }, { saturation: "5" }, { lightness: "-1" }] },
        { featureType: "road.local", elementType: "geometry.fill", stylers: [{ hue: "#0031ff" }, { lightness: "17" }, { saturation: "-11" }] },
        { featureType: "water", elementType: "all", stylers: [{ lightness: -20 }], }
    ]
}