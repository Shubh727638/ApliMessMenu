import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Layout from '../components/Layout/Layout';
import PageHero from '../components/PageHero';
import { sendContact } from '../api';
import { CONTACT } from '../config';

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = ({ name, email, message }) => {
  const e = {};
  if (!name.trim()) e.name = 'Please enter your name';
  if (!EMAIL_RX.test(email.trim())) e.email = 'Please enter a valid email';
  if (message.trim().length < 10) e.message = 'Message should be at least 10 characters';
  return e;
};

const ContactItem = ({ icon, label, value, href }) => (
  <Stack direction="row" gap={2} alignItems="center">
    <Box sx={{ width: 44, height: 44, borderRadius: 3, bgcolor: 'rgba(232,87,42,.1)', color: 'primary.main', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
      {icon}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Link href={href} underline="hover" color="text.primary" sx={{ fontWeight: 600, wordBreak: 'break-word' }} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {value}
      </Link>
    </Box>
  </Stack>
);

const EMPTY = { name: '', email: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((x) => ({ ...x, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;
    setStatus('sending');
    try {
      await sendContact(form);
      setStatus('sent');
      setForm(EMPTY);
    } catch (err) {
      if (err.data?.errors) setErrors(err.data.errors);
      setStatus('error');
    }
  };

  return (
    <Layout title="Contact">
      <PageHero
        title="Get in touch"
        subtitle="Questions, feedback, or want to list your mess? We usually reply within a day."
      />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Contact information
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Reach us directly on any of these channels.
                </Typography>
                <Stack spacing={3}>
                  <ContactItem icon={<MailIcon />} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
                  <ContactItem icon={<CallIcon />} label="Phone" value={CONTACT.phone} href={CONTACT.phoneHref} />
                  <ContactItem icon={<WhatsAppIcon />} label="WhatsApp" value="Chat with us" href={CONTACT.whatsapp} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Send us a message
                </Typography>
                {status === 'sent' && (
                  <Alert severity="success" sx={{ my: 2 }} onClose={() => setStatus('idle')}>
                    Thanks! Your message has been sent. We'll get back to you soon.
                  </Alert>
                )}
                {status === 'error' && (
                  <Alert severity="error" sx={{ my: 2 }}>
                    Sorry, we couldn't send your message. Please try again or email us directly.
                  </Alert>
                )}
                <Box component="form" noValidate onSubmit={onSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField name="name" label="Your name" fullWidth value={form.name} onChange={onChange} error={!!errors.name} helperText={errors.name} autoComplete="name" required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField name="email" type="email" label="Email" fullWidth value={form.email} onChange={onChange} error={!!errors.email} helperText={errors.email} autoComplete="email" required />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField name="message" label="Message" fullWidth multiline minRows={5} value={form.message} onChange={onChange} error={!!errors.message} helperText={errors.message} required inputProps={{ maxLength: 2000 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" size="large" disabled={status === 'sending'} startIcon={status === 'sending' ? <CircularProgress size={18} color="inherit" /> : null}>
                        {status === 'sending' ? 'Sending…' : 'Send message'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Contact;
