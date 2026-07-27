# 952. Largest Component Size by Common Factor

**Difficulty:** 🔴 Hard
**Companies:** Google, Microsoft

---

## 1. Problem Description

Given an array of integers, connect any two numbers that share a common factor > 1. Return the size of the largest connected component.

---

## 2. Approach: Union-Find by Prime Factors — O(n√M) ✅

For each number, factorize and union the number with each of its prime factors. Numbers sharing a prime are connected.

```
FUNCTION largestComponentSize(nums):
    uf = UnionFind(max(nums) + 1)
    FOR num IN nums:
        FOR factor IN primeFactors(num):
            uf.UNION(num, factor)

    count = Counter()
    FOR num IN nums:
        count[uf.FIND(num)] += 1
    RETURN MAX(count.values())
```

| Time | Space |
|------|-------|
| O(n · √M) | O(M) where M = max value |

---

## 3. Key Takeaway

> Union-Find on prime factors. Instead of checking all pairs O(n²), union each number with its prime factors. Numbers sharing a factor end up in the same component.
