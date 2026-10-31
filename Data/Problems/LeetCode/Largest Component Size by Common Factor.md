# 952. Largest Component Size by Common Factor

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/largest-component-size-by-common-factor](https://leetcode.com/problems/largest-component-size-by-common-factor)
**Companies:** Google, Microsoft

---

## 1. Problem Description

You are given an integer array of unique positive integers `nums`. Consider the following graph:

- There are `nums.length` nodes, labeled `nums[0]` to `nums[nums.length - 1]`,
- There is an undirected edge between `nums[i]` and `nums[j]` if `nums[i]` and `nums[j]` share a common factor greater than `1`.

Return *the size of the largest connected component in the graph*.

**Constraints:**
- `1 <= nums.length <= 2 * 10^4`
- `1 <= nums[i] <= 10^5`
- All the values of `nums` are **unique**.

---

## 2. Examples

```
Example 1:
  Input: nums = [4,6,15,35]
  Output: 4
  Explanation: 4-6 share 2, 6-15 share 3, 15-35 share 5, so all 4 numbers form one component.
```

```
Example 2:
  Input: nums = [20,50,9,63]
  Output: 2
  Explanation: {20, 50} (share 10) and {9, 63} (share 9) are two components of size 2.
```

```
Example 3:
  Input: nums = [2,3,6,7,4,12,21,39]
  Output: 8
  Explanation: All numbers are connected (e.g. 2-6-3-21-7, 4-2, 12-6, 39-3), forming one component of size 8.
```

---

## 3. Approach — Union-Find by Prime Factors ✅

```text
FUNCTION largestComponentSize(nums):
    maxVal ← MAXIMUM of nums
    uf ← UNIONFIND(maxVal + 1)
    FOR each num IN nums:
        FOR each prime IN primeFactors(num):
            uf.UNION(num, prime)
    // count component sizes
    sizeMap ← EMPTY MAP
    FOR each num IN nums:
        root ← uf.FIND(num)
        INCREMENT sizeMap[root]
    RETURN MAXIMUM value in sizeMap
```

---

## 4. Walkthrough

**Example:** `nums = [4,6,15,35]`

1. `maxVal = 35`, create Union-Find for indices `0..35`.
2. Process `4` → prime factors `{2}` → `uf.UNION(4,2)`.
3. Process `6` → primes `{2,3}` → `uf.UNION(6,2)`, `uf.UNION(6,3)`.
4. Process `15` → primes `{3,5}` → `uf.UNION(15,3)`, `uf.UNION(15,5)`.
5. Process `35` → primes `{5,7}` → `uf.UNION(35,5)`, `uf.UNION(35,7)`.
6. After unions, all numbers `4,6,15,35` share a common root, so component size = 4.
7. Count sizes via `sizeMap` and return the maximum.

---

## 5. Complexity Analysis

| Metric | Value |
|--------|-------|
| Time | O(n · √M) where M is max(nums) (factorization) |
| Space | O(M) for Union-Find structure |

---

## 6. Follow-Up Questions

- How would you modify the algorithm if numbers could be up to 10⁹, making factorization expensive?
- Can you solve the problem without explicit Union-Find, using graph traversal instead?
- What if the definition of connectivity required a common factor ≥ k for a given k?

---

## 7. Key Takeaway

> Union-Find on prime factors efficiently groups numbers sharing any factor, turning a pairwise connectivity problem into near-linear time.
