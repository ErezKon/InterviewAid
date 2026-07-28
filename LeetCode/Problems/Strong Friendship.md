# 1949. Strong Friendship

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/strong-friendship
**Companies:** Google, Meta
---
## Problem Description
You are given an array `ages` of length `n`, where `ages[i]` is the age of the i‑th person, and an integer `threshold`. A *strong friendship* between two distinct people `i` and `j` exists if `ages[i] + ages[j] > threshold`. Return the number of unordered pairs `(i, j)` that form a strong friendship.

## Examples
| ages | threshold | Output | Explanation |
|------|-----------|--------|-------------|
| [10,20,30] | 35 | 2 | Pairs (20,30) and (10,30) have sums 50 and 40 > 35. |
| [5,5,5] | 10 | 0 | No pair sum exceeds 10. |

## Approach
Sort the ages and use a two‑pointer technique to count pairs whose sum exceeds the threshold.

```text
FUNCTION countStrongFriendships(ages, threshold):
    SORT ages ASCENDING
    SET left ← 0
    SET right ← LENGTH(ages) - 1
    SET count ← 0
    WHILE left < right:
        IF ages[left] + ages[right] > threshold:
            // All elements between left and right form valid pairs with ages[right]
            SET count ← count + (right - left)
            SET right ← right - 1
        ELSE:
            SET left ← left + 1
    RETURN count
```

## Walkthrough
For `ages = [10,20,30]`, `threshold = 35`:

| left | right | ages[left] + ages[right] | Action | count |
|------|-------|--------------------------|--------|-------|
| 0 (10) | 2 (30) | 40 > 35 | add (2-0)=2, right←1 | 2 |
| 0 (10) | 1 (20) | 30 ≤ 35 | left←1 |
Loop ends, return 2.

## Complexity Analysis
- **Time:** O(n log n) for sorting, then O(n) for the two‑pointer scan.
- **Space:** O(1) extra space (in‑place sort).

## Follow‑Up Questions
1. How would you handle the case where ages are streamed and cannot be stored entirely?
2. Can you extend the definition of strong friendship to include a minimum age difference?
3. What if the threshold varies per query—how would you preprocess for multiple queries?

## Key Takeaway
Sorting combined with a two‑pointer scan efficiently counts pairs whose sum exceeds a given threshold in linear time after sorting.
