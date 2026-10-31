# 3153. Sum of Digit Differences of All Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-digit-differences-of-all-pairs](https://leetcode.com/problems/sum-of-digit-differences-of-all-pairs)
**Companies:** Google, Turing

---

## Problem Description

You are given an array `nums` consisting of **positive** integers where all integers have the **same** number of digits.

The **digit difference** between two integers is the *count* of different digits that are in the **same** position in the two integers.

Return the **sum** of the **digit differences** between **all** pairs of integers in `nums`.

**Constraints:**
- `2 <= nums.length <= 10^5`
- `1 <= nums[i] < 10^9`
- All integers in `nums` have the same number of digits.

## Examples

**Example 1:**
```
Input: nums = [13,23,12]
Output: 4
Explanation:
We have the following:
- The digit difference between 13 and 23 is 1.
- The digit difference between 13 and 12 is 1.
- The digit difference between 23 and 12 is 2.
So the total sum of digit differences between all pairs of integers is 1 + 1 + 2 = 4.
```

**Example 2:**
```
Input: nums = [10,10,10,10]
Output: 0
Explanation:
All the integers in the array are the same. So the total sum of digit differences between all pairs of integers will be 0.
```

## Approach
Digit positions are independent, so the total equals the sum over positions of the number of pairs whose digits differ at that position. For one position, count `cnt[d]` for each digit `d`. Out of all `C(n, 2)` pairs, those with equal digits number `Σ_d C(cnt[d], 2)`, so the differing pairs are `C(n, 2) − Σ_d C(cnt[d], 2)`.

```text
FUNCTION sumDigitDifferences(nums):
    n ← LENGTH(nums)
    L ← number of digits of nums[0]
    ans ← 0
    FOR p ← 0 TO L-1:
        cnt[0..9] ← 0
        FOR x IN nums:
            cnt[(x / 10^p) MOD 10] ← cnt[(x / 10^p) MOD 10] + 1
        same ← 0
        FOR d ← 0 TO 9:
            same ← same + cnt[d] · (cnt[d] − 1) / 2
        ans ← ans + n · (n − 1) / 2 − same
    RETURN ans
```

## Walkthrough
Example 1: `nums = [13,23,12]`, `n = 3`, `C(3,2) = 3` pairs per position.

| Position | digits | counts | equal pairs | differing pairs |
|----------|--------|--------|-------------|-----------------|
| units | 3, 3, 2 | 3:2, 2:1 | C(2,2) = 1 | 3 − 1 = 2 |
| tens  | 1, 2, 1 | 1:2, 2:1 | C(2,2) = 1 | 3 − 1 = 2 |

Total = 2 + 2 = `4`.

## Complexity Analysis
Time: O(n · L) where L ≤ 9 is the number of digits.
Space: O(10) for digit counts per position.

## Follow-Up Questions
* How would you adapt the solution for binary representation (count of differing bits = Hamming distance sum)?
* What if the numbers had different lengths and missing positions were treated as leading zeros?
* What if the difference at a position were weighted by `|d1 − d2|` instead of being 0/1?

## Key Takeaway
Count pairs per position by complement: all pairs minus pairs with the same digit, using digit frequency counts — this turns an O(n²) pairwise sum into O(n · L).
