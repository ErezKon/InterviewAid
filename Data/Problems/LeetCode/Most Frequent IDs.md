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

The problem involves tracking the frequency of IDs in a collection that changes over time. You have two integer arrays, `nums` and `freq`, of equal length `n`. Each element in `nums` represents an ID, and the corresponding element in `freq` indicates how many times that ID should be added to or removed from the collection at each step.

- **Addition of IDs:** If `freq[i]` is positive, it means `freq[i]` IDs with the value `nums[i]` are added to the collection at step `i`.
- **Removal of IDs:** If `freq[i]` is negative, it means `-freq[i]` IDs with the value `nums[i]` are removed from the collection at step `i`.

Return an array `ans` of length `n`, where `ans[i]` represents the **count** of the *most frequent ID* in the collection after the `iᵗʰ` step. If the collection is empty at any step, `ans[i]` should be 0 for that step.

**Constraints:**
- `1 <= nums.length == freq.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`
- `-10⁵ <= freq[i] <= 10⁵`
- `freq[i] != 0`
- The input is generated such that the occurrences of an ID will not be negative in any step.

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

```
Example 1:
  Input: nums = [2,3,2,1], freq = [3,2,-3,1]
  Output: [3,3,2,2]
  Explanation:
  After step 0, we have 3 IDs with the value of 2. So ans[0] = 3.
  After step 1, we have 3 IDs with the value of 2 and 2 IDs with the value of 3. So ans[1] = 3.
  After step 2, we have 2 IDs with the value of 3. So ans[2] = 2.
  After step 3, we have 2 IDs with the value of 3 and 1 ID with the value of 1. So ans[3] = 2.
```

```
Example 2:
  Input: nums = [5,5,3], freq = [2,-2,1]
  Output: [2,0,1]
  Explanation:
  After step 0, we have 2 IDs with the value of 5. So ans[0] = 2.
  After step 1, there are no IDs. So ans[1] = 0.
  After step 2, we have 1 ID with the value of 3. So ans[2] = 1.
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
