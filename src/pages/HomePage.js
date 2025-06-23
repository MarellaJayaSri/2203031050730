import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import UrlForm from "../Components/UrlForm";
import UrlList from "../Components/UrlList";
import { logEvent } from "../utils/logger";

export default function HomePage() {
  const [shortenedUrls, setShortenedUrls] = useState(() => {
    // Load existing URLs from localStorage
    return JSON.parse(localStorage.getItem("urls")) || [];
  });

  const handleShorten = (urlInputs) => {
    const now = Date.now();

    const newUrls = urlInputs.map((input) => {
      const expiryTime = now + input.validity * 60 * 1000;

      return {
        ...input,
        createdAt: new Date(now).toISOString(),
        expiryTime: new Date(expiryTime).toISOString(),
        clicks: 0,
        clickLog: [],
      };
    });

    const allUrls = [...shortenedUrls, ...newUrls];
    localStorage.setItem("urls", JSON.stringify(allUrls));
    setShortenedUrls(allUrls);

    logEvent("Shortened new URLs", { urls: newUrls });
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center">
        🔗 URL Shortener
      </Typography>

      <Box sx={{ my: 4 }}>
        <UrlForm onShorten={handleShorten} />
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5">Shortened URLs:</Typography>
        <UrlList list={shortenedUrls} />
      </Box>
    </Container>
  );
}