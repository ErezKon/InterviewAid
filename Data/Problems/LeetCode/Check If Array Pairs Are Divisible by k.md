# 1497. Check If Array Pairs Are Divisible by k

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k](https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k)
**Companies:** 6Sense, Amazon, Devrev, Google, Meta, Microsoft, Tcs, Visa

---

## Problem Description
Given an integer array `arr` and an integer `k`, determine whether the array can be reordered such that the sum of every pair of adjacent elements is divisible by `k`. Each element must be used exactly once.

## Examples
- **Input:** `arr = [9,7,2,4]`, `k = 5`  
  **Output:** `true`  
  *Explanation:* Reorder to `[7,9,2,4]`; each pair sums to 16, 11, 6 which are all divisible by 5.
- **Input:** `arr = [1,2,3,4,5,10,11,12]`, `k = 5`  
  **Output:** `true`

## Approach
The key insight is that two numbers `a` and `b` sum to a multiple of `k` iff `(a % k) + (b % k) ≡ 0 (mod k)`. Therefore each remainder `r` must be paired with remainder `k‑r`.

```text
FUNCTION canArrange(arr, k):
    // Count occurrences of each remainder
    SET count ← ARRAY[0..k-1] OF 0
    FOR num IN arr:
        SET rem ← ((num MOD k) + k) MOD k
        INCREMENT count[rem]
    // Remainder 0 must appear an even number of times
    IF count[0] MOD 2 ≠ 0: RETURN false
    // If k is even, remainder k/2 also needs even count
    IF k MOD 2 = 0 AND count[k/2] MOD 2 ≠ 0: RETURN false
    // Check complementary remainders
    FOR i ← 1 TO FLOOR((k-1)/2):
        IF count[i] ≠ count[k - i]: RETURN false
    RETURN true
```

## Walkthrough
| Step | Array element | Remainder | Count array (partial) |
|------|---------------|-----------|-----------------------|
| 1    | 9             | 4         | count[4] = 1 |
| 2    | 7             | 2         | count[2] = 1 |
| 3    | 2             | 2         | count[2] = 2 |
| 4    | 4             | 4         | count[4] = 2 |
After counting, `count[2] == count[3]` (both 0) and `count[4] == count[1]` (both 2), all conditions satisfied → `true`.

## Complexity Analysis
- **Time:** O(n + k) – one pass to compute remainders and a pass over `k/2` remainder pairs.
- **Space:** O(k) for the remainder frequency array.

## Follow-Up Questions
1. How would you modify the solution if the array length is odd?
2. Can the problem be solved using sorting instead of a frequency array?
3. Extend to a streaming scenario where numbers arrive one by one.

## Key Takeaway
Pairing numbers by complementary remainders modulo `k` reduces the problem to a simple frequency‑matching check.