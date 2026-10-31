# 3315. Construct the Minimum Bitwise Array II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-the-minimum-bitwise-array-ii](https://leetcode.com/problems/construct-the-minimum-bitwise-array-ii)
**Companies:** Amazon, Aon, Meta, Microsoft

---

## Problem Description
You are given an array `nums` consisting of `n` prime integers.

You need to construct an array `ans` of length `n`, such that, for each index `i`, the bitwise `OR` of `ans[i]` and `ans[i] + 1` is equal to `nums[i]`, i.e. `ans[i] OR (ans[i] + 1) == nums[i]`.

Additionally, you must **minimize** each value of `ans[i]` in the resulting array.

If it is *not possible* to find such a value for `ans[i]` that satisfies the **condition**, then set `ans[i] = -1`.

**Constraints:**
- `1 <= nums.length <= 100`
- `2 <= nums[i] <= 10^9`
- `nums[i]` is a prime number.

## Examples
```
Example 1:
  Input: nums = [2,3,5,7]
  Output: [-1,1,4,3]
  Explanation:
    - For i = 0, as there is no value for ans[0] that satisfies ans[0] OR (ans[0] + 1) = 2, so ans[0] = -1.
    - For i = 1, the smallest ans[1] that satisfies ans[1] OR (ans[1] + 1) = 3 is 1, because 1 OR (1 + 1) = 3.
    - For i = 2, the smallest ans[2] that satisfies ans[2] OR (ans[2] + 1) = 5 is 4, because 4 OR (4 + 1) = 5.
    - For i = 3, the smallest ans[3] that satisfies ans[3] OR (ans[3] + 1) = 7 is 3, because 3 OR (3 + 1) = 7.
```
```
Example 2:
  Input: nums = [11,13,31]
  Output: [9,12,15]
  Explanation:
    - For i = 0, the smallest ans[0] that satisfies ans[0] OR (ans[0] + 1) = 11 is 9, because 9 OR (9 + 1) = 11.
    - For i = 1, the smallest ans[1] that satisfies ans[1] OR (ans[1] + 1) = 13 is 12, because 12 OR (12 + 1) = 13.
    - For i = 2, the smallest ans[2] that satisfies ans[2] OR (ans[2] + 1) = 31 is 15, because 15 OR (15 + 1) = 31.
```

## Approach
For each number:
1. If the number is `2`, output `-1`.
2. Otherwise locate the first `0` bit (starting from LSB). Clear the bit just below it, which is equivalent to `num XOR (1 << (pos-1))`.

```text
FUNCTION minBitwiseArray(nums):
    SET result ← []
    FOR each num IN nums:
        IF num = 2:
            APPEND -1 TO result
        ELSE:
            SET bit ← 0
            WHILE (num AND (1 << bit)) ≠ 0:
                SET bit ← bit + 1
            SET transformed ← num XOR (1 << (bit - 1))
            APPEND transformed TO result
    RETURN result
```

## Walkthrough
| num | binary | first zero bit index | transformed |
|-----|--------|----------------------|-------------|
| 5   | 101    | 1 (second bit)       | 5 XOR 2 = 4 |
| 7   | 111    | 3 (fourth bit)       | 7 XOR 4 = 3 |
| 1   | 001    | 1                    | 1 XOR 1 = 0 |

## Complexity Analysis
- **Time:** `O(|nums| * B)` where `B` is number of bits (≤ 31). Effectively linear in the array size.
- **Space:** `O(|nums|)` for the output array.

## Follow-Up Questions
1. How would the algorithm adapt to handle negative integers using two's complement?
2. Can you compute the result in-place without extra storage?
3. What if we need to flip exactly two bits to achieve the minimum value?

## Key Takeaway
Identifying the lowest zero bit and clearing the preceding set bit yields the minimal value achievable by a single-bit flip.
