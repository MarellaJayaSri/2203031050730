import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function StatsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("urls") || "[]");
    setUrls(data);
  }, []);

  return (
    <Box>
      <Typography variant="h4">URL Stats</Typography>
      {urls.map((u, i) => (
        <Box key={i} sx={{ my: 2 }}>
          <Typography><strong>{u.shortcode}</strong>: {u.longUrl}</Typography>
          <Typography>Created: {u.createdAt}</Typography>
          <Typography>Expires in: {u.validity} mins</Typography>
        </Box>
      ))}
    </Box>
  );
}