export default async function handler(req, res) {
  const { email, download } = req.query;

  try {

    // DOWNLOAD ATTACHMENT
    if(download){
      const response = await fetch(
        `https://api.temp-mail.io/v1/attachments/${download}`,
        {
          headers:{
            "X-API-Key": process.env.TEMPMAIL_API_KEY
          }
        }
      );

      const buffer = await response.arrayBuffer();
      res.setHeader("Content-Type", response.headers.get("content-type"));
      return res.status(200).send(Buffer.from(buffer));
    }

    // GET MESSAGES
    if(email){
      const response = await fetch(
        `https://api.temp-mail.io/v1/emails/${email}/messages`,
        {
          headers:{
            "X-API-Key": process.env.TEMPMAIL_API_KEY
          }
        }
      );

      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(400).json({ error:"Missing parameters" });

  } catch (err) {
    return res.status(500).json({ error:"Server error" });
  }
}