# 1. Foundations & Complexity Analysis

## Table of Contents

- [1.1 Big-O at a Glance](#11-big-o-at-a-glance)
- [1.2 Amortized Analysis — Why It Matters at Principal Level](#12-amortized-analysis-why-it-matters-at-principal-level)
- [1.3 Memory Layout Mental Model](#13-memory-layout-mental-model)

---


## 1.1 Big-O at a Glance

```mermaid
graph LR
    subgraph "⏱️ Time Complexity Hierarchy (Best → Worst)"
        A["O(1)<br/>Constant"] -->|slower| B["O(log n)<br/>Logarithmic"]
        B -->|slower| C["O(n)<br/>Linear"]
        C -->|slower| D["O(n log n)<br/>Linearithmic"]
        D -->|slower| E["O(n²)<br/>Quadratic"]
        E -->|slower| F["O(2ⁿ)<br/>Exponential"]
        F -->|slower| G["O(n!)<br/>Factorial"]
    end

    style A fill:#27ae60,stroke:#1e8449,color:#fff
    style B fill:#2ecc71,stroke:#27ae60,color:#fff
    style C fill:#f1c40f,stroke:#f39c12,color:#000
    style D fill:#e67e22,stroke:#d35400,color:#fff
    style E fill:#e74c3c,stroke:#c0392b,color:#fff
    style F fill:#8e44ad,stroke:#6c3483,color:#fff
    style G fill:#2c3e50,stroke:#1a252f,color:#fff
```

## 1.2 Amortized Analysis — Why It Matters at Principal Level

> **Key Insight:** A single expensive operation averaged over many cheap operations can still be efficient. This is critical for `List<T>.Add()`, `StringBuilder`, and `Dictionary<K,V>` resizing.

```csharp
// Example: Dynamic Array amortized cost
// Doubling strategy: When capacity is full, allocate 2x
// Cost of n insertions = n + (1 + 2 + 4 + 8 + ... + n) = n + 2n - 1 ≈ 3n
// Amortized cost per insertion = 3n / n = O(1)

public class AmortizedDemo
{
    public static void Demonstrate()
    {
        var list = new List<int>(); // Initial capacity: 0
        for (int i = 0; i < 17; i++)
        {
            list.Add(i);
            // Capacity doubles: 0→4→8→16→32
            Console.WriteLine($"Count={list.Count}, Capacity={list.Capacity}");
        }
    }
}
```

## 1.3 Memory Layout Mental Model

```mermaid
graph TB
    subgraph "🧠 Memory Layout"
        subgraph "Stack Memory (Fast, LIFO)"
            S1["Value types<br/>int, struct, bool"]
            S2["References/Pointers"]
            S3["Method call frames"]
        end
        subgraph "Heap Memory (Managed by GC)"
            H1["Reference types<br/>class instances"]
            H2["Arrays"]
            H3["Strings"]
            H4["Boxed value types"]
        end
        S2 -.->|"points to"| H1
    end

    style S1 fill:#3498db,stroke:#2980b9,color:#fff
    style S2 fill:#3498db,stroke:#2980b9,color:#fff
    style S3 fill:#3498db,stroke:#2980b9,color:#fff
    style H1 fill:#e74c3c,stroke:#c0392b,color:#fff
    style H2 fill:#e74c3c,stroke:#c0392b,color:#fff
    style H3 fill:#e74c3c,stroke:#c0392b,color:#fff
    style H4 fill:#e74c3c,stroke:#c0392b,color:#fff
```

> **Principal-Level Talking Point:** Cache locality matters. Arrays and `Span<T>` give contiguous memory, which is CPU-cache friendly. Linked structures scatter across the heap, causing cache misses. This is why `List<T>` often outperforms `LinkedList<T>` in practice despite theoretical advantages of linked lists.
