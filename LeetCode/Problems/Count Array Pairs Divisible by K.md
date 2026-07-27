# 2183. Count Array Pairs Divisible by K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-array-pairs-divisible-by-k](https://leetcode.com/problems/count-array-pairs-divisible-by-k)
**Companies:** Paypal, Qualcomm

---

## 1. Problem Description

Given an array `nums` and integer `k`, count pairs `(i, j)` where `i < j` and `nums[i] × nums[j]` is divisible by `k`.

---

## 2. Key Insight

> `nums[i] × nums[j] % k == 0` iff `gcd(nums[i], k) × gcd(nums[j], k) % k == 0` (roughly). Group elements by their `gcd` with `k`. For each pair of divisor groups, check if their product covers `k`.

---

## 3. Approach: GCD Grouping — O(n × √k + d(k)²) ✅

```
FUNCTION countPairs(nums, k):
    // Group elements by gcd(num, k)
    gcdCount = Counter()
    FOR num IN nums:
        gcdCount[gcd(num, k)] += 1
    
    result = 0
    divisors = list(gcdCount.keys())
    FOR i FROM 0 TO len(divisors)-1:
        FOR j FROM i TO len(divisors)-1:
            g1, g2 = divisors[i], divisors[j]
            IF (g1 * g2) % k == 0:
                IF i == j:
                    result += gcdCount[g1] * (gcdCount[g1] - 1) / 2
                ELSE:
                    result += gcdCount[g1] * gcdCount[g2]
    
    RETURN result
```

| Time | Space |
|------|-------|
| O(n + d(k)²) where d(k) = number of divisors of k | O(d(k)) |

---

## Key Takeaway

> Instead of checking all O(n²) pairs, group by `gcd(num, k)`. The number of distinct gcd values is at most the number of divisors of `k`, which is small. Then check all pairs of groups.
