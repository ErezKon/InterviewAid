# 1299. Replace Elements with Greatest Element on Right Side

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side](https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side)
**Companies:** Amazon, Google, Meta, Zoho

---

## Problem Description
Given an integer array `arr`, replace each element with the greatest element among those to its right. Set the last element to `-1`. Return the modified array.

## Examples
- Input: `[17,18,5,4,6,1]` → Output: `[18,6,6,6,1,-1]`.
- Input: `[400]` → Output: `[-1]`.

## Approach
Traverse the array from right to left, maintaining the maximum value seen so far.

```text
FUNCTION ReplaceElements(arr):
    SET maxSoFar ← -1
    FOR i ← LENGTH(arr) - 1 DOWNTO 0:
        SET current ← arr[i]
        SET arr[i] ← maxSoFar
        IF current > maxSoFar:
            SET maxSoFar ← current
    RETURN arr
```

## Walkthrough
| Index | Original | maxSoFar before | New Value |
|------|----------|----------------|----------|
| 5 | 1 | -1 | -1 |
| 4 | 6 | 1 | 1 |
| 3 | 4 | 6 | 6 |
| 2 | 5 | 6 | 6 |
| 1 | 18 | 6 | 6 |
| 0 | 17 | 18 | 18 |

## Complexity Analysis
- Time: O(n) – single pass.
- Space: O(1) – in‑place.

## Follow‑Up Questions
1. How would you return a new array instead of modifying in place?
2. What if the array were circular?
3. How to find the second‑largest element to the right?

## Key Takeaway
Scanning from right to left lets you keep the maximum seen so far, achieving an O(n) in‑place solution.
