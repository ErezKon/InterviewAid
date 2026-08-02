## 1. RAG — Retrieval-Augmented Generation

### Table of Contents

- [1.1 Definition](#11-definition)
- [1.2 Why RAG Exists](#12-why-rag-exists)
- [1.3 How RAG Works](#13-how-rag-works)
- [1.4 Chunking Strategies](#14-chunking-strategies)
- [1.5 Advanced RAG Patterns](#15-advanced-rag-patterns)
- [1.6 RAG vs Fine-Tuning](#16-rag-vs-fine-tuning)

### 1.1 Definition

**RAG (Retrieval-Augmented Generation)** is an architecture pattern that enhances
LLM responses by **retrieving relevant information from external knowledge sources**
and injecting it into the prompt before generation. This grounds the model's
output in factual, up-to-date, domain-specific data.

### 1.2 Why RAG Exists

| Problem with Plain LLMs | How RAG Solves It |
|---|---|
| Knowledge cutoff (training data is stale) | Retrieves current information |
| Hallucinations | Grounds answers in real documents |
| No access to private/proprietary data | Indexes your internal docs |
| Context window limits | Retrieves only relevant chunks |
| Expensive fine-tuning | No retraining needed — just update the index |

### 1.3 How RAG Works

```mermaid
flowchart TB
    subgraph Indexing[INDEXING PHASE\n(done once / on update)]
        Docs[Documents\n(PDFs, code, docs, wikis, APIs)]
        Chunk[1. Chunk documents]
        Embed[2. Generate embeddings]
        Store[3. Store in Vector DB]

        Docs --> Chunk --> Embed --> Store
    end

    subgraph Query[QUERY PHASE\n(every user query)]
        QueryInput[User Query]
        QEmbed[1. Embed the query]
        Search[2. Search Vector DB (top-k)]
        Retrieve[3. Retrieve relevant chunks]
        BuildPrompt[4. Construct augmented prompt\n[System + Context + Query]]
        CallLLM[5. Send to LLM]
        Answer[6. LLM generates grounded answer]
    end

    QueryInput --> QEmbed --> Search --> Retrieve --> BuildPrompt --> CallLLM --> Answer

    subgraph AugmentedPrompt[AUGMENTED PROMPT]
        SystemMsg[System: You are a helpful assistant.\nAnswer based on the provided context only.]
        Context[Context:\n[Retrieved chunk 1]\n[Retrieved chunk 2]\n[Retrieved chunk 3]]
        UserQ[User Question: {query}]
    end

    BuildPrompt --> AugmentedPrompt
```

### 1.4 Chunking Strategies

How you split documents significantly impacts retrieval quality.

| Strategy | Description | Best For |
|---|---|---|
| **Fixed-size** | Split every N characters/tokens | Simple, predictable |
| **Recursive** | Split by paragraphs → sentences → words | General purpose |
| **Semantic** | Split by meaning boundaries using embeddings | High-quality retrieval |
| **Code-aware** | Split by functions, classes, modules | Codebases |
| **Document-aware** | Split by headers, sections | Structured docs (Markdown, HTML) |

```python
# Example: Recursive chunking with LangChain
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,     # Overlap prevents losing context at boundaries
    separators=["\n\n", "\n", ". ", " ", ""]
)

chunks = splitter.split_text(document_text)
```

### 1.5 Advanced RAG Patterns

#### Naive RAG

Query → Embed → Retrieve → Generate

Simple but often insufficient for complex queries.

#### Advanced RAG

| Technique | Description |
|---|---|
| **Query Rewriting** | Rephrase the user query for better retrieval |
| **HyDE** (Hypothetical Document Embeddings) | Generate a hypothetical answer, embed it, use that for retrieval |
| **Multi-Query** | Generate multiple query variations, retrieve for each, merge results |
| **Re-Ranking** | Retrieve top-50, then use a cross-encoder to re-rank to top-5 |
| **Contextual Compression** | Compress retrieved chunks to only the relevant parts |
| **Parent-Child Retrieval** | Retrieve small chunks but return the larger parent chunk |

#### Modular RAG / Agentic RAG

```
Query → Agent decides:
  ├── Do I need retrieval at all?
  ├── Which knowledge base(s) to search?
  ├── Should I decompose the query first?
  ├── Are the retrieved results sufficient?
  │     └── No → reformulate query and retry
  └── Generate final answer from best context
```

### 1.6 RAG vs Fine-Tuning

| Dimension | RAG | Fine-Tuning |
|---|---|---|
| Knowledge update | Easy — update the index | Hard — retrain the model |
| Cost | Low (embedding + storage) | High (GPU training) |
| Transparency | High — can cite sources | Low — knowledge is implicit |
| Latency | Higher (retrieval step) | Lower (direct generation) |
| Best for | Factual Q&A, docs, codebase | Style, tone, format, specialized reasoning |
