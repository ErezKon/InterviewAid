# 2006. Count Number of Pairs With Absolute Difference K

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-number-of-pairs-with-absolute-difference-k](https://leetcode.com/problems/count-number-of-pairs-with-absolute-difference-k)
**Companies:** Amazon, Google, Microsoft, Tcs

---

## Problem Description
Given an integer array `nums` and an integer `k`, return the number of pairs `(i, j)` where `i < j` and `|nums[i] - nums[j]| == k`. The array may contain duplicate values.

## Examples
**Example 1**
```
Input: nums = [1,2,2,1], k = 1
Output: 4
Explanation: The valid pairs are (0,1), (0,2), (1,3), (2,3).
```
**Example 2**
```
Input: nums = [1,3,5,7], k = 2
Output: 3
Explanation: Pairs are (0,1), (1,2), (2,3).
```

## Approach
Use a hash map to count the frequency of each number. For each unique value `x`, the number of pairs with difference `k` is `freq[x] * freq[x + k]`. Sum this over all keys.

```text
FUNCTION countKDifference(nums, k):
    // Build frequency map
    SET freq ← EMPTY MAP
    FOR num IN nums:
        INCREMENT freq[num] BY 1
    SET result ← 0
    FOR x IN freq.KEYS():
        IF freq.CONTAINS_KEY(x + k):
            SET result ← result + freq[x] * freq[x + k]
    RETURN result
```

## Walkthrough
Consider `nums = [1,2,2,1]`, `k = 1`.
| Step | freq map after processing | result calculation |
|------|---------------------------|--------------------|
| Build map | {1:2, 2:2} | — |
| Iterate x=1 | freq[1+1]=freq[2]=2 → result += 2*2 = 4 |
| Iterate x=2 | freq[2+1] not present → no change |
| Final result | 4 |

## Complexity Analysis
- **Time:** O(n) to build the map plus O(m) to iterate over unique keys (m ≤ n).
- **Space:** O(m) for the frequency map.

## Follow-Up Questions
1. How would you modify the solution to return the actual pairs instead of the count?
2. Can you solve the problem without extra space using sorting and two‑pointers?
3. What if `k` can be negative?

## Key Takeaway
Counting pairs with a fixed absolute difference is efficiently solved by a frequency hash map, turning the problem into a simple lookup for each unique value.
