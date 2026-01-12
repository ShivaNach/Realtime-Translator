<script lang="ts">
  import { untrack } from "svelte";
  import { onMount, onDestroy } from "svelte";

  let transcript = $state("");
  let translatedTranscript = $state("");
  let translator: any = null;
  let ws: WebSocket;

  // --- WebSocket connection ---
  onMount(() => {
    ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => console.log("Connected to WS server");

    ws.onmessage = (event: MessageEvent<string>) => {
        const data = JSON.parse(event.data);

        if (data.type === "CLEAR") {
            transcript = "";
            translatedTranscript = "";
        }

        if (data.type === "TRANSCRIPT") {
            transcript = data.payload;
        }
    };

    ws.onerror = (event: Event) =>
      console.error("WS error:", event);

    ws.onclose = () => console.log("Disconnected from WS server");
  });

  onDestroy(() => {
    ws?.close();
  });

  // --- Translator setup ---
  onMount(async () => {
    if (!("Translator" in window)) {
      console.error("Translator API not available");
      return;
    }

    translator = await (window as any).Translator.create({
      sourceLanguage: "en",
      targetLanguage: "ta"
    });

    console.log("Translator ready");
  });

  function clearTranscript() {
        transcript = ""
        translatedTranscript = ""
        ws.send(JSON.stringify({
            type: "CLEAR"
        }));
    }
  // --- React to transcript changes ---
  $effect(() => {
    if (!transcript || !translator) return;

    untrack(() => {
      (async () => {
        try {
          translatedTranscript = await translator.translate(transcript);
        } catch (error) {
          console.error("Translation error:", error);
        }
      })();
    });
  });
</script>

<main class="w-full h-full text-white flex flex-col items-center p-8">
  <h1 class="text-4xl font-extrabold mb-6 drop-shadow-lg">
    Listener Page
  </h1>
  <button
      class="bg-green-700 hover:bg-green-500 text-white font-bold py-4 px-10 mb-10 rounded-2xl shadow-xl text-2xl transition"
      onclick={clearTranscript}
    >
      Clear Transcript
  </button>
  <div class="w-full max-w-4xl mx-auto">
    <h2 class="text-4xl font-semibold mb-4 drop-shadow-md text-center">
      Translation
    </h2>

    <textarea
      class="w-full p-4 rounded-2xl resize-none text-white text-2xl"
      rows="6"
      readonly
    >
{translatedTranscript}
    </textarea>
  </div>
</main>
