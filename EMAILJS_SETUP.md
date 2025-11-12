# EmailJS Setup Guide

EmailJS allows you to send emails directly from the client-side without needing a backend server. It's perfect for contact forms!

## Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" (it's free for up to 200 emails/month)
3. Verify your email address

### Step 2: Add Email Service

1. Go to [Email Services](https://dashboard.emailjs.com/admin)
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Click "Connect Account" and authorize EmailJS
5. Copy your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to [Email Templates](https://dashboard.emailjs.com/admin/templates)
2. Click "Create New Template"
3. Use this template content:

**Subject:**
```
Contact Form: {{subject}} - {{from_name}}
```

**Body (HTML):**
```html
<h2>New Contact Form Submission</h2>

<p><strong>Subject:</strong> {{subject}}</p>

<h3>Contact Details:</h3>
<ul>
  <li><strong>Name:</strong> {{from_name}}</li>
  <li><strong>Email:</strong> {{from_email}}</li>
  <li><strong>Company:</strong> {{company}}</li>
  <li><strong>Phone:</strong> {{phone}}</li>
</ul>

<h3>Message:</h3>
<p>{{message}}</p>

<hr>
<p style="color: #666; font-size: 12px;">This email was sent from the BFSI Campaign Generator contact form.</p>
```

4. In **Settings**:
   - **To Email:** `chithu@newgendigital.com`
   - Leave other settings as default
5. Click "Save"
6. Copy your **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key

1. Go to [Account](https://dashboard.emailjs.com/admin/account)
2. Find your **Public Key** (e.g., `Abc123xyz_4567890`)
3. Copy it

### Step 5: Update Environment Variables

Update your `.env.local` file:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=Abc123xyz_4567890
```

### Step 6: Test the Contact Form

1. Restart your dev server: `pnpm dev`
2. Go to http://localhost:3002/contact
3. Fill out and submit the form
4. Check chithu@newgendigital.com for the email!

## Template Variables

The following variables are sent from the form:

- `{{from_name}}` - User's full name
- `{{from_email}}` - User's email address
- `{{company}}` - Company name (or "Not provided")
- `{{phone}}` - Phone number (or "Not provided")
- `{{subject}}` - Email subject (General Inquiry, Sales & Pricing, etc.)
- `{{message}}` - The message text
- `{{to_email}}` - Recipient email (chithu@newgendigital.com)

## Free Tier Limits

- **200 emails per month** (free)
- Upgrade to $7/month for 1,000 emails
- Upgrade to $15/month for 10,000 emails

## Production Deployment

For Vercel deployment:

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add the three EmailJS variables:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
4. Redeploy

## Troubleshooting

### "Failed to send message"
- Check that all three environment variables are set correctly
- Verify your EmailJS service is connected and active
- Check the browser console for detailed error messages

### Email not received
- Check spam/junk folder
- Verify the "To Email" in the template is correct
- Check EmailJS dashboard for send history and errors

### Rate limit exceeded
- Free tier is 200 emails/month
- Upgrade your EmailJS plan if needed
- Check for test submissions counting against limit

## Security

EmailJS is safe to use because:
- Public Key is safe to expose (it's meant to be public)
- No sensitive credentials in client-side code
- EmailJS handles all email authentication server-side
- Rate limiting prevents abuse

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Dashboard: https://dashboard.emailjs.com/
- Support: support@emailjs.com
