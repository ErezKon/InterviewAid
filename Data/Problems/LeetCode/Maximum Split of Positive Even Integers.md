# 2178. Maximum Split of Positive Even Integers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-split-of-positive-even-integers](https://leetcode.com/problems/maximum-split-of-positive-even-integers)
**Companies:** Google
---

## Problem Description

You are given an integer `finalSum`. Split it into a sum of a **maximum** number of **unique** positive even integers.

- For example, given `finalSum = 12`, the following splits are **valid** (unique positive even integers summing up to `finalSum`): `(12)`, `(2 + 10)`, `(2 + 4 + 6)`, and `(4 + 8)`. Among them, `(2 + 4 + 6)` contains the maximum number of integers. Note that `finalSum` cannot be split into `(2 + 2 + 4 + 4)` as all the numbers should be unique.

Return *a list of integers that represent a valid split containing a **maximum** number of integers*. If no valid split exists for `finalSum`, return *an **empty** list*. You may return the integers in **any** order.

**Constraints:**
- `1 <= finalSum <= 10^10`

## Examples

**Example 1:**
```
Input: finalSum = 12
Output: [2,4,6]
Explanation: The following are valid splits: (12), (2 + 10), (2 + 4 + 6), and (4 + 8).
(2 + 4 + 6) has the maximum number of integers, which is 3. Thus, we return [2,4,6].
Note that [2,6,4], [6,2,4], etc. are also accepted.
```

**Example 2:**
```
Input: finalSum = 7
Output: []
Explanation: There are no valid splits for the given finalSum.
Thus, we return an empty array.
```

**Example 3:**
```
Input: finalSum = 28
Output: [6,8,2,12]
Explanation: The following are valid splits: (2 + 26), (6 + 8 + 2 + 12), and (4 + 24).
(6 + 8 + 2 + 12) has the maximum number of integers, which is 4. Thus, we return [6,8,2,12].
Note that [10,2,4,12], [6,2,4,16], etc. are also accepted.
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
