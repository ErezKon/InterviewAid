# 3883. Count Non Decreasing Arrays With Given Digit Sums

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-non-decreasing-arrays-with-given-digit-sums](https://leetcode.com/problems/count-non-decreasing-arrays-with-given-digit-sums)
**Companies:** Docusign

---

## 1. Problem Description

Given an array of digit sums, count the number of non-decreasing arrays where each element's digit sum matches the corresponding given digit sum.

---

## 2. Examples

**Example 1:**
```
Input: digitSums = [1,2]
Output: 2
Explanation: The possible arrays are [1,2] and [1,11] (since 1+1=2 digit sum 2). Both are non‑decreasing.
```

**Example 2:**
```
Input: digitSums = [0,0,0]
Output: 1
Explanation: The only array is [0,0,0].
```

---

## 3. Approach: DP with Digit Sum Enumeration — O(n·V) ✅

```text
FUNCTION countArrays(digitSums):
    SET n ← LENGTH(digitSums)
    // Pre‑compute all numbers (0‑99…) whose digit sum equals each target
    SET candidates ← ARRAY of LISTS size n
    FOR i FROM 0 TO n-1:
        SET target ← digitSums[i]
        SET candidates[i] ← ALL numbers x where digitSum(x) == target
    
    // dp[i][val] = number of ways to build prefix up to i ending with value val
    SET dpPrev ← MAP with key = 0, value = 1   // empty prefix
    FOR i FROM 0 TO n-1:
        SET dpCurr ← EMPTY MAP
        FOR each valPrev, waysPrev IN dpPrev:
            FOR each val IN candidates[i]:
                IF val >= valPrev:
                    SET dpCurr[val] ← dpCurr.get(val,0) + waysPrev
        SET dpPrev ← dpCurr
    RETURN SUM of all values in dpPrev
```

---

## 4. Walkthrough

Consider `digitSums = [1,2]`.

1. **Pre‑compute candidates**:
   - For sum 1 → {1,10,100,…}
   - For sum 2 → {2,11,20,101,…}
2. **DP iteration**:
   - Start with empty prefix `{0:1}`.
   - For first position, allowed values ≥0 are all candidates for sum 1 → dpPrev becomes `{1:1,10:1,100:1,…}`.
   - For second position, we only keep values ≥ previous value. Valid pairs are `(1,2)` and `(1,11)`, giving count 2.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n·V) where V is the total number of candidate values across all positions | O(V) for candidate storage and DP maps |

---

## 6. Follow‑Up Questions

1. How would you adapt the solution if the array length is up to 10⁵ and values can be large? (Hint: use prefix sums and combinatorics.)
2. Can the problem be solved with a combinatorial formula without explicit DP?
3. How does the approach change if the array must be strictly increasing?

---

## Key Takeaway

> Enumerate all numbers matching each digit‑sum, then use DP to enforce the non‑decreasing constraint while counting valid arrays.
