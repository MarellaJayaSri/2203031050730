import { Box, Typography } from "@mui/material";

export default function UrlList({ list }) {
  return (
    <Box>
      {list.map((item, i) => (
        <Box key={i}>
          <Typography><strong>{item.shortcode}</strong> ➝ {item.longUrl}</Typography>
          <Typography>Valid for {item.validity} minutes</Typography>
        </Box>
      ))}
    </Box>
  );
}