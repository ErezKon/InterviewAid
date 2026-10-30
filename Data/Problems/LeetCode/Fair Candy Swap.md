# 888. Fair Candy Swap

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/fair-candy-swap](https://leetcode.com/problems/fair-candy-swap)
**Companies:** Amazon, Bloomberg, Fidessa, Google, Meta, Microsoft, Swiggy

---

## Problem Description

Alice and Bob have a different total number of candies. You are given two integer arrays `aliceSizes` and `bobSizes` where `aliceSizes[i]` is the number of candies of the `i^th` box of candy that Alice has and `bobSizes[j]` is the number of candies of the `j^th` box of candy that Bob has.

Since they are friends, they would like to exchange one candy box each so that after the exchange, they both have the same total amount of candy. The total amount of candy a person has is the sum of the number of candies in each box they have.

Return *an integer array* `answer` *where* `answer[0]` *is the number of candies in the box that Alice must exchange, and* `answer[1]` *is the number of candies in the box that Bob must exchange*. If there are multiple answers, you may **return any** one of them. It is guaranteed that at least one answer exists.

**Constraints:**

- `1 <= aliceSizes.length, bobSizes.length <= 10^4`
- `1 <= aliceSizes[i], bobSizes[j] <= 10^5`
- Alice and Bob have a different total number of candies.
- There will be at least one valid answer for the given input.

---

## Examples

```
Example 1:
  Input: aliceSizes = [1,1], bobSizes = [2,2]
  Output: [1,2]
```

```
Example 2:
  Input: aliceSizes = [1,2], bobSizes = [2,3]
  Output: [1,2]
```

```
Example 3:
  Input: aliceSizes = [2], bobSizes = [1,3]
  Output: [2,3]
```

---

## Key Insight

> After swapping bar `a` (Alice) for bar `b` (Bob): `sumA - a + b = sumB - b + a` → `b = a - (sumA - sumB) / 2`. Compute the diff, then for each of Alice's bars, check if the needed Bob bar exists in a set.

---

## Approach: Set Lookup — O(n + m) ✅

```text
FUNCTION fairCandySwap(aliceSizes, bobSizes):
    SET sumA ← SUM(aliceSizes)
    SET sumB ← SUM(bobSizes)
    SET diff ← (sumA - sumB) / 2
    SET bobSet ← SET(bobSizes)
    FOR a IN aliceSizes:
        IF a - diff IN bobSet:
            RETURN [a, a - diff]
    RETURN []
```

---

## Walkthrough

1. Compute sums: `sumA = 1+2+5 = 8`, `sumB = 2+4 = 6`.
2. `diff = (8-6)/2 = 1`.
3. For each `a` in Alice:
   - a=1 → need `1-1=0` not in Bob.
   - a=2 → need `2-1=1` not in Bob.
   - a=5 → need `5-1=4` which exists in Bob → swap `[5,4]`.

---

## Complexity Analysis

- **Time:** O(n + m) – one pass to compute sums and build a set, then another pass over Alice's bars.
- **Space:** O(m) – set of Bob's sizes.

---

## Key Takeaway

> **Math reduces swap problem to a lookup: `b = a - diff`. Use a set for O(1) existence checks. Classic two-sum variant.**