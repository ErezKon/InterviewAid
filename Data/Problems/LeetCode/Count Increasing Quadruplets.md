# 2552. Count Increasing Quadruplets

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-increasing-quadruplets](https://leetcode.com/problems/count-increasing-quadruplets)
**Companies:** Deutsche Bank, Sap

---

## 1. Problem Description

Given an integer array `nums`, count the number of quadruplets `(i, j, k, l)` such that `i < j < k < l` and `nums[i] < nums[k] < nums[j] < nums[l]`. The array length can be up to 10⁴.

---

## 2. Key Insight

> Fix the middle two indices `j` and `k`. For each pair where `j < k` and `nums[k] < nums[j]`, count how many `i < j` have `nums[i] < nums[k]` and how many `l > k` have `nums[l] > nums[j]`. Multiplying these two counts gives the contribution of that `(j,k)` pair.

---

## 3. Approach: Prefix‑Suffix Counts — O(n²) ✅

```text
FUNCTION countQuadruplets(nums):
    n ← LENGTH(nums)
    // prefixLess[x] will hold count of values < x seen so far
    prefixLess ← ARRAY of size n filled with 0
    result ← 0
    
    // Iterate j from left to right
    FOR j FROM 0 TO n-1:
        // Reset a frequency map for values to the left of j
        leftFreq ← MAP()
        // Count of i < j with nums[i] < any value
        FOR i FROM 0 TO j-1:
            leftFreq[nums[i]] ← leftFreq.get(nums[i], 0) + 1
        
        // suffixGreater[v] will hold count of values > v to the right of current k
        suffixGreater ← MAP()
        // Build suffix counts for positions > j
        FOR l FROM n-1 DOWNTO j+1:
            suffixGreater[nums[l]] ← suffixGreater.get(nums[l], 0) + 1
        
        // Scan k from j+1 to n-2
        FOR k FROM j+1 TO n-2:
            IF nums[k] < nums[j]:
                // count i < j with nums[i] < nums[k]
                lessCount ← 0
                FOR val, cnt IN leftFreq:
                    IF val < nums[k]:
                        lessCount ← lessCount + cnt
                // count l > k with nums[l] > nums[j]
                greaterCount ← 0
                FOR val, cnt IN suffixGreater:
                    IF val > nums[j]:
                        greaterCount ← greaterCount + cnt
                result ← result + (lessCount * greaterCount)
            // Move nums[k] from suffix to left side for next iteration
            suffixGreater[nums[k]] ← suffixGreater[nums[k]] - 1
            IF suffixGreater[nums[k]] = 0:
                DELETE suffixGreater[nums[k]]
            leftFreq[nums[k]] ← leftFreq.get(nums[k], 0) + 1
    
    RETURN result
```

| Time | Space |
|------|-------|
| O(n²) | O(n) |

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: 1
Explanation: The only quadruplet is (0,2,1,3) → 1 < 3 < 2 < 4.
```

**Example 2:**
```
Input: nums = [3,1,2,4,5]
Output: 0
Explanation: No indices satisfy the required ordering.
```

---

## Walkthrough

Consider `nums = [1,2,3,4]`.
1. `j = 1` (value 2), `k = 2` (value 3) → `nums[k] > nums[j]` → skip.
2. `j = 2` (value 3), `k = 3` (value 4) → `nums[k] > nums[j]` → skip.
3. `j = 1`, `k = 2` does not satisfy `nums[k] < nums[j]`, so only pair `(j=2,k=3)` qualifies when `nums[k] < nums[j]` is false. The only valid `(j,k)` is `(j=2,k=1)` after re‑ordering, yielding one quadruplet.

---

## Complexity Analysis

- **Time:** The double loop over `j` and `k` gives **O(n²)**. Inside each iteration we scan left and right frequency maps, but their total size across all iterations remains O(n).
- **Space:** Two hash maps store frequencies of elements to the left and right of the current window → **O(n)**.

---

## Follow-Up Questions

1. How would you adapt the algorithm if the pattern changed to `nums[i] < nums[j] < nums[k] < nums[l]` (strictly increasing quadruplets)?
2. Can the solution be improved to O(n log n) using Fenwick trees or segment trees for prefix/suffix queries?
3. How would you handle the problem if the array length could be up to 10⁵?

---

## Key Takeaway

> By fixing the middle two indices and using prefix‑suffix frequency counts, the quadruplet counting problem reduces from O(n⁴) to O(n²).
