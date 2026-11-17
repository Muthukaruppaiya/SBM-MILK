import { useState, type FormEvent } from 'react'

export function ContactPage() {
  const [sent, setSent] = useState(false)

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <main className="page">
      <div className="container">
        <p className="eyebrow">Contact</p>
        <h1 className="section-title">Talk to the farm</h1>
        <p className="section-copy">
          Wholesale, home delivery, or product questions — send a note. Backend email routing comes
          next.
        </p>

        <div className="contact-card" style={{ marginTop: '2rem' }}>
          <form className="contact-form" onSubmit={onSubmit}>
            <label>
              Name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Phone / WhatsApp
              <input name="phone" required placeholder="+91 ..." />
            </label>
            <label>
              Message
              <textarea name="message" required placeholder="How can we help?" />
            </label>
            <button type="submit" className="btn btn-primary">
              Send message
            </button>
            {sent ? <p className="summary-note">Message saved in wireframe mode.</p> : null}
          </form>

          <aside className="contact-aside">
            <h3>Reach us</h3>
            <p className="section-copy">
              Cold-chain delivery for milk and 0° fruits. Local routes first; expand with backend
              logistics later.
            </p>
            <p>
              <strong>Email</strong>
              <br />
              hello@sbmdonkeyfarm.local
            </p>
            <p>
              <strong>WhatsApp desk</strong>
              <br />
              +91 90000 00000
            </p>
          </aside>
        </div>
      </div>
    </main>
  )
}
