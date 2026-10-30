# 1630. Arithmetic Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/arithmetic-subarrays](https://leetcode.com/problems/arithmetic-subarrays)
**Companies:** Google

---

## 1. Problem Description

A sequence of numbers is called **arithmetic** if it consists of at least two elements, and the difference between every two consecutive elements is the same. More formally, a sequence `s` is arithmetic if and only if `s[i+1] - s[i] == s[1] - s[0]` for all valid `i`.

For example, these are **arithmetic** sequences:

```
1, 3, 5, 7, 9
7, 7, 7, 7
3, -1, -5, -9
```

The following sequence is not **arithmetic**:

```
1, 1, 2, 5, 7
```

You are given an array of `n` integers, `nums`, and two arrays of `m` integers each, `l` and `r`, representing the `m` range queries, where the `iᵗʰ` query is the range `[l[i], r[i]]`. All the arrays are **0-indexed**.

Return *a list of* `boolean` *elements* `answer`*, where* `answer[i]` *is* `true` *if the subarray* `nums[l[i]], nums[l[i]+1], ... , nums[r[i]]` *can be **rearranged** to form an **arithmetic** sequence, and* `false` *otherwise.*

**Constraints:**
- `n == nums.length`
- `m == l.length`
- `m == r.length`
- `2 ≤ n ≤ 500`
- `1 ≤ m ≤ 500`
- `0 ≤ l[i] < r[i] < n`
- `-10⁵ ≤ nums[i] ≤ 10⁵`

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

```
Example 1:
  Input: nums = [4,6,5,9,3,7], l = [0,0,2], r = [2,3,5]
  Output: [true,false,true]
  Explanation:
  In the 0th query, the subarray is [4,6,5]. This can be rearranged as [6,5,4], which is an arithmetic sequence.
  In the 1st query, the subarray is [4,6,5,9]. This cannot be rearranged as an arithmetic sequence.
  In the 2nd query, the subarray is [5,9,3,7]. This can be rearranged as [3,5,7,9], which is an arithmetic sequence.

Example 2:
  Input: nums = [-12,-9,-3,-12,-6,15,20,-25,-20,-15,-10], l = [0,1,6,4,8,7], r = [4,4,9,7,9,10]
  Output: [false,true,false,false,true,true]
```

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
