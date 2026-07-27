# 3388. Count Beautiful Splits in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-beautiful-splits-in-an-array](https://leetcode.com/problems/count-beautiful-splits-in-an-array)
**Companies:** Amazon, Bloomberg

---

## 1. Problem Description

Given an array `nums`, count the number of ways to split it into three non-empty parts `[a, b, c]` such that `a` is a prefix of `b` OR `b` is a prefix of `c`.

---

## 2. Key Insight

> Use the **Z-function** or **LCP array** to efficiently check prefix relationships. `a` is a prefix of `b` iff `nums[0..len(a)-1] == nums[len(a)..2*len(a)-1]`. Precompute LCP between all suffix pairs.

---

## 3. Approach: LCP Table — O(n²) ✅

```
FUNCTION beautifulSplits(nums):
    n = len(nums)
    // lcp[i][j] = length of longest common prefix of nums[i:] and nums[j:]
    lcp = n×n array of 0
    FOR i FROM n-1 DOWN TO 0:
        FOR j FROM n-1 DOWN TO 0:
            IF nums[i] == nums[j]:
                lcp[i][j] = lcp[i+1][j+1] + 1 IF i+1<n AND j+1<n ELSE 1
    
    count = 0
    FOR i FROM 1 TO n-2:       // end of part a
        FOR j FROM i+1 TO n-1: // end of part b
            lenA = i
            lenB = j - i
            // a is prefix of b: lcp[0][i] >= lenA
            // b is prefix of c: lcp[i][j] >= lenB
            IF lcp[0][i] >= lenA OR lcp[i][j] >= lenB:
                count += 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(n²) | O(n²) |

---

## Key Takeaway

> Precompute LCP between all suffix pairs in O(n²) via reverse DP. Then checking prefix relationships is O(1) per split point pair.
