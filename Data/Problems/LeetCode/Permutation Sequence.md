# 60. Permutation Sequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/permutation-sequence](https://leetcode.com/problems/permutation-sequence)
**Companies:** Amazon, Bloomberg, Google, Jump Trading, Meta, Microsoft, Twitter

---

## Problem Description
Given integers `n` and `k`, return the `k`‑th permutation sequence (1‑indexed) of the numbers `1` to `n` arranged in lexicographic order.

## Examples
| n | k | Output |
|---|---|--------|
| 3 | 3 | "213" |
| 4 | 9 | "2314" |
| 1 | 1 | "1" |

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
