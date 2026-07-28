# 605. Can Place Flowers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/can-place-flowers](https://leetcode.com/problems/can-place-flowers)
**Companies:** Airbnb, Amazon, Apple, Atlassian, Bloomberg, Cisco, Google, Htc, Linkedin, Meta, Microsoft, Nike, Nutanix, Oracle, Soti, Yandex

---

## Problem Description
Given a binary array `flowerbed` where `0` means empty and `1` means a flower is planted, determine if `n` new flowers can be planted without violating the rule that no two adjacent plots can both contain flowers.

## Examples
- Input: `flowerbed = [1,0,0,0,1]`, `n = 1`
  Output: `true`
  Explanation: Plant a flower at index 2.
- Input: `flowerbed = [1,0,0,0,1]`, `n = 2`
  Output: `false`
  Explanation: Only one spot is available.

## Approach: Greedy Scan — O(n) ✅

```text
FUNCTION canPlaceFlowers(flowerbed, n):
    i ← 0
    WHILE i < LENGTH(flowerbed):
        IF flowerbed[i] == 0:
            leftEmpty ← (i == 0) OR (flowerbed[i-1] == 0)
            rightEmpty ← (i == LENGTH(flowerbed)-1) OR (flowerbed[i+1] == 0)
            IF leftEmpty AND rightEmpty:
                flowerbed[i] ← 1
                n ← n - 1
                IF n == 0: RETURN true
                i ← i + 1  // skip next spot
        i ← i + 1
    RETURN n <= 0
```

## Walkthrough
| Index | Value before | Left empty? | Right empty? | Action |
|-------|--------------|-------------|--------------|--------|
| 0 | 1 | N/A | N/A | Skip |
| 1 | 0 | false (left is 1) | true | Cannot plant |
| 2 | 0 | true | true | Plant, n-- |
| 3 | 0 (now after planting) | false | N/A | Skip |
| 4 | 1 | N/A | N/A | End |

## Complexity Analysis
- **Time:** O(m) where m = length of `flowerbed`.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you adapt the algorithm for a circular flowerbed?
2. Can you compute the maximum number of flowers that can be planted without a given `n`?
3. What changes are needed if the rule allows at most two consecutive empty spots instead of one?

## Key Takeaway
A single linear scan, planting greedily whenever both neighbors are empty, yields an optimal solution.
