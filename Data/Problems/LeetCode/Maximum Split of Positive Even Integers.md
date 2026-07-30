# 2178. Maximum Split of Positive Even Integers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-split-of-positive-even-integers](https://leetcode.com/problems/maximum-split-of-positive-even-integers)
**Companies:** Google
---

## Problem Description
Given a positive even integer `finalSum`, split it into a set of **distinct** positive even integers whose sum equals `finalSum`. Return any such set with the maximum possible number of elements. If no valid split exists, return an empty list.

## Examples
**Example 1:**
```
finalSum = 12
Possible splits: {2,4,6} (3 numbers) or {12} (1 number)
Maximum split = [2,4,6]
```

**Example 2:**
```
finalSum = 7
No split into even numbers exists → []
```

## Approach
Greedily take the smallest even numbers starting from `2`. Keep adding the current even number `cur` while `finalSum - cur` remains larger than `cur`. When the remaining sum is not larger than the next candidate, add the remainder as the last element. This yields the maximal count because using the smallest possible distinct evens leaves the most room for additional numbers.

```text
FUNCTION MaxEvenSplit(finalSum):
    IF finalSum MOD 2 = 1:
        RETURN []
    result ← EMPTY LIST
    cur ← 2
    WHILE finalSum - cur > cur:
        APPEND cur TO result
        SET finalSum ← finalSum - cur
        SET cur ← cur + 2
    APPEND finalSum TO result   // last remaining even number
    RETURN result
```

## Walkthrough
| Step | cur | remaining `finalSum` | Action |
|------|-----|----------------------|--------|
| Start | 2 | 12 | add 2 → result [2], finalSum = 10 |
| Next | 4 | 10 | add 4 → result [2,4], finalSum = 6 |
| Next | 6 | 6 | condition `6 - 6 > 6` false → append 6 as last element |
| Result | – | – | [2,4,6] |

## Complexity Analysis
- Time: `O(k)` where `k` is the number of elements in the result (at most √finalSum).
- Space: `O(k)` for the output list.

## Follow-Up Questions
1. How would the algorithm change if the numbers need not be distinct?
2. What if the split must use only odd integers?
3. Can you compute the number of possible distinct splits without enumerating them?

## Key Takeaway
Choosing the smallest possible distinct even numbers first guarantees the maximal count of summands.
