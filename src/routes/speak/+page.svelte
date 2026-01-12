<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let isRecording = $state(false)
    let transcript = $state("")
    let nonInterimTranscript = $state("")

    let buttonText = $derived(isRecording ? "Pause Listening" : "Start Listening")

    let recognition: any = null
    let ws: WebSocket;

    onMount(() => {
        ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => console.log('Connected to WS server');
        ws.onclose = () => console.log('Disconnected from WS server');
        ws.onerror = (event: Event) => console.error('WS error:', event);
        ws.onmessage = (event: MessageEvent<string>) => {
        const data = JSON.parse(event.data);

        if (data.type === "CLEAR") {
            transcript = ""
            nonInterimTranscript = ""
        }
        };
    });

    // Cleanup WebSocket on unmount
    onDestroy(() => {
        if (ws) ws.close();
    });

    function sendTranscript() {
        if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
        type: "TRANSCRIPT",
        payload: transcript
    }));

        }
    }

    function clearTranscript() {
        transcript = ""
        nonInterimTranscript = ""
        ws.send(JSON.stringify({
            type: "CLEAR"
        }));
    }

    // ------------------------------------
    // Speech Recognition
    // ------------------------------------
    async function handleRecord() {
        const SpeechRec =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition

        if (!SpeechRec) {
            alert("Speech recognition not supported")
            return
        }

        if (!isRecording) {
            recognition = new SpeechRec()
            recognition.lang = "en-US"
            recognition.continuous = true
            recognition.interimResults = true

            recognition.onresult = (event: any) => {
                let interim = ""

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const result = event.results[i]
                    const text = result[0].transcript

                    if (result.isFinal) {
                        nonInterimTranscript += text + " "
                    } else {
                        interim += text
                    }
                }

                transcript = nonInterimTranscript + interim
                sendTranscript();
            }

            recognition.start()
        } else {
            recognition?.stop()
        }

        isRecording = !isRecording
    }
</script>

<main class="w-full h-full text-white flex flex-col items-center p-8">
  <h1 class="text-4xl font-extrabold mb-6 drop-shadow-lg">Speaker Page</h1>

  <div class="flex flex-col sm:flex-row gap-6 mb-8">
    <button
      class="{isRecording ? 'bg-green-700 animate-pulse' : 'bg-green-700'} hover:bg-green-500 text-white font-bold py-4 px-10 rounded-2xl shadow-xl text-2xl transition"
      onclick={handleRecord}
    >
      {buttonText} 
    </button>

    <button
      class="bg-green-700 hover:bg-green-500 text-white font-bold py-4 px-10 rounded-2xl shadow-xl text-2xl transition"
      onclick={clearTranscript}
    >
      Clear Transcript
    </button>
  </div>

  <div class="w-full max-w-4xl mb-6 mx-auto">
  <h2 class="text-4xl font-semibold mb-4 drop-shadow-md text-center">Transcript</h2>
  <textarea
    class="w-full p-4 rounded-2xl resize-none text-white text-2xl"
    rows="6"
    readonly
  >{transcript}</textarea>
</div>
</main>

