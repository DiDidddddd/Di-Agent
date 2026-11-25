import "dotenv/config";
import { streamMessage } from "../services/api/streaming.js";

const gen = streamMessage({
  messages: [{ role: "user", content: "用一句话解释什么是 Agentic Loop" }],
  system: "You are a helpful assistant. Reply in Chinese.",
});

let result;
while (true) {
  const { value, done } = await gen.next();
  if (done) {
    result = value;
    break;
  }

  if (value.type !== "text") {
    console.log("\n[event]", value.type);
  }

  switch (value.type) {
    case "text":
      process.stdout.write(value.text); // 逐字输出到终端
      break;
    case "message_done":
      console.log(
        `\nTokens: ${value.usage.input_tokens} in / ${value.usage.output_tokens} out`,
      );

      break;
  }
}
