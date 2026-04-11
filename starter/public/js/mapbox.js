// import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';
export const displayMap=(locations)=>{

  console.log('displayMap called with locations:', locations);
document.addEventListener('DOMContentLoaded', () => {
  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json',
  });

  map.scrollZoom.disable(); // Disable scroll zoom


  const bounds = new maplibregl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    const marker = new maplibregl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    const popup = new maplibregl.Popup({ offset: 30 })
      .setHTML(`<p>${loc.day}: ${loc.description}</p>`);

    marker.setPopup(popup); // show on click

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
});
};
