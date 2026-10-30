# 1497. Check If Array Pairs Are Divisible by k

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k](https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k)
**Companies:** 6Sense, Amazon, Devrev, Google, Meta, Microsoft, Tcs, Visa

---

## Problem Description
Given an array of integers `arr` of even length `n` and an integer `k`.

We want to divide the array into exactly `n / 2` pairs such that the sum of each pair is divisible by `k`.

Return `true` *If you can find a way to do that or* `false` *otherwise*.

**Constraints:**
- `arr.length == n`
- `1 <= n <= 10^5`
- `n` is even.
- `-10^9 <= arr[i] <= 10^9`
- `1 <= k <= 10^5`

## Examples
```
Example 1:
  Input: arr = [1,2,3,4,5,10,6,7,8,9], k = 5
  Output: true
  Explanation: Pairs are (1,9),(2,8),(3,7),(4,6) and (5,10).
```

```
Example 2:
  Input: arr = [1,2,3,4,5,6], k = 7
  Output: true
  Explanation: Pairs are (1,6),(2,5) and(3,4).
```

```
Example 3:
  Input: arr = [1,2,3,4,5,6], k = 10
  Output: false
  Explanation: You can try all possible pairs to see that there is no way to divide arr into 3 pairs each with sum divisible by 10.
```

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