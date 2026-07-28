# 2149. Rearrange Array Elements by Sign

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rearrange-array-elements-by-sign](https://leetcode.com/problems/rearrange-array-elements-by-sign)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft

---

## Problem Description
Given an integer array `nums` containing both positive and negative numbers, reorder the array so that positive and negative numbers appear in alternating order, starting with a positive number. The relative order of positive or negative numbers does not need to be preserved. It is guaranteed that the number of positive and negative elements is equal.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[3,1,-2,-5,2,-4]` | `[3,-2,1,-5,2,-4]` | Positive and negative numbers are interleaved. |
| `[-1,2,-3,4]` | `[2,-1,4,-3]` | Starts with a positive and alternates. |

## Approach
Separate the array into two lists: one for positives and one for negatives. Then iterate over the length of either list, appending a positive followed by a negative to the result.

```text
FUNCTION rearrangeArray(nums):
    pos ← []
    neg ← []
    FOR num IN nums:
        IF num > 0:
            APPEND pos WITH num
        ELSE:
            APPEND neg WITH num
    result ← []
    FOR i ← 0 TO LENGTH(pos) - 1:
        APPEND result WITH pos[i]
        APPEND result WITH neg[i]
    RETURN result
```

## Walkthrough
For `nums = [3,1,-2,-5,2,-4]`:
1. `pos = [3,1,2]`, `neg = [-2,-5,-4]`.
2. Build result: add `3`, `-2`, `1`, `-5`, `2`, `-4` → `[3,-2,1,-5,2,-4]`.

## Complexity Analysis
- **Time:** O(n) – each element is visited once.
- **Space:** O(n) – extra arrays for positives, negatives, and result.

## Follow-Up Questions
1. How would you solve the problem in‑place with O(1) extra space?
2. What if the counts of positive and negative numbers are not equal?
3. Can you preserve the original relative order of positives and negatives?

## Key Takeaway
Separate positives and negatives, then interleave them to achieve the required alternating order.
