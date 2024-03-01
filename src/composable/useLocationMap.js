import { ref } from 'vue'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

const useLocationMap = () => {
  const zoom = ref(17)  
  const center = ref([-12.0431800, -77.0282400])
  const lastName = ref('')
  const lat = ref('')
  const lon = ref('')

  /* const pin = e => {
    const marker = e.target.getLatLng()
    center.value = [marker.lat, marker.lng]
  } */
  
  const marker = async e => {
    if (e.target.value.length > 8) {
      const provider = new OpenStreetMapProvider()
      const results = await provider.search({ query: e.target.value })
      if (results.length > 0) {
        center.value = results[0].bounds[0]
        lastName.value = results[0].raw.display_name
        lat.value = results[0].raw.lat
        lon.value = results[0].raw.lon
      }
    }
  }

  return {
    zoom,
    center,
    marker,
    lastName,
    lat,
    lon
  }
}

export default useLocationMap