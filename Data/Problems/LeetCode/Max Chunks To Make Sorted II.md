# 768. Max Chunks To Make Sorted II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/max-chunks-to-make-sorted-ii](https://leetcode.com/problems/max-chunks-to-make-sorted-ii)
**Companies:** Amazon, Bloomberg, Google, Salesforce

---

## 1. Problem Description

You are given an integer array `arr`.

We split `arr` into some number of **chunks** (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.

Return *the largest number of chunks we can make to sort the array*.

**Constraints:**

- `1 <= arr.length <= 2000`
- `0 <= arr[i] <= 10^8`

---

## 2. Examples

```
Example 1:
  Input: arr = [5,4,3,2,1]
  Output: 1
  Explanation:
  Splitting into two or more chunks will not return the required result.
  For example, splitting into [5, 4], [3, 2, 1] will result in [4, 5, 1, 2, 3], which isn't sorted.
```

```
Example 2:
  Input: arr = [2,1,3,4,4]
  Output: 4
  Explanation:
  We can split into two chunks, such as [2, 1], [3, 4, 4].
  However, splitting into [2, 1], [3], [4], [4] is the highest number of chunks possible.
```

---

## 3. Approach: Monotonic Stack — O(n) ✅

```text
FUNCTION maxChunksToSorted(arr):
    stack ← []
    FOR num ← arr:
        IF stack NOT EMPTY AND num < stack[-1]:
            maxVal ← stack[-1]
            WHILE stack NOT EMPTY AND num < stack[-1]:
                POP stack
            PUSH maxVal TO stack
        ELSE:
            PUSH num TO stack
    RETURN LENGTH(stack)
```

---

## 4. Walkthrough

Consider `arr = [2,1,3,4,4]`:

| Step | num | Stack before | Action | Stack after |
|------|-----|--------------|--------|-------------|
| 1 | 2 | [] | push 2 | [2] |
| 2 | 1 | [2] | 1 < 2 → pop 2, push max 2 | [2] |
| 3 | 3 | [2] | 3 ≥ 2 → push 3 | [2,3] |
| 4 | 4 | [2,3] | 4 ≥ 3 → push 4 | [2,3,4] |
| 5 | 4 | [2,3,4] | 4 ≥ 4 → push 4 | [2,3,4,4] |

Final stack size = 4 → maximum chunks.

---

## 5. Complexity Analysis

- **Time**: O(n) – each element is processed once, with occasional pops.
- **Space**: O(n) in the worst case for the stack.

---

## 6. Follow‑Up Questions

- How would the solution change if the array contained **negative numbers**?
- Can you solve the problem using a **single pass without extra space**?
- What modifications are needed for the variant where the array must be split into **minimum** chunks?

---

## Key Takeaway

> A monotonic stack tracks the maximum of each chunk; when a smaller element appears, merge previous chunks while preserving the overall maximum, and the stack size equals the maximum number of sortable chunks.
