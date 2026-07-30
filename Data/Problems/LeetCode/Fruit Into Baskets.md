# 904. Fruit Into Baskets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fruit-into-baskets](https://leetcode.com/problems/fruit-into-baskets)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft, Netflix, Servicenow, Tiktok, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sliding Window — O(n) ✅](#4-approach-sliding-window--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Collect fruits from a row of trees into 2 baskets. Each basket holds one type of fruit. Find the maximum number of fruits you can collect in a contiguous subarray.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `["A","B","C","A","C"]` | `3` | The longest subarray with at most 2 fruit types is `["C","A","C"]` (length 3). |
| `["A","A","A","B","C","C","C"]` | `5` | The optimal window is `["A","A","A","B","C"]` (length 5). |

---

## 3. Key Insight

> Equivalent to "Longest Substring with At Most 2 Distinct Characters" (#159). Use sliding window with a frequency map, shrink when more than 2 types appear.

---

## 4. Approach: Sliding Window — O(n) ✅

```text
FUNCTION totalFruit(fruits):
    SET count ← empty map
    SET left ← 0
    SET maxLen ← 0

    FOR right ← 0 TO LENGTH(fruits) - 1:
        SET fruit ← fruits[right]
        SET count[fruit] ← count.get(fruit, 0) + 1

        WHILE SIZE(count) > 2:
            SET leftFruit ← fruits[left]
            SET count[leftFruit] ← count[leftFruit] - 1
            IF count[leftFruit] == 0:
                DELETE count[leftFruit]
            SET left ← left + 1

        SET maxLen ← MAX(maxLen, right - left + 1)

    RETURN maxLen
```

---

## 5. Walkthrough

Consider the first example `["A","B","C","A","C"]`:

| Step | left | right | window | count map | maxLen |
|------|------|-------|--------|-----------|--------|
| Init | 0 | - | [] | {} | 0 |
| 1 | 0 | 0 | [A] | {A:1} | 1 |
| 2 | 0 | 1 | [A,B] | {A:1,B:1} | 2 |
| 3 | 0 | 2 | [A,B,C] | {A:1,B:1,C:1} → size>2, shrink left → left=1, count[A]=0 delete A → {B:1,C:1} | 2 |
| 4 | 1 | 3 | [B,C,A] | {B:1,C:1,A:1} → shrink left → left=2, delete B → {C:1,A:1} | 2 |
| 5 | 2 | 4 | [C,A,C] | {C:2,A:1} | **3** (updated) |

The maximum window size observed is 3.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) — at most 3 keys |

---

## 7. Follow-Up Questions

1. How would the solution change if you could use **K** baskets instead of 2?
2. Can you adapt the sliding‑window template to solve the "Longest Substring with At Most K Distinct Characters" problem?
3. What if the fruits are given as a stream (infinite input)? How would you maintain the answer with limited memory?

---

## 8. Key Takeaway

> **Sliding window with at most K distinct** is a reusable template. Here K=2. Shrink left when distinct count exceeds K.
