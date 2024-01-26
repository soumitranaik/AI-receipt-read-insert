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
              text: `Extract item, quantity, and price from the receipt and return in this json array format: [{"Item": "Shirt and jeans", "Quantity": 1, "Price": 800.00}, {"Item": "Shirt and jeans 3", "Quantity": 13, "Price": 8300.00}]. Please don't add any text like json or quotes before and after the array []`,
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