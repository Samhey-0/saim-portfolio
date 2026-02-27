/**
 * contact-emailjs.js
 * Wires up the contact form to send real emails via EmailJS
 *
 * SETUP STEPS (free — takes 5 minutes):
 * 1. Go to https://www.emailjs.com and create a free account
 * 2. Add a Service: Connect your Gmail (saim6624227@gmail.com)
 *    → Copy the Service ID → paste below as EMAILJS_SERVICE_ID
 * 3. Create an Email Template with these variables:
 *      {{from_name}}  {{from_email}}  {{subject}}  {{message}}
 *    → Copy the Template ID → paste below as EMAILJS_TEMPLATE_ID
 * 4. Go to Account → API Keys → copy Public Key
 *    → paste below as EMAILJS_PUBLIC_KEY
 */

const EMAILJS_SERVICE_ID  = 'service_xkwa8qb';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_pyce5md';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'KBCq901zHIHmADlz0';   // e.g. 'user_AbCdEf123'

document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const form    = document.getElementById('contact-form');
    const toast   = document.getElementById('toast');
    const submitBtn = form?.querySelector('.btn-submit');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm(form)) return;

        submitBtn.classList.add('loading');

        // Template parameters — must match your EmailJS template variables
        const templateParams = {
            from_name:  form.name.value.trim(),
            from_email: form.email.value.trim(),
            subject:    form.subject.value.trim(),
            message:    form.message.value.trim(),
            to_email:   'saim6624227@gmail.com',
        };

        try {
            if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
                // Real send via EmailJS
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
            } else {
                // Fallback: open default mail client if EmailJS not configured yet
                const mailtoLink = `mailto:saim6624227@gmail.com`
                    + `?subject=${encodeURIComponent(templateParams.subject)}`
                    + `&body=${encodeURIComponent(
                        `Name: ${templateParams.from_name}\nEmail: ${templateParams.from_email}\n\n${templateParams.message}`
                    )}`;
                window.location.href = mailtoLink;
            }

            showToast('success', 'Message sent! I\'ll get back to you soon.');
            form.reset();

        } catch (err) {
            console.error('EmailJS error:', err);
            showToast('error', 'Failed to send. Please email me directly.');
        } finally {
            submitBtn.classList.remove('loading');
        }
    });

    // ── Validation ─────────────────────────
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            input.closest('.form-group')?.classList.remove('error');
        });
    });

    function validateForm(form) {
        let valid = true;
        form.querySelectorAll('input, textarea').forEach(input => {
            if (!validateField(input)) valid = false;
        });
        return valid;
    }

    function validateField(input) {
        const group = input.closest('.form-group');
        const error = group?.querySelector('.form-error');
        let msg = '';

        if (input.hasAttribute('required') && !input.value.trim()) {
            msg = 'This field is required';
        } else if (input.type === 'email' && input.value) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                msg = 'Please enter a valid email address';
            }
        } else if (input.name === 'message' && input.value.trim().length < 10) {
            msg = 'Message must be at least 10 characters';
        }

        if (group) group.classList.toggle('error', !!msg);
        if (error) error.textContent = msg;
        return !msg;
    }

    // ── Toast ───────────────────────────────
    function showToast(type, message) {
        if (!toast) return;
        const icon  = toast.querySelector('.toast-icon i');
        const title = toast.querySelector('.toast-title');
        const msg   = toast.querySelector('.toast-message');

        icon?.classList.toggle('fa-check-circle', type === 'success');
        icon?.classList.toggle('fa-times-circle', type === 'error');
        toast.querySelector('.toast-icon').style.color = type === 'success' ? '#22C55E' : '#EF4444';
        title.textContent = type === 'success' ? 'Message Sent!' : 'Error';
        msg.textContent = message;

        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
    }

    toast?.querySelector('.toast-close')?.addEventListener('click', () => {
        toast.classList.remove('show');
    });
});