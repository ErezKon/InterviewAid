# 60. Permutation Sequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/permutation-sequence](https://leetcode.com/problems/permutation-sequence)
**Companies:** Amazon, Bloomberg, Google, Jump Trading, Meta, Microsoft, Twitter

---

## Problem Description

The set `[1, 2, 3, ..., n]` contains a total of `n!` unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for `n = 3`:

- `"123"`
- `"132"`
- `"213"`
- `"231"`
- `"312"`
- `"321"`

Given `n` and `k`, return the `k^th` permutation sequence.

**Constraints:**
- `1 <= n <= 9`
- `1 <= k <= n!`

## Examples

**Example 1:**
```
Input: n = 3, k = 3
Output: "213"
```

**Example 2:**
```
Input: n = 4, k = 9
Output: "2314"
```

**Example 3:**
```
Input: n = 3, k = 1
Output: "123"
```

## Approach
Use the factoradic representation of `k‑1` to determine the index of each digit among the remaining numbers.

```text
FUNCTION GetKthPermutation(n, k):
    // pre‑compute factorials
    SET factorial[0] ← 1
    FOR i ← 1 TO n:
        SET factorial[i] ← factorial[i-1] * i
    // list of available numbers
    SET numbers ← [1, 2, ..., n]
    // convert to 0‑based index
    SET k ← k - 1
    SET result ← ""
    FOR i ← n DOWN TO 1:
        SET idx ← k / factorial[i-1]
        SET result ← result + STRING(numbers[idx])
        REMOVE numbers[idx]
        SET k ← k % factorial[i-1]
    RETURN result
```

## Walkthrough
| Step | Action | Result |
|------|--------|--------|
| 1 | factorial array for `n=3` | `[1,1,2,6]` |
| 2 | numbers = `[1,2,3]`, `k=2` (since k‑1) |
| 3 | i=3: idx = 2/2 =1 → pick `2`, result=`"2"`, numbers=`[1,3]`, k=2%2=0 |
| 4 | i=2: idx = 0/1 =0 → pick `1`, result=`"21"`, numbers=`[3]` |
| 5 | i=1: idx = 0/1 =0 → pick `3`, result=`"213"` |

## Complexity Analysis
Time complexity **O(n²)** due to list removals; space complexity **O(n)** for factorials and the numbers list.

## Follow-Up Questions
1. How to generate the next permutation in O(n) time without recomputing factorials?
2. How to handle very large `n` where factorial values overflow?
3. Can you generate the permutation directly in a streaming fashion?

## Key Takeaway
Factoradic representation converts a rank into positional indices, enabling direct construction of the k‑th lexicographic permutation.
