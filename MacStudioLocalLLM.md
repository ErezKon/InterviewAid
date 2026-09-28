# Local Coding LLMs on a Mac Studio (M5 Max 128 GB / M5 Ultra 256 GB): The Complete Guide

> **Research snapshot: 28 September 2026.** The M5-generation Mac Studio started shipping on
> 22 September 2026, and the local-LLM ecosystem changes weekly. New models appear, runtimes add
> support for new architectures, and IDE settings move around. Every file size, speed and version
> below comes from a source listed in [Appendix C](#appendix-c-sources). Check versions again
> before you buy anything or paste commands.
>
> **Legend used throughout:** ✅ works / supported · ⚠️ works with caveats · ❌ not supported ·
> ⏳ support in progress · *est.* = estimate (not a measurement).

---

## Table of contents

1. [TL;DR](#1-tldr)
2. [Hardware: what you are buying and why it matters](#2-hardware-what-you-are-buying-and-why-it-matters)
3. [The models (September 2026)](#3-the-models-september-2026)
4. [Inference runtimes (the "server" layer)](#4-inference-runtimes-the-server-layer)
5. [Step-by-step setup](#5-step-by-step-setup)
6. [Connecting IDEs, editors and coding agents](#6-connecting-ides-editors-and-coding-agents)
7. [Remote access](#7-remote-access)
8. [Operations and maintenance](#8-operations-and-maintenance)
9. [Scaling beyond one Mac](#9-scaling-beyond-one-mac)
10. [Troubleshooting](#10-troubleshooting)
11. [Realistic expectations and a hybrid strategy](#11-realistic-expectations-and-a-hybrid-strategy)
- [Appendix A: Ports, endpoints and config file locations](#appendix-a-ports-endpoints-and-config-file-locations)
- [Appendix B: Glossary](#appendix-b-glossary)
- [Appendix C: Sources](#appendix-c-sources)

---

## 1. TL;DR

### Which Mac?

| You want | Buy | Memory bandwidth | Approx. US price (Sep 2026, 1 TB) |
|---|---|---|---|
| **128 GB** | **Mac Studio M5 Max**, 18-core CPU / **40-core GPU** (128 GB requires the 40-core GPU) | 614 GB/s | ≈ $5,399 |
| **256 GB** | **Mac Studio M5 Ultra** (30-core CPU/64-core GPU or 36/80) | 1.2 TB/s | ≈ $9,499 |

- 128 GB exists **only** on the M5 Max and 256 GB **only** on the M5 Ultra. The Ultra has twice the
  bandwidth and GPU, which means roughly 2× faster generation and prompt processing.
- **Avoid the 96 GB Ultra for LLM work.** It costs about the same as the 128 GB Max but has
  32 GB less memory. Memory decides whether a model loads at all.
- **Storage: 2 TB minimum, 4 TB recommended.** Flash-class models are 80–340 GB *each*, and some of
  the newest models stream parts of themselves from the SSD while running.

### What to run (late September 2026)

| Goal | 128 GB M5 Max | 256 GB M5 Ultra |
|---|---|---|
| **Easy daily driver** (leaves RAM for IDE, Docker, browser) | **Qwen3.8-27B** (8-bit MLX, ~29 GB) or **Qwen3.6-27B "coding"** (Ollama, 31 GB) | Qwen3.8-27B at 8-bit/BF16 as a fast helper or subagent model |
| **Best quality you can realistically run** | **Qwen3.8-Flash-Next** (125B MoE, 84–100 GiB) *or* **DeepSeek-V4-Flash-0731** (Q2, ~81 GiB): one at a time, with the GPU memory cap raised | **Qwen3.8-Flash-Next at 5-bit** (fully in RAM) as the daily driver, plus **GLM-5.3-Flash Q4** (178 GiB) or **DeepSeek-V4-Flash Q4/MXFP4** for heavy agentic work |
| **Bleeding edge** | none | **DeepSeek-V4.1-Flash** (552B, released 10 Sep 2026) at Q2 via the `ds4` engine |
| **Autocomplete (FIM) next to it** | Qwen2.5-Coder 1.5B/7B (1–8 GB) | Same, or Qwen3-Coder-30B-A3B |

### How to serve them

**Ollama** is the easiest start (MLX engine on Apple Silicon). **LM Studio** gives you a GUI, a
headless daemon and remote "LM Link". **llama.cpp** gets new architectures first (GGUF). The MLX
servers **oMLX / mlx-serve** are the fastest on Apple Silicon, with speculative decoding and SSD
prompt caches. **ds4 (DwarfStar)** is a purpose-built engine for DeepSeek V4/V4.1 and GLM-5.3.

### How to connect IDEs and agents

Every runtime exposes an **OpenAI-compatible API**, and most also expose **Anthropic Messages** and
**OpenAI Responses**. These all work with local models:

- VS Code + GitHub Copilot Chat (BYOK, through the Ollama extension or "Custom Endpoint")
- Cline and Kilo Code
- Zed
- JetBrains AI Assistant and Junie
- Xcode
- Claude Code, Codex CLI, OpenCode and GitHub Copilot CLI

Two exceptions:

- **Devin Desktop (formerly Windsurf):** the built-in agents are cloud-only. Run a local model through
  an **ACP agent** such as OpenCode.
- **Cursor:** only through a *public HTTPS tunnel*, chat and agent only, and every request still passes
  through Cursor's servers.

### Remote access

**Yes.** Recommended setup: **Tailscale** (private WireGuard mesh, with `tailscale serve` for HTTPS)
plus an API key on the server. LM Studio users can use **LM Link**, which is built on Tailscale. SSH
tunnels work anywhere. Never expose raw model ports to the internet.

### The short opinionated answer

- **128 GB:** Use Ollama with `qwen3.8:27b-mlx` for everyday agent work (Claude Code, OpenCode,
  VS Code). When you want maximum quality, stop it and run **Qwen3.8-Flash-Next** with
  **mlx-serve** (fastest) or **llama.cpp** (mainline). For remote use, add Tailscale and an API key.
- **256 GB:** Keep **Qwen3.8-Flash-Next 5-bit** loaded in oMLX or LM Studio, with **Qwen3.8-27B** as a
  fast subagent model. Swap in **GLM-5.3-Flash Q4** via ds4 for hard agentic tasks. Try
  **DeepSeek-V4.1-Flash** when you want the frontier of what runs at home. Use Tailscale Serve for
  remote access.

---

## 2. Hardware: what you are buying and why it matters

### 2.1 The two configurations

| | Mac Studio **M5 Max, 128 GB** | Mac Studio **M5 Ultra, 256 GB** |
|---|---|---|
| CPU | 18-core (6 "super" + 12 performance) | 30-core (10+20) or 36-core (12+24) |
| GPU | **40-core**, with Neural Accelerators in every core | 64-core or 80-core, with Neural Accelerators |
| Memory bandwidth | **614 GB/s** (the 32-core GPU version: 460 GB/s, max 36 GB) | **1.2 TB/s** (both GPU variants) |
| Memory options | 36 / 48 / 64 / **128 GB** (48 GB and up need the 40-core GPU) | 96 / **256** / 512 GB (512 GB only on 36/80, ships late Oct 2026) |
| Storage | 512 GB – 8 TB | 1 TB – 16 TB |
| Ports | 4× Thunderbolt 5 (rear), 2× USB-C 10 Gb/s (front), 10 GbE, HDMI 2.1, 2× USB-A | 6× Thunderbolt 5 (4 rear + 2 front), 10 GbE, HDMI 2.1, 2× USB-A |
| Wireless | Wi-Fi 7, Bluetooth 6 | Wi-Fi 7, Bluetooth 6 |
| Max continuous power | 480 W | 480 W |

Worth knowing:

- The M5 Ultra is **two dual-die M5 Max chips joined by UltraFusion**, a quad-die design.
- **Neural Accelerators.** Every M5 GPU core has dedicated matrix hardware. Apple says matrix
  multiplication is about 4× faster than on M4, and MLX uses it automatically.
- **Apple's LLM claims are about prefill.** "Up to 3.9× faster LLM prompt processing than M4 Max"
  and "4× vs M3 Ultra" are prompt-processing (time-to-first-token) numbers, measured on an
  8K-token prompt with a 14B 4-bit model in LM Studio. They are not generation speed.
- **Independent early measurements.** MacStories saw the M5 Ultra process prompts about 2.5× faster
  than the M3 Ultra and generate about 70% faster. BGR found the M5 Max performs roughly like last
  year's M3 Ultra.

### 2.2 What actually determines LLM performance on a Mac

| Resource | Governs | Rule of thumb |
|---|---|---|
| **Unified memory capacity** | Whether a model plus its context fits at all | weights ≈ params × bits ÷ 8, plus 5–10% |
| **Memory bandwidth** | **Decode**: tokens/s while the model writes | tok/s ≈ (0.6–0.9 × bandwidth) ÷ bytes read per token |
| **GPU cores + Neural Accelerators** | **Prefill**: reading the prompt, files and tool output (time-to-first-token) | Ultra ≈ 2× Max |
| **SSD** | Load time, **SSD-streamed tables** (Qwen3.8-Flash-Next n-grams, DeepSeek V4.1 Engram) and on-disk KV caches | Keep models on the internal SSD |

**Decode example (dense model).** Qwen3.8-27B at 4-bit reads about 15–16 GB of weights per token.
At 614 GB/s the M5 Max tops out around 40 tok/s. BGR measured about 40 on an M3 Ultra and found the
M5 Max roughly equal. On the M5 Ultra, BGR measured about 55.

**Decode example (MoE model).** Qwen3.8-Flash-Next is 125B total but only **6B active**, so it reads
just a few GB per token. It generates faster than the dense 27B while being considerably smarter.

> **For coding agents, prefill often dominates wall time.** Agents resend a 10–40K-token system
> prompt, tool schemas and file contents on every turn.
>
> - On an M5 Ultra, Qwen3.8-Flash-Next reads ~2,700–2,900 tokens/s and GLM-5.3-Flash
>   ~1,000–1,200 tokens/s (MacStories). An M5 Max has half the GPU cores of the 80-core Ultra, so
>   expect roughly half the prefill speed.
> - So an **uncached** 30K-token prompt costs roughly 10–30 s on an M5 Ultra, and about twice that
>   on an M5 Max.
> - Runtimes with good prefix/KV caching help a lot: oMLX's SSD-tiered cache, ds4's disk KV cache,
>   llama.cpp slot reuse, and LM Studio/Ollama in-memory caches.
> - The evanwtf agent benchmark on an M5 Max concluded that raw generation speed matters much less
>   to agent wall time than prompt re-prefill.

### 2.3 The memory budget

Four things share unified memory:

- the **weights**
- the **KV cache** (context)
- **runtime buffers**
- **everything else**: macOS, your IDE, browser, Docker and so on

#### The GPU "wired memory" cap

By default macOS lets the GPU wire only part of RAM:

- about 74% on a 16 GB Mac
- about 78% on 48 GB
- **107.5 GiB (≈84%) measured on a 128 GB M5 Max**

Raise the cap with `iogpu.wired_limit_mb` (see [§5.2](#52-raise-and-persist-the-gpu-memory-cap)).
It is a **cap, not a reservation**: with nothing loaded, the GPU still holds only a few GB.

| Machine | Default cap (approx.) | Suggested cap | `iogpu.wired_limit_mb` |
|---|---|---|---|
| 128 GB M5 Max | ~107 GiB | **112 GiB** (up to ~120 GiB on a dedicated box) | `114688` (…`122880`) |
| 256 GB M5 Ultra | not yet published: read the `recommendedMaxWorkingSetSize` line llama.cpp prints at startup (`sysctl` just shows `0` while the OS default is active) | **~230 GiB** (up to ~240 GiB dedicated) | `235520` (…`245760`) |

Always leave macOS at least **8–16 GB**, and more if you run the IDE, containers or a browser on the
same machine.

#### KV cache (context memory)

```
KV bytes per token = 2 × (full-attention layers) × (KV heads) × (head dim) × (bytes per element)
```

- **Older dense model example.** A classic 32B-class transformer (64 layers, 8 KV heads, head dim
  128, FP16) needs about 256 KB per token, so 128K tokens ≈ 32 GB.
- **The 2026 models are mostly hybrid, so long context is cheap:**
  - Qwen3.5/3.6/3.8 use Gated DeltaNet linear attention in 3 of every 4 layers.
  - GLM-5.3-Flash mixes 34 linear (KDA) and 11 sparse-attention layers, which cuts KV by about 4.4×
    compared with GLM-5.3.
  - DeepSeek V4 uses about 10% of V3.2's KV at 1M context. DeepSeek V4.1 keeps about 890 bytes per
    token of global KV.
  - Even so, budget **10–20 GB** for context plus runtime buffers.

**Quick fit rule:**
`weights + 10–20 GB ≤ GPU cap`, and `GPU cap ≤ RAM − (8–16 GB + whatever else you run)`.

### 2.4 Dense vs. MoE (and why "Flash"-class MoEs suit a Mac)

- **Dense models** (Qwen3.8-27B, Qwen3.6-27B) read every weight for every token. Small, simple,
  and speed scales with bandwidth ÷ size.
- **Mixture-of-Experts (MoE)** models (Qwen3.8-Flash-Next, GLM-5.3-Flash, DeepSeek-V4-Flash):
  - Memory depends on **total parameters**; speed depends on **active parameters**.
  - A Mac has lots of memory and moderate bandwidth, which is exactly the profile MoE wants.
- **2026 twist: large sparse lookup tables.** Qwen3.8-Flash-Next adds a 51B-parameter n-gram
  embedding table, and DeepSeek V4.1 adds a 196B-parameter "Engram" memory. These are read sparsely
  and can **stay on the SSD**, which is why internal SSD speed now matters.

### 2.5 Buying advice

- **Pick the 128 GB M5 Max if:**
  - you mainly want a strong 27B-class daily driver
  - you are fine running *one* Flash-class MoE at 2–3-bit when you need maximum quality
  - you want the best value per GB
- **Pick the 256 GB M5 Ultra if you want:**
  - Flash-class models at 4–5-bit, which is noticeably better quality
  - about 2× faster decode and prefill
  - long contexts
  - several agents or subagents running concurrently
  - the 500B+ class (DeepSeek-V4.1-Flash Q2, full GLM-5.3 Q2)
- **Either way:**
  - Get a 4 TB SSD.
  - Use wired Ethernet (10 GbE is built in).
  - Get a UPS if the machine will be an always-on server.
  - Consider waiting for the 512 GB Ultra (late October 2026) only if you need DeepSeek-V4.1-Flash
    Q4 or the 1T-class models.

---

## 3. The models (September 2026)

### 3.1 Shortlist of coding-relevant open-weight models

| Model | Maker | Released | Params (total / active) | Context | Input | License |
|---|---|---|---|---|---|---|
| **Qwen3.8-27B** | Alibaba Qwen | 14 Aug 2026 | 27B dense (hybrid Gated DeltaNet) | 262K (to 1M) | text, image, video | Apache 2.0 |
| **Qwen3.6-27B** / **Qwen3.6-35B-A3B** | Alibaba Qwen | Apr 2026 | 27B dense / 35B MoE, 3B active | ≥256K | text, image | Apache 2.0 |
| **Qwen3.8-Flash-Next** | Alibaba Qwen | Aug 2026 | 125B MoE, **6B active** + 51B n-gram embeddings + 4B MTP head ("Qwen4 preview" architecture) | 262K (to 1M) | text, image | **qwen-community-1.0** (custom, read before commercial use) |
| **DeepSeek-V4-Flash-0731** | DeepSeek | 31 Jul 2026 (preview Apr) | 284B MoE, **13B active** | 1M | text | MIT |
| **DeepSeek-V4.1-Flash** | DeepSeek | **10 Sep 2026** | 552B backbone, **8B active (prefill) / 16B (decode)**, + 196B Engram memory | 1M | text, image | MIT |
| **GLM-5.3-Flash** | Z.ai (Zhipu) | Aug 2026 | 320B MoE, **18B active** (hybrid linear + sparse attention) | 1M | text, image, video | MIT |
| GLM-5.3 (full) | Z.ai | Aug 2026 | 744B MoE, 40B active | long | text | check license |
| MiniMax-M3 | MiniMax | Jun 2026 | ~428B MoE, ~23B active | 1M | multimodal | check license |
| Inkling-Small | Thinking Machines Lab | 2026 | 276B MoE, 12B active | 1M | text, image, audio | Apache 2.0 |
| **Muse Glimmer-30B** | Meta (MSL) | Aug 2026 | 30B | – | text, image | Apache 2.0 (+ Meta usage policy) |
| **KAT-Coder-V2.5-Dev** | Kwaipilot | Jul 2026 | 35B MoE, 3B active (Qwen3.6-35B-A3B based) | 256K | text | Apache 2.0 |
| Qwen2.5-Coder 1.5B/7B, Qwen3-Coder-30B-A3B | Alibaba Qwen | 2024–25 | small, FIM-capable | long | text | Apache 2.0 |

**Out of reach on one 128 or 256 GB Mac** (need 512 GB, several Macs, or slow SSD streaming): Kimi
K3, DeepSeek-V4-Pro (1.6T), Qwen3.8-2.4T-A95B, Inkling (975B), and GLM-5.2/5.3 at 4-bit.

### 3.2 Coding benchmarks (vendor-reported unless noted)

What the benchmarks measure:

- **SWE-bench Verified:** 500 real Python GitHub issues. It is saturating (frontier scores are
  95–97%) and likely contaminated, but still a common reference.
- **SWE-bench Pro:** harder, multi-language, less contaminated.
- **Terminal-Bench 2.1:** multi-step tasks in a terminal.
- **DeepSWE 1.1:** long-horizon agentic software engineering.
- **NL2Repo:** build a whole repository from a specification.

| Model | SWE-bench Verified | SWE-bench Pro | Terminal-Bench 2.1 | DeepSWE 1.1 | NL2Repo |
|---|---|---|---|---|---|
| *Claude Opus 5 (cloud, reference)* | *97.0 (Vals)* | – | *89.1* | *74.0* | *75.3* |
| *GPT-5.6 Sol (cloud, reference)* | *96.2 (Vals)* | – | *88.8* | *73.0* | *56.8* |
| *Claude Opus 4.6 (cloud, reference)* | *80.8* | *53.4* | *78.2* | – | *47.6* |
| **DeepSeek-V4.1-Flash** | – | – | **90.6** | **74.2** | **64.0** |
| GLM-5.3 (744B) | 95.4 (Vals) | – | 88.2 | 66.9–69.0 | 58.0 |
| **GLM-5.3-Flash** | 92.0 (Vals) | – | 84.3 | 63.4 | 56.3 |
| **DeepSeek-V4-Flash-0731** | 88.8 (Vals) | 56.0 ¹ | 82.7 | 54.4 | 54.2 |
| **Qwen3.8-Flash-Next** | – | **62.5** ¹ | – | 58.7 | 48.1 |
| **Qwen3.8-27B** | 86.0 (Vals) | 61.7 ¹ | 73.0 | 42.2 | 42.3 |
| MiniMax-M3 | 80.5 | – | – | – | – |
| Qwen3.6-27B | 77.2 | 50.2–53.5 | 60.7–63.4 | 13.3 | 36.2 |
| Muse Glimmer-30B | 76.0 | 51.2 | 51.7 | – | – |
| KAT-Coder-V2.5-Dev (35B-A3B) | 69.4 ² | 46.0 ² | 41.0 ² | – | – |
| Gemma 4 31B | 66.6 | 36.9 | 43.4 | – | – |

¹ Qwen's re-evaluation (Claude Code harness, corrected task set). ² Kwaipilot's harness.
"Vals" = an independent Vals.ai run. Other extra data points:

- Qwen3.8-Flash-Next: **SWE-bench Multilingual 81.0**, LiveCodeBench v6 91.9, Toolathlon 73.5.
- Inkling-Small: listed at ~80% SWE-bench Verified by third-party boards.

**How to read this table:**

- **Harnesses differ.** Vendors test with different harnesses (Claude Code, mini-SWE-agent, Terminus),
  temperatures and contexts, so compare *within* a column with care.
- **Quantization costs something.** All numbers are for full- or FP8-precision weights. The 2–5-bit
  quants you run locally lose some quality: usually little at 4–5-bit, more at 2-bit.
- **Newer benchmarks show a bigger gap.** Terminal-Bench 3.0/4.0, ProgramBench and NL2Repo still
  favor frontier cloud models. For example, Terminal-Bench 4.0 is **Claude Opus 5: 51.8** vs
  **DeepSeek-V4.1-Flash: 31.2**.
- **Your own repository is the only benchmark that matters.** See §11.

### 3.3 Independent evidence on this exact hardware

**Agent pass rates on an M5 Max 128 GB MacBook Pro.** This is the evanwtf/local-llm harness: a
function is removed from a real repo, the agent must restore it, and the repo's own tests decide pass
or fail. Tasks are relatively easy and code quality is not scored. Client: OpenCode. Ledger read on
20 Sep 2026.

| Stack (model · quant · server) | Size | Passed | Median passing task |
|---|---|---|---|
| Qwen3.6-27B-coding · MXFP8 · Ollama | 31 GB | 24/24 | 167 s |
| **Qwen3.8-Flash-Next · MLX mixed 4/8-bit · mlx-serve** | ~100 GiB resident | **432/436** | **52 s** (fastest) |
| Qwen3.8-Flash-Next · q4k · ds4 | 165 GiB file (95 GiB of it stays on SSD) | 178/180 | 106 s |
| Qwen3.8-Flash-Next · UD-Q3_K_XL · llama.cpp | 84 GiB | 135/135 | 121 s |
| DeepSeek-V4-Flash · Q2 · ds4 | ~91 GB | 30/30 | 115 s |

**Speed on an M5 Ultra 256 GB** (MacStories, oMLX, macOS 27):

- **Qwen3.8-Flash-Next** (4-bit with some higher-bit weights, MTP depth 3, thinking off):
  - ~108 tok/s generation (143 on code)
  - still 60–85 tok/s with 64K–256K of context
  - reads prompts at ~2,700–2,900 tok/s
- **GLM-5.3-Flash** (MLX mixed 4/8-bit): ~28–41 tok/s generation, ~1,000–1,200 tok/s prompt reading.
- The 256 GB Ultra ran Flash-Next at **5-bit entirely in RAM**, and up to **three concurrent**
  Flash-Next sessions with subagents.

**Speed from BGR (LM Studio):**

- Qwen3.8-27B 4-bit MLX: **~55 tok/s** on M5 Ultra vs ~40 on M3 Ultra. An M5 Max performs about
  like the M3 Ultra.
- Qwen3.5-122B-A10B: **~80 tok/s** on M5 Ultra.

**Engine choice matters.** For Qwen3.8-Flash-Next on an M4 Max 128 GB, measured the same day:

| Engine | Speed |
|---|---|
| MLX with its MTP (speculative-decoding) head | **90 tok/s** |
| MLX without MTP | 45 tok/s |
| llama.cpp GGUF (UD-Q3_K_XL; the converter drops the MTP head) | 27 tok/s |

### 3.4 What fits where, with expected speed

| Model | Format / quant | Memory needed (approx.) | 128 GB M5 Max | 256 GB M5 Ultra | Expected decode speed |
|---|---|---|---|---|---|
| Qwen3.8-27B | MLX 4-bit / 8-bit / BF16; GGUF Q8_0 28.6 GB | ~16 / ~29 / ~55 GB | ✅ (8-bit comfortable) | ✅ (BF16 possible) | ~40 (Max) / ~55 (Ultra) tok/s at 4-bit; MTP builds up to ~2–3× faster on code (vendor claim) |
| Qwen3.6-27B-coding | Ollama MXFP8 | 31 GB | ✅ | ✅ | a bit slower than above at 8-bit |
| Muse Glimmer-30B | MLX (Ollama) | ~17–32 GB *est.* (4–8-bit) | ✅ | ✅ | ~27 tok/s (Max, sourced) |
| Qwen3.6-35B-A3B / KAT-Coder-V2.5-Dev | 4–8-bit | ~20–37 GB *est.* | ✅ | ✅ | ~55 (Max) / ~106 (Ultra) tok/s *est.* (3B active) |
| **Qwen3.8-Flash-Next** | llama.cpp UD-Q3_K_XL | 84 GiB | ✅ (raise cap) | ✅ | ~27 tok/s (M4 Max); M5 somewhat higher |
| Qwen3.8-Flash-Next | MLX mixed 4/8-bit (mlx-serve) | ~100 GiB resident + ~30 GB sidecar file | ✅ (tight, raise cap) | ✅ | MLX with MTP measured ~90 tok/s on an M4 Max (a different 4-bit pack) |
| Qwen3.8-Flash-Next | ds4 `qwen38-q4k` | 69.7 GiB resident + 95.4 GiB n-gram table on SSD | ✅ | ✅ | engine-dependent |
| Qwen3.8-Flash-Next | 5-bit MLX (oMLX) | fits fully in 256 GB | ❌ | ✅ | somewhat below the 4-bit build's 60–108 tok/s (Ultra, MTP) |
| **DeepSeek-V4-Flash-0731** | ds4 `ds4f-q2` | ~81 GiB file, ~91 GiB resident | ✅ (raise cap) | ✅ | ~39 tok/s (Max, community) |
| DeepSeek-V4-Flash-0731 | ds4 `ds4f-q4` / `ds4f-mxfp4` | ~150–170 GB *est.* | ❌ | ✅ | ~47 tok/s (Ultra) *est.* |
| **GLM-5.3-Flash** | ds4 `glm53-q2` / Unsloth UD-Q2_K_XL | 90 / 101.3 GiB | ⚠️ (tight: modest context, nothing else running) | ✅ | ~27 tok/s (Max) *est.* |
| GLM-5.3-Flash | ds4 `glm53-q4` / MLX mixed 4/8-bit | ~178 GiB | ❌ | ✅ | 28–41 tok/s (Ultra, measured) |
| **DeepSeek-V4.1-Flash** | ds4 `ds41f-q2` | 152 GiB resident + 189 GiB Engram rows on SSD (341 GiB file) | ⚠️ (SSD streaming only, slow) | ✅ (resident main weights) | new; no public M5 numbers yet |
| GLM-5.3 (744B) | ds4 `glm53-full-q2` | ~197 GiB | ❌ (SSD streaming only) | ⚠️ (very tight) | ~17 tok/s (Ultra) *est.* |
| MiniMax-M3 | Q3–Q4 | ~170–240 GB *est.* | ❌ | ⚠️ (Q3 only; check runtime support) | – |
| Inkling-Small | Q2–Q4 | ~80–150 GB *est.* | ⚠️ (Q2) | ✅ (Q4; check runtime support) | ~22 (Max) / ~45 (Ultra) tok/s *est.* |

"Expected speed" is plain decode on short prompts unless noted. It drops as context grows and rises
with speculative decoding.

### 3.5 Model configuration cards

#### Card 1: Qwen3.8-27B (the best "small" model; default daily driver on 128 GB)

- **Why pick it**
  - Apache 2.0, dense and predictable.
  - **Native vision**: screenshots and mockups to UI code.
  - Strong agentic scores: Terminal-Bench 2.1 73.0, SWE-bench Pro 61.7, Vals SWE-bench Verified 86.0.
  - Leaves plenty of RAM free.
- **Memory:** ~16 GB (4-bit), ~29 GB (8-bit), ~55 GB (BF16), plus context.
- **Run it with**
  - Ollama: `ollama pull qwen3.8:27b-mlx` (Apple-Silicon-optimized MLX build) or `qwen3.8:27b`.
  - LM Studio: search "Qwen3.8 27B" and pick an **MLX** 8-bit (or 4-bit) build.
  - MTP-enabled MLX checkpoints for oMLX or mlx-serve (e.g. the `oQ4e-mtp` builds used by
    MacStories). These are much faster on code.
  - llama.cpp with a GGUF `Q8_0` (~28.6 GB).
- **Settings**
  - Thinking is **on by default**. Disable it per request with
    `chat_template_kwargs: {"enable_thinking": false}`.
  - Tune depth with `reasoning_effort`, and keep reasoning across turns with `preserve_thinking`.
  - Qwen's recommended sampling for the Qwen3.8 family (from the Flash-Next card): thinking
    `temperature=1.0, top_p=0.95, top_k=20`; non-thinking `temperature=0.7, top_p=0.8, top_k=20`.
    Check the 27B card for any differences.

#### Card 2: Qwen3.6-27B "coding" (the proven starter)

- **Why pick it:** a 31 GB download that installs with two commands. It passed **24/24** in the
  evanwtf agent benchmark and leaves about 80 GB free on a 128 GB machine.
- **Run it with:** `ollama pull qwen3.6:27b-coding-mxfp8` (Apache 2.0).
- **Trade-off:** older than Qwen3.8-27B and slower in agent wall-time than Flash-class models.

#### Card 3: Muse Glimmer-30B (Meta's agent-tuned 30B)

- **Why pick it:** Apache 2.0, built for local agents. Very strong tool use (MCP Atlas 75.5) and
  failure recovery; SWE-bench Verified 76.0. A good "second opinion" model and personal-assistant
  backend (OpenClaw, Hermes).
- **Run it with:** `ollama run muse-glimmer:30b-mlx`. It uses Ollama's MLX engine with DFlash
  speculative decoding and image input.

#### Card 4: fast small MoEs (Qwen3.6-35B-A3B, KAT-Coder-V2.5-Dev)

- **Why pick them:** only 3B active, so very fast. Good for subagents, quick edits, commit messages,
  and as OpenCode's `small_model`.
  - KAT-Coder-V2.5-Dev (Apache 2.0) is an agentic-coding fine-tune of Qwen3.6-35B-A3B. In
    Kwaipilot's harness: SWE-bench Verified 69.4, SWE-bench Pro 46.0.
- **Trade-off:** clearly weaker than Flash-class models on hard, multi-file tasks.

#### Card 5: Qwen3.8-Flash-Next (best all-rounder that fits both machines)

- **Architecture**
  - 125B MoE with 6B active.
  - Gated DeltaNet plus "Qwen Sparse Attention".
  - A **51B n-gram embedding table**, read sparsely; it can stay on the SSD.
  - A **4B MTP head** for speculative decoding.
- **Benchmarks:** SWE-bench Pro 62.5, SWE-bench Multilingual 81.0, DeepSWE 58.7, Toolathlon 73.5,
  LiveCodeBench v6 91.9.
- **License:** `qwen-community-1.0`. Read it before commercial use.
- **On 128 GB, pick one of:**
  1. **MLX mixed 4/8-bit via mlx-serve** (~100 GiB resident plus a ~30 GB per-layer-embedding sidecar
     file). Fastest measured agent stack (432/436 passed, 52 s median). Requires raising the GPU cap.
  2. **llama.cpp `UD-Q3_K_XL`** (84 GiB). Mainline and simplest, but llama.cpp's converter drops the
     MTP head, so decode is about 3× slower than MLX with MTP.
  3. **ds4 `qwen38-q4k`** (69.7 GiB resident; the n-gram table is read from the SSD). Some clients
     (OpenCode) need a small tool-call-format shim with this engine (see evanwtf's `docs/stacks.md`).
  4. **LM Studio 0.4.25+** (update runtimes first) or **Ollama** (recent releases added Qwen3.8
     Flash Next to the MLX engine; look up the exact tag in the Ollama library).
- **On 256 GB:** run a **5-bit MLX build fully in RAM**, which MacStories found to be the sweet spot.
  6- or 8-bit builds keep the n-gram tables on SSD.
- **Settings**
  - Thinking is on by default. For tool-heavy agent loops many users run **thinking off/low** for
    speed and turn it on for hard debugging or planning.
  - Sampling: thinking `1.0/0.95/20`; instruct `0.7/0.8/20`.

#### Card 6: DeepSeek-V4-Flash-0731 (independent lineage, 1M context, MIT)

- **Why pick it**
  - Terminal-Bench 2.1 82.7, DeepSWE 54.4, NL2Repo 54.2, Vals SWE-bench Verified 88.8.
  - 1M context with a tiny KV cache.
  - A different family from Qwen, which is useful for second opinions and resilience.
- **On 128 GB:** ds4 `ds4f-q2` (~81 GiB). Routed experts are IQ2_XXS/Q2_K and the rest is Q8. The ds4
  author reports these 2-bit builds behave well under coding agents and call tools reliably.
- **On 256 GB:** ds4 `ds4f-q4` or `ds4f-mxfp4`. MXFP4 preserves DeepSeek's native FP4 experts.
- **Other runtimes:** upstream **llama.cpp** has run DeepSeek V4 since build b9840 (June 2026), and
  mlx-serve bundles the ds4 engine.
- **Settings:** sampling `temperature=1.0, top_p=1.0`. For tool-driven agents, reasoning off is a
  clean baseline.

#### Card 7: GLM-5.3-Flash (strongest agentic coder in the "Flash" class)

- **Benchmarks:** Terminal-Bench 2.1 84.3, DeepSWE 63.4 (85.0 at pass@4), NL2Repo 56.3, Vals
  SWE-bench Verified 92.0. Natively multimodal.
- **On 128 GB:** only 2-bit fits: ds4 `glm53-q2` (~90 GiB) or Unsloth `UD-Q2_K_XL` (101.3 GiB).
  Use modest context and run nothing else. Treat it as an experiment on this machine.
- **On 256 GB:** ds4 `glm53-q4` (~178 GiB), or an MLX "mixed 4-bit experts / 8-bit rest" build
  (oMLX). **Avoid "REAP"-pruned variants** unless you accept that experts were removed; those are
  not the same model.
- **Runtime status (late Sep 2026)**
  - ds4: text and vision.
  - llama.cpp: support landing in September, **text only**; the vision projector type is not
    supported yet.
  - MLX: `glm5_next` landed in `mlx-vlm` main on 26 Aug 2026.
- **Settings**
  - `reasoning_effort` accepts `low`, `high` or `max`. The **default is `max`, which is slow**, so
    use low or high for interactive agents.
  - For chat, pass `clear_thinking=true`.

#### Card 8: DeepSeek-V4.1-Flash (256 GB only; bleeding edge)

- **Architecture:** a new 552B "Causal Encoder-Decoder" MoE. Only 8B active during prefill and 16B
  during decode. It has 196B of **Engram** conditional-memory parameters, native vision, and 1M
  context. MIT license.
- **Benchmarks (vendor):** Terminal-Bench 2.1 **90.6** and DeepSWE **74.2**, level with or ahead of
  Claude Opus 5 and GPT-5.6 Sol on those two. It still trails them on Terminal-Bench 3.0/4.0,
  NL2Repo and ProgramBench.
- **Runtime:** as of late September, **only ds4 runs it on Macs** (Metal).
  - `ds41f-q2` is a 341 GiB file with **152 GiB of main weights**.
  - A 256 GB Mac can keep the main weights resident; the project tested full residency on 512 GB.
  - Engram rows are always read from the SSD, so you need a fast internal SSD and about 350 GB free.
- **Settings:** `--think-level 1..100` (0 = off). V4.1 currently requires `--power 100`.

#### Card 9: GLM-5.3, full 744B (maximum capability; a 256 GB stretch)

- **Why pick it:** Vals SWE-bench Verified 95.4. Z.ai calls it the most capable open-weights model
  for coding.
- **Run it with:** ds4 `glm53-full-q2` (~197 GiB). Very tight on 256 GB; ds4 also offers
  `--ssd-streaming`.
- **Trade-off:** slow (~17 tok/s *est.*). Use it for occasional hard problems, not interactive loops.

#### Card 10: autocomplete (FIM) and embeddings

- **Fill-in-the-middle autocomplete** needs a FIM-trained model, not a chat model:
  - **Qwen2.5-Coder-1.5B/7B** (base) is still the standard choice.
  - **Qwen3-Coder-30B-A3B** if you have memory to spare.
  - llama.vscode ships presets: `--fim-qwen-1.5b-default`, `--fim-qwen-7b-default` and
    `--fim-qwen-30b-default` (the last one is for more than 64 GB of VRAM).
- **Embeddings** (codebase indexing and RAG): serve a small embedding model (for example from the
  Qwen3-Embedding family, or `nomic-embed-text` in Ollama) through the runtime's `/v1/embeddings`.

### 3.6 Beyond 256 GB

- **512 GB M5 Ultra** (late October 2026): DeepSeek-V4.1-Flash Q4 (294 GiB main weights),
  DeepSeek-V4-Pro Q2, and GLM-5.x at higher precision.
- **Two Macs over Thunderbolt 5 RDMA** (macOS 26.2+): ds4 tensor parallelism can run 4-bit DeepSeek
  Flash or GLM-5.3-Flash across two 128 GB Macs. MLX distributed inference is covered in §9.
- **SSD streaming** (ds4 `--ssd-streaming`): runs bigger-than-RAM MoEs with an expert cache. It works,
  but it is much slower.

---

## 4. Inference runtimes (the "server" layer)

### 4.1 Comparison

| Runtime | Model formats | APIs exposed | Auth | Concurrency | Speculative decoding | UI | Best for |
|---|---|---|---|---|---|---|---|
| **Ollama** (0.33.x) | MLX (Apple Silicon engine) + GGUF (llama.cpp) | Ollama API, OpenAI (chat, Responses), **Anthropic Messages** | none built in (put a gateway in front) | yes | per model (MTP for Gemma 4, DFlash for Muse Glimmer) | menu-bar app + CLI | Easiest start; `ollama launch <agent>` |
| **LM Studio** 0.4.25+ / `llmster` | MLX + GGUF | OpenAI (chat, Responses, embeddings), **Anthropic Messages**, native REST | API tokens ("Require Authentication") | parallel requests with continuous batching (llama.cpp engine) | MTP, DFlash, DSpark drafters (llama.cpp engine ≥ 2.29.1) | full GUI, headless daemon, **LM Link** | GUI users, model discovery, remote use via LM Link |
| **llama.cpp** (`llama serve` = `llama-server`) | GGUF | OpenAI chat/completions, **Anthropic Messages**, `/infill`, web UI | `--api-key` / `--api-key-file` | `-np` slots; router mode | draft models; MTP per model | built-in web UI | Newest architectures first, full control |
| **mlx-lm** (`mlx_lm.server`) | MLX | OpenAI chat/completions | none (docs: not for production) | continuous batching | draft model | none | Reference MLX server; distributed with `mlx.launch` |
| **oMLX** | MLX | OpenAI (chat, completions, Responses), **Anthropic Messages** | API key | continuous batching, multi-model LRU | MTP (oQ checkpoints) | menu-bar app + web admin | Agent workloads: **SSD-tiered KV cache** makes repeated prefixes cheap |
| **mlx-serve** (MLX Core app) | MLX + GGUF (+ bundled ds4 engine) | OpenAI (chat, completions, Responses), **Anthropic**, **Ollama API** | API key required for off-machine requests | continuous batching | MTP; prompt-lookup decoding on by default | menu-bar app | Fastest measured agent stack on an M5 Max (evanwtf) |
| **ds4 / DwarfStar** | only its own GGUFs | OpenAI chat, Responses, **Anthropic** | none (placeholder token): keep on localhost behind a gateway | session batching | DSpark / MTP | CLI + native agent | DeepSeek V4/V4.1 Flash, GLM-5.3(-Flash), Qwen3.8-Flash-Next |

### 4.2 Which client needs which API

| Client | API it speaks |
|---|---|
| Claude Code | Anthropic Messages (`/v1/messages`) |
| Codex CLI | OpenAI **Responses** (`/v1/responses`) **only**; Chat Completions support was removed in Feb 2026 |
| Cursor with a custom URL | Agent mode sends Responses-style requests; Ask mode is more likely to use Chat Completions |
| VS Code Copilot "Custom Endpoint" | Chat Completions, Responses **or** Messages (you choose) |
| OpenCode, Cline, Kilo Code, Zed, JetBrains, Xcode, Aider, Copilot CLI | Chat Completions (OpenAI-compatible) |
| FIM autocomplete (llama.vscode, Zed edit predictions) | `/infill` (llama.cpp) or `/v1/completions` |

If a runtime lacks the API a client needs, put **LiteLLM** in front of it ([§7.8](#78-authentication-and-a-litellm-gateway)).

### 4.3 Model × runtime support (late September 2026)

| Model | Ollama | LM Studio | llama.cpp | MLX servers | ds4 |
|---|---|---|---|---|---|
| Qwen3.8-27B, Qwen3.6-* | ✅ (`-mlx` tags) | ✅ | ✅ | ✅ | none |
| Qwen3.8-Flash-Next | ✅ (MLX, recent releases) | ✅ 0.4.25+ | ✅ (merged 27 Aug; no MTP) | ✅ mlx-serve, oMLX (with MTP) | ✅ |
| DeepSeek-V4-Flash | check | check | ✅ (b9840+) | ✅ mlx-serve (via ds4 engine) | ✅ (primary) |
| GLM-5.3-Flash | check | check | ⏳ (text only) | ✅ mlx-vlm main, oMLX builds | ✅ |
| DeepSeek-V4.1-Flash | ❌ | ❌ | ❌ | ❌ | ✅ (Metal) |

"check" means support may already have shipped. Verify in your version before downloading 100+ GB.

---

## 5. Step-by-step setup

### 5.1 Prepare macOS as an always-on inference server

1. **Update macOS** (27.x shipped 18 Sep 2026) and install the command-line tools:
   ```bash
   xcode-select --install
   ```
2. **Install Homebrew**, then the basic tools:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   brew install git jq uv
   uv tool install huggingface_hub      # provides the `hf` CLI (hf download ...)
   ```
3. **Energy settings.** In System Settings → Energy, turn on:
   - *Prevent automatic sleeping when the display is off*
   - *Wake for network access*
   - *Start up automatically after a power failure*

   Or from the terminal:
   ```bash
   sudo pmset -a sleep 0 disksleep 0 displaysleep 15 womp 1 autorestart 1
   ```
4. **Sharing.** In System Settings → General → Sharing:
   - Set the local hostname (for example `mac-studio`).
   - Enable **Remote Login (SSH)**.
   - Enable **Screen Sharing** to reach GUI apps such as LM Studio when the Mac runs headless.
5. **Security**
   - Keep **FileVault** on. After a reboot the Mac waits for unlock before your user-level
     services start, so plan for that.
   - Turn on the macOS firewall.
6. **Model storage.** Keep models on the internal SSD. SSD streaming, n-gram and Engram tables, and
   KV-on-disk all depend on it. Default locations:

   | Tool | Location |
   |---|---|
   | Ollama | `~/.ollama/models` (move with `OLLAMA_MODELS`) |
   | LM Studio | `~/.lmstudio/models` |
   | Hugging Face | `~/.cache/huggingface` (move with `HF_HOME`) |

   Exclude these directories from Time Machine (fixed-path exclusions need `sudo`):
   ```bash
   sudo tmutil addexclusion -p ~/.ollama/models ~/.lmstudio/models ~/.cache/huggingface
   ```

### 5.2 Raise (and persist) the GPU memory cap

Needed for anything above roughly 90 GiB on a 128 GB machine, and recommended on 256 GB.

```bash
sysctl iogpu.wired_limit_mb                     # 0 = OS default
sudo sysctl iogpu.wired_limit_mb=114688         # 128 GB Mac → 112 GiB
# sudo sysctl iogpu.wired_limit_mb=235520       # 256 GB Mac → 230 GiB
```

The setting does not survive a reboot. To make it permanent, create a LaunchDaemon at
`/Library/LaunchDaemons/com.local.iogpu-wired-limit.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.local.iogpu-wired-limit</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/sbin/sysctl</string>
    <string>-w</string>
    <string>iogpu.wired_limit_mb=114688</string>   <!-- 235520 on the 256 GB Ultra -->
  </array>
  <key>RunAtLoad</key><true/>
</dict>
</plist>
```

```bash
sudo chown root:wheel /Library/LaunchDaemons/com.local.iogpu-wired-limit.plist
sudo chmod 644 /Library/LaunchDaemons/com.local.iogpu-wired-limit.plist
sudo launchctl bootstrap system /Library/LaunchDaemons/com.local.iogpu-wired-limit.plist
sysctl iogpu.wired_limit_mb       # verify after every reboot; 0 means it did NOT apply
```

To revert, set the value back to `0` (the OS default) or remove the plist.

### 5.3 Option A: Ollama (easiest)

```bash
# Install the macOS app from ollama.com/download (includes the CLI), or: brew install ollama

# Configure the app (then quit and reopen Ollama). launchctl setenv does not survive a reboot:
# use the app's Settings (it has a context-length slider) or a LaunchAgent for permanence.
launchctl setenv OLLAMA_CONTEXT_LENGTH 131072   # agents need ≥ 64K. Ollama defaults to 256K on ≥ 48 GiB machines,
                                                # which reserves a lot of memory for big models
launchctl setenv OLLAMA_KEEP_ALIVE 24h          # keep the model warm (avoid reload plus cold prefill)
launchctl setenv OLLAMA_NO_CLOUD 1              # optional: strictly local mode (disables cloud models and web search)
# launchctl setenv OLLAMA_HOST 0.0.0.0:11434    # only for LAN/tailnet access; read §7 first

ollama pull qwen3.8:27b-mlx                 # ~16–30 GB class
ollama pull qwen3.6:27b-coding-mxfp8        # 31 GB, proven agent starter
ollama pull muse-glimmer:30b-mlx            # optional second opinion
ollama ps                                   # PROCESSOR should read "100% GPU"; CONTEXT shows the allocated window
```

Launch coding agents already wired to Ollama:

```bash
ollama launch claude   --model qwen3.8:27b-mlx     # Claude Code via Ollama's Anthropic-compatible API
ollama launch codex    --model qwen3.8:27b-mlx     # Codex CLI
ollama launch opencode --model qwen3.8:27b-mlx     # also: pi, droid, copilot, openclaw, hermes, dsh, muse
```

Endpoints:

| API | Base URL |
|---|---|
| OpenAI | `http://localhost:11434/v1` |
| Anthropic | `http://localhost:11434` |
| Native Ollama | `http://localhost:11434/api/...` |

> Ollama has **no built-in authentication**. For remote access, put LiteLLM in front of it (§7.8).

### 5.4 Option B: LM Studio (GUI) or `llmster` (headless)

**GUI:**

1. Install from lmstudio.ai and update the **runtimes** (Settings → Runtime).
2. Search for and download a model. On a Mac, prefer **MLX** builds.
3. In the Developer tab:
   - Load the model with a large context (for example 131072).
   - Enable **Require Authentication** and create an API token.
   - Start the server.
   - Optionally enable *Serve on Local Network*.

**CLI or headless:**

```bash
curl -fsSL https://lmstudio.ai/install.sh | bash      # installs llmster + the `lms` CLI
lms get qwen3.8-27b                                    # search and download (pick the MLX build on a Mac)
lms ls                                                 # copy the exact model key
lms load <model-key> --context-length 131072 --gpu max --ttl 86400
lms load <model-key> --estimate-only                   # print a memory estimate without loading
lms server start --port 1234                           # localhost only (default)
# lms server start --bind 0.0.0.0                      # LAN/tailnet: enable authentication first
lms ps                                                 # what is loaded
```

Endpoints:

| API | URL |
|---|---|
| OpenAI | `http://localhost:1234/v1` (`/chat/completions`, `/responses`, `/embeddings`, `/models`) |
| Anthropic | `POST http://localhost:1234/v1/messages` (accepts `x-api-key` or `Authorization: Bearer`) |
| Native REST | `http://localhost:1234/api/v1/...` |

**Remote without opening ports:** use **LM Link** (§7.4).

### 5.5 Option C: llama.cpp (newest architectures, GGUF)

**Install:**

```bash
brew install llama.cpp          # llama-server, llama-cli, ...
# or install the unified `llama` binary from llama.app (`llama serve` == `llama-server`)

# For day-old architectures (Qwen3.8-Flash-Next, GLM-5.3-Flash), build master; Metal is on by default:
git clone https://github.com/ggml-org/llama.cpp && cd llama.cpp
cmake -B build && cmake --build build --config Release -j
```

**Example: Qwen3.8-Flash-Next on 128 GB.** Raise the GPU cap first (§5.2).

```bash
mkdir -p ~/.config/llama && openssl rand -hex 24 > ~/.config/llama/api-key && chmod 600 ~/.config/llama/api-key
./build/bin/llama-server \
  -hf unsloth/Qwen3.8-Flash-Next-GGUF:UD-Q3_K_XL \
  --alias qwen3.8-flash-next \
  --jinja -c 131072 -ngl 999 -fa on -np 1 \
  --host 127.0.0.1 --port 8080 \
  --api-key-file ~/.config/llama/api-key
```

Useful flags:

| Flag | Purpose |
|---|---|
| `-hf repo:quant` | Download from Hugging Face and run |
| `--alias` | Model id reported to clients |
| `--jinja` | Use the model's chat template (needed for correct tool calls) |
| `-c` | Context size (`-c 0` = model maximum) |
| `-ngl 999` | Offload all layers to the GPU |
| `-fa on` | Flash attention |
| `-np N` | Parallel slots (each slot needs its own context memory) |
| `--api-key` / `--api-key-file` | Require an API key |
| `--no-webui` | Serve the API only |

**Router mode:** `llama serve` with no model loads and unloads cached models on demand. Zed
auto-discovers them.

**Built-in APIs:**

- `/v1/chat/completions`, `/v1/completions`, `/v1/embeddings`
- **Anthropic** `/v1/messages` and `/v1/messages/count_tokens`
- `/infill` (FIM)
- a web UI at the root URL

### 5.6 Option D: MLX servers (fastest on Apple Silicon)

**mlx-lm**, the official reference server:

```bash
uv tool install mlx-lm
mlx_lm.server --model <mlx-community or other MLX repo id / local path> --host 127.0.0.1 --port 8080
# useful: --chat-template-args '{"enable_thinking": false}'   --prompt-cache-bytes <bytes>
```

It only has basic security checks, so keep it on `127.0.0.1` behind a gateway. Distributed
multi-Mac serving uses `mlx.launch` (§9).

**oMLX** (Apache 2.0):

- Menu-bar app with continuous batching and a **hot RAM + cold SSD KV cache**. Previously seen
  prefixes survive context changes and even restarts, which is ideal for coding agents.
- APIs: OpenAI `/v1/chat/completions`, `/v1/completions`, **`/v1/responses`**, and Anthropic
  **`/v1/messages`**.
- Default endpoint `http://localhost:8000/v1`; an admin dashboard at `/admin` generates client
  configs.
- CLI form:
  ```bash
  omlx serve --model-dir ~/models/mlx --max-model-memory 200GB
  ```
- MacStories ran the Qwen3.8 `oQ4e-mtp` checkpoints on oMLX 0.7 dev builds.

**mlx-serve / MLX Core:**

- A native Zig server bundled in a signed menu-bar app. Default port `11234`.
- Speaks OpenAI, **Anthropic**, **Responses** and the **Ollama API** (Ollama clients work
  unchanged).
- Includes MTP and prompt-lookup speculative decoding, plus the ds4 engine for DeepSeek V4 Flash.
- Requires an API key for requests from other machines.
- `mlx-serve launch claude` wires Claude Code for you.
- This is the engine behind evanwtf's fastest M5 Max stack (Qwen3.8-Flash-Next MLX mixed
  4/8-bit, ~100 GiB resident).

### 5.7 Option E: ds4 (DwarfStar) for DeepSeek V4/V4.1 and GLM-5.3

```bash
xcode-select --install
git clone https://github.com/antirez/ds4.git && cd ds4
make                                   # Metal build; M5 fast paths are selected automatically

# 128 GB:
./download_model.sh ds4f-q2            # DeepSeek-V4-Flash-0731 Q2, ~81 GiB
# ./download_model.sh glm53-q2         # GLM-5.3-Flash Q2, ~90 GiB (tight; modest context)

# 256 GB:
# ./download_model.sh ds4f-q4          # or ds4f-mxfp4 (native FP4 experts)
# ./download_model.sh glm53-q4         # GLM-5.3-Flash Q4, ~178 GiB
# ./download_model.sh ds41f-q2         # DeepSeek-V4.1-Flash Q2: 341 GiB file, 152 GiB resident

./ds4-server --ctx 100000 \
  --kv-disk-dir ~/.ds4/server-kv --kv-disk-space-mb 8192 \
  --host 127.0.0.1 --port 8000           # OpenAI /v1, Responses, and Anthropic endpoints
# pick the model with -m, e.g.: -m gguf/GLM-5.3-Flash-Q4.gguf
```

Notes:

- `./ds4-agent` is a built-in coding agent.
- Thinking is on by default; use `--nothink` to disable it.
- `--power 70` lowers sustained GPU load for DeepSeek V4. V4.1 and GLM require `--power 100`.
- ds4 GGUFs only run in ds4, and ds4 only runs its own GGUFs. It is not a general GGUF loader.
- The `dsv4-local` token in its docs is a placeholder, not real authentication.

### 5.8 Run servers as launchd services

Example LaunchAgent at `~/Library/LaunchAgents/local.llama-server.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>local.llama-server</string>
  <key>ProgramArguments</key>
  <array>
    <string>/Users/YOU/llama.cpp/build/bin/llama-server</string>
    <string>-hf</string><string>unsloth/Qwen3.8-Flash-Next-GGUF:UD-Q3_K_XL</string>
    <string>--alias</string><string>qwen3.8-flash-next</string>
    <string>--jinja</string>
    <string>-c</string><string>131072</string>
    <string>-ngl</string><string>999</string>
    <string>-fa</string><string>on</string>
    <string>--host</string><string>127.0.0.1</string>
    <string>--port</string><string>8080</string>
    <string>--api-key-file</string><string>/Users/YOU/.config/llama/api-key</string>
  </array>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>/Users/YOU/Library/Logs/llama-server.log</string>
  <key>StandardErrorPath</key><string>/Users/YOU/Library/Logs/llama-server.log</string>
</dict>
</plist>
```

```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/local.llama-server.plist   # start
launchctl bootout   gui/$(id -u) ~/Library/LaunchAgents/local.llama-server.plist   # stop
tail -f ~/Library/Logs/llama-server.log
```

- Ollama and LM Studio manage their own background services (the app, or `lms daemon`).
- **On a 128 GB machine, only one big model server should hold memory at a time.** Two 80+ GiB
  models will not coexist.

### 5.9 Smoke tests

```bash
BASE=http://127.0.0.1:1234     # LM Studio; llama.cpp :8080, Ollama :11434, oMLX :8000, mlx-serve :11234, ds4 :8000
KEY=...                        # your server token (any string if the server has no auth)

# 1. List models: the "id" values are what you put in every client config
curl -s $BASE/v1/models -H "Authorization: Bearer $KEY" | jq '.data[].id'

# 2. Chat completion
curl -s $BASE/v1/chat/completions -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{"model":"<id>","messages":[{"role":"user","content":"Write a Python function that reverses a linked list."}]}' \
  | jq -r '.choices[0].message.content'

# 3. Tool calling (agents depend on this; expect a get_weather tool call, not prose)
curl -s $BASE/v1/chat/completions -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" -d '{
  "model":"<id>",
  "messages":[{"role":"user","content":"What is the weather in Paris?"}],
  "tools":[{"type":"function","function":{"name":"get_weather","description":"Get weather for a city",
    "parameters":{"type":"object","properties":{"city":{"type":"string"}},"required":["city"]}}}]
}' | jq '.choices[0].message.tool_calls'

# 4. Anthropic Messages (for Claude Code)
curl -s $BASE/v1/messages -H "x-api-key: $KEY" -H "anthropic-version: 2023-06-01" -H "content-type: application/json" \
  -d '{"model":"<id>","max_tokens":256,"messages":[{"role":"user","content":"Say hi"}]}' | jq
```

### 5.10 Ready-made recipes

| # | Machine | Recipe | Memory in use | Use it for |
|---|---|---|---|---|
| **R1** | 128 GB | Ollama + `qwen3.8:27b-mlx` (or `qwen3.6:27b-coding-mxfp8`), plus llama.vscode FIM with Qwen2.5-Coder-7B | ~35–45 GB | Everyday chat and agents; Mac stays fully usable |
| **R2** | 128 GB | GPU cap at 112 GiB; **mlx-serve** with Qwen3.8-Flash-Next MLX mixed 4/8 (fastest) **or** llama.cpp UD-Q3_K_XL (mainline); small FIM model only | ~90–110 GiB | Maximum-quality agentic coding |
| **R3** | 128 GB | GPU cap at 112 GiB; **ds4** with DeepSeek-V4-Flash `ds4f-q2` | ~91 GiB | Second lineage, 1M context, long-document or repo analysis |
| **R4** | 256 GB | **oMLX** (or LM Studio) with Qwen3.8-Flash-Next **5-bit** always loaded, plus Qwen3.8-27B 8-bit as subagent/small model | ~150–170 GB | Daily driver with concurrency (several agents or subagents) |
| **R5** | 256 GB | **ds4** with GLM-5.3-Flash `glm53-q4` (swap in) | ~190–200 GB | Hardest agentic tasks in the Flash class |
| **R6** | 256 GB | **ds4** with DeepSeek-V4.1-Flash `ds41f-q2` (fast SSD, ≥ 350 GB free) | ~160–175 GB + SSD | Frontier-level Terminal-Bench/DeepSWE at home (bleeding edge) |

### 5.11 Tuning for agentic coding

- **Context length**
  - Use **≥ 64K** (Ollama's own guidance for coding tools); 128K is a good default.
  - Set it on the **server** and tell the **client** the same number. Clients don't enlarge
    server allocations; they just get truncated.
- **Thinking / reasoning effort**
  - Off or low for fast edit-run loops; high for planning, hard debugging and reviews.
  - GLM-5.3-Flash defaults to `max`, so lower it for interactive use.
- **Sampling:** follow the model card (Qwen3.8: `1.0/0.95/top_k 20` thinking, `0.7/0.8/20`
  instruct; DeepSeek V4: `1.0/1.0`). Many agent clients send no temperature at all.
- **Keep models warm** so every session doesn't pay a reload plus a cold prefill: `OLLAMA_KEEP_ALIVE`,
  `lms load --ttl`, and servers that persist the prompt cache (oMLX, ds4 `--kv-disk-dir`).
- **Parallel slots / concurrency:** each slot needs its own context memory. Start with 1–2 on
  128 GB and 3–4 on 256 GB, then grow while watching memory pressure.
- **KV-cache quantization:** leave it off unless you are memory-bound. Cline and LM Studio report
  inconsistent agent behavior with it on.
- **Speculative decoding (MTP / drafts / prompt lookup):** often a 2–3× decode win on code, but
  **measure it**. Some engine/client combinations silently never speculate (e.g. ds4's Qwen MTP
  path only engages at temperature 0, and OpenCode sends no temperature).

---

## 6. Connecting IDEs, editors and coding agents

### 6.0 Compatibility matrix

| Tool | Chat | Agent (tools, edits, shell) | Inline autocomplete | How |
|---|---|---|---|---|
| **VS Code + GitHub Copilot Chat** | ✅ | ✅ | ❌ (still needs GitHub/Copilot) | BYOK: Ollama extension or **Custom Endpoint** |
| **Cline** (VS Code, Cursor, Devin Desktop; JetBrains client) | ✅ | ✅ | ❌ | Provider: LM Studio / Ollama / OpenAI-compatible |
| **Kilo Code** (VS Code, JetBrains, CLI; built on OpenCode) | ✅ | ✅ | check | Provider: LM Studio / Ollama / OpenAI-compatible |
| **llama.vscode** | ✅ | ✅ (Llama Agent) | ✅ (FIM) | llama.cpp servers |
| **Cursor** | ⚠️ | ⚠️ (main agent only; subagents ignore custom models) | ❌ (Tab stays cloud) | Override OpenAI Base URL → **public HTTPS** tunnel |
| **Devin Desktop** (ex-Windsurf) | via ACP agent or extension | ✅ via **ACP agent** (OpenCode, Codex, Claude Code) or Cline/Kilo | ❌ | ACP registry |
| **Devin CLI** | ❌ | ❌ | none | not supported (cloud models only) |
| **Zed** | ✅ | ✅ | ✅ (edit predictions) | Built-in llama.cpp / LM Studio / Ollama / OpenAI-compatible providers |
| **JetBrains AI Assistant** | ✅ | ⚠️ (MCP tools only with OpenAI-compatible provider plus "Tool calling") | ✅ (OpenAI-compatible completion provider) | Settings → Tools → AI Assistant → Providers & API keys |
| **Junie** (JetBrains agent / CLI) | ✅ | ✅ | none | `/account` → custom models and endpoints |
| **Xcode** | ✅ | ✅ (coding assistant edits the project) | none | Settings → Intelligence → Locally Hosted |
| **Claude Code** | none | ✅ | none | `ANTHROPIC_BASE_URL` |
| **Codex CLI** | none | ✅ | none | `--oss` or a Responses provider |
| **OpenCode** | none | ✅ | none | `opencode.json` provider |
| **GitHub Copilot CLI** | none | ✅ | none | `COPILOT_PROVIDER_*` env vars |

**Ecosystem changes in 2026:**

- **Continue** was acqui-hired by Cursor in June 2026. Its final release is 2.0.0 and the repository is
  read-only. It still runs if pinned, but it gets no updates.
- **Roo Code** shut down on 15 May 2026. Kilo Code (rebuilt on OpenCode) and Cline are its
  maintained successors.

### 6.1 VS Code + GitHub Copilot Chat (BYOK)

BYOK models work **without a GitHub account or Copilot plan**, fully offline.

**Option 1: official Ollama extension.** The built-in Ollama provider is deprecated.

1. Install the **Ollama** extension (publisher: Ollama). It needs VS Code 1.127 or newer.
2. Pick the model in the Chat model picker under **Ollama**.
3. If needed, run *Ollama: Refresh Models* or *Ollama: Diagnose Models*.
4. Set Ollama's context length to at least 64K, then reload the window. VS Code may show the model's
   maximum context even when Ollama allocates less.

**Option 2: Custom Endpoint.** Works with any runtime and any remote URL.

1. Open the model picker, then the gear icon → **Manage Language Models** → **Add Models** →
   **Custom Endpoint**.
2. Enter a group name and key, and choose the API type: **Chat Completions**, **Responses** or
   **Messages**.
3. VS Code opens `chatLanguageModels.json`. Edit it, for example:

```json
[
  {
    "vendor": "customendpoint",
    "apiKey": "${input:macStudioKey}",
    "apiType": "chat-completions",
    "models": [
      {
        "id": "qwen3.8-flash-next",
        "name": "Qwen3.8-Flash-Next (Mac Studio)",
        "url": "http://127.0.0.1:8080/v1",
        "toolCalling": true,
        "vision": false,
        "maxInputTokens": 114688,
        "maxOutputTokens": 16384,
        "modelOptions": { "temperature": 0.7, "top_p": 0.8 }
      }
    ]
  }
]
```

- **`id`** must match your server's `/v1/models` id.
- **`url`**: if it has no API path, VS Code appends one (`/chat/completions`, `/responses` or
  `/messages`) and inserts `/v1` when missing.
- **Remote Mac:** use your Tailscale URL (§7.3).
- **Messages API type:** set `"apiType": "messages"` and point `url` at the server root. This works
  with LM Studio, Ollama, llama.cpp, oMLX, mlx-serve and ds4.
- **Restart VS Code** if the model does not appear.
- **Agents window sessions:** enable `chat.agentHost.byokModels.enabled`.

**Limitations:**

- Inline suggestions, semantic search and embedding-based features still require GitHub.
- Business and Enterprise admins can disable BYOK by policy.

### 6.2 Cline and Kilo Code

These run in VS Code, and in VS Code forks such as Cursor and Devin Desktop through Open VSX.

**Cline:**

1. Open Settings and choose the API Provider:
   - **LM Studio** (`http://localhost:1234`)
   - **Ollama** (`http://localhost:11434`)
   - **OpenAI Compatible** (base URL such as `http://127.0.0.1:8080/v1`, plus API key and model id)
     for llama.cpp, oMLX, mlx-serve or ds4
2. Select the model.
3. Set **Context Window** to match the server exactly. The Cline CLI otherwise sends its own
   `num_ctx` to Ollama.
4. **Use Compact Prompt** (Settings → Features) cuts the system prompt by about 90%. It is great for
   27B-class models and slower machines, but you lose MCP tools and some features. Big Flash-class
   models with 128K context don't need it.

**Kilo Code:** providers include Ollama, LM Studio and OpenAI-compatible endpoints; configure them the
same way. Since v7 it runs on the OpenCode server and also works in JetBrains and the terminal.

### 6.3 Local autocomplete in VS Code: llama.vscode

Copilot's inline completions cannot use local models, so use **llama.vscode** (from ggml-org) for
fill-in-the-middle completion:

```bash
llama-server --fim-qwen-7b-default     # serves Qwen2.5-Coder-7B for FIM on port 8012
# more than 64 GB free: --fim-qwen-30b-default (Qwen3-Coder-30B-A3B); low memory: --fim-qwen-1.5b-default
```

1. Install **llama-vscode**.
2. Open its menu (click it in the status bar) → *Select/start env*, or point the completion endpoint at
   `http://<mac>:8012`.

It also offers chat and an agent (these use `/v1/chat/completions` with tools). It runs happily next
to a 27B chat model on 128 GB.

### 6.4 Cursor

Cursor is the weakest option for local models:

- **Everything goes through Cursor's servers**, so `localhost` does not work. You need a **public
  HTTPS URL**: Cloudflare Tunnel, ngrok, Tailscale Funnel, or a reverse proxy with a real
  certificate. Your code also still transits Cursor's backend.
- **Agent mode** sends OpenAI **Responses**-format requests to custom URLs. Use a server that
  implements `/v1/responses` (LM Studio, Ollama, oMLX, mlx-serve, ds4) or LiteLLM.
- **Tab completion** and **subagents** do not use custom models.

Setup:

1. Expose LiteLLM (with a key) through a tunnel ([§7.7](#77-public-https-only-if-you-must-cursor-cloud-agents)).
2. In Cursor Settings → Models:
   - Add a custom model name that equals the server's model id.
   - Enable the OpenAI API key field and enter your LiteLLM key.
   - Turn on **Override OpenAI Base URL** and set it to `https://<tunnel-host>/v1`.
3. If connections fail, set Settings → Network → **HTTP Compatibility Mode = HTTP/1.1**.

If local models matter to you, Cline or Kilo Code *inside* Cursor is often the better route.

### 6.5 Devin Desktop (formerly Windsurf) and Devin CLI

**Background:**

- On 2 June 2026 Windsurf became **Devin Desktop**.
- **Cascade** reached end of life on 1 July 2026 and was replaced by **Devin Local**.
- Windsurf's BYOK accepted keys only for specific first-party models (such as Claude), with **no
  custom base URL**.
- **Devin Local, Cascade and Devin CLI therefore cannot use your Mac Studio models.** The Devin
  CLI models page lists Anthropic, OpenAI, Google, Cognition and hosted open-source models only.

**Supported route: ACP agents.** Available on Pro, Max and Teams plans. Devin Desktop can host any
agent that speaks the Agent Client Protocol (Codex CLI, Claude Agent, OpenCode, Junie, Gemini CLI or
custom agents). Point one of them at your local models:

1. **Install OpenCode:** `curl -fsSL https://opencode.ai/install | bash`
2. **Configure OpenCode's local provider** in `~/.config/opencode/opencode.json` (see
   [§6.9](#opencode)).
3. **Register it.** Run *Open Local ACP Registry Config* from the Command Palette, which edits
   `~/.windsurf/acp/registry.json`. Devin Desktop does not download agent binaries; it launches ones
   already installed. Use absolute paths (check with `which opencode`), because GUI apps may not
   inherit your shell `PATH`:

```json
{
  "version": "1.0.0",
  "agents": [
    {
      "id": "opencode-local",
      "name": "OpenCode (Mac Studio models)",
      "version": "1.0.0",
      "description": "OpenCode using local models served by the Mac Studio",
      "authors": ["Anomaly"],
      "license": "MIT",
      "distribution": {
        "binary": {
          "darwin-aarch64": { "archive": "", "cmd": "/Users/YOU/.opencode/bin/opencode", "args": ["acp"] },
          "linux-x86_64":   { "archive": "", "cmd": "/home/YOU/.opencode/bin/opencode", "args": ["acp"] }
        }
      }
    }
  ],
  "extensions": []
}
```

4. **Enable it.** Command Palette → *Devin User Settings* → **Agents** tab → toggle
   *OpenCode (Mac Studio models)* on → restart Devin Desktop.
5. **Select it** in the agent selector (bottom right) when you start a new conversation.

**Alternatives:**

- Run **Claude Agent** or **Codex** as ACP agents and give them the local-endpoint environment
  variables from §6.9. Use the "…" button in the Agents tab, or `devin.acp.agentEnv.<agentName>` in
  `settings.json`.
- Install **Cline** or **Kilo Code** from the extension marketplace.

When you use an external ACP agent, Devin Desktop's privacy terms and billing no longer apply; the
agent (and your local server) handle everything.

### 6.6 Zed

Zed supports llama.cpp, LM Studio, Ollama and OpenAI-compatible servers natively, and
auto-discovers local models.

```jsonc
// ~/.config/zed/settings.json
{
  "language_models": {
    "llama.cpp": { "api_url": "http://localhost:8080" },          // `llama serve` router mode is auto-discovered
    "ollama":    { "api_url": "http://localhost:11434", "context_window": 131072 },  // Zed's Ollama default is only 4096!
    "lmstudio":  { "api_url": "http://localhost:1234/api/v0" }    // only needed for a non-default or remote host
  },
  "edit_predictions": {                                          // local "Tab" completions
    "provider": "open_ai_compatible_api",
    "open_ai_compatible_api": {
      "api_url": "http://localhost:8012/v1/completions",        // e.g. the llama.vscode FIM server above
      "model": "qwen2.5-coder-7b",
      "prompt_format": "qwen",
      "max_output_tokens": 256
    }
  }
}
```

- API keys: `LLAMACPP_API_KEY`, `LMSTUDIO_API_KEY` and `OLLAMA_API_KEY`, or the provider UI.
- Ollama is also a native edit-prediction provider.
- Zed can host ACP agents (OpenCode, Codex and so on) in its Agent Panel.

### 6.7 JetBrains IDEs

**AI Assistant:**

1. Go to **Settings → Tools → AI Assistant → Providers & API keys**.
2. Under *Third-party AI providers*, choose **LM Studio**, **Ollama** or **OpenAI-compatible**, enter
   the URL (local or remote), and click **Test Connection**.
3. Local models then appear in AI Chat and can be assigned to specific features.

Things to know:

- The default local context is **64,000 tokens**; adjust it in settings.
- MCP tool calls are not supported with local models, except through an **OpenAI-compatible**
  provider with **Tool calling** enabled.
- **Code completion:** set the completion provider to **OpenAI Compatible** with a base URL and a
  FIM-capable model.

**Junie** (JetBrains' agent, including the CLI):

1. Run `/account` → *Custom models and endpoints* → **LM Studio**, **Ollama** or **LiteLLM**.
2. Give the base URL (host and port only). Junie probes `/v1/models`.
3. Pick the model with `/model`.

**ACP agents in AI Chat:** three-dots menu → *Add Custom Agent* → edit `acp.json`:

```json
{ "default_mcp_settings": {}, "agent_servers": { "opencode-local": { "command": "/Users/YOU/.opencode/bin/opencode", "args": ["acp"] } } }
```

### 6.8 Xcode

1. Open Xcode → Settings → **Intelligence** → *Add a Chat Provider*.
2. Choose where the model runs:
   - **Locally Hosted** (same Mac): enter the port. `1234` for LM Studio, `11434` for Ollama, `8080`
     for `mlx_lm.server` or llama.cpp.
   - **Internet Hosted** (remote Mac Studio): enter the HTTPS URL (Tailscale Serve) and the API key.
3. Choose the model in the coding assistant sidebar.

The provider must support `/v1/models` and `/v1/chat/completions`. Apple's WWDC26 session "Run local
agentic AI on the Mac using MLX" demonstrates exactly this (`mlx_lm.server` → Xcode Locally Hosted
provider → agentic fixes to a SwiftUI project). Xcode's built-in Claude Agent and ChatGPT/Codex
integrations use those vendors' accounts. For local-only agentic work you can also run OpenCode or
Codex CLI in a terminal next to Xcode.

### 6.9 CLI coding agents

#### Claude Code

Use a wrapper so your normal `claude` command keeps using Anthropic:

```sh
#!/bin/sh
# ~/bin/claude-local: Claude Code against the Mac Studio (Anthropic Messages API)
unset ANTHROPIC_API_KEY                      # if set, it wins and you silently hit the cloud
export ANTHROPIC_BASE_URL="http://127.0.0.1:1234"   # LM Studio | llama.cpp :8080 | Ollama :11434 | ds4/oMLX :8000 | mlx-serve :11234
export ANTHROPIC_AUTH_TOKEN="${MACSTUDIO_API_KEY:-local}"
M="qwen3.8-flash-next"                       # the server's model id
export ANTHROPIC_MODEL="$M"
export ANTHROPIC_DEFAULT_OPUS_MODEL="$M"     # set EVERY alias: unset ones fall back to hosted models
export ANTHROPIC_DEFAULT_SONNET_MODEL="$M"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="$M"
export CLAUDE_CODE_SUBAGENT_MODEL="$M"
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
export CLAUDE_STREAM_IDLE_TIMEOUT_MS=600000  # long prefills on big prompts
exec claude "$@"
```

With Ollama you can simply run `ollama launch claude --model qwen3.8:27b-mlx`. Settings in
`~/.claude/settings.json` can override shell variables; run `/status` to confirm the endpoint.

#### Codex CLI

Codex speaks only the Responses API.

```toml
# ~/.codex/config.toml
oss_provider = "lmstudio"                 # or "ollama": used by `codex --oss`

[model_providers.macstudio]               # "openai", "ollama", "lmstudio" are reserved ids
name = "Mac Studio"
base_url = "http://127.0.0.1:1234/v1"     # LM Studio / Ollama / oMLX / mlx-serve / ds4; for llama.cpp put LiteLLM in front unless your build serves /v1/responses
env_key = "MACSTUDIO_API_KEY"
wire_api = "responses"                    # the only supported value since Feb 2026
stream_idle_timeout_ms = 1000000
```

```bash
codex --oss -m <model-id>                         # built-in local provider
codex -c model_provider=macstudio -m <model-id>   # custom (e.g. remote) provider
```

Load the model with **≥ 64K context** first. If LM Studio auto-loads it with its default context,
Codex will struggle. Profile handling changed in recent Codex versions; check `codex --help` if you
want named profiles.

#### OpenCode

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "macstudio/qwen3.8-flash-next",
  "small_model": "macstudio/qwen3.8-27b",
  "provider": {
    "macstudio": {
      "name": "Mac Studio (local)",
      "npm": "@ai-sdk/openai-compatible",
      "options": { "baseURL": "http://127.0.0.1:8080/v1", "apiKey": "{env:MACSTUDIO_API_KEY}" },
      "models": {
        "qwen3.8-flash-next": { "name": "Qwen3.8-Flash-Next", "tool_call": true, "limit": { "context": 131072, "output": 16384 } },
        "qwen3.8-27b":        { "name": "Qwen3.8-27B",        "tool_call": true, "limit": { "context": 131072, "output": 16384 } }
      }
    }
  }
}
```

Save it as `~/.config/opencode/opencode.json`. Two traps from evanwtf:

- A model that is **not declared** in `models` exits in under a second, which looks exactly like a
  model failure.
- With `opencode run`, pass **`--dir "$PWD"`**. Otherwise the background server writes files into
  its own working directory.

#### GitHub Copilot CLI

```bash
export COPILOT_PROVIDER_BASE_URL=http://localhost:11434    # Ollama example from GitHub's docs
export COPILOT_MODEL=qwen3.8:27b-mlx
# other OpenAI-compatible servers: set their base URL; COPILOT_PROVIDER_TYPE=openai|azure|anthropic; COPILOT_PROVIDER_API_KEY=...
copilot
```

#### Aider

```bash
export OPENAI_API_BASE=http://127.0.0.1:1234/v1 OPENAI_API_KEY=$MACSTUDIO_API_KEY
aider --model openai/<model-id>
```

#### Others

- `ollama launch` also configures **Pi**, **Droid**, **OpenClaw**, **Hermes**, **DeepSeek Harness
  (`dsh`)** and **Muse Code (`muse`)**.
- ds4's `docs/CLIENTS.md` has ready configs for Pi, OpenCode, Codex and Claude Code.

### 6.10 Reliability checklist for local agents

- [ ] **Context:** the server context is ≥ 64K, and the client's context limit is **≤ server**.
- [ ] **Tool calls:** the smoke test (§5.9) returns a structured tool call. If not, update the
  runtime, enable `--jinja`, or use the runtime's native template or tool parser. evanwtf measured a
  **23-point** pass-rate difference from tool-call formatting alone on one stack.
- [ ] **Right API:** Claude Code → Anthropic; Codex → Responses; everything else → Chat Completions.
- [ ] **No silent cloud fallback:** `ANTHROPIC_API_KEY` is unset, every model alias is set, and
  "Auto" model routing is off.
- [ ] **Thinking level** is set for the job; defaults like GLM's `max` are slow.
- [ ] **Model warm and cached:** keep-alive or TTL set, and prompt caching on.
- [ ] **Verify with tests:** local models occasionally ship plausible-looking but wrong code. evanwtf
  caught one small model producing non-compiling Swift from an otherwise clean run.

---

## 7. Remote access

**Yes, you can use the Mac Studio from anywhere.** Only inference goes to the Mac. The agent's tools
(file edits, shell commands) run on whichever machine runs the agent. Network latency is negligible
compared with generation time, and the bandwidth needed is tiny (text).

### 7.1 Recommended architecture

```
[Laptop / Linux workstation / iPhone]
  VS Code · Zed · JetBrains · Xcode · Devin Desktop (ACP) · Claude Code · Codex · OpenCode
          │  HTTPS over Tailscale (WireGuard), Bearer token
          ▼
[Mac Studio]  tailscale serve :443  → 127.0.0.1:1234  LM Studio     (or LiteLLM :4000 in front of everything, §7.8)
              tailscale serve :8443 → 127.0.0.1:8080  llama-server  (oMLX/ds4 :8000, mlx-serve :11234, ...)
              model servers bind to 127.0.0.1 only
```

### 7.2 Options compared

| Option | Reach | Setup | Security | Notes |
|---|---|---|---|---|
| **Tailscale** (tailnet IP or `tailscale serve`) | Anywhere, private | Easy | Excellent (WireGuard + ACLs); add a server key | **Recommended default** |
| **LM Link** (LM Studio) | Anywhere, private | Easiest if you use LM Studio | End-to-end encrypted, built on Tailscale | Remote models appear as local in LM Studio; `localhost` clients on the laptop are served by the Mac |
| **SSH tunnel** | Wherever SSH reaches | Easy | Good | Great ad-hoc; one command per session |
| **LAN binding** (`0.0.0.0`) | Home/office LAN | Trivial | Weak unless you add auth and the firewall | Fine on a trusted LAN with a key |
| **Public HTTPS** (Cloudflare Tunnel, ngrok, Tailscale Funnel) | The whole internet | Medium | Risky; mandatory auth | Only when a cloud service must reach you (Cursor) |

### 7.3 Tailscale (recommended)

**On the Mac Studio:**

1. Install Tailscale. Either use the Standalone app from tailscale.com/download, or install the
   open-source daemon, which also runs before anyone logs in to the GUI:
   `brew install tailscale`, then `sudo brew services start tailscale`, then `sudo tailscale up`.
2. Sign in.
3. In the admin console, enable **MagicDNS** and **HTTPS certificates**.
4. Publish local servers inside your tailnet over HTTPS. The servers stay on `127.0.0.1`:

```bash
tailscale serve --bg 1234                  # https://mac-studio.<tailnet>.ts.net       → LM Studio :1234
tailscale serve --bg --https=8443 8080     # https://mac-studio.<tailnet>.ts.net:8443  → llama-server :8080
tailscale serve status                     # show mappings;  `tailscale serve reset` removes them all
```

**On a laptop or Linux workstation:**

```bash
curl -fsSL https://tailscale.com/install.sh | sh && sudo tailscale up     # Linux (macOS/Windows/iOS: install the app)
curl -s https://mac-studio.<tailnet>.ts.net/v1/models -H "Authorization: Bearer $MACSTUDIO_API_KEY" | jq
```

Then use `https://mac-studio.<tailnet>.ts.net/v1` (or `...:8443/v1`) as the base URL in any client
in §6.

**Lock it down.** Tag the Mac (for example `tag:llm`) and allow only your own devices to reach it.
An example tailnet policy snippet, to adapt to your policy file:

```json
{
  "tagOwners": { "tag:llm": ["you@example.com"] },
  "acls": [ { "action": "accept", "src": ["you@example.com"], "dst": ["tag:llm:443,8443"] } ]
}
```

> **Ollama and proxies.** Ollama checks the `Host` header when it is bound to localhost. Its docs
> rewrite `Host` to `localhost:11434` in every proxy example (nginx, ngrok, cloudflared). Tailscale
> Serve does not rewrite it, so you may get `403 Forbidden`. Fixes:
> - Put **LiteLLM** in front (it talks to `127.0.0.1:11434`).
> - Or bind Ollama to `0.0.0.0` (`OLLAMA_HOST`) and reach it via the tailnet IP, with the macOS
>   firewall and tailnet ACLs as protection.

### 7.4 LM Link (if you use LM Studio)

1. Install LM Studio (or `llmster`) on **both** the Mac Studio and the laptop.
2. On each, open *LM Link* in the sidebar, or run `lms login` then `lms link enable` on headless
   machines.
3. Remote models appear in the laptop's model loader.
4. Any tool pointed at the **laptop's** `http://localhost:1234` can use models loaded on the Mac
   Studio, as long as the laptop's LM Studio server is running. That includes Claude Code, Codex,
   VS Code Custom Endpoint and Zed.

LM Link is end-to-end encrypted and runs over Tailscale-based mesh networking in userspace, with no
open ports. On iPhone and iPad, the **Locally** app connects to your LM Link.

### 7.5 SSH tunnels

```bash
# From any client machine (Remote Login must be enabled on the Mac):
ssh -N -L 1234:127.0.0.1:1234 -L 8080:127.0.0.1:8080 -L 11434:127.0.0.1:11434 you@mac-studio.local
# now use http://localhost:1234/v1 etc. on the client, exactly as if the models were local
```

This works well for tools that insist on `localhost`, such as the VS Code Ollama extension, which
discovers `127.0.0.1:11434`.

### 7.6 LAN-only access

| Runtime | How to listen on the LAN |
|---|---|
| LM Studio | `lms server start --bind 0.0.0.0` (turn on *Require Authentication*) |
| Ollama | `launchctl setenv OLLAMA_HOST 0.0.0.0:11434`, then restart the app (no auth: LAN you trust only) |
| llama.cpp | `--host 0.0.0.0 --api-key-file ...` |

Keep the macOS firewall on, and prefer Tailscale even at home.

### 7.7 Public HTTPS (only if you must: Cursor, cloud agents)

```bash
brew install cloudflared
cloudflared tunnel --url http://127.0.0.1:4000     # quick tunnel to LiteLLM → https://<random>.trycloudflare.com
```

- Always expose a **gateway with keys** (LiteLLM), never a raw model server.
- Prefer a named tunnel with **Cloudflare Access** (service tokens) for anything long-lived.
- Stop the tunnel when you are done.
- Remember that Cursor still routes your prompts and code through its own servers.

### 7.8 Authentication and a LiteLLM gateway

**Built-in authentication by runtime:**

| Runtime | Auth |
|---|---|
| LM Studio | API tokens ("Require Authentication"); accepts Bearer or `x-api-key` |
| llama.cpp | `--api-key` / `--api-key-file` |
| mlx-serve | API key for off-machine requests |
| oMLX | API key setting |
| Ollama, `mlx_lm.server`, ds4 | **none**: keep them on `127.0.0.1` and put a gateway in front |

**LiteLLM** gives one endpoint with virtual keys, routing to all local servers, logging and rate
limits. Recent versions expose `/v1/chat/completions`, `/v1/responses` and an Anthropic-style
`/v1/messages`.

```yaml
# ~/litellm.yaml
model_list:
  - model_name: qwen3.8-flash-next
    litellm_params:
      model: openai/qwen3.8-flash-next          # "openai/" = any OpenAI-compatible backend
      api_base: http://127.0.0.1:8080/v1        # llama-server
      api_key: os.environ/LLAMA_API_KEY
  - model_name: qwen3.8-27b
    litellm_params:
      model: openai/<lm-studio-model-id>
      api_base: http://127.0.0.1:1234/v1        # LM Studio
      api_key: os.environ/LMSTUDIO_API_KEY
  - model_name: qwen3.6-coding
    litellm_params:
      model: ollama_chat/qwen3.6:27b-coding-mxfp8
      api_base: http://127.0.0.1:11434          # Ollama (no Host-header problem: LiteLLM connects locally)
general_settings:
  master_key: os.environ/LITELLM_MASTER_KEY     # clients send: Authorization: Bearer <key>
```

```bash
export LLAMA_API_KEY=$(cat ~/.config/llama/api-key) LMSTUDIO_API_KEY=... LITELLM_MASTER_KEY=sk-$(openssl rand -hex 24)
uvx --from 'litellm[proxy]' litellm --config ~/litellm.yaml --host 127.0.0.1 --port 4000
tailscale serve reset         # drop the direct mappings from §7.3 ...
tailscale serve --bg 4000     # ... and publish only the gateway: https://mac-studio.<tailnet>.ts.net/v1 for every client
```

### 7.9 Pointing clients at the remote Mac

| Client | Setting |
|---|---|
| VS Code Custom Endpoint | `"url": "https://mac-studio.<tailnet>.ts.net/v1"` plus the LiteLLM or server key |
| Cline / Kilo Code | Provider *OpenAI Compatible* → base URL `https://mac-studio.<tailnet>.ts.net/v1` |
| Zed | `"api_url": "https://mac-studio.<tailnet>.ts.net:8443"` (llama.cpp), and the key in the provider UI |
| JetBrains / Junie | Provider URL = the tailnet URL, then *Test Connection* |
| Xcode | *Internet Hosted* → tailnet URL + key |
| Claude Code | `ANTHROPIC_BASE_URL=https://mac-studio.<tailnet>.ts.net` |
| Codex | `base_url = "https://mac-studio.<tailnet>.ts.net/v1"` in your custom provider |
| OpenCode | `"baseURL": "https://mac-studio.<tailnet>.ts.net/v1"` |
| Phone | LM Studio's *Locally* app (LM Link), or any OpenAI-compatible chat app pointed at the tailnet URL |

### 7.10 Security checklist

- [ ] Model servers bind to `127.0.0.1`; remote access only through Tailscale, LM Link, SSH or a
  keyed gateway.
- [ ] Every remotely reachable endpoint requires a key. Keys are stored in files or the keychain,
  **not** in shell history or committed configs.
- [ ] Tailnet ACLs restrict the Mac to your own devices.
- [ ] No raw ports forwarded on the router. Public tunnels only temporarily and always behind auth.
- [ ] CORS stays off unless a browser app needs it (`lms server start --cors` lets *any* website
  call your server).
- [ ] Agents run with confirmation for shell commands, especially with smaller models.
- [ ] Keep runtimes updated. They parse untrusted input (model files, prompts).

---

## 8. Operations and maintenance

**Monitoring:**

- Activity Monitor → Memory → *Memory Pressure*. It should stay green or yellow; red means swapping,
  which is catastrophic for speed.
- `ollama ps` and `lms ps` show what is loaded.
- `curl localhost:8080/health` for llama.cpp.
- Terminal GPU and power monitors: `sudo powermetrics`, or `mactop` / `asitop` from Homebrew.

**Updates:**

| Component | How often |
|---|---|
| llama.cpp | Weekly (new architectures and fixes land constantly) |
| LM Studio | Update the app **and** its runtimes |
| Ollama | Auto-updates |
| Models | Re-pull when the provider fixes a chat template; tool-calling bugs are often template bugs |

**Disk:** check usage with
`du -sh ~/.ollama/models ~/.lmstudio/models ~/.cache/huggingface ~/ds4/gguf`. Delete models you no
longer use; 100–340 GB each adds up fast.

**Power and thermals:** the Mac Studio is rated for up to 480 W continuous. Leave airflow room around
it. Sustained agent loops keep the GPU busy for hours, and ds4 `--power` can trade speed for lower
load.

**Keep a model log:** which model, quant, runtime version and settings worked for which tasks.
Results genuinely depend on the whole stack (model, quant, engine and client).

---

## 9. Scaling beyond one Mac

- **512 GB M5 Ultra** (late October 2026): DeepSeek-V4.1-Flash Q4 resident, DeepSeek-V4-Pro Q2, and
  GLM-5.x at higher precision.
- **Two or more Macs over Thunderbolt 5**
  - macOS 26.2+ supports **RDMA over Thunderbolt**, and Apple reports up to about 3× speed-ups with
    four nodes in MLX distributed inference.
  - MLX shards a model across Macs with `mlx.launch --hostfile hosts.json --backend jaccl` and
    `mlx_lm.server`.
  - **ds4** runs 4-bit DeepSeek Flash or GLM-5.3-Flash with tensor parallelism across **two 128 GB
    Macs** (RDMA or TCP), and pipeline parallelism across more machines.
  - Two 128 GB M5 Max Studios cost about the same as one 256 GB Ultra but are more complex to run.
- **SSD streaming:** ds4 `--ssd-streaming` keeps non-routed weights resident and caches experts
  loaded from the SSD. Bigger-than-RAM models become possible, at a clear speed cost.

---

## 10. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Model refuses to load / "insufficient memory" with RAM apparently free | GPU wired-memory cap | Raise `iogpu.wired_limit_mb` (§5.2); verify it survived the reboot (`0` = default) |
| Swapping, the whole Mac crawls | Cap set too high, or two big models loaded | Leave 8–16 GB or more for macOS; unload other models; smaller quant or context |
| `unknown model architecture` | Runtime older than the model | Update llama.cpp (build master), LM Studio runtimes or Ollama; or use an engine that supports it (ds4, oMLX, mlx-serve) |
| Agent loops, "forgets" files, truncated answers | Context silently small (Ollama's 4K on small machines, Zed's 4096 default, LM Studio auto-load default, Cline's `num_ctx`) | Set context explicitly on server **and** client |
| Tool calls come back as plain text or JSON in the answer | Chat template or tool parser mismatch | Update runtime; `--jinja`; use the model's official template; re-pull the model |
| Claude Code bills your Anthropic account or uses a cloud model | `ANTHROPIC_API_KEY` set, or unset model aliases | Use the wrapper in §6.9 (unset the key, set every alias), then `/status` |
| Codex errors on start | Provider uses `wire_api = "chat"` or the server lacks `/v1/responses` | Use `wire_api = "responses"` with LM Studio, Ollama, oMLX, mlx-serve or ds4, or LiteLLM in front |
| Cursor: "trouble connecting to the model provider" | Not a public HTTPS URL; Responses format; HTTP/2 | Tunnel plus gateway (§7.7); server with `/v1/responses`; HTTP/1.1 compatibility mode |
| `403 Forbidden` through a proxy to Ollama | Host-header check | LiteLLM in front, or bind `0.0.0.0` (§7.3) |
| First response takes 20–60 s | Cold prefill of a large agent prompt | Keep the model warm; prompt/KV caching (oMLX, ds4 disk KV); Cline compact prompt; M5 Ultra ≈ 2× faster prefill |
| Speculative decoding "enabled" but no speed-up | Engine only speculates in some modes, or the draft head was dropped (GGUF conversions of Qwen3.8-Flash-Next) | Measure tok/s; use MLX builds with MTP; check server logs |
| OpenCode exits instantly | Model not declared in `provider.models` | Declare the exact server model id |
| Devin Desktop doesn't show your ACP agent | Not enabled, wrong binary path, or plan lacks ACP | Enable it in *Devin User Settings → Agents*; use absolute paths; restart; *Reload ACP Connections* |

---

## 11. Realistic expectations and a hybrid strategy

**Where local shines:**

- **Privacy:** code never leaves your network.
- **Zero marginal cost:** run agents 24/7. MacStories ran a local research-agent fleet for 99 days
  for $0.
- **Offline work.**
- **Bulk and background work:** refactors, test generation, docs, triage, subagents.
- **No rate limits, and a model nobody can deprecate on you.**

**Where it falls short:**

- **Hardest tasks.** Frontier models still lead clearly on the newest, hardest benchmarks
  (Terminal-Bench 3.0/4.0, NL2Repo, ProgramBench), even though the best local-feasible models
  (DeepSeek-V4.1-Flash, GLM-5.3-Flash, Qwen3.8-Flash-Next) now match them on several agentic
  benchmarks.
- **Quantization.** The 2–4-bit builds needed on 128 GB lose some of the published quality.
- **Speed.** Local decode is ~30–110 tok/s, versus 100–300+ tok/s from specialized cloud
  providers. Prompt processing is ~1–3K tok/s, so large agent prompts cost seconds to tens of
  seconds without caching.

**A strategy that works:**

1. **Default to local** for everyday agent work (Qwen3.8-27B or Flash-Next) and for everything
   sensitive.
2. **Escalate to a frontier cloud model** for the hardest problems, architecture decisions and final
   reviews. Or let a cloud orchestrator drive **local subagents**, as MacStories did with Codex.
3. **Cascade on failure.** Try the cheaper model first and escalate only when tests fail. Together
   AI measured this with GLM-5.3-Flash → GLM-5.3: 80.9% of DeepSWE solved, versus 69.0% for the big
   model alone, at 57% lower cost.
4. **Evaluate on your own repositories.** Take 10–20 real past issues with tests and run them through
   2–3 local stacks. That tells you more than any leaderboard.

---

## Appendix A: Ports, endpoints and config file locations

| Server | Default port | OpenAI base URL | Anthropic base URL | Responses API |
|---|---|---|---|---|
| Ollama | 11434 | `http://localhost:11434/v1` | `http://localhost:11434` | ✅ |
| LM Studio | 1234 | `http://localhost:1234/v1` | `http://localhost:1234` | ✅ |
| llama.cpp (`llama-server` / `llama serve`) | 8080 | `http://localhost:8080/v1` | `http://localhost:8080` | check your build; otherwise LiteLLM |
| llama.vscode FIM presets | 8012 | `/infill`, `/v1/completions` | none | none |
| `mlx_lm.server` | 8080 | `http://localhost:8080/v1` | none | none |
| oMLX | 8000 | `http://localhost:8000/v1` | `http://localhost:8000` | ✅ |
| mlx-serve | 11234 | `http://localhost:11234/v1` | `http://localhost:11234` | ✅ |
| ds4-server | 8000 | `http://127.0.0.1:8000/v1` | `http://127.0.0.1:8000` | ✅ |
| LiteLLM | 4000 | `http://localhost:4000/v1` | `http://localhost:4000` | ✅ |

oMLX and ds4 both default to port 8000. Change one of them (ds4: `--port`) if you run both.

| Client | Config location |
|---|---|
| OpenCode | `~/.config/opencode/opencode.json` |
| Codex CLI | `~/.codex/config.toml` |
| Claude Code | environment variables / `~/.claude/settings.json` |
| VS Code Copilot BYOK | `chatLanguageModels.json` (opened from *Manage Language Models*) |
| Devin Desktop ACP | `~/.windsurf/acp/registry.json` (*Open Local ACP Registry Config*) |
| Zed | `~/.config/zed/settings.json` |
| JetBrains ACP | `acp.json` (AI Chat → *Add Custom Agent*) |
| Pi | `~/.pi/agent/models.json` |

## Appendix B: Glossary

- **Dense / MoE / active parameters:**
  - Dense models use every weight for every token.
  - Mixture-of-Experts models route each token through a few "experts". Memory scales with *total*
    parameters and speed with *active* parameters.
- **Prefill / decode / TTFT:**
  - Prefill reads the prompt and is compute-bound.
  - Decode generates tokens and is bandwidth-bound.
  - Time-to-first-token (TTFT) is essentially prefill time.
- **KV cache:** per-token attention state that grows with context. Hybrid linear or sparse attention
  shrinks it dramatically.
- **Quantization formats:**
  - **GGUF** is the llama.cpp/Ollama/LM Studio format. It includes *K-quants* (`Q4_K_M`, `Q8_0`),
    *I-quants* (`IQ2_XXS`, `IQ4_XS`) and Unsloth *Dynamic* (`UD-*`).
  - **MLX** checkpoints are affine 2–8-bit, often "mixed" (for example 4-bit experts and 8-bit
    attention). *DWQ* and *oQ* are calibrated MLX variants.
  - **MXFP4/MXFP8/NVFP4** are microscaled floating-point formats.
  - **REAP** means expert-*pruned*, which changes the model.
- **MTP / speculative decoding:** a small draft head or model proposes several tokens that the big
  model verifies in one pass. Often 2–3× faster on code. Exact-verification modes are lossless,
  while some engines also offer faster "opportunistic" sampling modes. DFlash and DSpark are drafter
  variants; PLD (prompt-lookup decoding) drafts from text already in context.
- **FIM (fill-in-the-middle):** completion using the code before *and after* the cursor. It needs
  FIM-trained models.
- **ACP (Agent Client Protocol):** an open protocol that lets editors host coding agents. It is used
  by Zed, JetBrains and Devin Desktop.
- **BYOK:** bring your own key or model endpoint.
- **Wired memory cap:** the macOS limit on how much unified memory the GPU may wire
  (`iogpu.wired_limit_mb`).

## Appendix C: Sources

Hardware and reviews:
- Apple, Mac Studio technical specifications: https://www.apple.com/mac-studio/specs/
- MacRumors, M5 Max vs M5 Ultra buyer's guide: https://www.macrumors.com/guide/m5-max-vs-m5-ultra/
- VettedConsumer, "M5 Max vs M5 Ultra for Local LLMs" (prices, memory cap): https://vettedconsumer.com/mac-studio-m5-max-vs-m5-ultra-local-llm-96gb-128gb/
- MacStories, M5 Ultra Mac Studio review (oMLX measurements, Tailscale, Codex): https://www.macstories.net/stories/m5-ultra-mac-studio-review-the-dream-mac-for-local-ai-agents/
- BGR, Mac Studio (M5 Ultra) review: https://www.bgr.com/2264114/mac-studio-m5-ultra-review/
- LLMCheck per-machine rankings and estimates: https://llmcheck.net/best-llm/mac-studio-m5-max-128gb/ and https://llmcheck.net/best-llm/mac-studio-m5-ultra-256gb/
- evanwtf/local-llm (measured agent benchmarks on an M5 Max 128 GB): https://github.com/evanwtf/local-llm (see `RECOMMENDATIONS.md`, `hardware/MacBook-Pro-M5-Max-128GB-*/RECOMMENDATIONS.md`, `docs/stacks.md`)
- Apple WWDC26, "Run local agentic AI on the Mac using MLX": https://developer.apple.com/videos/play/wwdc2026/232/
- Apple, Coding intelligence in Xcode: https://developer.apple.com/documentation/xcode/coding-intelligence

Models:
- Qwen3.8 (27B, 2.4T) repository and model cards: https://github.com/QwenLM/Qwen3.8 · https://huggingface.co/Qwen/Qwen3.8-27B
- Qwen3.8-Flash-Next model card: https://huggingface.co/Qwen/Qwen3.8-Flash-Next
- DeepSeek-V4 (Flash/Pro) model card: https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash · vLLM recipe (0731 release notes): https://recipes.vllm.ai/deepseek-ai/DeepSeek-V4-Flash
- DeepSeek-V4.1-Flash technical report: https://arxiv.org/html/2609.19969v1 · launch benchmark summary: https://www.ashna.ai/blogs/deepseek-v4-1-flash-launch-benchmarks
- GLM-5.3-Flash model card: https://huggingface.co/zai-org/GLM-5.3-Flash · GLM-5 repo: https://github.com/zai-org/glm-5 · benchmark summary: https://www.qubrid.com/blog/glm-53-flash-benchmarks-official-and-independent-results
- Together AI, GLM-5.3 vs GLM-5.3-Flash on DeepSWE: https://www.together.ai/blog/glm-5-3-vs-glm-5-3-flash-on-deepswe-cost-coding-and-routing
- MiniMax-M3: https://huggingface.co/MiniMaxAI/MiniMax-M3
- Muse Glimmer-30B: https://huggingface.co/meta-models/Muse-Glimmer-30B
- KAT-Coder-V2.5-Dev: https://huggingface.co/Kwaipilot/KAT-Coder-V2.5-Dev
- Inkling-Small: https://huggingface.co/thinkingmachines/Inkling-Small
- Vals SWE-bench runs (via BenchLeader): https://www.benchleader.com/benchmarks/vals_swebench
- Qwen3.8-Flash-Next engine comparison on M4 Max (MTP vs GGUF): https://huggingface.co/orcarouter/Qwen3.8-Flash-Next-Uncensored-GGUF/discussions/5

Runtimes:
- Ollama docs (context length, FAQ, Claude Code, VS Code, Xcode): https://docs.ollama.com/context-length · https://docs.ollama.com/faq · https://docs.ollama.com/integrations/claude-code · https://docs.ollama.com/integrations/vscode · https://docs.ollama.com/integrations/xcode
- Ollama MLX engine: https://ollama.com/blog/mlx-performance · releases: https://github.com/ollama/ollama/releases
- LM Studio CLI, Anthropic compatibility, LM Link: https://lmstudio.ai/docs/cli · https://lmstudio.ai/docs/developer/anthropic-compat · https://lmstudio.ai/docs/lmlink
- llama.cpp: https://github.com/ggml-org/llama.cpp · `llama serve` docs: https://llama.app/docs/serve · API: https://llama.app/docs/api · DeepSeek V4 support PR: https://github.com/ggml-org/llama.cpp/pull/24162 · Qwen3.8-Flash-Next PR: https://github.com/ggml-org/llama.cpp/pull/27742 · Anthropic API in llama.cpp: https://huggingface.co/blog/ggml-org/anthropic-messages-api-in-llamacpp
- mlx-lm: https://github.com/ml-explore/mlx-lm
- oMLX: https://github.com/jundot/omlx · https://omlx.ai/
- mlx-serve: https://github.com/ddalcu/mlx-serve · https://mlxserve.com/
- ds4 / DwarfStar: https://github.com/antirez/ds4 (see `docs/MODELS.md`, `docs/METAL.md`, `docs/CLIENTS.md`)

IDEs and agents:
- VS Code language models / BYOK / Custom Endpoint: https://github.com/microsoft/vscode-docs/blob/main/docs/agent-customization/language-models.md
- GitHub Copilot CLI BYOK: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/use-byok-models
- Cursor local-model limitations (forum): https://forum.cursor.com/t/how-can-i-use-a-local-llm-on-my-desktop-ai-computer/152419
- Devin Desktop (ex-Windsurf) announcement and ACP docs: https://devin.ai/blog/windsurf-is-now-devin-desktop · https://docs.devin.ai/desktop/acp
- Zed local models and edit predictions: https://zed.dev/docs/ai/use-a-local-model · https://zed.dev/blog/edit-prediction-providers
- JetBrains AI Assistant custom/local models: https://www.jetbrains.com/help/ai-assistant/use-custom-models.html · Junie + LM Studio: https://junie.jetbrains.com/docs/custom-llm-lm-studio.html
- Cline local models: https://docs.cline.bot/running-models-locally/overview
- llama.vscode: https://github.com/ggml-org/llama.vscode
- Continue acquisition: https://thenewstack.io/cursor-acquires-continue-coding/ · Roo Code / Kilo Code status: https://agentscamp.com/guides/comparisons/cline-vs-kilo-code-vs-roo-code

Remote access:
- Tailscale Serve: https://tailscale.com/docs/features/tailscale-serve · CLI reference: https://tailscale.com/docs/reference/tailscale-cli/serve
- LM Link (LM Studio × Tailscale): https://lmstudio.ai/link
