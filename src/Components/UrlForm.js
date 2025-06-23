import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { logEvent } from "../utils/logger";

export default function UrlForm({ onShorten }) {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleAdd = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = () => {
    const validated = urls.map((url) => {
      if (!url.longUrl.startsWith("http")) {
        logEvent("Invalid URL", { url });
        alert("URL must start with http or https");
        return null;
      }
      return {
        ...url,
        validity: url.validity ? parseInt(url.validity) : 30,
        shortcode: url.shortcode || Math.random().toString(36).substring(2, 7)
      };
    });

    if (validated.every((v) => v)) {
      onShorten(validated);
      logEvent("URLs shortened", { urls: validated });
    }
  };

  return (
    <Box>
      {urls.map((url, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <TextField label="Long URL" value={url.longUrl} onChange={(e) => handleChange(i, "longUrl", e.target.value)} fullWidth />
          <TextField label="Validity (mins)" value={url.validity} onChange={(e) => handleChange(i, "validity", e.target.value)} />
          <TextField label="Custom Shortcode" value={url.shortcode} onChange={(e) => handleChange(i, "shortcode", e.target.value)} />
        </Box>
      ))}
      <Button onClick={handleAdd} disabled={urls.length >= 5}>Add Another</Button>
      <Button variant="contained" onClick={handleSubmit}>Shorten URLs</Button>
    </Box>
  );
}