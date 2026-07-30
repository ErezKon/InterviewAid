# 956. Tallest Billboard

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Atlassian, Google, Meta, Microsoft, Tcs
---

## Problem Description
You are given an array `rods` where each element represents the length of a rod. You need to partition the rods into two groups (the two sides of a billboard) such that the sum of lengths in each group is equal. Return the maximum possible common height of the two sides. If it is impossible to build a billboard, return 0.

## Examples
**Example 1:**
```
Input: rods = [1,2,3,6]
Output: 6
Explanation: One side can use rods [6], the other side uses [1,2,3] (sum = 6).
```

**Example 2:**
```
Input: rods = [1,2,3,4,5,6]
Output: 10
Explanation: Use rods [6,4] on one side and [5,3,2] on the other side.
```

## Approach
Dynamic programming on the difference between the two sides. Let `dp[diff]` be the maximum height of the taller side when the height difference is `diff`. Initialize `dp[0] = 0`. For each rod, update a new map:
- Add the rod to the taller side → newDiff = diff + rod, newHeight = dp[diff] + rod.
- Add the rod to the shorter side → newDiff = abs(diff - rod), newHeight = dp[diff] + min(diff, rod).
- Skip the rod → keep current state.
After processing all rods, `dp[0]` holds the maximum equal height.

```text
FUNCTION tallestBillboard(rods):
    dp ← MAP with default -∞
    dp[0] ← 0
    FOR each rod IN rods:
        nextDP ← COPY(dp)
        FOR each diff, height IN dp:
            // add to taller side
            newDiff ← diff + rod
            nextDP[newDiff] ← MAX(nextDP.get(newDiff, -∞), height + rod)
            // add to shorter side
            newDiff ← ABS(diff - rod)
            newHeight ← height + MIN(diff, rod)
            nextDP[newDiff] ← MAX(nextDP.get(newDiff, -∞), newHeight)
        dp ← nextDP
    RETURN dp[0]
```

## Walkthrough
| Step | Rod | dp before (diff→height) | Updates | dp after |
|------|-----|------------------------|---------|----------|
| 0 | – | {0→0} | – | {0→0} |
| 1 | 1 | {0→0} | add to taller → {1→1}; add to shorter (same) → {1→0} | {0→0,1→1} |
| 2 | 2 | {0→0,1→1} | ... (omitted for brevity) | … |
| Final | – | … | – | dp[0] = 10 |

## Complexity Analysis
- Time: O(n · S) where `S` is the range of possible differences (bounded by sum of rods). Practically O(n · sum(rods)).
- Space: O(S) for the DP map.

## Follow‑Up Questions
1. How would you adapt the solution if the number of sides were three instead of two?
2. Can you solve the problem using a meet‑in‑the‑middle approach to reduce memory?
3. What if each rod could be used at most once but you could also discard rods without penalty?

## Key Takeaway
Transform the billboard building into a DP over height differences, allowing you to efficiently track the best achievable equal height.
