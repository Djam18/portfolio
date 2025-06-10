import sgMail from '@sendgrid/mail'

export default defineEventHandler(async (event) => {
  try {
    // Vérifier que c'est une requête POST
    if (getMethod(event) !== 'POST') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method not allowed'
      })
    }

    // Récupérer les données du formulaire
    const body = await readBody(event)
    const { name, email, subject, message } = body

    // Validation basique
    if (!name || !email || !subject || !message) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tous les champs sont requis'
      })
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email invalide'
      })
    }

    // Récupérer la config SendGrid
    const config = useRuntimeConfig()
    sgMail.setApiKey(config.sendgridApiKey)

    // Template de l'email
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nouveau message depuis votre portfolio</title>
        </head>
        <body>
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h2>Nouveau message depuis votre portfolio</h2>
            <div style="background: #f5f5f5; padding: 20px; margin: 10px 0;">
              <p><strong>Nom:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Sujet:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Préparer les données pour SendGrid
    const msg = {
      to: config.sendgridTo,
      from: config.sendgridFrom,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: htmlTemplate,
      text: `
        Nouveau message depuis votre portfolio\n\n        Nom: ${name}\n        Email: ${email}\n        Sujet: ${subject}\n\n        Message:\n        ${message}\n      `
    }

    // Envoyer l'email via SendGrid
    await sgMail.send(msg)

    // Réponse de succès
    return {
      success: true,
      message: 'Email envoyé avec succès'
    }

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)

    // Typage correct de l'erreur
    const err = error as any

    // Autres erreurs
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'Erreur interne du serveur'
    })
  }
})