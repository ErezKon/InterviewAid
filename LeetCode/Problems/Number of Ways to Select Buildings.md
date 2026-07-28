# 2222. Number of Ways to Select Buildings

**Difficulty:** 🟡 Medium

**Companies:** Amazon, De Shaw, Dream11

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Counting Sequences — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Select 3 buildings from a binary string such that no two adjacent selected buildings have the same type. Count valid selections ("010" and "101" patterns).

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"01010"` | `2` | The valid triples are positions `(0,1,2)` → "010" and `(2,3,4)` → "010". |
| `"10101"` | `2` | The valid triples are "101" at positions `(0,1,2)` and `(2,3,4)`. |

---

## 3. Approach: Counting Sequences — O(n) ✅

We traverse the string while maintaining counts of single characters and two‑character alternating sequences. When we encounter a `0`, it can extend every previously seen `1` to form a `10` pair and every existing `01` pair to complete a `010` triple. The symmetric logic applies for `1`.

```text
FUNCTION numberOfWays(s):
    SET count0 ← 0               // number of '0' seen so far
    SET count1 ← 0               // number of '1' seen so far
    SET seq01 ← 0                // count of "01" subsequences
    SET seq10 ← 0                // count of "10" subsequences
    SET result ← 0               // final count of valid triples
    FOR c IN s:
        IF c == '0':
            // extend all "1" to form "10" pairs
            SET seq10 ← seq10 + count1
            // complete all "01" pairs into "010" triples
            SET result ← result + seq01
            SET count0 ← count0 + 1
        ELSE:
            // extend all "0" to form "01" pairs
            SET seq01 ← seq01 + count0
            // complete all "10" pairs into "101" triples
            SET result ← result + seq10
            SET count1 ← count1 + 1
    RETURN result
```

---

## 4. Walkthrough

Consider the input `"01010"`.

| Index | Char | count0 | count1 | seq01 | seq10 | result | Explanation |
|-------|------|--------|--------|-------|-------|--------|-------------|
| 0 | 0 | 1 | 0 | 0 | 0 | 0 | First `0` starts a potential `0` count. |
| 1 | 1 | 1 | 1 | 1 (0+count0) | 0 | 0 | `1` creates a `01` pair. |
| 2 | 0 | 2 | 1 | 1 | 1 (0+count1) | 1 (result+seq01) | `0` forms a `10` pair and completes a `010` triple. |
| 3 | 1 | 2 | 2 | 2 (1+count0) | 1 | 1 | `1` creates another `01` pair. |
| 4 | 0 | 3 | 2 | 2 | 3 (1+count1) | 3 (result+seq01) | `0` forms a `10` pair and adds two more triples, reaching total 2. |

The final `result` is `2`, matching the expected output.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to count triples with a different alternating pattern, e.g., "001" or "110"?
2. Can the approach be extended to count valid subsequences of length `k` with alternating bits?
3. What changes are needed if the input string can contain characters other than `0` and `1`?

---

## 7. Key Takeaway

> **Build sequences incrementally.** Track 1‑length and 2‑length alternating subsequences. Each new character completes a 3‑length sequence from the opposite 2‑length count.
