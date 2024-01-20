import { Configuration, OpenAIApi } from "openai-edge";
import { StreamingTextResponse, OpenAIStream } from "ai";

export const runtime = "edge";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export const POST = async(request : Request) => {
    const { image } =  await request.json();

    const response = await openai.createChatCompletion({
      model: "gpt-4-vision-preview",
      stream: true,
      max_tokens: 400,
      messages: [
        {
          role: "user",
          //@ts-ignore
          content: [
            {
              type: "text",
              text: "Analyse the design of this webpage in 300 words or less. Suggest improvements in colour, design, layout etc.",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
                details: "low"
              }
            },
          ],
        },
      ],
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
}