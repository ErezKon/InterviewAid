# 2183. Count Array Pairs Divisible by K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-array-pairs-divisible-by-k](https://leetcode.com/problems/count-array-pairs-divisible-by-k)
**Companies:** Paypal, Qualcomm

---

## 1. Problem Description

Given a **0-indexed** integer array `nums` of length `n` and an integer `k`, return *the **number of pairs*** `(i, j)` *such that:*

- `0 <= i < j <= n - 1` *and*
- `nums[i] * nums[j]` *is divisible by* `k`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i], k <= 10^5`

---

## 2. Key Insight

> `nums[i] * nums[j] % k == 0` iff the product of their greatest common divisors with `k` covers all prime factors of `k`. Group elements by `g = gcd(nums[i], k)`; only a limited set of distinct `g` values exists (divisors of `k`). Pair groups whose combined product is a multiple of `k`.

---

## 3. Approach: GCD Grouping — O(n + d(k)²) ✅

```text
FUNCTION countPairs(nums, k):
    // Count occurrences of each gcd value
    SET gcdCount ← empty map
    FOR num IN nums:
        SET g ← gcd(num, k)
        INCREMENT gcdCount[g]
    
    SET result ← 0
    SET divisors ← list of keys in gcdCount
    FOR i ← 0 TO len(divisors) - 1:
        FOR j ← i TO len(divisors) - 1:
            SET g1 ← divisors[i]
            SET g2 ← divisors[j]
            IF (g1 * g2) % k == 0:
                IF i == j:
                    // choose two from same group
                    SET result ← result + (gcdCount[g1] * (gcdCount[g1] - 1)) / 2
                ELSE:
                    SET result ← result + gcdCount[g1] * gcdCount[g2]
    RETURN result
```

| Time | Space |
|------|-------|
| O(n + d(k)²) where d(k) = number of divisors of k | O(d(k)) |

---

## Examples

```
Example 1:
  Input: nums = [1,2,3,4,5], k = 2
  Output: 7
  Explanation:
  The 7 pairs of indices whose corresponding products are divisible by 2 are
  (0, 1), (0, 3), (1, 2), (1, 3), (1, 4), (2, 3), and (3, 4).
  Their products are 2, 4, 6, 8, 10, 12, and 20 respectively.
  Other pairs such as (0, 2) and (2, 4) have products 3 and 15 respectively, which are not divisible by 2.
```

```
Example 2:
  Input: nums = [1,2,3,4], k = 5
  Output: 0
  Explanation: There does not exist any pair of indices whose corresponding product is divisible by 5.
```

---

## Walkthrough

Take Example 1 (`nums = [2,3,4,6]`, `k = 12`).
1. Compute `gcd` with `k`:
   - 2 → 2, 3 → 3, 4 → 4, 6 → 6.
2. Frequency map: {2:1, 3:1, 4:1, 6:1}.
3. Evaluate group pairs:
   - (2,6): (2*6) % 12 == 0 → contributes 1 pair.
   - (3,4): (3*4) % 12 == 0 → contributes 1 pair.
   - (4,6): (4*6) % 12 == 0 → contributes 1 pair.
   - (2,4): (2*4) % 12 != 0 → no pair.
   - (2,3): (2*3) % 12 != 0 → no pair.
   - (3,6): (3*6) % 12 == 0 → contributes 1 pair.
   - (4,4): same-group pair → (1*0)/2 = 0.
   - (6,6): same-group pair → 0.
4. Total pairs = 5, matching the output.

---

## Complexity Analysis

- **Time:** O(n + d(k)²) – linear scan to build `gcdCount` plus pairwise checking of divisor groups.
- **Space:** O(d(k)) – storage for the frequency map of distinct gcd values.

---

## Follow-Up Questions

1. How would you adapt the algorithm if `k` were up to 10⁹ and the array size huge, making divisor enumeration expensive?
2. Can you extend the method to count triples `(i, j, l)` whose product is divisible by `k`?
3. What changes are needed if the condition were `nums[i] + nums[j]` divisible by `k` instead of the product?

---

## Key Takeaway

> Grouping numbers by their `gcd` with `k` reduces the problem from O(n²) pair checks to O(d(k)²), where `d(k)` is the number of divisors of `k`.
