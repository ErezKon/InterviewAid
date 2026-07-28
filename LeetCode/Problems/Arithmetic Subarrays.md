# 1630. Arithmetic Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/arithmetic-subarrays](https://leetcode.com/problems/arithmetic-subarrays)
**Companies:** Google

---

## 1. Problem Description

Given an array `nums` and queries `[l, r]`, for each query determine if the subarray `nums[l..r]` can be rearranged to form an arithmetic sequence.

---

## 2. Key Insight

> For each query, extract the subarray, sort it (or use min/max + set for O(n) check), and verify constant differences.

---

## 3. Approach: Sort Each Subarray — O(q × m log m) ✅

```text
FUNCTION checkArithmeticSubarrays(nums, l, r):
    SET result ← []
    FOR i ← 0 TO LENGTH(l) - 1:
        SET sub ← SLICE(nums, l[i], r[i])
        SORT sub
        SET diff ← sub[1] - sub[0]
        SET isArith ← TRUE
        FOR j ← 2 TO LENGTH(sub) - 1:
            IF sub[j] - sub[j-1] != diff:
                SET isArith ← FALSE
                BREAK
        END FOR
        APPEND isArith TO result
    END FOR
    RETURN result
```

---

## 4. Examples

**Example 1:**
```
nums = [4,6,5,9,3,7]
l = [0,0,2]
r = [2,3,5]
```
- Query 0: subarray `[4,6,5]` → sorted `[4,5,6]` → arithmetic (diff=1) → `true`.
- Query 1: subarray `[6,5,9]` → sorted `[5,6,9]` → differences 1 and 3 → `false`.
- Query 2: subarray `[5,9,3,7]` → sorted `[3,5,7,9]` → diff=2 → `true`.
**Output:** `[true,false,true]`

**Example 2:**
```
nums = [1,2,3,4]
l = [0,1]
r = [2,3]
```
- Subarray `[1,2,3]` → arithmetic → `true`.
- Subarray `[2,3,4]` → arithmetic → `true`.
**Output:** `[true,true]`

---

## 5. Walkthrough

| Step | Query | Subarray (unsorted) | Sorted Subarray | Diff | Is Arithmetic |
|------|-------|----------------------|-----------------|------|----------------|
| 1 | 0 | `[4,6,5]` | `[4,5,6]` | 1 | ✅ |
| 2 | 1 | `[6,5,9]` | `[5,6,9]` | 1 then 3 | ❌ |
| 3 | 2 | `[5,9,3,7]` | `[3,5,7,9]` | 2 | ✅ |

The table shows how each query is processed: extract, sort, compute the common difference, and verify all consecutive differences match.

---

## 6. Complexity Analysis

- **Time:** Sorting each subarray of length *m* costs `O(m log m)`. For *q* queries the total is `O(q × m log m)`. Using the min/max/set method can reduce to `O(q × m)`.
- **Space:** `O(m)` auxiliary space for the temporary subarray and set.

---

## 7. Follow-Up Questions

1. How would you modify the algorithm to handle updates to `nums` between queries?
2. Can you achieve `O(1)` query time with preprocessing?
3. How would you extend this to check for geometric sequences instead of arithmetic ones?

---

## Key Takeaway

> An arithmetic sequence check boils down to: sort and verify constant difference, or use min/max/set for linear time without sorting.
