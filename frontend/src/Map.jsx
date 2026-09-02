import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapPage() {
  // India center
  const indiaCenter = [20.5937, 78.9629];

  return (
    <div style={{ padding: "30px" }}>
      <h1>🗺️ Blue Carbon Project Map</h1>

      <MapContainer
        center={indiaCenter}
        zoom={5}
        minZoom={4}
        style={{
          height: "500px",
          width: "100%"
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Example project marker */}
        <Marker position={[11.0168, 76.9558]}>
          <Popup>
            <b>Mangrove Restoration Project</b>
            <br />
            Location: Tamil Nadu
            <br />
            Area: 100 hectares
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapPage;