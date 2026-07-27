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

```
FUNCTION minMutation(startGene, endGene, bank):
    bankSet = SET(bank)
    IF endGene NOT IN bankSet: RETURN -1

    queue = [(startGene, 0)]
    visited = {startGene}

    WHILE queue:
        (gene, mutations) = queue.DEQUEUE()
        IF gene == endGene: RETURN mutations

        FOR i ← 0 TO 7:
            FOR c IN ['A', 'C', 'G', 'T']:
                IF c == gene[i]: CONTINUE
                newGene = gene[:i] + c + gene[i+1:]
                IF newGene IN bankSet AND newGene NOT IN visited:
                    visited.ADD(newGene)
                    queue.ENQUEUE((newGene, mutations + 1))

    RETURN -1
```

| Time | Space |
|------|-------|
| O(B · 32) | O(B) |

## Key Takeaway

> Gene mutation = Word Ladder with alphabet {A,C,G,T} and length 8. BFS guarantees minimum mutations since all edges have weight 1.
