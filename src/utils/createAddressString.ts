interface AddressComponent {
    long_name: string;
    types: string[];
}

interface GeometryLocation {
    lat: () => number;
    lng: () => number;
}

interface Place {
    address_components?: AddressComponent[];
    geometry: {
        location: GeometryLocation;
    };
}


export const createAddressString = (place: google.maps.GeocoderAddressComponent[] ): {
    
        city: string | null,
        country: string | null,
        street: string | null,
        houseNumber: string | null,

} => {
    let city = null;
    let country = null;
    let street = null;
    let houseNumber = null;

    place?.forEach((component:google.maps.GeocoderAddressComponent) => {
        if (component.types.includes("locality")) {
            city = component.long_name;
        } else if (component.types.includes("country")) {
            country = component.long_name;
        } else if (component.types.includes("route")) {
            street = component.long_name;
        } else if (component.types.includes("street_number")) {
            houseNumber = component.long_name;
        }
    });

    return ({
        city,
        country,
        street,
        houseNumber,
    })
};