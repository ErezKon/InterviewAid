# 503. Next Greater Element II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/next-greater-element-ii](https://leetcode.com/problems/next-greater-element-ii)
**Companies:** Amazon, Apple, Bloomberg, Flipkart, Goldman Sachs, Google, Intuit, Meta, Microsoft, Morgan Stanley, Nvidia, Servicenow, Uber, Visa, Zeta, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Monotonic Stack + Circular — O(n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a circular array, find the **next greater element** for each element. The search wraps around.

**Constraints:**
- `1 <= nums.length <= 10⁴`

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,2,1]` | `[2,-1,2]` | For the first `1`, the next greater is `2`. For `2`, there is no greater element, so `-1`. For the last `1`, we wrap around and find `2`. |
| `[1,2,3,4,5]` | `[2,3,4,5,-1]` | Each element's next greater is the immediate next one; the last element has none. |

---

## 3. Key Insight

> Iterate the array twice (indices 0..2n-1) to simulate circularity. Use `i % n` for the actual index. Only push indices during the first pass.

---

## 4. Approach: Monotonic Stack + Circular — O(n) ✅

```text
FUNCTION nextGreaterElements(nums):
    n ← LENGTH(nums)
    result ← ARRAY of size n filled with -1
    stack ← []    // will store indices

    FOR i ← 0 TO 2*n - 1:
        current ← nums[i MOD n]
        WHILE stack NOT EMPTY AND nums[stack.TOP()] < current:
            idx ← stack.POP()
            result[idx] ← current
        IF i < n:
            stack.PUSH(i)

    RETURN result
```

---

## 5. Walkthrough

Consider the input `[1,2,1]`:

| Step | i | current (nums[i % n]) | Stack (indices) | Result |
|------|---|-----------------------|-----------------|--------|
| 1 | 0 | 1 | push 0 | `[-1,-1,-1]` |
| 2 | 1 | 2 | pop 0 → result[0]=2, push 1 | `[2,-1,-1]` |
| 3 | 2 | 1 | push 2 | `[2,-1,-1]` |
| 4 | 3 | 1 (wrap) | pop 2 → result[2]=2 | `[2,-1,2]` |
| 5 | 4 | 2 (wrap) | pop 1 → result[1]= -1 (no greater) | `[2,-1,2]` |

Final output: `[2,-1,2]`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

- How would you modify the algorithm for the non‑circular version (Next Greater Element I)?
- Can you solve the problem using only O(1) extra space by modifying the input array?
- How would you extend this to find the *previous* greater element in a circular array?

---

## 8. Key Takeaway

> **Double iteration for circular arrays.** Same monotonic stack pattern as NGE I, but iterate `2n` times with modular indexing to handle wrap‑around.
