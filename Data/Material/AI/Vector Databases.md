## 1. Vector Databases

### Table of Contents

- [1.1 Definition](#11-definition)
- [1.2 How Embeddings Work](#12-how-embeddings-work)
- [1.3 How Vector Databases Work](#13-how-vector-databases-work)
- [1.4 Similarity Metrics](#14-similarity-metrics)
- [1.5 Popular Vector Databases](#15-popular-vector-databases)
- [1.6 Example: Using ChromaDB](#16-example-using-chromadb)
- [1.7 Pros and Cons](#17-pros-and-cons)

### 1.1 Definition

A **vector database** (vectorized DB) is a specialized database designed to store,
index, and query **high-dimensional vectors** (embeddings). These embeddings are
numerical representations of data (text, images, audio) that capture *semantic
meaning*.

### 1.2 How Embeddings Work

```mermaid
flowchart TB
    Text[Text: "The cat sat on the mat"]
    Model[Embedding Model\n(e.g., OpenAI text-embedding-3-small)]
    Vector[Vector: [0.023, -0.041, 0.087, ..., 0.012]\n1536 dimensions]

    Text --> Model --> Vector
```

**Key insight:** Similar meanings produce vectors that are *close together* in
vector space, regardless of the exact words used.

```
"How do I reset my password?"  ←─── cosine similarity: 0.92 ───→  "Password recovery steps"
"How do I reset my password?"  ←─── cosine similarity: 0.23 ───→  "Best pizza in New York"
```

### 1.3 How Vector Databases Work

```mermaid
flowchart TB
    subgraph VectorDB[VECTOR DATABASE]
        StoreTable[Storage Table\nID | Vector (embedding) | Metadata]
        Doc1[doc_1\n[0.02, -0.04, ...]\n{src: "api"}]
        Doc2[doc_2\n[0.15, 0.03, ...]\n{src: "auth"}]
        Doc3[doc_3\n[-0.01, 0.22, ...]\n{src: "db"}]

        StoreTable --> Doc1
        StoreTable --> Doc2
        StoreTable --> Doc3

        Indexes[Indexing Algorithms\n- HNSW\n- IVF\n- PQ\n- ScaNN]
    end

    Query[Query: "How does authentication work?"]
    QEmbed[embed → [0.14, 0.02, ...]]
    Neighbors[Nearest neighbors\nReturns doc_2 (similarity: 0.94)]

    Query --> QEmbed --> Neighbors --> Doc2
```

### 1.4 Similarity Metrics

| Metric | Formula | Best For |
|---|---|---|
| **Cosine Similarity** | cos(θ) = A·B / (‖A‖·‖B‖) | Text similarity (most common) |
| **Euclidean Distance** | √Σ(aᵢ - bᵢ)² | When magnitude matters |
| **Dot Product** | Σ(aᵢ × bᵢ) | Normalized vectors, performance |

### 1.5 Popular Vector Databases

| Database | Type | Key Features |
|---|---|---|
| **Pinecone** | Cloud-managed | Serverless, easy setup, metadata filtering |
| **Weaviate** | Open-source | GraphQL API, hybrid search, multi-modal |
| **ChromaDB** | Open-source | Lightweight, embedded, great for prototyping |
| **Qdrant** | Open-source | Rust-based, high performance, rich filtering |
| **Milvus** | Open-source | Distributed, handles billions of vectors |
| **pgvector** | PostgreSQL extension | Use your existing Postgres with vector support |
| **FAISS** | Library (Meta) | Not a DB; in-memory index for fast similarity search |

### 1.6 Example: Using ChromaDB

```python
import chromadb
from chromadb.utils import embedding_functions

# Initialize
client = chromadb.PersistentClient(path="./chroma_data")
ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="sk-...",
    model_name="text-embedding-3-small"
)

# Create collection
collection = client.get_or_create_collection(
    name="codebase_docs",
    embedding_function=ef
)

# Add documents
collection.add(
    documents=[
        "The authentication module uses JWT tokens with RS256 signing.",
        "Database migrations are managed with Knex.js.",
        "The API rate limiter allows 100 requests per minute per user.",
    ],
    ids=["doc1", "doc2", "doc3"],
    metadatas=[
        {"module": "auth"},
        {"module": "database"},
        {"module": "api"},
    ]
)

# Query
results = collection.query(
    query_texts=["How does login work?"],
    n_results=2
)
# Returns: doc1 (auth/JWT) with highest similarity
```

### 1.7 Pros and Cons

| Pros | Cons |
|---|---|
| Semantic search (meaning, not just keywords) | Embedding quality depends on the model |
| Fast nearest-neighbor retrieval | Additional infrastructure to manage |
| Scalable to billions of vectors | Not suitable for exact-match or transactional queries |
| Enable RAG, recommendation, anomaly detection | Approximate results (trade-off: speed vs. accuracy) |
