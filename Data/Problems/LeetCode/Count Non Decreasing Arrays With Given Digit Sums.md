# 3883. Count Non Decreasing Arrays With Given Digit Sums

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-non-decreasing-arrays-with-given-digit-sums](https://leetcode.com/problems/count-non-decreasing-arrays-with-given-digit-sums)
**Companies:** Docusign

---

## 1. Problem Description

You are given an integer array `digitSum` of length `n`.

An array `arr` of length `n` is considered **valid** if:

- `0 <= arr[i] <= 5000`
- it is **non-decreasing**.
- the **sum of the digits** of `arr[i]` **equals** `digitSum[i]`.

Return an integer denoting the number of **distinct valid arrays**. Since the answer may be large, return it modulo `10^9 + 7`.

An array is said to be **non-decreasing** if each element is greater than or equal to the previous element, if it exists.

**Constraints:**
- `1 <= digitSum.length <= 1000`
- `0 <= digitSum[i] <= 50`

---

## 2. Examples

```
Example 1:
  Input: digitSum = [25,1]
  Output: 6
  Explanation: Numbers whose sum of digits is 25 are 799, 889, 898, 979, 988, and 997.
  The only number whose sum of digits is 1 that can appear after these values while keeping the array
  non-decreasing is 1000.
  Thus, the valid arrays are [799, 1000], [889, 1000], [898, 1000], [979, 1000], [988, 1000], and [997, 1000].
  Hence, the answer is 6.
```

```
Example 2:
  Input: digitSum = [1]
  Output: 4
  Explanation: The valid arrays are [1], [10], [100], and [1000].
  Thus, the answer is 4.
```

```
Example 3:
  Input: digitSum = [2,49,23]
  Output: 0
  Explanation: There is no integer in the range [0, 5000] whose sum of digits is 49. Thus, the answer is 0.
```

(Note: every valid array must be non‑decreasing and use values in [0, 5000].)

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
