import nodemailer from 'nodemailer'

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

    // Configuration runtime
    const config = useRuntimeConfig()

    // Configuration du transporteur email (createTransport, pas createTransporter)
    const transporter = nodemailer.createTransport({
      host: config.emailHost,
      port: parseInt(config.emailPort),
      secure: false, // true pour 465, false pour les autres ports
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
    })

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

    // Options de l'email
    const mailOptions = {
      from: `"${name}" <${config.emailUser}>`,
      to: config.emailTo,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: htmlTemplate,
      text: `
        Nouveau message depuis votre portfolio

        Nom: ${name}
        Email: ${email}
        Sujet: ${subject}

        Message:
        ${message}
      `
    }

    // Envoyer l'email
    await transporter.sendMail(mailOptions)

    // Réponse de succès
    return {
      success: true,
      message: 'Email envoyé avec succès'
    }

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)

    // Typage correct de l'erreur
    const err = error as any

    // Gérer les erreurs Nodemailer
    if (err.code === 'EAUTH') {
      throw createError({
        statusCode: 500,
        statusMessage: 'Erreur d\'authentification email'
      })
    }

    if (err.code === 'ECONNECTION') {
      throw createError({
        statusCode: 500,
        statusMessage: 'Erreur de connexion au serveur email'
      })
    }

    // Autres erreurs
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'Erreur interne du serveur'
    })
  }
})