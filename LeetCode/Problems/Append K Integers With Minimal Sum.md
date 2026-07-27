# 2195. Append K Integers With Minimal Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/append-k-integers-with-minimal-sum](https://leetcode.com/problems/append-k-integers-with-minimal-sum)
**Companies:** Amazon, Google

---

## 1. Problem Description

Given an array `nums` and integer `k`, append `k` unique positive integers not in `nums` to the array such that the sum of appended integers is minimized. Return that minimum sum.

---

## 2. Key Insight

> Greedily pick the smallest positive integers not in `nums`. Sort `nums`, then use the sum formula `1+2+...+m` minus numbers in `nums` that fall within that range.

---

## 3. Approach: Sort + Arithmetic Sum — O(n log n) ✅

```
FUNCTION minimalKSum(nums, k):
    SORT nums
    REMOVE duplicates from nums
    result = 0
    prev = 0
    FOR num IN nums:
        gap = num - prev - 1  // available integers between prev and num
        take = MIN(gap, k)
        IF take > 0:
            // sum of integers from (prev+1) to (prev+take)
            result += (prev + 1 + prev + take) * take / 2
            k -= take
        IF k == 0: BREAK
        prev = num
    IF k > 0:
        // remaining k integers after the largest in nums
        result += (prev + 1 + prev + k) * k / 2
    RETURN result
```

| Time | Space |
|------|-------|
| O(n log n) | O(1) extra |

---

## Key Takeaway

> Sort the existing numbers, then greedily fill gaps with the smallest available integers using arithmetic sum formula to avoid iteration.
