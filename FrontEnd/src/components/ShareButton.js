import React, { useState } from 'react';
import { Button, IconButton, Snackbar, Tooltip } from '@mui/material';
import ShareIcon from '@mui/icons-material/IosShare';

const legacyCopy = (text) => {
  const el = document.createElement('textarea');
  el.value = text;
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(el);
  }
};

// Uses the native share sheet on mobile; falls back to copying the link.
const ShareButton = ({ title, text, url, variant = 'button', label = 'Share', ...props }) => {
  const [snack, setSnack] = useState(false);

  const handleShare = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const link = url || window.location.href;
    const data = { title, text, url: link };

    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (err) {
        if (err?.name === 'AbortError') return; // user dismissed the sheet
      }
    }
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      legacyCopy(link);
    }
    setSnack(true);
  };

  const control =
    variant === 'icon' ? (
      <Tooltip title="Share">
        <IconButton onClick={handleShare} aria-label={`Share ${title || 'this page'}`} {...props}>
          <ShareIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <Button onClick={handleShare} startIcon={<ShareIcon />} {...props}>
        {label}
      </Button>
    );

  return (
    <>
      {control}
      <Snackbar
        open={snack}
        autoHideDuration={2500}
        onClose={() => setSnack(false)}
        message="Link copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default ShareButton;
