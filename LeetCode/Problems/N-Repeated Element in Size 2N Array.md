# 961. N-Repeated Element in Size 2N Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/n-repeated-element-in-size-2n-array](https://leetcode.com/problems/n-repeated-element-in-size-2n-array)
**Companies:** Akamai, Amazon, Bloomberg, Google, Meta, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Hash Set — O(n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Array of size `2n` has `n+1` unique elements, one of which appears `n` times. Return the element that appears `n` times.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[5,1,5,2,5,3,5,4]` | `5` | `5` appears 4 times (`n = 4`) while all other numbers appear once. |
| `[1,2,3,1,4,5,6,1]` | `1` | Array length is 8 (`2n`), `n = 4`. `1` appears 4 times. |

---

## 3. Key Insight

> Since one element appears n times and the rest appear once, the first duplicate we encounter while scanning is the answer.

---

## 4. Approach: Hash Set — O(n) ✅

```text
FUNCTION repeatedNTimes(nums):
    SET seen ← set()
    FOR num IN nums:
        IF num IN seen:
            RETURN num
        ADD num TO seen
```

---

## 5. Walkthrough

Consider the array `[5,1,5,2,5,3,5,4]` (`n = 4`).

| Step | num | seen (before) | Action |
|------|-----|---------------|--------|
| 1 | 5 | {} | Add 5 to `seen` |
| 2 | 1 | {5} | Add 1 to `seen` |
| 3 | 5 | {5,1} | 5 already in `seen` → return 5 |

The algorithm stops as soon as the repeated element is found.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

1. How would you solve the problem using O(1) extra space?
2. What if more than one element could appear `n` times?
3. Can you adapt the solution for a stream of numbers where the size is unknown?

---

## 8. Key Takeaway

> **First duplicate = n‑repeated element.** With `n+1` unique values in a `2n`‑sized array, the repeated element must appear as a duplicate early, allowing a linear‑time hash‑set solution.
