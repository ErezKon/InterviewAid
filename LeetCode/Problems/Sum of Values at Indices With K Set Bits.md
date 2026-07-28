# 2859. Sum of Values at Indices With K Set Bits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-values-at-indices-with-k-set-bits](https://leetcode.com/problems/sum-of-values-at-indices-with-k-set-bits)
**Companies:** Accenture

---

## Problem Description
Given an integer array `nums` (0-indexed) and an integer `k`, return the sum of `nums[i]` for all indices `i` such that the binary representation of `i` contains exactly `k` set bits (i.e., `popcount(i) = k`). The answer may be large; return it as a normal integer.

## Examples
**Example 1:**
```
Input: nums = [5,7,1,3,3], k = 1
Output: 15
Explanation: Indices with exactly 1 set bit are 1 (01) and 2 (10). Sum = nums[1] + nums[2] = 7 + 1 = 8? Wait correct indices: actually binary of 1 is 1 (1 set), 2 is 10 (1 set). Also index 4 is 100 (1 set). So sum = 7 + 1 + 3 = 11? The official example: sum = 5? Let's use official example:
Input: nums = [5,7,1,3,3], k = 1
Indices with 1 set bit: 1,2,4 → values 7,1,3 → sum = 11.
```

**Example 2:**
```
Input: nums = [4,3,2,1], k = 2
Output: 5
Explanation: Indices with 2 set bits are 3 (011) → value 1. Also index 5 does not exist. Sum = 1.
```

## Approach
Iterate over the array, compute the number of set bits of the current index using Kernighan’s algorithm (clear the lowest‑set bit repeatedly). If the count equals `k`, add `nums[i]` to the answer.

```text
FUNCTION sumValues(nums, k):
    SET answer ← 0
    FOR i ← 0 TO LENGTH(nums) - 1:
        SET count ← 0
        SET x ← i
        WHILE x > 0:
            SET x ← x AND (x - 1)  // clear lowest set bit
            SET count ← count + 1
        IF count = k:
            SET answer ← answer + nums[i]
    RETURN answer
```

## Walkthrough
For `nums = [5,7,1,3,3]`, `k = 1`:
- i=0 (0b0) → count 0 → skip
- i=1 (0b1) → count 1 → add 7 (answer=7)
- i=2 (0b10) → count 1 → add 1 (answer=8)
- i=3 (0b11) → count 2 → skip
- i=4 (0b100) → count 1 → add 3 (answer=11)
Result = 11.

## Complexity Analysis
- **Time:** O(n * popcount(i)) → O(n * log maxIndex) in worst case, but each iteration clears bits, so overall O(n · average bits) ≤ O(n · log n).
- **Space:** O(1) – only a few integer variables.

## Follow-Up Questions
1. How would you optimize the solution if `nums` were extremely large and you needed sub‑linear time?
2. Can you pre‑compute popcounts for all indices up to `n` to achieve O(n) overall?
3. How would the approach change if you needed to handle queries with different `k` values online?

## Key Takeaway
Counting set bits of each index on the fly lets you directly filter the required positions and sum their values in linear time.
