# 433. Minimum Genetic Mutation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-genetic-mutation](https://leetcode.com/problems/minimum-genetic-mutation)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Twitter

---

## Problem Description

A gene string is 8 characters from `{A, C, G, T}`. Given `startGene`, `endGene`, and a `bank` of valid genes, return the **minimum number of mutations** (single-character changes) to reach `endGene`. Each intermediate gene must be in the bank.

## Key Insight

> Same structure as Word Ladder — BFS on the gene graph where neighbors differ by exactly one character. Since genes are length 8 with alphabet size 4, each gene has at most 8×3 = 24 neighbors.

## Approach: BFS — O(B·8·4) ✅

```text
FUNCTION minMutation(startGene, endGene, bank):
    bankSet ← SET(bank)
    IF endGene NOT IN bankSet: RETURN -1

    queue ← [(startGene, 0)]
    visited ← {startGene}

    WHILE queue IS NOT EMPTY:
        (gene, mutations) ← DEQUEUE(queue)
        IF gene == endGene: RETURN mutations

        FOR i ← 0 TO 7:
            FOR c IN ['A', 'C', 'G', 'T']:
                IF c == gene[i]: CONTINUE
                newGene ← REPLACE_CHAR(gene, i, c)
                IF newGene IN bankSet AND newGene NOT IN visited:
                    ADD newGene TO visited
                    ENQUEUE(queue, (newGene, mutations + 1))

    RETURN -1
```

## Examples

| startGene | endGene | bank | Output |
|-----------|---------|------|--------|
| "AACCGGTT" | "AACCGGTA" | ["AACCGGTA"] | 1 |
| "AACCGGTT" | "AAACGGTA" | ["AACCGGTA","AACCGCTA","AAACGGTA"] | 2 |
| "AAAAACCC" | "CCCCCCCC" | ["AAAACCCC","AAACCCCC","AACCCCCC","ACCCCCCC","CCCCCCCC"] | 4 |

*Explanation*: Each row shows the shortest mutation path length.

## Walkthrough

1. Initialize `bankSet` and check if `endGene` is reachable.
2. Start BFS with `startGene` at depth 0.
3. Dequeue a gene, generate all possible one‑letter mutations.
4. For each valid mutation present in `bankSet` and not visited, enqueue with depth+1.
5. When `endGene` is dequeued, its associated depth is the minimum number of mutations.

## Complexity Analysis

- **Time**: O(B · 8 · 4) — each gene generates at most 24 neighbors, each lookup is O(1).
- **Space**: O(B) for the `bankSet` and visited set.

## Follow-Up Questions

- How would you modify the algorithm if each mutation had a different cost?
- Can you solve the problem using bidirectional BFS to reduce the search space?
- What if the gene length were variable and the alphabet larger?

## Key Takeaway

> Gene mutation = Word Ladder with alphabet {A,C,G,T} and length 8. BFS guarantees minimum mutations since all edges have weight 1.
