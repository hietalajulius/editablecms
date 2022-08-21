// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: req.body.text,
      temperature: 0,
      max_tokens: 50,
    });

    const responseBody = { text: response.data.choices[0].text };
    res.status(200).json(responseBody);
  } else {
    res.status(200).json({ name: "John Doe" });
  }
}
