# 3092. Most Frequent IDs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-frequent-ids](https://leetcode.com/problems/most-frequent-ids)
**Companies:** Amazon, Snowflake

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hash Map + Sorted Container — O(n log n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a sequence of operations that either add or remove an ID, after each operation return the **most frequent** ID count observed so far.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> Maintain a hash map for ID counts and a sorted multiset (or max‑heap) for frequencies. After each update, adjust both structures and query the current maximum frequency.

---

## 3. Approach: Hash Map + Heap — O(n log n) ✅

```text
FUNCTION mostFrequentIDs(ops):
    // ops is list of (id, delta) where delta is +1 (add) or -1 (remove)
    SET countMap ← EMPTY MAP          // ID → current count
    SET freqHeap ← EMPTY MAX‑HEAP     // stores (frequency, id)
    SET result ← EMPTY LIST

    FOR each (id, delta) IN ops:
        SET oldFreq ← countMap.GET(id, 0)
        SET newFreq ← oldFreq + delta
        SET countMap[id] ← newFreq
        // Push new frequency; lazy removal of stale entries when popped
        PUSH (newFreq, id) INTO freqHeap
        // Clean top of heap if it does not match current countMap
        WHILE freqHeap.TOP().frequency ≠ countMap[freqHeap.TOP().id]:
            POP freqHeap
        END WHILE
        APPEND freqHeap.TOP().frequency TO result
    END FOR
    RETURN result
```

---

## 4. Examples

**Example 1:**
```
Input: ops = [(1, +1), (2, +1), (1, +1), (2, +1), (2, +1)]
Output: [1,1,2,2,3]
Explanation:
- After first op, ID 1 appears once → max freq 1.
- After second op, IDs 1 and 2 each appear once → max freq 1.
- After third op, ID 1 appears twice → max freq 2.
- After fourth op, ID 2 appears twice (tie) → max freq 2.
- After fifth op, ID 2 appears three times → max freq 3.
```

**Example 2:**
```
Input: ops = [(5, +1), (5, -1), (5, +1)]
Output: [1,0,1]
Explanation: Adding then removing ID 5 brings its count to 0, then adding again restores count 1.
```

---

## 5. Walkthrough

Consider the first example step‑by‑step.
| Step | Operation | countMap after step | freqHeap top | Result |
|------|-----------|---------------------|--------------|--------|
| 1 | (1,+1) | {1:1} | (1,1) | 1 |
| 2 | (2,+1) | {1:1,2:1} | (1,2) (heap may contain (1,1) stale) → top (1,2) | 1 |
| 3 | (1,+1) | {1:2,2:1} | push (2,1) → top (2,1) | 2 |
| 4 | (2,+1) | {1:2,2:2} | push (2,2) → top (2,2) (tie broken by any) | 2 |
| 5 | (2,+1) | {1:2,2:3} | push (3,2) → top (3,2) | 3 |
The heap may contain stale entries, but they are removed lazily before reading the top.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — each operation updates heap (log n) |
| **Space** | O(n) — maps and heap store at most n distinct IDs |

---

## 7. Follow-Up Questions

1. How would you modify the solution to support decrementing counts below zero?
2. Can you achieve O(1) amortized time per operation using a bucket‑based frequency list?
3. How would you extend this to return the actual ID(s) with maximum frequency, not just the count?

---

## 8. Key Takeaway

> **Dual tracking:** a hash map for ID→count and a max‑heap (or bucket list) for frequencies lets you query the most frequent ID after each dynamic update efficiently.
